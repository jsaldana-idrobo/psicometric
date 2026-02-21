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
      margin: 42,
    });
    doc.pipe(writable);

    this.renderHeader(doc);
    this.renderPatientSection(doc, patient);
    this.renderResultsSection(doc, results);
    this.renderSignatureSection(doc, psychologist);

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

  private renderHeader(doc: PDFKit.PDFDocument) {
    const clinicName =
      this.configService.get<string>('CLINIC_NAME') ??
      'Psicometric Consultorio';
    const logoPath = this.configService.get<string>('CLINIC_LOGO_PATH');

    if (logoPath && existsSync(logoPath)) {
      doc.image(logoPath, 42, 36, { fit: [80, 50] });
    }

    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text(clinicName, 0, 42, { align: 'right' });
    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#4b5563')
      .text('Informe Psicotécnico Laboral', { align: 'right' })
      .moveDown(2);
  }

  private renderPatientSection(
    doc: PDFKit.PDFDocument,
    patient: ReportPatient,
  ) {
    doc
      .fillColor('#111827')
      .fontSize(13)
      .font('Helvetica-Bold')
      .text('Datos del paciente')
      .moveDown(0.5);

    const patientFields = [
      `Nombre: ${patient.fullName}`,
      `Documento: ${patient.documentId}`,
      `Fecha de nacimiento: ${new Date(patient.dateOfBirth).toLocaleDateString('es-CO')}`,
      `Edad: ${calculateAge(new Date(patient.dateOfBirth))} años`,
      `Teléfono: ${patient.phone ?? 'N/A'}`,
      `Email: ${patient.email ?? 'N/A'}`,
      `Empresa: ${patient.company ?? 'N/A'}`,
      `Cargo: ${patient.position ?? 'N/A'}`,
      `Fecha de evaluación: ${new Date(patient.evaluationDate).toLocaleDateString('es-CO')}`,
    ];

    doc.fontSize(10).font('Helvetica').fillColor('#1f2937');

    for (const field of patientFields) {
      doc.text(field);
    }

    doc.moveDown(1.5);
  }

  private renderResultsSection(
    doc: PDFKit.PDFDocument,
    results: ReportResult[],
  ) {
    doc
      .fontSize(13)
      .font('Helvetica-Bold')
      .text('Resultados de pruebas')
      .moveDown(0.5);

    if (results.length === 0) {
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#374151')
        .text('No hay resultados registrados para este paciente.')
        .moveDown(1);
      return;
    }

    for (const result of results) {
      this.ensurePageSpace(doc, 700);
      this.renderSingleResult(doc, result);
    }
  }

  private renderSingleResult(doc: PDFKit.PDFDocument, result: ReportResult) {
    const test =
      typeof result.testId === 'object' && result.testId ? result.testId : null;

    const testName = test && 'name' in test ? String(test.name) : 'Prueba';
    const category =
      test && 'category' in test ? String(test.category) : 'General';

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .fillColor('#111827')
      .text(`${testName} (${category})`);

    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#374151')
      .text(`Puntaje: ${result.totalScore}`)
      .text(`Interpretación: ${result.interpretationLabel}`)
      .text(`Detalle: ${result.interpretationDescription}`)
      .text(`Observaciones: ${result.observations ?? 'N/A'}`)
      .text(`Conclusión: ${result.finalConclusion ?? 'N/A'}`)
      .text(`Recomendación: ${result.recommendation ?? 'N/A'}`)
      .text(
        `Fecha: ${new Date(result.evaluatedAt).toLocaleDateString('es-CO')}`,
      )
      .moveDown(1);
  }

  private renderSignatureSection(
    doc: PDFKit.PDFDocument,
    psychologist: ReportPsychologist,
  ) {
    this.ensurePageSpace(doc, 650);

    doc
      .moveDown(1)
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#111827')
      .text('Firma del psicólogo')
      .moveDown(1);

    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#1f2937')
      .text(psychologist.signatureName ?? psychologist.fullName)
      .text(
        psychologist.licenseNumber
          ? `Registro profesional: ${psychologist.licenseNumber}`
          : '',
      )
      .moveDown(0.2)
      .text('______________________________');
  }

  private ensurePageSpace(doc: PDFKit.PDFDocument, threshold: number) {
    if (doc.y > threshold) {
      doc.addPage();
    }
  }
}
