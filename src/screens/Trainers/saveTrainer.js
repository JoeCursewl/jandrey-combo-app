import { API_URL } from "../../config/config.breadriuss";
import { date_to_update } from "../../config/config.breadriuss";

export const saveTrainer = async (trainer_id, user_id, authToken, setLoading) => {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}trainers/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body:JSON.stringify({
                trainer_id: trainer_id,
                user_id: user_id,
                saved_at: date_to_update
            })
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(`Ha ocurrido un error. ${error.message}`);
        }

        const data = await res.json();
        setLoading(false);
        return { data: data.message }
    } catch (error) {
        setLoading(false);
        console.log(error)
        return { error: error.message }
    }
}