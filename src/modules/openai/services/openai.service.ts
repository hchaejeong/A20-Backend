import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class OpenaiService {
    private readonly openai: OpenAI

    constructor(private readonly configService: ConfigService) {
        const openaiApiKey = this.configService.get('OPENAI_API_KEY')
        if (!openaiApiKey) {
            throw new Error('OPENAI_API_KEY not configured')
        }

        this.openai = new OpenAI({
            apiKey: openaiApiKey
        })
    }

    async chatCompletion(args: { prompt: string }) {
        const { prompt } = args
        try {
            const answer = await this.openai.chat.completions.create({ 
                messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }], model: 'gpt-3.5-turbo' })
            return answer.choices[0]
        } catch (error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
    }
}