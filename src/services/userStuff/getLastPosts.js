import { API_URL } from "../../config/config.breadriuss";
export const getLastPost = async (authToken, setLoading, page, setPosts, posts) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}info/posts/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
             }
        })
        const data = await response.json();
        setLoading(false);
        setPosts([...posts, ...data.message]);
        return { data: data.message }
    } catch (error) {
        setLoading(false);
        return { error: error.message }
    }
}    