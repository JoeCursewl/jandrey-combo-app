import passwordComparator from "./paswordComparator";
import { API_URL, DEFAULT_USER_BRD } from "../config/config.breadriuss.js";
import { generateBinanceId } from "./generarRandomID.mjs";
;

export default async function brdRegisterApp(name, last_name, email, password, passwordComp, registered_at, setLoading) {
  setLoading(true);
  try {
    const typePassword = passwordComparator(password, passwordComp);

    if (typePassword === true) {
      if (name === '' || last_name === '' || email === '' || password === '') {
        setLoading(false);
        return { error: 'Los campos no pueden estar vacíos!' };
      }

      if (name.length > 25 || last_name.length > 25 || email.length > 256 || password.length > 30) {
        setLoading(false);
        return { error: 'Campos Invalidos. Intente de nuevo!' };
      }
      
      const _id = generateBinanceId()
      const response = await global.fetch(API_URL + 'users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: _id,
          name: name.trim(),
          last_name: last_name.trim(),
          email: email.trim(),
          password: password.trim(),
          created_at: registered_at,
          role: DEFAULT_USER_BRD,
        }),
      });

      if (!response.ok) {
        // Handle non-200 status codes from the server
        setLoading(false);
        const errorData = await response.json();
        throw new Error(`API request failed with status ${response.status}: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setLoading(false);
      return { state: true };
    } else {
      setLoading(false);
      return { error: 'Las contraseñas no coinciden!. Intenta de nuevo.' };
    }
  } catch (error) {
    setLoading(false);
    console.error('Error during user registration:', error);
    return { error: error.message || 'An unknown error occurred' }; // Provide a more user-friendly error message
  }
}