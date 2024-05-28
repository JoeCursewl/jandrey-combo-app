import { API_URL } from "../../config/config.breadriuss"

export const deleteTrainer = async (authToken, setLoading, id_trainer) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}trainers/delete/${id_trainer}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            }
        })

        if (!response.ok) {
            throw new Error(`Ha ocurrido un error el servidor ha respondido con un código de estado ${response.status}`)
        }

        const result = await response.json()
        setLoading(false)
        return { trainer: `El Entrandor con ID ${id_trainer} ha sido eliminado.` }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}