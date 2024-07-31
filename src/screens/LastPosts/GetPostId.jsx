import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import stylesDash from "../DashboardApp/stylesDash";

// import de la función que trae el token guardado en el almacenamiento asyncStorage
import { getToken } from "../../services/asyncStorage/getAsyncStorage";

// Se importa el componente usado para mostrar los detalles del post y sus comentarios
import ShowPostDetail from "./ShowPostDetail";

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
import { useNavigate, useParams } from "react-router-native";
import CardPost from "./CardPost";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { getPost } from "../../services/adminManagePost/get-posts";
export default function GetPostId() {
  // objeto para navegar en las rutas
  const navigate = useNavigate();

  // Estado global para setear el token
  const { setAuthToken, authToken } = useGlobalState()

  // Se obtiene el ID del post desde el paramde URL en memoria
  const { id_post } = useParams()

  // Array para almacenar los posts
  const [post, setPost] = useState({} );
  const [page, setPage] = useState(1);
  const [likesCount, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetPostById = async () => {
    const { error, data} = await getPost(authToken, setLoading, id_post)

    if (error) {
      Alert.alert("FACEGYM | Error", error)
    }

    if (data) {
      setPost(data[0])
    }
  }

  const goToRoute = (to) => {
    navigate(to);
  };



  return (
    <View style={stylesDash.container}>
      <View>

        <View
          style={{
            backgroundColor: "#fefffc",
            gap: 10,
          }}
        >

          <ShowPostDetail item={post} styleCardPost={styleCardPost} authToken={authToken} loading={loading} setLoading={setLoading} post_id={id_post}/>
        
        </View>

        <View style={{ backgroundColor: "#fefffc", padding: 15, gap: 10, borderBottomWidth: 1, borderBottomColor: "#ddd", }}>

            <View style={{ gap: 5 }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image source={require("../../../assets/svgs-login/thing-gym.png")} style={{ width: 20, height: 20 }}/>
                    <TextWithColor style={{ fontWeight: "bold", color: ColorsButton.colorLetter.color }}>Anthony</TextWithColor>
                </View>

                <View style={{ flexDirection: "row", gap: 5, backgroundColor: "#f0f0f0", paddingVertical: 3, paddingHorizontal: 6, borderRadius: 20, width: 128, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                    <Image source={require("../../../assets/svgs-login/date-post-.png")} style={{ width: 10, height: 10 }}/>
                    <TextWithColor style={{ color: ColorsButton.colorLetter.color, fontSize: 8 }}>publicado el 28/7/2024</TextWithColor>
                </View>
            </View>

            <View style={{ backgroundColor: "#f0f0f0", padding: 10, borderRadius: 20 }}>
                <TextWithColor style={{ color: ColorsButton.colorLetter.color,fontSize: 13 }}>Esta es una simulación de un comentario que alguien haría, en este caso en este post.</TextWithColor>
            </View>
        </View>

      </View>
    </View>
  );
}
