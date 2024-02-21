import { Users } from './../../common/entities/template-nest/users.entity';
import { UsersService } from './../../business/services/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../rest-api/users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'USERS_REPOSITORY',
          useValue: Users,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
