import { API_URL } from "../../config/config.breadriuss"

export const registerPackages = async (authToken, setLoading, _id_user, name_package, description_package, price_package, created_at, name_user) => {
    setLoading(true)
    try {
        if (name_package === '' || description_package === '' || price_package === '') {
            throw new Error('Todos los campos son necesarios!')
        }

        if (name_package.length > 70 || description_package.length > 255 || price_package.length > 10) {
            throw new Error('Los campos no pueden superar los 70, 255 o 10 caracteres')
        }

        if (price_package < 0) {
            throw new Error('El precio no puede ser negativo')
        }

        if (isNaN(price_package)) {
            throw new Error('El precio debe ser un numero')
        }

        const response = await fetch(`${API_URL}/admins/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },

            body: JSON.stringify({
                _id_user: _id_user,
                name_package: name_package.trim(),
                description_package: description_package.trim(),
                price_package: price_package.trim(),
                created_at: created_at,
                name_user: name_user,
            })
        })

        if (!response.ok) {
            throw new Error(`El servidor respondio ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        setLoading(false)
        return { data: data }
    } catch (error) {
        console.log(error)
        setLoading(false)
        return { error: error.message }
    }
}