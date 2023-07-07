import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from './register.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
