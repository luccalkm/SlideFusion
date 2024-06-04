import { Canvas } from "../types/Entities";
import slidefusionApi from './axiosConfig';

export const getPresentations = async () => {
    try {
        const response = await slidefusionApi.get('/presentations');
        return response.data;
    } catch (error) {
        console.error('Error fetching presentations:', error);
        throw error;
    }
};

export const createPresentation = async (canvas: Canvas) => {

    try {
        const response = await slidefusionApi.post('/presentations', canvas);
        return response.data;
    } catch (error) {
        console.error('Error creating presentation:', error);
        throw error;
    }
};

export const updatePresentation = async (canvas: Canvas) => {
    try {
        const response = await slidefusionApi.put(`/canvas/${canvas.id}`, canvas);
        return response.data;
    } catch (error) {
        console.error('Error updating presentation:', error);
        throw error;
    }
}