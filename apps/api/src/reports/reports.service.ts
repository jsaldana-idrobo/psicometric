import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import PDFDocument from 'pdfkit';
import { existsSync } from 'node:fs';
import { Model } from 'mongoose';
import { calculateAge } from '../common/age.util';
import { Patient, PatientDocument } from '../patients/schemas/patient.schema';
import {
  TestResult,
  TestResultDocument,
} from '../results/schemas/test-result.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

interface ReportPsychologist {
  fullName: string;
  signatureName?: string;
  licenseNumber?: string;
}

interface ReportPatient {
  fullName: string;
  documentId: string;
  dateOfBirth: Date;
  phone?: string;
  email?: string;
  company?: string;
  position?: string;
  evaluationDate: Date;
}

interface ReportResult {
  testId: unknown;
  totalScore: number;
  interpretationLabel: string;
  interpretationDescription: string;
  observations?: string;
  finalConclusion?: string;
  recommendation?: string;
  evaluatedAt: Date;
}

interface ReportResultsSummary {
  total: number;
  latestEvaluatedAt?: Date;
  counts: {
    APTO: number;
    NO_APTO: number;
    APTO_CON_OBSERVACIONES: number;
    OTHER: number;
  };
  dominantRecommendation?: string;
}

const REPORT_COLORS = {
  bgSoft: '#f8f2f5',
  surface: '#fffcfd',
  surfaceSoft: '#f8e9f0',
  border: '#ead7e1',
  ink: '#2f2631',
  muted: '#6b5964',
  brand: '#a25274',
  brandStrong: '#89445f',
  brandSoft: '#f2dce7',
  success: '#2f6b4e',
  successSoft: '#e1f3ea',
  warning: '#9a5d23',
  warningSoft: '#f8eadb',
  danger: '#b42344',
  dangerSoft: '#fbe3ea',
} as const;

const DEFAULT_PAGE_MARGIN = 42;

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(TestResult.name)
    private readonly resultModel: Model<TestResultDocument>,
    private readonly configService: ConfigService,
  ) {}

  async streamPatientReport(
    psychologistId: string,
    patientId: string,
    writable: NodeJS.WritableStream,
  ): Promise<void> {
    const { psychologist, patient, results } = await this.loadReportData(
      psychologistId,
      patientId,
    );

    const doc = new PDFDocument({
      size: 'A4',
      margin: DEFAULT_PAGE_MARGIN,
      bufferPages: true,
    });
    doc.pipe(writable);

    this.renderCoverPage(doc, patient, psychologist, results);

    doc.on('pageAdded', () => {
      this.renderPageChrome();
    });

    doc.addPage();
    this.renderHeader(doc, psychologist);
    this.renderPatientSection(doc, patient, psychologist);
    this.renderResultsSection(doc, results);
    this.renderSignatureSection(doc, psychologist);
    this.renderPageFooters(doc);

    doc.end();
  }

  private async loadReportData(psychologistId: string, patientId: string) {
    const [psychologistRaw, patientRaw, resultsRaw] = await Promise.all([
      this.userModel.findById(psychologistId).lean().exec(),
      this.patientModel
        .findOne({ _id: patientId, psychologistId })
        .lean()
        .exec(),
      this.resultModel
        .find({ psychologistId, patientId })
        .sort({ evaluatedAt: -1 })
        .populate('testId', 'name category description')
        .lean()
        .exec(),
    ]);

    if (!psychologistRaw) {
      throw new NotFoundException('Psicólogo no encontrado');
    }

    if (!patientRaw) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return {
      psychologist: psychologistRaw as unknown as ReportPsychologist,
      patient: patientRaw as unknown as ReportPatient,
      results: resultsRaw as unknown as ReportResult[],
    };
  }

  private renderCoverPage(
    doc: PDFKit.PDFDocument,
    patient: ReportPatient,
    psychologist: ReportPsychologist,
    results: ReportResult[],
  ) {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const x = doc.page.margins.left;
    const width = this.getPageContentWidth(doc);
    const topY = 54;
    const gap = 14;
    const summary = this.summarizeResults(results);
    const logoPath = this.configService.get<string>('CLINIC_LOGO_PATH');
    const hasLogo = Boolean(logoPath && existsSync(logoPath));

    const patientNameHeight = this.measureTextHeight(
      doc,
      patient.fullName,
      hasLogo ? width - 180 : width - 140,
      28,
      'Times-Bold',
    );
    const heroHeight = Math.max(214, 162 + patientNameHeight);
    const cardsY = topY + heroHeight + 18;
    const leftWidth = Math.floor(width * 0.58);
    const rightWidth = width - leftWidth - gap;
    const leftCardHeight = 304;
    const rightCardHeight = 304;

    doc.rect(0, 0, pageWidth, pageHeight).fill('#fffdfd');

    doc
      .save()
      .roundedRect(x, topY, width, heroHeight, 24)
      .fill(REPORT_COLORS.brandStrong)
      .restore();

    doc
      .save()
      .opacity(0.11)
      .fillColor('#ffffff')
      .circle(x + width - 38, topY + 34, 46)
      .fill()
      .restore();
    doc
      .save()
      .opacity(0.08)
      .fillColor('#ffffff')
      .circle(x + width - 112, topY + heroHeight - 22, 62)
      .fill()
      .restore();

    if (hasLogo && logoPath) {
      doc
        .save()
        .roundedRect(x + 20, topY + 20, 76, 76, 16)
        .fill('#fff6fa')
        .restore();
      doc.image(logoPath, x + 26, topY + 26, {
        fit: [64, 64],
        align: 'center',
      });
    }

    const textLeft = hasLogo ? x + 112 : x + 24;
    const textWidth = width - (textLeft - x) - 24;
    const coverDate = new Date().toLocaleDateString('es-CO');

    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor('#f8dce8')
      .text('INFORME PSICOTECNICO LABORAL', textLeft, topY + 20, {
        width: textWidth - 130,
      });

    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#f8dce8')
      .text(`Fecha de emision: ${coverDate}`, x + width - 150, topY + 20, {
        width: 126,
        align: 'right',
      });

    doc
      .fontSize(28)
      .font('Times-Bold')
      .fillColor('#ffffff')
      .text(patient.fullName, textLeft, topY + 44, {
        width: textWidth,
      });

    const subtitleY = doc.y + 6;
    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#fbeaf1')
      .text(
        'Reporte profesional de evaluacion psicotecnica laboral',
        textLeft,
        subtitleY,
        {
          width: textWidth,
        },
      );

    const psychBadgeText = `Psicologa tratante: ${psychologist.signatureName ?? psychologist.fullName}`;
    const psychBadgeWidth = Math.min(
      width - 48,
      Math.max(180, this.measureBadgeWidth(doc, psychBadgeText, 9.2) + 18),
    );
    this.drawBadge(
      doc,
      x + 24,
      topY + heroHeight - 46,
      psychBadgeText,
      '#b36b88',
      '#ffffff',
      {
        height: 22,
        fontSize: 9.2,
        borderColor: '#c187a1',
        width: psychBadgeWidth,
        align: 'left',
      },
    );

    let metaChipX = x + 24;
    const metaChipY = topY + heroHeight - 76;
    metaChipX += this.drawChip(
      doc,
      metaChipX,
      metaChipY,
      `Documento ${patient.documentId}`,
      '#bb7894',
      '#ffffff',
    );
    metaChipX += 8;
    metaChipX += this.drawChip(
      doc,
      metaChipX,
      metaChipY,
      `${calculateAge(new Date(patient.dateOfBirth))} anos`,
      '#a86481',
      '#ffffff',
    );
    metaChipX += 8;
    this.drawChip(
      doc,
      metaChipX,
      metaChipY,
      `Evaluacion ${this.formatDate(patient.evaluationDate)}`,
      '#a86481',
      '#ffffff',
    );

    this.renderCoverPatientCard(
      doc,
      x,
      cardsY,
      leftWidth,
      leftCardHeight,
      patient,
    );
    this.renderCoverExecutiveCard(
      doc,
      x + leftWidth + gap,
      cardsY,
      rightWidth,
      rightCardHeight,
      psychologist,
      summary,
    );
  }

  private renderCoverPatientCard(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    width: number,
    height: number,
    patient: ReportPatient,
  ) {
    doc
      .save()
      .roundedRect(x, y, width, height, 18)
      .fillAndStroke(REPORT_COLORS.surface, REPORT_COLORS.border)
      .restore();

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text('Ficha del paciente', x + 16, y + 16);

    const rows = [
      ['Fecha de nacimiento', `${this.formatDate(patient.dateOfBirth)}`],
      ['Edad', `${calculateAge(new Date(patient.dateOfBirth))} anos`],
      ['Telefono', patient.phone ?? 'No registrado'],
      ['Email', patient.email ?? 'No registrado'],
      ['Empresa', patient.company ?? 'No registrada'],
      ['Cargo', patient.position ?? 'No registrado'],
      ['Fecha de evaluacion', this.formatDate(patient.evaluationDate)],
    ] as const;

    const labelX = x + 16;
    const labelWidth = 108;
    const valueX = x + 132;
    const valueWidth = x + width - 16 - valueX;

    let rowY = y + 48;
    for (const [index, row] of rows.entries()) {
      if (index > 0) {
        doc
          .save()
          .moveTo(x + 16, rowY - 7)
          .lineTo(x + width - 16, rowY - 7)
          .lineWidth(1)
          .strokeColor('#f1e6ec')
          .stroke()
          .restore();
      }

      doc
        .fontSize(8.6)
        .font('Helvetica-Bold')
        .fillColor(REPORT_COLORS.muted)
        .text(row[0], labelX, rowY, { width: labelWidth });

      doc
        .fontSize(9.2)
        .font('Helvetica')
        .fillColor(REPORT_COLORS.ink)
        .text(row[1], valueX, rowY, { width: valueWidth });

      const labelHeight = this.measureTextHeight(
        doc,
        row[0],
        labelWidth,
        8.6,
        'Helvetica-Bold',
      );
      const valueHeight = this.measureTextHeight(
        doc,
        row[1],
        valueWidth,
        9.2,
        'Helvetica',
      );

      rowY += Math.max(22, labelHeight, valueHeight) + 8;
    }

    const footY = Math.min(
      y + height - 22,
      Math.max(y + height - 40, rowY + 4),
    );
    doc
      .fontSize(8.5)
      .font('Helvetica')
      .fillColor(REPORT_COLORS.muted)
      .text(
        'Uso confidencial para soporte de evaluacion ocupacional.',
        x + 16,
        footY,
        { width: width - 32 },
      );
  }

  private renderCoverExecutiveCard(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    width: number,
    height: number,
    psychologist: ReportPsychologist,
    summary: ReportResultsSummary,
  ) {
    doc
      .save()
      .roundedRect(x, y, width, height, 18)
      .fillAndStroke('#fffafd', REPORT_COLORS.border)
      .restore();

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text('Resumen ejecutivo', x + 16, y + 16);

    doc
      .save()
      .roundedRect(x + 16, y + 42, width - 32, 62, 14)
      .fill(REPORT_COLORS.brandSoft)
      .restore();

    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.brandStrong)
      .text('PRUEBAS REGISTRADAS', x + 28, y + 54);
    doc
      .fontSize(24)
      .font('Times-Bold')
      .fillColor(REPORT_COLORS.brandStrong)
      .text(String(summary.total), x + 28, y + 66);

    doc
      .fontSize(8.6)
      .font('Helvetica')
      .fillColor(REPORT_COLORS.muted)
      .text(
        summary.latestEvaluatedAt
          ? `Ultima aplicacion: ${this.formatDate(summary.latestEvaluatedAt)}`
          : 'Sin aplicaciones registradas',
        x + width - 146,
        y + 74,
        { width: 118, align: 'right' },
      );

    const dominantChip = this.getRecommendationChip(
      summary.dominantRecommendation,
    );
    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.muted)
      .text('Estado predominante', x + 16, y + 120);
    if (dominantChip) {
      this.drawBadge(
        doc,
        x + 16,
        y + 136,
        dominantChip.badgeLabel,
        dominantChip.background,
        dominantChip.text,
        {
          height: 22,
          fontSize: 8.8,
          borderColor: dominantChip.text,
        },
      );
    } else {
      this.drawBadge(
        doc,
        x + 16,
        y + 136,
        'SIN RECOMENDACION',
        '#f4eff2',
        REPORT_COLORS.muted,
        { height: 22, fontSize: 8.8, borderColor: '#e8dce2' },
      );
    }

    const countRows = [
      ['APTO', summary.counts.APTO, REPORT_COLORS.success],
      ['NO APTO', summary.counts.NO_APTO, REPORT_COLORS.danger],
      [
        'APTO CON OBS.',
        summary.counts.APTO_CON_OBSERVACIONES,
        REPORT_COLORS.warning,
      ],
    ] as const;

    let rowY = y + 172;
    for (const [label, value, color] of countRows) {
      doc
        .save()
        .circle(x + 20, rowY + 6, 3)
        .fill(color)
        .restore();
      doc
        .fontSize(8.6)
        .font('Helvetica-Bold')
        .fillColor(REPORT_COLORS.muted)
        .text(label, x + 28, rowY, { width: width - 74 });
      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor(REPORT_COLORS.ink)
        .text(String(value), x + width - 36, rowY, {
          width: 20,
          align: 'right',
        });
      rowY += 20;
    }

    doc
      .save()
      .moveTo(x + 16, y + height - 54)
      .lineTo(x + width - 16, y + height - 54)
      .lineWidth(1)
      .strokeColor('#efe2e9')
      .stroke()
      .restore();

    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.muted)
      .text('Profesional responsable', x + 16, y + height - 44);
    doc
      .fontSize(9.2)
      .font('Helvetica')
      .fillColor(REPORT_COLORS.ink)
      .text(
        psychologist.signatureName ?? psychologist.fullName,
        x + 16,
        y + height - 30,
        {
          width: width - 32,
        },
      );
  }

  private renderHeader(
    doc: PDFKit.PDFDocument,
    psychologist: ReportPsychologist,
  ) {
    const logoPath = this.configService.get<string>('CLINIC_LOGO_PATH');
    const hasLogo = Boolean(logoPath && existsSync(logoPath));
    const title = psychologist.signatureName ?? psychologist.fullName;
    const pageWidth = this.getPageContentWidth(doc);
    const x = doc.page.margins.left;
    const y = doc.y;
    const textLeft = hasLogo ? x + 106 : x + 20;
    const textWidth = x + pageWidth - textLeft - 18;
    const generationDate = new Date().toLocaleDateString('es-CO');
    const titleHeight = this.measureTextHeight(
      doc,
      title,
      textWidth,
      19,
      'Times-Bold',
    );
    const cardHeight = Math.max(112, 92 + titleHeight);

    doc
      .save()
      .roundedRect(x, y, pageWidth, cardHeight, 20)
      .fill(REPORT_COLORS.brandStrong);

    doc
      .opacity(0.12)
      .fillColor('#ffffff')
      .circle(x + pageWidth - 36, y + 26, 44)
      .fill();
    doc
      .opacity(0.08)
      .fillColor('#ffffff')
      .circle(x + pageWidth - 120, y + 96, 58)
      .fill();
    doc.opacity(1);
    doc.restore();

    if (hasLogo && logoPath) {
      doc
        .save()
        .roundedRect(x + 16, y + 18, 76, 76, 16)
        .fill('#fff6fa')
        .restore();
      doc.image(logoPath, x + 22, y + 24, { fit: [64, 64], align: 'center' });
    }

    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor('#f8dce8')
      .text('INFORME PSICOTECNICO LABORAL', textLeft, y + 16, {
        width: textWidth,
      });

    doc
      .fontSize(19)
      .font('Times-Bold')
      .fillColor('#ffffff')
      .text(title, textLeft, y + 34, {
        width: textWidth,
      });

    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#fbeaf1')
      .text(
        psychologist.licenseNumber
          ? `Profesional responsable · Registro ${psychologist.licenseNumber}`
          : 'Profesional responsable',
        textLeft,
        y + 76,
        { width: textWidth },
      );

    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#fbeaf1')
      .text(
        `Fecha de emision: ${generationDate}`,
        x + pageWidth - 150,
        y + 16,
        {
          width: 130,
          align: 'right',
        },
      );

    doc.y = y + cardHeight + 18;
  }

  private renderPatientSection(
    doc: PDFKit.PDFDocument,
    patient: ReportPatient,
    psychologist: ReportPsychologist,
  ) {
    this.renderSectionTitle(
      doc,
      'Paciente evaluado',
      'Ficha de identificacion y contexto de evaluacion',
    );
    this.renderPatientHeroCard(doc, patient);
    this.renderPatientDetailsCard(doc, patient, psychologist);
  }

  private renderPatientHeroCard(
    doc: PDFKit.PDFDocument,
    patient: ReportPatient,
  ) {
    this.ensurePageSpace(doc, 128);

    const x = doc.page.margins.left;
    const y = doc.y;
    const width = this.getPageContentWidth(doc);
    const nameHeight = this.measureTextHeight(
      doc,
      patient.fullName,
      width - 36,
      21,
      'Times-Bold',
    );
    const chipY = y + 46 + nameHeight;
    const height = Math.max(104, chipY - y + 30);

    doc
      .save()
      .roundedRect(x, y, width, height, 18)
      .fillAndStroke(REPORT_COLORS.surface, REPORT_COLORS.border)
      .restore();

    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.brandStrong)
      .text('PACIENTE', x + 18, y + 18);

    doc
      .fontSize(21)
      .font('Times-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text(patient.fullName, x + 18, y + 32, {
        width: width - 36,
      });

    let chipX = x + 18;
    chipX += this.drawChip(
      doc,
      chipX,
      chipY,
      `Doc ${patient.documentId}`,
      REPORT_COLORS.brandSoft,
      REPORT_COLORS.brandStrong,
    );
    chipX += 8;
    chipX += this.drawChip(
      doc,
      chipX,
      chipY,
      `${calculateAge(new Date(patient.dateOfBirth))} anos`,
      '#f2f0f6',
      REPORT_COLORS.muted,
    );
    chipX += 8;
    this.drawChip(
      doc,
      chipX,
      chipY,
      `Evaluacion ${this.formatDate(patient.evaluationDate)}`,
      '#f6f1f4',
      REPORT_COLORS.muted,
    );

    doc.y = y + height + 12;
  }

  private renderPatientDetailsCard(
    doc: PDFKit.PDFDocument,
    patient: ReportPatient,
    psychologist: ReportPsychologist,
  ) {
    const rows = [
      {
        label: 'Fecha de nacimiento',
        value: `${this.formatDate(patient.dateOfBirth)} (${calculateAge(new Date(patient.dateOfBirth))} anos)`,
      },
      { label: 'Telefono', value: patient.phone ?? 'No registrado' },
      { label: 'Email', value: patient.email ?? 'No registrado' },
      { label: 'Empresa', value: patient.company ?? 'No registrada' },
      { label: 'Cargo', value: patient.position ?? 'No registrado' },
      {
        label: 'Profesional tratante',
        value: psychologist.signatureName ?? psychologist.fullName,
      },
    ];

    const cardHeight = 24 + rows.length * 28;
    this.ensurePageSpace(doc, cardHeight + 8);

    const x = doc.page.margins.left;
    const y = doc.y;
    const width = this.getPageContentWidth(doc);

    doc
      .save()
      .roundedRect(x, y, width, cardHeight, 16)
      .fillAndStroke('#fffafd', REPORT_COLORS.border)
      .restore();

    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text('Datos de contacto y contexto', x + 16, y + 12);

    let rowY = y + 34;
    for (const [index, row] of rows.entries()) {
      if (index > 0) {
        doc
          .save()
          .moveTo(x + 16, rowY - 6)
          .lineTo(x + width - 16, rowY - 6)
          .lineWidth(1)
          .strokeColor('#f2e7ed')
          .stroke()
          .restore();
      }

      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor(REPORT_COLORS.muted)
        .text(row.label, x + 16, rowY, { width: 160 });

      doc
        .fontSize(9.5)
        .font('Helvetica')
        .fillColor(REPORT_COLORS.ink)
        .text(row.value, x + 178, rowY, {
          width: width - 194,
          align: 'left',
        });

      rowY += 28;
    }

    doc.y = y + cardHeight + 16;
  }

  private renderResultsSection(
    doc: PDFKit.PDFDocument,
    results: ReportResult[],
  ) {
    if (results.length > 0) {
      const firstResult = results[0];
      const firstTest =
        typeof firstResult.testId === 'object' && firstResult.testId
          ? firstResult.testId
          : null;
      const firstTestName =
        firstTest && 'name' in firstTest ? String(firstTest.name) : 'Prueba';
      const firstCardHeight = this.estimateResultCardHeight(
        doc,
        firstResult,
        firstTestName,
        this.getPageContentWidth(doc),
      );

      // Avoid orphan section title at the bottom of a page.
      this.ensurePageSpace(doc, 54 + firstCardHeight + 10);
    } else {
      this.ensurePageSpace(doc, 54 + 70);
    }

    this.renderSectionTitle(
      doc,
      'Resultados de pruebas',
      results.length > 0
        ? `${results.length} resultado(s) registrado(s)`
        : 'Sin resultados registrados',
    );

    if (results.length === 0) {
      this.ensurePageSpace(doc, 70);

      const x = doc.page.margins.left;
      const y = doc.y;
      const width = this.getPageContentWidth(doc);

      doc
        .save()
        .roundedRect(x, y, width, 56, 14)
        .fillAndStroke('#fff9fc', REPORT_COLORS.border)
        .restore();

      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor(REPORT_COLORS.muted)
        .text(
          'No hay resultados registrados para este paciente.',
          x + 16,
          y + 19,
          {
            width: width - 32,
          },
        );

      doc.y = y + 72;
      return;
    }

    for (const result of results) {
      this.renderSingleResult(doc, result);
    }
  }

  private renderSingleResult(doc: PDFKit.PDFDocument, result: ReportResult) {
    const test =
      typeof result.testId === 'object' && result.testId ? result.testId : null;

    const testName = test && 'name' in test ? String(test.name) : 'Prueba';
    const category =
      test && 'category' in test ? String(test.category) : 'General';

    const x = doc.page.margins.left;
    const width = this.getPageContentWidth(doc);
    const padding = 16;
    const innerWidth = width - padding * 2;
    const cardHeight = this.estimateResultCardHeight(
      doc,
      result,
      testName,
      width,
    );
    const recommendationChip = this.getRecommendationChip(
      result.recommendation,
    );

    this.ensurePageSpace(doc, cardHeight + 10);

    const cardY = doc.y;

    doc
      .save()
      .roundedRect(x, cardY, width, cardHeight, 16)
      .fillAndStroke(REPORT_COLORS.surface, REPORT_COLORS.border)
      .restore();

    doc
      .save()
      .roundedRect(x + 1, cardY + 10, 5, Math.max(24, cardHeight - 20), 3)
      .fill(recommendationChip?.text ?? REPORT_COLORS.brand)
      .restore();

    let cursorY = cardY + 14;

    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text(testName, x + padding, cursorY, { width: innerWidth });
    cursorY = doc.y + 4;

    let chipX = x + padding;
    chipX += this.drawChip(
      doc,
      chipX,
      cursorY,
      category,
      REPORT_COLORS.brandSoft,
      REPORT_COLORS.brandStrong,
    );
    chipX += 8;
    chipX += this.drawChip(
      doc,
      chipX,
      cursorY,
      `Puntaje ${result.totalScore}`,
      '#f6eff3',
      REPORT_COLORS.ink,
    );
    chipX += 8;

    if (recommendationChip) {
      chipX += this.drawBadge(
        doc,
        chipX,
        cursorY,
        recommendationChip.badgeLabel,
        recommendationChip.background,
        recommendationChip.text,
        {
          height: 20,
          fontSize: 8.6,
          borderColor: recommendationChip.text,
        },
      );
      chipX += 8;
    }

    this.drawChip(
      doc,
      chipX,
      cursorY,
      this.formatDate(result.evaluatedAt),
      '#f5f5f7',
      REPORT_COLORS.muted,
    );

    cursorY += 30;

    cursorY = this.renderLabeledParagraph(
      doc,
      x + padding,
      cursorY,
      innerWidth,
      'Interpretacion',
      result.interpretationLabel,
    );

    cursorY = this.renderLabeledParagraph(
      doc,
      x + padding,
      cursorY,
      innerWidth,
      'Detalle',
      result.interpretationDescription,
    );

    cursorY = this.renderLabeledParagraph(
      doc,
      x + padding,
      cursorY,
      innerWidth,
      'Observaciones',
      result.observations?.trim() || 'Sin observaciones registradas.',
    );

    this.renderLabeledParagraph(
      doc,
      x + padding,
      cursorY,
      innerWidth,
      'Conclusion',
      result.finalConclusion?.trim() || 'Sin conclusion registrada.',
      true,
    );

    doc.y = cardY + cardHeight + 12;
  }

  private renderSignatureSection(
    doc: PDFKit.PDFDocument,
    psychologist: ReportPsychologist,
  ) {
    this.ensurePageSpace(doc, 148);

    const x = doc.page.margins.left;
    const y = doc.y;
    const width = this.getPageContentWidth(doc);
    const height = 132;

    doc
      .save()
      .roundedRect(x, y, width, height, 16)
      .fillAndStroke('#fffafd', REPORT_COLORS.border)
      .restore();

    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.brandStrong)
      .text('Profesional responsable', x + 16, y + 14);

    doc
      .fontSize(16)
      .font('Times-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text(
        psychologist.signatureName ?? psychologist.fullName,
        x + 16,
        y + 32,
        {
          width: width - 32,
        },
      );

    if (psychologist.licenseNumber) {
      doc
        .fontSize(9.5)
        .font('Helvetica')
        .fillColor(REPORT_COLORS.muted)
        .text(
          `Registro profesional: ${psychologist.licenseNumber}`,
          x + 16,
          y + 56,
          {
            width: width - 32,
          },
        );
    }

    doc
      .save()
      .moveTo(x + 16, y + 92)
      .lineTo(x + 240, y + 92)
      .lineWidth(1)
      .strokeColor('#caa7b7')
      .stroke()
      .restore();

    doc
      .fontSize(8.5)
      .font('Helvetica')
      .fillColor(REPORT_COLORS.muted)
      .text('Firma', x + 16, y + 96);

    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor(REPORT_COLORS.muted)
      .text(
        `Emitido el ${new Date().toLocaleDateString('es-CO')}`,
        x + width - 150,
        y + 96,
        {
          width: 134,
          align: 'right',
        },
      );

    doc.y = y + height + 4;
  }

  private renderSectionTitle(
    doc: PDFKit.PDFDocument,
    title: string,
    subtitle?: string,
  ) {
    this.ensurePageSpace(doc, 54);

    const x = doc.page.margins.left;
    const y = doc.y;
    const width = this.getPageContentWidth(doc);

    doc
      .save()
      .roundedRect(x, y + 4, 6, 24, 3)
      .fill(REPORT_COLORS.brand)
      .restore();

    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.ink)
      .text(title, x + 14, y, { width: width - 14 });

    if (subtitle) {
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor(REPORT_COLORS.muted)
        .text(subtitle, x + 14, y + 16, { width: width - 14 });
      doc.y = y + 36;
      return;
    }

    doc.y = y + 22;
  }

  private renderPageChrome() {
    // Intentionally empty: removed top decorative line for cleaner pages.
  }

  private renderPageFooters(doc: PDFKit.PDFDocument) {
    const range = doc.bufferedPageRange();

    for (let index = 0; index < range.count; index += 1) {
      doc.switchToPage(range.start + index);

      const pageNumber = index + 1;
      const totalPages = range.count;
      const x = doc.page.margins.left;
      const width = this.getPageContentWidth(doc);
      const footerY = doc.page.height - doc.page.margins.bottom - 10;
      const isCover = pageNumber === 1;
      const lineColor = isCover ? '#e4ccd8' : '#ecdfe6';

      doc
        .save()
        .moveTo(x, footerY - 8)
        .lineTo(x + width, footerY - 8)
        .lineWidth(1)
        .strokeColor(lineColor)
        .stroke()
        .restore();

      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor(REPORT_COLORS.muted)
        .text(
          'Confidencial · Uso interno para informe psicotecnico laboral',
          x,
          footerY,
          { width: width - 110, lineBreak: false },
        );

      doc
        .fontSize(8)
        .font('Helvetica-Bold')
        .fillColor(REPORT_COLORS.muted)
        .text(
          `Pagina ${pageNumber} de ${totalPages}`,
          x + width - 98,
          footerY,
          {
            width: 98,
            align: 'right',
            lineBreak: false,
          },
        );
    }

    if (range.count > 0) {
      doc.switchToPage(range.start + range.count - 1);
    }
  }

  private drawChip(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    text: string,
    backgroundColor: string,
    textColor: string,
  ) {
    doc.font('Helvetica-Bold').fontSize(8.5);
    const textWidth = doc.widthOfString(text);
    const chipWidth = Math.max(36, textWidth + 16);

    doc
      .save()
      .roundedRect(x, y, chipWidth, 18, 9)
      .fill(backgroundColor)
      .restore();

    doc
      .fontSize(8.5)
      .font('Helvetica')
      .fillColor(textColor)
      .text(text, x + 8, y + 5, { width: chipWidth - 16, align: 'center' });

    return chipWidth;
  }

  private drawBadge(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    text: string,
    backgroundColor: string,
    textColor: string,
    options?: {
      height?: number;
      fontSize?: number;
      borderColor?: string;
      width?: number;
      align?: 'center' | 'left' | 'right';
    },
  ) {
    const fontSize = options?.fontSize ?? 8.8;
    const height = options?.height ?? 20;
    const align = options?.align ?? 'center';
    const horizontalInsets = align === 'left' ? 20 : 16;
    const width =
      options?.width ??
      Math.max(
        40,
        this.measureBadgeWidth(doc, text, fontSize) + horizontalInsets,
      );

    doc
      .save()
      .roundedRect(x, y, width, height, Math.round(height / 2))
      .fillAndStroke(backgroundColor, options?.borderColor ?? backgroundColor)
      .restore();

    const textX = align === 'left' ? x + 10 : x + 8;

    doc
      .fontSize(fontSize)
      .font('Helvetica-Bold')
      .fillColor(textColor)
      .text(text, textX, y + (height <= 20 ? 5 : 6), {
        width: width - (align === 'left' ? 20 : 16),
        align,
      });

    return width;
  }

  private measureBadgeWidth(
    doc: PDFKit.PDFDocument,
    text: string,
    fontSize: number,
  ) {
    doc.font('Helvetica-Bold').fontSize(fontSize);
    return doc.widthOfString(text);
  }

  private renderLabeledParagraph(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    width: number,
    label: string,
    value: string,
    isLast = false,
  ) {
    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor(REPORT_COLORS.muted)
      .text(label.toUpperCase(), x, y, { width });

    const textY = y + 12;
    doc
      .fontSize(9.5)
      .font('Helvetica')
      .fillColor(REPORT_COLORS.ink)
      .text(value, x, textY, { width, align: 'left' });

    let nextY = doc.y + 8;
    if (!isLast) {
      doc
        .save()
        .moveTo(x, nextY - 3)
        .lineTo(x + width, nextY - 3)
        .lineWidth(1)
        .strokeColor('#f2e8ee')
        .stroke()
        .restore();
      nextY += 4;
    }

    return nextY;
  }

  private estimateResultCardHeight(
    doc: PDFKit.PDFDocument,
    result: ReportResult,
    testName: string,
    width: number,
  ) {
    const padding = 16;
    const contentWidth = width - padding * 2;
    let height = 14;

    height += this.measureTextHeight(
      doc,
      testName,
      contentWidth,
      12,
      'Helvetica-Bold',
    );
    height += 34;

    const blocks = [
      { label: 'Interpretacion', value: result.interpretationLabel },
      { label: 'Detalle', value: result.interpretationDescription },
      {
        label: 'Observaciones',
        value: result.observations?.trim() || 'Sin observaciones registradas.',
      },
      {
        label: 'Conclusion',
        value: result.finalConclusion?.trim() || 'Sin conclusion registrada.',
      },
    ];

    for (const block of blocks) {
      height += 12;
      height += this.measureTextHeight(
        doc,
        block.value,
        contentWidth,
        9.5,
        'Helvetica',
      );
      height += 12;
    }

    return Math.max(156, height + 8);
  }

  private measureTextHeight(
    doc: PDFKit.PDFDocument,
    text: string,
    width: number,
    fontSize: number,
    font: string,
  ) {
    doc.font(font).fontSize(fontSize);
    return doc.heightOfString(text, { width, align: 'left' });
  }

  private getRecommendationChip(recommendation?: string) {
    if (!recommendation) {
      return null;
    }

    if (recommendation === 'APTO') {
      return {
        label: 'Apto',
        badgeLabel: 'APTO',
        background: REPORT_COLORS.successSoft,
        text: REPORT_COLORS.success,
      };
    }

    if (recommendation === 'NO_APTO') {
      return {
        label: 'No apto',
        badgeLabel: 'NO APTO',
        background: REPORT_COLORS.dangerSoft,
        text: REPORT_COLORS.danger,
      };
    }

    return {
      label: 'Apto con observaciones',
      badgeLabel: 'APTO CON OBS.',
      background: REPORT_COLORS.warningSoft,
      text: REPORT_COLORS.warning,
    };
  }

  private summarizeResults(results: ReportResult[]): ReportResultsSummary {
    const summary: ReportResultsSummary = {
      total: results.length,
      counts: {
        APTO: 0,
        NO_APTO: 0,
        APTO_CON_OBSERVACIONES: 0,
        OTHER: 0,
      },
    };

    let latestTimestamp = 0;

    for (const result of results) {
      const resultDate = new Date(result.evaluatedAt).getTime();
      if (Number.isFinite(resultDate) && resultDate > latestTimestamp) {
        latestTimestamp = resultDate;
        summary.latestEvaluatedAt = new Date(result.evaluatedAt);
      }

      if (result.recommendation === 'APTO') {
        summary.counts.APTO += 1;
        continue;
      }

      if (result.recommendation === 'NO_APTO') {
        summary.counts.NO_APTO += 1;
        continue;
      }

      if (result.recommendation === 'APTO_CON_OBSERVACIONES') {
        summary.counts.APTO_CON_OBSERVACIONES += 1;
        continue;
      }

      summary.counts.OTHER += 1;
    }

    const orderedRecommendations = [
      ['APTO_CON_OBSERVACIONES', summary.counts.APTO_CON_OBSERVACIONES],
      ['APTO', summary.counts.APTO],
      ['NO_APTO', summary.counts.NO_APTO],
    ] as const;

    let dominantCount = 0;
    for (const [recommendation, count] of orderedRecommendations) {
      if (count > dominantCount) {
        dominantCount = count;
        summary.dominantRecommendation = recommendation;
      }
    }

    return summary;
  }

  private formatDate(date: Date) {
    return new Date(date).toLocaleDateString('es-CO');
  }

  private getPageContentWidth(doc: PDFKit.PDFDocument) {
    return doc.page.width - doc.page.margins.left - doc.page.margins.right;
  }

  private ensurePageSpace(doc: PDFKit.PDFDocument, requiredHeight: number) {
    const remaining = doc.page.height - doc.page.margins.bottom - doc.y;

    if (remaining < requiredHeight) {
      doc.addPage();
    }
  }
}
