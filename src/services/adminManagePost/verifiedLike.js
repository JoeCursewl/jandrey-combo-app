import { API_URL } from "../../config/config.breadriuss";

export const verifyLike = async (authToken, setLoading, post_id, setStatusLike) => {
    setLoading(true)
    try {
        const response = await fetch(`${API_URL}posts/like/v/${post_id}`, {
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

        const data = await response.json()
        setLoading(false)
        setStatusLike(data.like)
    } catch (error) {
        setLoading(false)
        return error
    }
}