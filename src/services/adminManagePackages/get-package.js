import { API_URL } from "../../config/config.breadriuss"
export const getPackage = async (authToken, setLoadingPackage, id_package) => {
    setLoadingPackage(true)
    try {
        const response = await fetch(`${API_URL}packages/get/${id_package}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })

        if (!response.ok) {
            throw new Error(`Ha ocurrido un error, el servidor ha respondido con un ${response.status}`)
        }

        const result = await response.json()
        setLoadingPackage(false)
        return { data: result.message[0] }
    } catch (error) {
        console.log(error)
        setLoadingPackage(false)
        return { error: error.message }
    }
}