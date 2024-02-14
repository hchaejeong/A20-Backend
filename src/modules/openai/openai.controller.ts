import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './services/openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private openaiService: OpenaiService) {}

    @Post('ask')
    public async completeConversation(@Body() body: { prompt: string }) {
        const { prompt } = body;

        return await this.openaiService.chatCompletion({prompt})
    }
}
