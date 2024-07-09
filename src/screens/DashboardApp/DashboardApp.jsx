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


        <WelcomeMessage stylesDash={stylesDash} username={infoUser?.name} />
      
        <LastPosts infoUser={infoUser}/>

      </ImageBackground>
    </View>
  );
}
