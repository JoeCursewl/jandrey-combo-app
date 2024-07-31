import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import stylesDash from "../DashboardApp/stylesDash";

// import de la función que trae el token guardado en el almacenamiento asyncStorage
import { getToken } from "../../services/asyncStorage/getAsyncStorage";

import LastPosts from "./LastPosts";

// Importamos la constantes de colores de los botones
import { ColorsButton } from "../../static/ColorsButton";

// Custom components
import { TextWithColor } from "../../components/brdText";

// Importamos la sombra para ver los posts
import { Shadow } from "react-native-shadow-2";

// Estilos de las cartas de cada post
import { styleCardPost } from "./ShowPosts";

// función que devuelve los posts
import { getPosts } from "../../services/adminStuff/getPosts";
import { verifyToken } from "../../services/verifyToken/verifyToken";

// Importamos el AppBar de la App
import AppBar from "../AppBar/AppBar";
import { useNavigate } from "react-router-native";
import CardPost from "./CardPost";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
export default function ShowPosts() {
  // objeto para navegar en las rutas
  const navigate = useNavigate();

  // Estado global para setear el token
  const { setAuthToken, authToken } = useGlobalState()  

  // array para almacenar los posts
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const [likesCount, setLikes] = useState([]);
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
    const { error, posts: x, likes } = await getPosts(setLoading, page);

    if (error) {
      Alert.alert("FORCEGYM | Error", error);
    }

    if (x) {
      setPosts(x?.message);
      setLikes(likes)
    }
  };

  useEffect(() => {
    getData();
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
              justifyContent: "flex-start",
            }}
          >
            <Image
              source={require("../../../assets/svgs-login/thing-gym.png")}
              style={{ width: 20, height: 20 }}
            />
            <TextWithColor
              style={{
                fontFamily: "Poppins",
                fontSize: 15,
                color: ColorsButton.colorTextApp.color,
              }}
            >
              Novedades | Para ti
            </TextWithColor>
          </View>

 
        </View>
        
        <View style={{ backgroundColor: "#fefffc" }}>
          
            {loading !== true ? <FlatList data={posts} style={{ height: 635, width: "100%" }} 
             keyExtractor={(item) => item.uuid}
             renderItem={({ item }) => (
              // arrozsssss
              <CardPost
              key={item.uuid}
              item={item}
              likes={likesCount.map(like => like.post_id === item.uuid ? like : null).filter(like => like !== null).length}
              styleCardPost={styleCardPost} 
              authToken={authToken}
              />
            
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
