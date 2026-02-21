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

export function validateEnv(config: Record<string, unknown>): EnvVars {
  const requiredStringKeys = ['MONGODB_URI', 'JWT_SECRET', 'WEB_ORIGIN'];

  for (const key of requiredStringKeys) {
    if (!config[key] || typeof config[key] !== 'string') {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    PORT: Number(config.PORT ?? 4000),
    MONGODB_URI: String(config.MONGODB_URI),
    JWT_SECRET: String(config.JWT_SECRET),
    JWT_EXPIRES_IN: Number(config.JWT_EXPIRES_IN ?? 28800),
    WEB_ORIGIN: String(config.WEB_ORIGIN),
    NODE_ENV: String(config.NODE_ENV ?? 'development'),
    CLINIC_NAME: String(config.CLINIC_NAME ?? 'Psicometric Consultorio'),
    CLINIC_LOGO_PATH: config.CLINIC_LOGO_PATH
      ? String(config.CLINIC_LOGO_PATH)
      : undefined,
  };
}
