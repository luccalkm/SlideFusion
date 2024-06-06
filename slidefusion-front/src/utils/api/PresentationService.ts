import { Canvas } from "../types/Entities";
import slidefusionApi from './axiosConfig';

class PresentationService {
    async getCanvas() {
        try {
            const response = await slidefusionApi.get('/canvas');
            return response.data;
        } catch (error) {
            console.error('Error fetching presentations:', error);
            throw error;
        }
    }

    async createOrUpdateCanvas(canvas: Canvas) {
        try {
            if (canvas.id) {
                return this.updatePresentation(canvas);
            } else {
                return this.createPresentation(canvas);
            }
        } catch (error) {
            console.error('Error creating or updating presentation:', error);
            throw error;
        }
    }

    private async createPresentation(canvas: Canvas) {
        try {
            const response = await slidefusionApi.post('/canvas', canvas);
            return response.data;
        } catch (error) {
            console.error('Error creating presentation:', error);
            throw error;
        }
    }

    private async updatePresentation(canvas: Canvas) {
        try {
            const response = await slidefusionApi.put(`/canvas/${canvas.id}`, canvas);
            return response.data;
        } catch (error) {
            console.error('Error updating presentation:', error);
            throw error;
        }
    }
}

export default PresentationService;
