import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5000';

const fetchData = async (endpoint, errorMessage) => {
	try {
		const response = await axios.get(`${BASE_URL}/${endpoint}`);
		return response.data;
	} catch (error) {
		console.error(`${errorMessage}:`, error);
		toast.error(errorMessage);
		throw error;
	}
};

export const fetchPosts = () => fetchData('posts', 'Error fetching posts');
export const fetchAnomalies = () => fetchData('anomalies', 'Error fetching anomalies');
export const fetchSummary = () => fetchData('summary', 'Error fetching summary');
