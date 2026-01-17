import axios from 'axios';

const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL || 'http://localhost:5000';

export const analyticsService = {
    // Get user statistics
    getUserStats: async (userId) => {
        try {
            const response = await axios.get(`${ANALYTICS_URL}/user-stats/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user stats:', error);
            throw error;
        }
    },

    // Get productivity trends
    getProductivityTrends: async (userId) => {
        try {
            const response = await axios.get(`${ANALYTICS_URL}/productivity-trends/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching productivity trends:', error);
            throw error;
        }
    },
};
