import { IUserData } from '../../../data/types';

const base: IUserData = {
  _id: '1',
  firstName: `Johnny`,
  lastName: `Test`,
  email: 'johnny@localhost.com',
  avatar:
    'https://avatars.dicebear.com/v2/female/f5830d7d292fa08c84038a119ca74919.svg',
  password: 'Johnny1',
  gender: 'M',
  dateCreated: '2022-06-14',
  hashtags: ['science', 'travel', 'winter'],
  notes:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!',
};

export const mockUserCardProps = {
  base,
};
