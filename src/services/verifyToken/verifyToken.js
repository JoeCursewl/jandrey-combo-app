import { API_URL } from "../../config/config.breadriuss"
export const verifyToken = async (token) => {
   try {
        if (!token) {
            throw new Error("No token provided")
        }

        const respone = await global.fetch(API_URL + "users/verify", {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })

        if (!respone.ok) {
            throw new Error(`Error tu sesión ha expirado: ${respone.status}`) 
        }

        const data = await respone.json()
        return { data: data }
   } catch (error) {
        return { error: error }
   }
}