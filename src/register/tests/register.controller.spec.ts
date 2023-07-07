import { Test, TestingModule } from '@nestjs/testing';
import { CreateRegisterDto } from '../dto/create-register.dto';
import { Register } from '../register.entity';
import { RegisterController } from '../register.controller';
import { RegisterService } from '../register.service';
import { ThrottlerModule } from '@nestjs/throttler';

const registerEntityList: Register[] = [
  new Register({
    name: 'Developer 01',
    email: 'developer@email.com',
    active: true,
  }),
];

const newRegisterEntity = new Register({
  name: 'Developer 01',
  email: 'developer@email.com',
  active: true,
});

const updateRegisterEntity = new Register({
  name: 'Developer 01',
  email: 'developer@email.com',
  active: false,
});

describe('RegisterController', () => {
  let registerController: RegisterController;
  let registerService: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          ttl: 60,
          limit: 10,
        }),
      ],
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            create: jest.fn().mockResolvedValue(newRegisterEntity),
            findAll: jest.fn().mockResolvedValue(registerEntityList),
            findOne: jest.fn().mockResolvedValue(registerEntityList[0]),
            update: jest.fn().mockResolvedValue(updateRegisterEntity),
            remove: jest.fn().mockResolvedValue(true),
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
        name: 'Developer 01',
        email: 'developer@email.com',
        active: true,
      };

      jest.spyOn(registerService, 'create').mockRejectedValueOnce(new Error());
      //Assert
      expect(registerController.create(payload)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should get a register item successfully', async () => {
      //Act
      const result = await registerController.findOne('98s7df654sdf65');
      //Assert
      expect(result).toEqual(registerEntityList[0]);
      expect(registerService.findOne).toHaveBeenCalledTimes(1);
      expect(registerService.findOne).toHaveBeenCalledWith('98s7df654sdf65');
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(registerService, 'findOne').mockRejectedValueOnce(new Error());
      //Assert
      expect(
        registerController.findOne('98s7df654sdf65'),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a register item successfully', async () => {
      //Arrange
      const body: CreateRegisterDto = {
        name: 'Developer 01',
        email: 'developer@email.com',
        active: true,
      };
      //Act
      const result = await registerController.update('98s7df654sdf65', body);
      //Assert
      expect(result).toEqual(updateRegisterEntity);
      expect(registerService.update).toHaveBeenCalledTimes(1);
      expect(registerService.update).toHaveBeenCalledWith(
        '98s7df654sdf65',
        body,
      );
    });

    it('should throw an exception', () => {
      //Arrange
      const body: CreateRegisterDto = {
        name: 'Developer 01',
        email: 'developer@email.com',
        active: true,
      };
      jest.spyOn(registerService, 'update').mockRejectedValueOnce(new Error());
      //Assert
      expect(
        registerController.update('98s7df654sdf65', body),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a register item successfully', async () => {
      //Act
      const result = registerController.remove('98s7df654sdf65');
      expect(result).toBeTruthy();
      expect(registerService.remove).toHaveBeenCalledWith('98s7df654sdf65');
    });
    it('should throw an exception', () => {
      jest.spyOn(registerService, 'remove').mockRejectedValueOnce(new Error());
    });
  });
});
