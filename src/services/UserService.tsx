import { User } from '../types/User';
import createAPI from '../config/api';

const UserService = {

  getUser: async (userID: number): Promise<User> => {
    const api = await createAPI();
    const { data } = await api.get<User>(`/users/${userID}`);
    return data;
  }
  };

export default UserService;