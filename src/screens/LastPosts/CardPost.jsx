import { View, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { TextWithColor } from "../../components/brdText";

// Hook useNavigate para manejar las rutas
import { useNavigate } from "react-router-native";

// Constantes de los colores de los botones
import { ColorsButton } from "../../static/ColorsButton"; 

// Componente touchableOpacity para manejar cada tap en la app
import { useEffect, useState } from "react";
import { likePost } from "../../services/adminManagePost/likePost";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { verifyLike } from "../../services/adminManagePost/verifiedLike";

export default function CardPost({ item, styleCardPost, authToken, likes }) {
    const { AuthTokenUser, infoUser } = useGlobalState();

    const [statusLike, setStatusLike] = useState(false)
    const [loading, setLoading] = useState(false)

    // Maneja las rutas con el objeto que devuelve el useNavigate
    const navigate = useNavigate();
    const goToRoute = (to) => {
      navigate(to);
    };

    const handleUpdateLike = async () => {
      setStatusLike(!statusLike)
      const { error, like } = await likePost(authToken, setLoading, item.uuid)

      if (error) {
        Alert.alert("FACEGYM | Error", error)
        console.log(error)
      }
    }

    useEffect(() => {
      console.log(`Lo que estoy recibiendo de los likes ${likes}`)
    }, [])

    const handleVerifyLike = async () => {
      const error = await verifyLike(authToken, setLoading, item.uuid, setStatusLike);

      if (error) {
        Alert.alert("FACEGYM | Error", error)
        console.log(error)
      }
    }

    useEffect(() => {
      handleVerifyLike()
    }, [])


  return (
    <KeyboardAvoidingView behavior="height"> 

    <View key={item.uuid} style={styleCardPost.cardPost}>

      <View style={{ gap: 5 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>

          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image
              source={require("../../../assets/svgs-login/date-img.png")}
              style={styleCardPost.imgPost}
              />

            <TextWithColor
              style={{ color: ColorsButton.colorLetter.color, fontSize: 14 }}>
              {item.name}
            </TextWithColor>
          </View>

          <View>
            <TouchableOpacity onPress={() => {
              item._id_user === infoUser?._id ?
              goToRoute(`/post/${item.uuid}`) 
              :
              Alert.alert("FACEGYM | Error", "No eres el autor del post. No puedes editarlo.")
            }}>
              <Image source={require("../../../assets/svgs-login/edit-comment-img.png")} style={{ width: 18, height: 18, marginTop: 5 }}/>
            </TouchableOpacity>
          </View>

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
          style={{ color: ColorsButton.colorPrimaryApp.color, fontSize: 14 }}
          >
          {item.title_post}
        </TextWithColor>

        <TextWithColor
          style={{ color: ColorsButton.colorLetter.color, fontSize: 12 }}
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
            goToRoute(`/post/details/${item.uuid}`)
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
            goToRoute(`/post/details/${item.uuid}`)
          }}>
          <TextWithColor style={styleCardPost.textComment}>Añadir un comentario...</TextWithColor>
        </TouchableOpacity>
      </View>

    </View>
  </KeyboardAvoidingView>
  );
}
