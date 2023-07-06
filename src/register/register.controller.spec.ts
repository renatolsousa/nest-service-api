import { Test, TestingModule } from '@nestjs/testing';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from './entities/register.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

const registerEntityList: Register[] = [
  new Register({
    id: '98s7df654sdf65',
    name: 'Developer 01',
    email: 'developer@email.com',
    active: true,
  }),
];

const newRegisterEntity = new Register({
  id: '98s7df654sdf65',
  name: 'Developer 01',
  email: 'developer@email.com',
  active: true,
});

describe('RegisterController', () => {
  let registerController: RegisterController;
  let registerService: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            create: jest.fn().mockResolvedValue(newRegisterEntity),
            findAll: jest.fn().mockResolvedValue(registerEntityList),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    registerController = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(registerController).toBeDefined();
    expect(registerService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a register list entity sucessfully', async () => {
      //Act
      const result = await registerController.findAll();
      //Assert
      expect(result).toEqual(registerEntityList);
      expect(typeof result).toEqual('object');
      expect(registerService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(registerService, 'findAll').mockRejectedValueOnce(new Error());
      //Assert
      expect(registerController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new register item successfully', async () => {
      //Arrange
      const payload: CreateRegisterDto = {
        id: '98s7df654sdf65',
        name: 'Developer 01',
        email: 'developer@email.com',
        active: true,
      };
      //Act
      const result = await registerController.create(payload);
      //Assert
      expect(result).toEqual(newRegisterEntity);
      expect(registerService.create).toHaveBeenCalledTimes(1);
      expect(registerService.create).toHaveBeenCalledWith(payload);
    });

    it('should throw an exception', () => {
      //Arrange
      const payload: CreateRegisterDto = {
        id: '98s7df654sdf65',
        name: 'Developer 01',
        email: 'developer@email.com',
        active: true,
      };

      jest.spyOn(registerService, 'create').mockRejectedValueOnce(new Error());
      //Assert
      expect(registerController.create(payload)).rejects.toThrowError();
    });
  });
});
