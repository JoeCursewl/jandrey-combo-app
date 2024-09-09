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

// Importamos el componente para manejar todos los comentarios
import Comments from "./Comments";

export default function GetPostId() {
  // objeto para navegar en las rutas
  const navigate = useNavigate();

  // Estado global para setear el token
  const { setAuthToken, authToken, infoUser } = useGlobalState()

  // Se obtiene el ID del post desde el paramde URL en memoria
  const { id_post } = useParams()

  // Array para almacenar los posts
  const [post, setPost] = useState({} );
  const [page, setPage] = useState(1);
  const [likesCount, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetPostById = async () => {
    const token = await getToken("AuthToken");
    const { error, data} = await getPost(token, setLoading, id_post)

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

  // Función para verificar si el usuario está autenticado
  const verify = async () => {
    const token = await getToken("AuthToken");
    setAuthToken(token);
    const { error, data } = await verifyToken(token);

    if (error) {
      Alert.alert("FACEGYM | Error GET POST BY ID", error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    handleGetPostById();
  }, [])

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

          <Comments post_id={id_post} infoUser={infoUser} />

      </View>
    </View>
  );
}
