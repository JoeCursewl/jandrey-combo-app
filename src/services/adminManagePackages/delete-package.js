import { API_URL } from "../../config/config.breadriuss"
export const deletePackage = async (authToken, setLoading, id_package) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}packages/delete/${id_package}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken,
            },
        })

        if (!response.ok) {
            throw new Error(`Ha ocurrido un error, el servidor ha respondido con un ${response.status}`)
        }

        const result = await response.json()
        setLoading(false)
        return { data: result }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}