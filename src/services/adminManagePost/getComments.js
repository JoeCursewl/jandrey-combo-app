import { API_URL } from "../../config/config.breadriuss"

export const getComments = async (authToken, setLoading, page, setComments, comments, post_id) => {
    setLoading(true)
    try {
        const response = await global.fetch(`${API_URL}posts/comment/getall/id/${post_id}/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })

        const data = await response.json()
        setLoading(false)
        setComments(data.comments)
        return { data: data.comments }
    } catch (error) {
        setLoading(false)
        return { error: error.message }
    }
}