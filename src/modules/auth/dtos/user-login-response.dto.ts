import { UserEntity } from "src/modules/user/entities/user.entity";

export class UserLoginResponseDto {
  user: UserEntity;

  token: string;
}
