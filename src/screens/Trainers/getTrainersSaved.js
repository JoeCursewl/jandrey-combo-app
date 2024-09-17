import { API_URL } from "../../config/config.breadriuss";

export const getTrainersSaved = async (authToken, setLoading, id_user) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}trainers/get/saved/${id_user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Ha ocurrido un error. ${error.message}`);
        }

        const data = await response.json();
        setLoading(false);
        return { data: data.trainers }
    } catch (error) {
        setLoading(false);
        return { error: error.message }
    }
}