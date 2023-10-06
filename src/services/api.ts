import axios from 'axios';

export interface Response {
    statusCode: number

    body: {
        content?: Record<any, any>
        message?: string
        error?: string
    }
}


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
