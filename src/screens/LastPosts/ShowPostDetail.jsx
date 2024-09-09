import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import { TextWithColor } from "../../components/brdText";

// Hook useNavigate para manejar las rutas
import { useNavigate } from "react-router-native";

// Constantes de los colores de los botones
import { ColorsButton } from "../../static/ColorsButton";

// Componente touchableOpacity para manejar cada tap en la app
import { useEffect, useState } from "react";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { likePost } from "../../services/adminManagePost/likePost";
import { verifyLike } from "../../services/adminManagePost/verifiedLike";

// Importamos el componente LoadingMessage
import LoadingMessage from "../../components/loading-message";
import { getToken } from "../../services/asyncStorage/getAsyncStorage";
import { insertComment } from "../../services/adminManagePost/insertComment";
import { likesCount } from "../../services/adminManagePost/LikesCount";

// Importamos el modal que refleja toda la información del post
import ModalInfoPost from "./components/ModalClosePost";

export default function ShowPostDetail({
  item,
  styleCardPost,
  authToken,
  loading,
  setLoading,
  post_id,
}) {
  const [statusLike, setStatusLike] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [likes, setLikes] = useState(1);

  // Guardamos el texto del comentario
  const [comment, setComment] = useState(null);
  const [disable, setDisable] = useState(true);
  const [loadingComment, setLoadingComment] = useState(false);

  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);

  // Estado @Global para mandar una señal y actualizar comentarios
  const { setCommentsUpdate, commentsUpdate } = useGlobalState();

  // Usamos el historial de rutas para mandar de nuevo a la ruta que estaba el usuario antes de ver el pos
  // @En espera está esto funcionando con la función useNagivate pasandole como argumento un -1 para retroceder una ruta

  // Maneja las rutas con el objeto que devuelve el useNavigate
  const navigate = useNavigate();
  const goToRoute = (to) => {
    navigate(to);
  };

  const handleVerifyLike = async () => {
    const token = await getToken("AuthToken");

    if (token) {
      const error = await verifyLike(token, setLoading, post_id, setStatusLike);

      if (error) {
        Alert.alert("FACEGYM | Error", error);
        console.log(error);
      }
    }
  };

  // función para ver el modal de la publicación
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCountLikes = async () => {
    const token = await getToken("AuthToken");
    const error = await likesCount(token, post_id, setLikes);

    if (error?.error) {
      Alert.alert("FACEGYM | Error", error);
      console.log(error);
    }
  };

  useEffect(() => {
    handleCountLikes();
  }, []);

  const verifyTextComment = (e) => {
    if (e.length > 0) {
      setDisable(false);
      setComment(e);

      if (e.length > 255) {
        setDisable(true);
      }
    } else {
      setDisable(true);
      setComment(null);
    }
  };

  const handleComment = async () => {
    const token = await getToken("AuthToken");
    const { error, data } = await insertComment(
      token,
      post_id,
      comment,
      setLoadingComment
    );

    if (error) {
      Alert.alert("FACEGYM | Error", error);
      console.log(error);
    }

    if (data) {
      setCommentsUpdate(!commentsUpdate);
      setComment(null);
      setDisable(true);
    }
  };

  const handleUpdateLike = async () => {
    setStatusLike(!statusLike);

    if (statusLike === true) {
      setLikes(parseInt(likes) - 1);
    } else {
      setLikes(parseInt(likes) + 1);
    }

    const token = await getToken("AuthToken");
    const { error, like } = await likePost(token, setLoadingLike, item.uuid);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerifyLike();
  }, []);

  return (
    <>
      <ModalInfoPost 
      setShowModal={setShowModal} 
      showModal={showModal} 
      item={item} handleUpdateLike={handleUpdateLike} 
      styleCardPost={styleCardPost} 
      statusLike={statusLike} 
      goToRoute={goToRoute}
      likes={likes}
      /> 

      <KeyboardAvoidingView behavior="height">
        {loading ? (
          <View style={{ height: 250 }}>
            <LoadingMessage message="Cargando..." />
          </View>
        ) : (
          <View key={item.uuid} style={styleCardPost.cardPost}>

            <View style={{ gap: 5 }}>
              <View style={styleCardPost.cardPostTitle2}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Image
                    source={require("../../../assets/svgs-login/date-img.png")}
                    style={styleCardPost.imgPost}
                  />
                  <TextWithColor
                    style={{
                      color: ColorsButton.colorLetter.color,
                      fontSize: 14,
                    }}
                  >
                    {item.name}
                  </TextWithColor>
                </View>

                <TouchableOpacity onPress={() => goToRoute(-1)}>
                  <Image
                    source={require("../../../assets/svgs-login/post-back-img.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styleCardPost.datePost}>
                <Image
                  source={require("../../../assets/svgs-login/date-post-.png")}
                  style={styleCardPost.imgDate}
                />
                <TextWithColor
                  style={{ fontSize: 8, color: ColorsButton.colorLetter.color }}
                >
                  publicado el {item.created_at}
                </TextWithColor>
              </View>
            </View>

            <View>
              <TextWithColor
                style={{
                  color: ColorsButton.colorPrimaryApp.color,
                  fontSize: 16,
                }}
              >
                {item.title_post}
              </TextWithColor>

              <TextWithColor
                style={{
                  color: ColorsButton.colorLetter.color,
                  fontSize: 14,
                  maxHeight: 100,
                  overflow: "hidden",
                }}
              >
                {item.description_post}
              </TextWithColor>

              <TouchableOpacity onPress={() => handleShowModal()}>
                <TextWithColor style={{ color: "#e240409a", fontSize: 14 }}>
                  Ver más...
                </TextWithColor>
              </TouchableOpacity>
            </View>

            <View style={styleCardPost.cardLabels}>
              <Image
                source={require("../../../assets/svgs-login/word-x.png")}
                style={styleCardPost.imgLabels}
              />
              <TextWithColor
                style={{ color: "#e240409a", fontSize: 12, width: "100%" }}
              >
                {item.labels}
              </TextWithColor>
            </View>

            <View style={styleCardPost.containerInteractions}>
              <TouchableOpacity
                onPress={() => {
                  handleUpdateLike();
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  {statusLike ? (
                    <Image
                      source={require("../../../assets/svgs-login/liked-img.png")}
                      style={styleCardPost.imgInteraction}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/svgs-login/like-img.png")}
                      style={styleCardPost.imgInteraction}
                    />
                  )}
                  {parseInt(likes) !== 0 ? (
                    <TextWithColor
                      style={{
                        color: ColorsButton.colorLetter.color,
                        fontSize: 11,
                      }}
                    >
                      {likes}
                    </TextWithColor>
                  ) : null}
                </View>
              </TouchableOpacity>

              <View>
                <Image
                  source={require("../../../assets/svgs-login/comment-img.png")}
                  style={styleCardPost.imgInteraction}
                />
              </View>
            </View>

            <View style={styleCardPost.containerComment}>
              <Image
                source={require("../../../assets/svgs-login/comment-tap.png")}
                style={{ width: 28, height: 28 }}
              />

              <TextInput
                style={{
                  color: "#6c6c6c",
                  fontSize: 12,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 15,
                  fontFamily: "Poppins",
                  paddingHorizontal: 10,
                  width: 260,
                }}
                placeholder="Añadir comentario..."
                value={comment}
                onChangeText={(e) => {
                  verifyTextComment(e);
                }}
              />

              {disable ? (
                <Image
                  source={require("../../../assets/svgs-login/send-comment-none.png")}
                  style={{ width: 28, height: 28 }}
                />
              ) : loadingComment ? (
                <ActivityIndicator color={ColorsButton.colorPrimaryApp.color} />
              ) : (
                <TouchableOpacity onPress={() => handleComment()}>
                  <Image
                    source={require("../../../assets/svgs-login/send-comment.png")}
                    style={{ width: 28, height: 28 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
