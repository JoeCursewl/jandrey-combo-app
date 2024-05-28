import { API_URL } from "../../config/config.breadriuss"

export const updatePackages = async (authToken, setLoading, id_package, name_package, description_package, price_package) => {
    setLoading(true)
    try {

        if (name_package === '' || description_package === '' || price_package === '') {
            throw new Error('Todos los campos son obligatorios!')
        }

        if (price_package <= 0) {
            throw new Error('El precio no puede ser negativo!')
        }

        if (name_package.length > 70 || description_package.length > 300 || price_package.length > 10) {
            throw new Error('El nombre, la descripción o el precio no pueden superar los 100 caracteres o 200 caracteres, respectivamente!')
        }

        if (isNaN(price_package)) {
            throw new Error('El precio debe ser un numero!')
        }

        const parsePrice = parseInt(price_package)
        const response = await fetch(`${API_URL}packages/update/${id_package}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({ 
                name_package: name_package.trim(), 
                description_package: description_package.trim(), 
                price_package: parsePrice 
            })
        })

        if (!response.ok) {
            throw new Error(`Ha ocurrido un error, el servidor ha respondido con un ${response.status}`)
        }

        const result = await response.json()
        setLoading(false)
        return { data: result }
    } catch (error) {
        console.log(error)
        setLoading(false)
        return { error: error.message }
    }
}