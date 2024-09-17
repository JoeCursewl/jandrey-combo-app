import { View, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import stylesDash from "../DashboardApp/stylesDash";

// import de la función que trae el token guardado en el almacenamiento asyncStorage
import { getToken } from "../../services/asyncStorage/getAsyncStorage";


// Importamos la constantes de colores de los botones
import { ColorsButton } from "../../static/ColorsButton";

// Custom components
import { TextWithColor } from "../../components/brdText";

// Estilos de las cartas de cada post
import { styleCardPost } from '../LastPosts/ShowPosts'

// función que verifica el token
import { verifyToken } from "../../services/verifyToken/verifyToken";

// Importamos el AppBar de la App
import AppBar from "../AppBar/AppBar";
import { useNavigate } from "react-router-native";
import CardTrainer from "./components/CardTrainer";

import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { getLastTrainers } from "../../services/userStuff/getLastTrainers";
import { stylesPosts } from "../LastPosts/LastPosts";
import { getTrainersSaved } from "./getTrainersSaved";

export default function ShowTrainersSaved() {
  // objeto para navegar en las rutas
  const navigate = useNavigate();

  // Estado global para setear el token
  const { setAuthToken, authToken, infoUser } = useGlobalState()  

  // array para almacenar los posts
  const [trainers, setTrainers] = useState([]);
  const [page, setPage] = useState(1);

  // Estado de carga para traer los entrenadores
  const [loading, setLoading] = useState(false);
  const goToRoute = (to) => {
    navigate(to);
  };

  // Función para verificar si el usuario está autenticado

  const verify = async () => {
    const token = await getToken("AuthToken");
    setAuthToken(token);
    const { error, data } = await verifyToken(token);

    if (error) {
      Alert.alert("FACEGYM | Error", error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  // Función para obtener todas las publicaciones con páginanción
  const getData = async () => {
    const token = await getToken("AuthToken");
    const { error, data } = await getTrainersSaved(token, setLoading, infoUser?._id);

    if (error) {
      Alert.alert("FORCEGYM | Error", error);
    }

    if (data.length === 29) {
        setTrainers([]);
    } else {
        setTrainers(data);
    }

  };

  useEffect(() => {
      getData()
  }, [])   

  return (
    <View style={stylesDash.container}>
      <AppBar />

      <View>

        <View
          style={{
            backgroundColor: "#fefffc",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >

            <Image
              source={require("../../../assets/svgs-login/thing-gym.png")}
              style={{ width: 20, height: 20 }}
            />

            <TextWithColor
              style={{
                //fontFamily: "Poppins",
                fontSize: 15,
                color: ColorsButton.colorTextApp.color,
              }}
            >
              Entradores | Guardados <TextWithColor style={{ color: ColorsButton.colorLink.color }}>{trainers.length}</TextWithColor>
            </TextWithColor>

            <TouchableOpacity onPress={() => goToRoute(-1)}>
              <Image source={require("../../../assets/svgs-login/post-back-img.png")} style={{ width: 25, height: 25 }}/>
            </TouchableOpacity>

          </View>
 
        </View>
        
        <View style={{ backgroundColor: "#fefffc" }}>
          
            {loading !== true ? <FlatList data={trainers} style={{ height: 635, width: "100%" }} 
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => (
              
              <CardTrainer trainer={item} ColorsButton={ColorsButton} key={item.id}/>
            
            )}/> : (

              <View style={{ justifyContent: "center", alignItems: "center", height: 635, gap: 10 }}>
                <Image source={require("../../../assets/svgs-login/thing-gym.png")} style={{ width: 60, height: 60 }}/>
                
                <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                  <ActivityIndicator color={ColorsButton.colorTextApp.color} size={20} />
                  <TextWithColor color={ColorsButton.colorTextApp.color}>Cargando...</TextWithColor>
                </View>
              </View>
            )}
        </View>

      </View>
    </View>
  );
}
