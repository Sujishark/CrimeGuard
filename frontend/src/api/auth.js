import axios from 'axios';
import { store } from '../store';
import { hydrateUserData, saveUserAndAuthData, saveUserData } from '../redux/userSlice';
import { apiV1 } from './config';


const state = store.getState();
const apiClient = apiV1()
export const registerUser = async (body) => {
    try {
        const response = await apiClient.post('/auth/register', body);
        console.log(response)
        if (response.status == 201) store.dispatch(saveUserAndAuthData(response.data));

    } catch (error) {
        console.log(error)
    }
};



export const loginUser = async (body) => {
    try {
        const response = await apiClient.post('/auth/login', body);
        console.log(response)
        if (response.status >= 200) store.dispatch(saveUserAndAuthData(response.data));

    } catch (error) {
        console.log(error)
    }
};

export const fetchUser = async (userId) => {
    try {
        const response = await apiClient.get(`/user/${userId}`);
        console.log(response)

        if (response.status >= 200) {
            const data = localStorage.getItem("_u")

            let res = { user: response.data, tokens: { access: { token: data?.token } } }
            store.dispatch(hydrateUserData(res));
        }

    } catch (error) {
        console.log(error)
    }
};
export const updateUser = async (userId, body) => {
    try {
        const response = await apiClient.put(`/user/${userId}`, body);
        console.log(response)
        if (response.status >= 200) {
            store.dispatch(saveUserData(response.data));
            return true
        }

    } catch (error) {
        console.log(error)
        return false
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/user/${userId}`,);
        console.log(response)
        if (response.status >= 200) return true

    } catch (error) {
        return false
    }
};
