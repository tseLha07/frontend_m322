import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';

const createAPI = async (): Promise<AxiosInstance> => {
    const token = await SecureStore.getItemAsync('token');
    const instance = axios.create({
        baseURL: 'http://noseryoung.ddns.net:3030',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return instance;
};

export default createAPI;
