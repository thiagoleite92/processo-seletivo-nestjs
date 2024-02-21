import { Users } from '../entities';

export const UsersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
