import axios from "axios";
import { config } from "../config/api";



// get limit words from text
export const getLimitedWords = (text: string, limit: number = 5): string => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...'; 
};




// fetch user address 
export const fetchUserAddress = async (userId: number) => {
    try {
        const response = await axios.get(
            `${config.url}/api/addresses?filters[user_id][$eq]=${userId}`, 
            {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user address:", error);
    }
};













