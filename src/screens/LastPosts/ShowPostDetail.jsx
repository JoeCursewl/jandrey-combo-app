import { View, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { TextWithColor } from "../../components/brdText";

// Hook useNavigate para manejar las rutas
import { useHref, useNavigate, use } from "react-router-native";

// Constantes de los colores de los botones
import { ColorsButton } from "../../static/ColorsButton"; 

// Componente touchableOpacity para manejar cada tap en la app
import { useEffect, useState } from "react";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { likePost } from "../../services/adminManagePost/likePost";
import { verifyLike } from "../../services/adminManagePost/verifiedLike";

// Importamos el componente LoadingMessage
import LoadingMessage from "../../components/loading-message";
export default function ShowPostDetail({ item, styleCardPost, authToken, loading, setLoading, post_id }) {

    const [statusLike, setStatusLike] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [likes, setLikes] = useState(1);

    // Usamos el historial de rutas para mandar de nuevo a la ruta que estaba el usuario antes de ver el pos
    // @En espera está esto funcionando con la función useNagivate pasandole como argumento un -1 para retroceder una ruta

    // Maneja las rutas con el objeto que devuelve el useNavigate
    const navigate = useNavigate();
    const goToRoute = (to) => {
      navigate(to);
    };

    const handleVerifyLike = async () => {
        const error = await verifyLike(authToken, setLoading, post_id, setStatusLike);

        if (error) {
          Alert.alert("FACEGYM | Error", error);
          console.log(error);
        }
    }

    
    const handleUpdateLike = async () => {
        setStatusLike(!statusLike);
        
        const { error, like } = await likePost(authToken, setLoadingLike, item.uuid);
        if (error) {
            Alert.alert("FACEGYM | Error", error);
            console.log(error);
        }
    }
    
    useEffect(() => {
        handleVerifyLike();
    }, []);
    

  return (
    <KeyboardAvoidingView behavior="height"> 
    { loading ? <LoadingMessage message="Cargando..." /> :

        <View key={item.uuid} style={styleCardPost.cardPost}>

      <View style={{ gap: 5 }}>
        <View style={styleCardPost.cardPostTitle2}>

            <View style={{ flexDirection: "row", gap: 5 }}>
                <Image
                    source={require("../../../assets/svgs-login/date-img.png")}
                    style={styleCardPost.imgPost}
                    />
                <TextWithColor
                    style={{ color: ColorsButton.colorLetter.color, fontSize: 14 }}
                    >
                    {item.name}
                </TextWithColor>
            </View>

            <TouchableOpacity onPress={() => goToRoute(-1)}>
                <Image source={require("../../../assets/svgs-login/post-back-img.png")} style={{ width: 25, height: 25 }}/>
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
          style={{ color: ColorsButton.colorPrimaryApp.color, fontSize: 16 }}
          >
          {item.title_post}
        </TextWithColor>

        <TextWithColor
          style={{ color: ColorsButton.colorLetter.color, fontSize: 14 }}
          >
          {item.description_post}
        </TextWithColor>
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

        <TouchableOpacity onPress={() => {
            handleUpdateLike()
        }}>
          <View style={{ flexDirection: "row", gap: 5, justifyContent: "flex-start", alignItems: "center", alignContent: "center" }}>

            {statusLike ? 
            <Image
            source={require("../../../assets/svgs-login/liked-img.png")}
            style={styleCardPost.imgInteraction}
            /> 
            :
            <Image
            source={require("../../../assets/svgs-login/like-img.png")}
            style={styleCardPost.imgInteraction}
            />  
          }
            {likes !== 0 ? 
              <TextWithColor style={{ color: ColorsButton.colorLetter.color, fontSize: 11 }}>
                {likes}
              </TextWithColor>
            : null}

          </View>
        </TouchableOpacity>
        
        <View>
          
          <TouchableOpacity onPress={() => {
              console.log("Comentando...")
            }}>
            <Image
            source={require("../../../assets/svgs-login/comment-img.png")}
            style={styleCardPost.imgInteraction}
            />
          </TouchableOpacity>

        </View>
      </View>

      <View style={styleCardPost.containerComment}>
        <Image source={require("../../../assets/svgs-login/comment-tap.png")} style={{ width: 25, height: 25 }}/>
        
        <TouchableOpacity onPress={() => {
            console.log("Añadiendo comentario...")
          }}>
          <TextWithColor style={styleCardPost.textComment}>Añadir un comentario...</TextWithColor>
        </TouchableOpacity>
      </View>

    </View>
            }   
  </KeyboardAvoidingView>
  );
}
