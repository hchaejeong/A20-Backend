import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async register(args: { email: string, password: string, name: string }): Promise<{
        user: UserEntity,
        token: string
    }> {
        const { email, password, name } = args;

        const salt = await bcrypt.genSalt();
        //비밀번호를 해쉬로 저장
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.userRepository.save(
            this.userRepository.create({
                email,
                password,
                name
            })
        )

        if (!user) {
            throw new UnprocessableEntityException();
        }

        const jwtPayload = {
            email: user.email,
          };
      
        const jwtToken = await this.jwtService.signAsync(jwtPayload);
        
        return {
            user,
            token: jwtToken,
        };
    }

    async validateLogin(args: { email: string, password: string }): Promise<{
        user: UserEntity,
        token: string
    }> {
        const { email, password } = args;

        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        })

        if (!user) {
            throw new UnprocessableEntityException;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        //비밀번호 일치하지 않을경우
        if (!isValidPassword) {
            throw new UnprocessableEntityException;
        }

        const jwtPayload = {
            email: user.email,
          };
      
        const jwtToken = await this.jwtService.signAsync(jwtPayload);

        return {
            user, token: jwtToken
        }
    }
}
