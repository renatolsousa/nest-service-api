import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
