import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async enterCarInfo(args: { id: string, carType: string, carNumber: string }): Promise<string> {
        const { id, carType, carNumber } = args;

        const user = await this.userRepository.update(id, {
            carType,
            carNumber,
        })

        return 'car info has been saved'
    }
}
