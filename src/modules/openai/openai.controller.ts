import { Controller } from '@nestjs/common';
import { OpenaiService } from './services/openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private openaiService: OpenaiService) {}

    public async completeConversation(args: { prompt: string }) {
        const { prompt } = args;

        return await this.openaiService.chatCompletion({prompt})
    }
}
