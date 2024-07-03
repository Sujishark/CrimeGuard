import { apiV1 } from "./config";
import { store } from '../store';
import { saveActivities, saveComments, saveIncident } from '../redux/incidentSlice';

const state = store.getState();
const apiClient = apiV1()
export const createCrime = async (body) => {
    try {
        const response = await apiClient.post('/crime', body);
        console.log(response)
        if (response.status == 201) return { success: true, id: response.data.id };

    } catch (error) {
        console.log(error)
        return { success: false, id: null }
    }
};


export const fetchIncident = async (id) => {
    try {
        const response = await apiClient.get(`/crime/${id}`);
        console.log(response)
        if (response.status == 200) store.dispatch(saveIncident(response.data[0]));
    } catch (error) {
        console.log(error)

    }
};

export const fetchActivityForIncident = async (id) => {
    try {
        const response = await apiClient.get(`/crime/${id}/activity`);
        console.log(response)
        if (response.status == 200) store.dispatch(saveActivities(response.data));
    } catch (error) {
        console.log(error)

    }
};
export const fetchCommentsForIncident = async (id) => {
    try {
        const response = await apiClient.get(`/crime/${id}/comment`);
        console.log(response)
        if (response.status == 200) store.dispatch(saveComments(response.data));
    } catch (error) {
        console.log(error)

    }
};

export const createComment = async (body) => {
    try {
        const response = await apiClient.post(`/crime/comment`, body);
        console.log(response)
        if (response.status == 201) return { success: true, id: response.data.id };

    } catch (error) {
        console.log(error)
        return { success: false, id: null }
    }
};


export const subscribeUserToCrime = async (crimeId, userId) => {
    try {
        const response = await apiClient.post(`/user/${userId}/${crimeId}/subscribe`, {});
        if (response.status >= 200) return { success: true };

    } catch (error) {
        console.log(error)
        return { success: false, id: null }
    }
};

export const unsubscribeUserToCrime = async (crimeId, userId) => {
    try {
        const response = await apiClient.post(`/user/${userId}/${crimeId}/unsubscribe`, {});
        if (response.status >= 200) return { success: true };

    } catch (error) {
        console.log(error)
        return { success: false, id: null }
    }
};



