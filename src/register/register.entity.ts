import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RegisterDocument = Register & mongoose.Document;

@Schema({ timestamps: true })
export class Register {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true, default: true })
  active: boolean;

  constructor(register?: Partial<Register>) {
    this.name = register?.name;
    this.email = register?.email;
    this.active = register?.active;
  }
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
