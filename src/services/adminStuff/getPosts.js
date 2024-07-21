import { API_URL, API_ERF_BRD } from "../../config/config.breadriuss";
export const getPosts = async (setLoading, page) => {
  setLoading(true)
  try {
    const response = await global.fetch(API_URL + `admins/getposts/feed/${page}`, {
      method: "GET",
      headers: {
        Authorization: API_ERF_BRD,
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      throw new Error(`FG | Algo ha salido mal el servidor ha respondido con un ${response.status}`);
    }

    const posts = await response.json();
    setLoading(false)
    return { posts: posts };
  } catch (error) {
    setLoading(false)
    return { error: error.message }
  }
};
