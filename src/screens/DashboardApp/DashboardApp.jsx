import {
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
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
import { useNavigate } from "react-router-native";
import LastPosts from "../LastPosts/LastPosts.jsx";
import { ColorsButton } from "../../static/ColorsButton.js";

// importamos el componente link para poder rotear la rutas
import { Link } from "react-router-native"; 

// Importamos la sombra para poder estilizar
import { Shadow } from "react-native-shadow-2";

// Importamos expo-font 
import * as Font from 'expo-font';
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

  const goToRoute  = (to) => {
    navigate(to);
  }


  // Función para obtener custom fonts de los assets
  const getPoppinsFont = async () => {
    await Font.loadAsync({
      'Poppins': require('../../../assets/fonts/Poppins-Regular.ttf'),  
    })
  }

  useEffect(() => {
    getPoppinsFont();
  }, [])

  return (
    <ScrollView>

    <View style={stylesDash.container}>
      <AppBar />

      <View style={{ gap: 10
      }}>

        <View style={stylesDash.dashContainer}>
          <TextWithColor style={{ fontFamily: 'Poppins', fontSize: 15, color: ColorsButton.colorWhiteApp.color }}>Bienvenido <TextWithColor color={ColorsButton.colorEnergy.color}>{infoUser?.name}</TextWithColor>, aquí puedes ver novedades, entranadores e información de relevancia.</TextWithColor>
        </View>

        <View style={{ backgroundColor: "#fefffc", borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, padding: 20, gap: 10 }}>
          
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "flex-start" }}>
            <Image source={require('../../../assets/svgs-login/thing-gym.png')} style={{ width: 20, height: 20 }}/>
            <TextWithColor style={{ fontFamily: 'Poppins', fontSize: 15, color: ColorsButton.colorTextApp.color }}>Novedades | Para ti</TextWithColor>
          </View>
 
       <Shadow style={{ width: "100%" }} distance={8} startColor={ColorsButton.colorWhiteApp.color}>
          <View style={{ alignItems: "center", justifyContent: 'center', paddingVertical: 20, flexDirection: "row", width: "100%", gap: 30, backgroundColor: ColorsButton.colorBackground.color, borderRadius: 20 }}>
            
            <View>
              <Image source={require('../../../assets/svgs-login/feed-gym.png')} style={{ width: 80, height: 80 }}/>
            </View>

            <View style={{ borderWidth: 0.2, borderColor: ColorsButton.colorTextApp.color, height: "90%" }}>
            </View>

            <View>
              <Image source={require('../../../assets/svgs-login/entrenadores-img.png')} style={{ width: 80, height: 80 }}/>
            </View>

          </View>
        </Shadow>

          <View style={{ alignItems: "center", justifyContent: 'center', }}>
            
            <TouchableOpacity onPress={() => {
              console.log("ola")
            }}>
              <TextWithColor style={stylesDash.littleButton}>
                Ver novedades
              </TextWithColor>
            </TouchableOpacity>

          </View>

          <LastPosts infoUser={infoUser} textComponent={"Últimas publicaciones"} imgText={require('../../../assets/svgs-login/last-posts-img.png')}/>

        </View>

        <View style={{ backgroundColor: "#fefffc", borderRadius: 30, padding: 20, gap: 10 }}>
          
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "flex-start" }}>
            <Image source={require('../../../assets/svgs-login/cat-trainers.png')} style={{ width: 20, height: 20 }}/>
            <TextWithColor style={{ fontFamily: 'Poppins', fontSize: 15, color: ColorsButton.colorTextApp.color }}>Entrenadores | Personaliza & guarda entrenadores</TextWithColor>
          </View>
 
       <Shadow style={{ width: "100%" }} distance={8} startColor={ColorsButton.colorWhiteApp.color}>
          <View style={{ alignItems: "center", justifyContent: 'center', paddingVertical: 20, flexDirection: "row", width: "100%", gap: 30, backgroundColor: ColorsButton.colorBackground.color, borderRadius: 20 }}>
            
            <View>
              <Image source={require('../../../assets/svgs-login/feed-gym.png')} style={{ width: 80, height: 80 }}/>
            </View>

            <View style={{ borderWidth: 0.2, borderColor: ColorsButton.colorTextApp.color, height: "90%" }}>
            </View>

            <View>
              <Image source={require('../../../assets/svgs-login/entrenadores-img.png')} style={{ width: 80, height: 80 }}/>
            </View>

          </View>
        </Shadow>

            <ScrollView horizontal={true} style={{ width: 'auto' }}>
            <View style={{ width: 'auto', flexDirection: 'row', gap: 10, paddingVertical: 10 }}>
  
              <TouchableOpacity onPress={() => {
                goToRoute('/trainers');
              }}>
                  <TextWithColor style={stylesDash.littleButton}>
                    Ver entrenadores
                  </TextWithColor>
              </TouchableOpacity>

              <TouchableOpacity>
                <TextWithColor style={stylesDash.littleButton}>
                  Guardados
                </TextWithColor>
              </TouchableOpacity>

              <TouchableOpacity>
                <TextWithColor style={stylesDash.littleButton}>
                  Rutinas
                </TextWithColor>
              </TouchableOpacity>


             </View>
            </ScrollView>

          <LastPosts infoUser={infoUser} textComponent={"Entrenadores Recientes"} imgText={require('../../../assets/svgs-login/entrenadores-img.png')}/>

        </View>

      </View>

      </View>
    </ScrollView>
  );
}
