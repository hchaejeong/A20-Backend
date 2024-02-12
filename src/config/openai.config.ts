import { registerAs } from '@nestjs/config';
import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface OpenaiEnvironmentVariables {
  OPENAI_API_KEY: string;
}

class OpenaiEnvironmentVariablesValidator implements OpenaiEnvironmentVariables {
  @IsString()
  OPENAI_API_KEY: string;
}

export const registerOpenaiConfig = registerAs<OpenaiEnvironmentVariables>('openai', () => {
  const validateConfig = plainToInstance(OpenaiEnvironmentVariablesValidator, process.env, {
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
