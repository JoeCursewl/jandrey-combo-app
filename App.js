import AllApp from "./src/screens/HomeScreen";
import { NativeRouter } from "react-router-native";

// Importación del hook de fuentes
import { useFonts } from "expo-font";

// Importación para mostrar mientras se carga la fuente
import { LoadingMainView } from "./src/components/loading-main-view";

const Poppins = {
  'Poppins': require("./assets/fonts/Poppins-Regular.ttf"),
}

export default function App() {
  const [fontsLoaded] = useFonts(Poppins);

  if (!fontsLoaded) {
    return <LoadingMainView />;
  } 
  
  return (
      <NativeRouter>
        <AllApp />
      </NativeRouter>
    );


}