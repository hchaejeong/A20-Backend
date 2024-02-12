import { ConfigFactory } from "@nestjs/config";
import { AuthEnvironmentVariables, registerAuthConfig } from "./auth.config";
import { OpenaiEnvironmentVariables, registerOpenaiConfig } from "./openai.config";

export type EnvironmentVariables = AuthEnvironmentVariables & OpenaiEnvironmentVariables

export const loadConfigModule: Array<ConfigFactory> = [
    registerAuthConfig,
    registerOpenaiConfig
]