import { API_URL } from "../../config/config.breadriuss"

export const getTrainer = async (authToken, setLoading, id_trainer) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}trainers/get/${id_trainer}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken,
            }
        })

        if (!response.ok) {
            throw new Error(`El servidor ha respondido con un código de error ${response.status}`)
        }

        const result = await response.json()
        setLoading(false)
        return { trainer: result.message[0] }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}