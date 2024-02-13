import { ConfigFactory } from "@nestjs/config";
import { AuthEnvironmentVariables, registerAuthConfig } from "./auth.config";
import { OpenaiEnvironmentVariables, registerOpenaiConfig } from "./openai.config";
import { DatebaseEnvironmentVariables, registerDatebaseConfig } from "./database.config";

export type EnvironmentVariables = DatebaseEnvironmentVariables & AuthEnvironmentVariables & OpenaiEnvironmentVariables

export const loadConfigModule: Array<ConfigFactory> = [
    registerAuthConfig,
    registerOpenaiConfig,
    registerDatebaseConfig
]