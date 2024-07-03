import axios from 'axios';
import { apiV1 } from "./config";
import { store } from '../store';
import { saveUserData } from '../redux/userSlice';
import { saveCrimes, saveLatestActivity, saveNotifications, savePlaces, saveTypes, saveWeapons } from '../redux/homeSlice';

const state = store.getState();
const apiClient = apiV1()

export const fetchTypes = async () => {

    try {
        const response = await apiClient.get('/crime/type',);
        console.log(response)
        if (response.status == 200) store.dispatch(saveTypes(response.data));

    } catch (error) {
        console.log(error)
    }
};


export const fetchWeapons = async () => {

    try {
        const response = await apiClient.get('/crime/weapon',);
        console.log(response)
        if (response.status == 200) store.dispatch(saveWeapons(response.data));

    } catch (error) {
        console.log(error)
    }
};

export const fetchPlaces = async () => {

    try {
        const response = await apiClient.get('/crime/place');
        console.log(response)
        if (response.status == 200) store.dispatch(savePlaces(response.data));

    } catch (error) {
        console.log(error)
    }
};

export const fetchlatestActivity = async () => {

    try {
        const response = await apiClient.get('/crime/latestActivity');
        console.log(response)
        if (response.status == 200) store.dispatch(saveLatestActivity(response.data[0]));

    } catch (error) {
        console.log(error)
    }
};

export const fetchAllCrimes = async (page = 1, perPage = 10, extraFilter) => {
    try {
        let apiStr = `/crime?perPage=${perPage}&page=${page}`
        if (extraFilter?.dateLeft) apiStr += `&dateLeft=${extraFilter?.dateLeft}`
        if (extraFilter?.dateRight) apiStr += `&dateRight=${extraFilter?.dateRight}`
        if (extraFilter?.crimeType) apiStr += `&crimeType=${extraFilter?.crimeType}`
        if (extraFilter?.crimeLocation) apiStr += `&place=${extraFilter?.crimeLocation}`


        const response = await apiClient.get(apiStr);
        console.log(response)
        if (response.status == 200) store.dispatch(saveCrimes(response.data[0]));

    } catch (error) {
        console.log(error)
    }
};

export const fetchNotifications = async (userId) => {

    try {
        const response = await apiClient.get(`/user/${userId}/notification`);
        console.log(response)
        if (response.status == 200) store.dispatch(saveNotifications(response.data));

    } catch (error) {
        console.log(error)
    }
};
