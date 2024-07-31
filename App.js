import AllApp from "./src/screens/HomeScreen";
import { NativeRouter } from "react-router-native";

// Importación del hook de fuentes
import { useFonts } from "expo-font";
import LoadingMessage from "./src/components/loading-message";

const Poppins = {
  Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
}

export default function App() {
  const [loaded] = useFonts(Poppins);

  if (!loaded) {
    return <LoadingMessage message={"Cargando..." } />;
  }

  return (
    <NativeRouter>
      <AllApp />
    </NativeRouter>
  );
}