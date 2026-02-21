export interface EnvVars {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  WEB_ORIGIN: string;
  NODE_ENV: string;
  CLINIC_NAME: string;
  CLINIC_LOGO_PATH?: string;
}

function readRequiredString(
  config: Record<string, unknown>,
  key: string,
): string {
  const value = config[key];

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

function readOptionalString(
  config: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = config[key];

  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new Error(`Environment variable ${key} must be a string`);
  }

  return value;
}

function readNumber(
  config: Record<string, unknown>,
  key: string,
  defaultValue: number,
): number {
  const value = config[key];

  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }

  return parsed;
}

export function validateEnv(config: Record<string, unknown>): EnvVars {
  return {
    PORT: readNumber(config, 'PORT', 4000),
    MONGODB_URI: readRequiredString(config, 'MONGODB_URI'),
    JWT_SECRET: readRequiredString(config, 'JWT_SECRET'),
    JWT_EXPIRES_IN: readNumber(config, 'JWT_EXPIRES_IN', 28800),
    WEB_ORIGIN: readRequiredString(config, 'WEB_ORIGIN'),
    NODE_ENV: readOptionalString(config, 'NODE_ENV') ?? 'development',
    CLINIC_NAME:
      readOptionalString(config, 'CLINIC_NAME') ?? 'Psicometric Consultorio',
    CLINIC_LOGO_PATH: readOptionalString(config, 'CLINIC_LOGO_PATH'),
  };
}
