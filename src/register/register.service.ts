import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register, RegisterDocument } from './entities/register.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name)
    private registerRepository: Model<RegisterDocument>,
  ) {}

  async create(createRegisterDto: CreateRegisterDto): Promise<any> {
    const register = new this.registerRepository(createRegisterDto);
    return register.save();
  }

  async findAll(): Promise<Register[]> {
    return this.registerRepository.find().exec();
  }

  async findOne(id: string) {
    return this.registerRepository.findById(id);
  }

  async update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  async remove(id: number) {
    return this.registerRepository.deleteOne({ id: id });
  }
}
