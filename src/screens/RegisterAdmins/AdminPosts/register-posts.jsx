import { View, Image, TextInput, TouchableOpacity, Alert, TouchableHighlight } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { verifyToken } from "../../../services/verifyToken/verifyToken";
import { getToken } from "../../../services/asyncStorage/getAsyncStorage";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/zustand/useGlobalState";
import { stylePosts } from "./stylesPosts";
import { TextWithColor } from "../../../components/brdText.jsx";
import { registerPost } from "../../../services/adminStuff/registerPost.js";
import LoadingMessage from "../../../components/loading-message.jsx";
import { date } from "../../../config/config.breadriuss.js";

export default function RegisterPosts() {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();
  // States of the component
  const [loading, setLoading] = useState(false);
  const [title_post, setTitlePost] = useState('');
  const [description_post, setDescriptionPost] = useState('');
  const [labels, setLabels] = useState('');

    console.log(date.toLocaleDateString("es-ES"));
  // Functions
  const handleRegisterPost = async () => {
    const { data, error } = await registerPost(authToken, setLoading, title_post, description_post, date.toLocaleDateString("es-ES"), date.toLocaleDateString("es-ES"), labels, infoUser?._id, infoUser?.name);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      Alert.alert("FACEGYM | Éxito", "Publicación registrada con éxito");
      navigate("/register");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };



  const verify = async () => {
    const token = await getToken("AuthToken");
    setAuthToken(token);
    const { error, data } = await verifyToken(token);

    if (error) {
      Alert.alert("FACEGYM | Error", error.message);
      navigate("/login");
    }

    if (data) {
      setInfoUser(data.message);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <View style={stylePosts.container}>
      <View style={stylePosts.containerArrow}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require("../../../../assets/svgs-login/arrow-back-img.png")}
            style={stylePosts.arrowBack}
          />
        </TouchableOpacity>

        <Image source={require("../../../../assets/svgs-login/posts-img.png")} style={stylePosts.newImage}/>

        <TextWithColor color={"#A977C5"} fontSize={14}>
          Admins | Registrar Publicaciones
        </TextWithColor>
      </View>

      <View style={stylePosts.containerButtons}>
        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Titulo de la publicación
          </TextWithColor>
          <TextInput style={stylePosts.input} onChangeText={(text) => setTitlePost(text)}/>
        </View>

        <View style={stylePosts.containerContent}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Contenido de la publicación
          </TextWithColor>
          <TextInput style={stylePosts.contentInput} multiline={true} 
          onChangeText={(text) => setDescriptionPost(text)}
          />
        </View>

        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Palabras Clave
          </TextWithColor>
          <TextInput style={stylePosts.input} 
          onChangeText={(text) => setLabels(text)}
          />
        </View>

        {loading !== true ? <TouchableHighlight
          onPress={handleRegisterPost}
          underlayColor={"#bd87da3a"}
          style={stylePosts.buttonSumbit}
          activeOpacity={0.6}
        >
          <TextWithColor color={"#C27BEA"} fontSize={15}>
            Publicar
          </TextWithColor>
        </TouchableHighlight> : <LoadingMessage message={"Publicando..."}/>}

        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12} textAlign={"center"}>
            Estás registrando esta publicación como{" "}
            <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
          </TextWithColor>
        </View>
      </View>

      <View style={stylePosts.containerButtons}>
        <View style={stylePosts.containerInfoAdmins}>
          <Image
            source={require("../../../../assets/svgs-login/lock-img.png")}
            style={stylePosts.newImage}
          />
          <TextWithColor fontSize={12} color={"#A198A6"} textAlign={"center"}>
            Este apartado solo está disponible para administradores. Accesado
            como{" "}
            <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
          </TextWithColor>
        </View>
      </View>
    </View>
  );
}
