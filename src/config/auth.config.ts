import { registerAs } from '@nestjs/config';
import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface AuthEnvironmentVariables {
  AUTH_JWT_SECRET: string;
}

class AuthEnvironmentVariablesValidator implements AuthEnvironmentVariables {
  @IsString()
  AUTH_JWT_SECRET: string;
}

export const registerAuthConfig = registerAs<AuthEnvironmentVariables>('auth', () => {
  const validateConfig = plainToInstance(AuthEnvironmentVariablesValidator, process.env, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
});
