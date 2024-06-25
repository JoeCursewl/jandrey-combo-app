import { API_URL } from "../../config/config.breadriuss"
export const getInformationById = async (authToken, 
    setLoading,
    id_info
) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}admins/information/getbyid/${id_info}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Ha ocurrido un error. ${error.message}`)
        }

        const result = await response.json()
        setLoading(false)
        return { result: result.message[0] }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}