import AllApp from "./src/screens/HomeScreen";
import { NativeRouter } from "react-router-native";

// Importación del hook de fuentes

// Importación para mostrar mientras se carga la fuente
import { LoadingMainView } from "./src/components/loading-main-view";

export default function App() {
    return (
      <NativeRouter>
        <AllApp />
      </NativeRouter>
    );
  }
