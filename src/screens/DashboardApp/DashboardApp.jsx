import {
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native";
import AppBar from "../AppBar/AppBar";
import stylesDash from "./stylesDash";
import { TextWithColor } from "../../components/brdText"
import ButtonModes from '../../components/button-modes'
import WelcomeMessage from "../../components/WelcomeMessage";
import { getToken } from "../../services/asyncStorage/getAsyncStorage.js";
import { useGlobalState } from "../../utils/zustand/useGlobalState.js";
import { useEffect } from "react";
import { verifyToken } from "../../services/verifyToken/verifyToken.js";
import { isRouteErrorResponse, useNavigate } from "react-router-native";
import LastPosts from "../LastPosts/LastPosts.jsx";
export default function DashboardApp() {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();

  const verify = async () => {
    const token = await getToken('AuthToken');
    const { error, data } = await verifyToken(token);

    if (error) {
      Alert.alert("FACEGYM | Error", error.message);
      navigate('/login');
    }

    if (data) {
      setInfoUser(data.message);
    }
  }

  useEffect(() => {
      verify();
  }, [])

  return (
    <View style={stylesDash.container}>
      <ImageBackground>
        <AppBar />

        <View style={stylesDash.modesDash}>

          <View style={{ gap: 10 }}>
            <ButtonModes stylesDash={stylesDash} name={"Paquetes"} imageRoute={require("../../../assets/svgs-login/packaging-img.png")} path={"/packaging"}/>
            
            <ButtonModes stylesDash={stylesDash} name={"Novedades"} imageRoute={require("../../../assets/svgs-login/novedades-img.png")} path={"/news"}/>

            {infoUser?._role === 'A' ? (
              <ButtonModes stylesDash={stylesDash} name={"Registrar"} imageRoute={require("../../../assets/svgs-login/register-img.png")} path={"/register"}/>
            )
            : null}
          </View>

          <View style={{ gap: 10 }}>
            <ButtonModes stylesDash={stylesDash} name={"Traineers"} imageRoute={require("../../../assets/svgs-login/entrenadores-img.png")} path={"/trainers"}/>
            
            <ButtonModes stylesDash={stylesDash} name={"Contacto"} imageRoute={require("../../../assets/svgs-login/contacto-img.png")} path={"/contacts"}/>
            
            {infoUser?._role === 'A' ? (
              <ButtonModes stylesDash={stylesDash} name={"Editar"} imageRoute={require("../../../assets/svgs-login/contacto-img.png")} path={"/update"}/>
            )
            : null}
          </View>

        </View>

        <WelcomeMessage stylesDash={stylesDash} username={infoUser?.name} />
      
        <LastPosts infoUser={infoUser}/>

      </ImageBackground>
    </View>
  );
}
