import { Canvas } from "../../../types/Entities";
import slidefusionApi from '../axiosConfig';

class CanvasService {
    
    async getCanvas() {
        try {
            const response = await slidefusionApi.get('/canvas');
            return response.data;
        } catch (error) {
            console.error('Error fetching canvas:', error);
            throw error;
        }
    }

    async createOrUpdateCanvas(canvas: Canvas) {
        try {
            if (canvas.id) {
                return this.updateCanvas(canvas);
            } else {
                return this.createCanvas(canvas);
            }
        } catch (error) {
            console.error('Error creating or updating canvas:', error);
            throw error;
        }
    }

    private async createCanvas(canvas: Canvas) {
        try {
            const response = await slidefusionApi.post('/canvas', canvas);
            return response.data;
        } catch (error) {
            console.error('Error creating canvas:', error);
            throw error;
        }
    }

    private async updateCanvas(canvas: Canvas) {
        try {
            const response = await slidefusionApi.put(`/canvas/${canvas.id}`, canvas);
            return response.data;
        } catch (error) {
            console.error('Error updating canvas:', error);
            throw error;
        }
    }
}

export default CanvasService;
