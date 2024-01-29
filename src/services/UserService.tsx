import { User } from '../types/User';
import createAPI from '../config/api';

const UserService = {

  getUserById: async (userID: number): Promise<User> => {
    const api = await createAPI();
    const { data } = await api.get<User>(`/user/${userID}`);
    return data;
  },

  getUser: async () => {
    const api = await createAPI();
    const data = await api.get(`/user`);
    return data["data"];
  },

  deleteUser: async (id: number) => {
    const api = await createAPI();
    const data = await api.delete(`/user/${id}`);
    console.log(data);
    return data["data"];
  },

  updateUserById: async (id: number, User: User) => {
    const api = await createAPI();
    const data = await api.put(`/user/${id}`, User);
    return data["data"];
  },

  addUser: async (User: User) => {
    const api = await createAPI();
    const data = await api.post(`/user/register`, User);
    return data["data"];
  }
  };

export default UserService;