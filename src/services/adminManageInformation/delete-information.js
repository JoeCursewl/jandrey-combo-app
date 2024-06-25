import { API_URL } from "../../config/config.breadriuss"
export const deleteInformation = async (authToken, setLoading, id) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}admins/information/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        setLoading(false)
        const data = await response.json()
        return { result: data.message }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}