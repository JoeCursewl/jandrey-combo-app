import { API_URL } from "../config/config.breadriuss.js";
import { setToken } from '../services/asyncStorage/setAsyncStorage.js'

const   brdLoginApp = async (email, password, setLoading) => {
  if (email.trim() === "" || password.trim() === "")
    return { error: "Ambos campos son necesarios!" };

  setLoading(true);
  try {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    const response = await fetch(API_URL + "users/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailTrimmed, password: passwordTrimmed }),
    });

    if (!response.ok) {
      setLoading(false);
      return { error: "Credenciales incorrectas ❌" };
    }

    if (response.ok) {
      const data = await response.json();
      setLoading(false);
      await setToken(data.token);
      return { state: data.token };
    }

  } catch (error) {
    console.log(error);
    setLoading(false);
    return { error: error.message };
  }
};

export default brdLoginApp;
