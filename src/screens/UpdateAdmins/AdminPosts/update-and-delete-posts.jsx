import { View, Image, TextInput, TouchableHighlight, Alert } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { verifyToken } from "../../../services/verifyToken/verifyToken.js";
import { getToken } from "../../../services/asyncStorage/getAsyncStorage.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/zustand/useGlobalState.js";
import { stylePosts } from "../../RegisterAdmins/AdminPosts/stylesPosts.js";
import { TextWithColor } from "../../../components/brdText.jsx";
import { registerPost } from "../../../services/adminStuff/registerPost.js"
import LoadingMessage from "../../../components/loading-message.jsx";
import { date } from "../../../config/config.breadriuss.js";
import ArrowBack from "../../../components/arrow-back.jsx";
import { useParams } from "react-router-native";
import { getPost } from "../../../services/adminManagePost/get-posts.js";
import { updatePosts } from "../../../services/adminManagePost/update-post.js";
import { deletePosts } from "../../../services/adminManagePost/delete-posts.js";
export default function UpdateAndDeletePosts() {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();
  // States of the component
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [title_post, setTitlePost] = useState('');
  const [description_post, setDescriptionPost] = useState('');
  const [labels, setLabels] = useState('');
  const { id_post } = useParams();


  const handleUpdate = async () => {
      const { error, data } = await updatePosts(authToken, setLoading, id_post, title_post, description_post, labels)

      if (error) {
        Alert.alert("FACEGYM | Error", error);
      }

      if (data) {
        Alert.alert("FACEGYM | Éxito", "Publicación actualizada con éxito");
        navigate("/edit/posts");
        setDescriptionPost('');
        setTitlePost('');
        setLabels('');
      }
  }

  const handleDelete = async () => {
    const { error, data } = await deletePosts(authToken, setLoading, id_post);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      Alert.alert("FACEGYM | Éxito", "Publicación eliminada con éxito");
      navigate("/edit/posts");
    }
  }

  const getPublications = async () => {
    const { error, data } = await getPost(authToken, setLoadingPost, id_post);  
    
    if (error) {                                           
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      setTitlePost(data.message[0].title_post)
      setDescriptionPost(data.message[0].description_post)
      setLabels(data.message[0].labels)
    }

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
    getPublications();
  }, []);

  useEffect(() => {
    verify();
  }, []);

  return (
    <View style={stylePosts.container}>
      <ArrowBack stylePosts={stylePosts} path={"/edit/posts"} text={`Editando post`}/>

      {loadingPost !== true ? <View style={stylePosts.containerButtons}>
        <View>
            <TextWithColor color={"#A198A6"} fontSize={12}>
                {id_post}
            </TextWithColor>
        </View>

        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Titulo de la publicación
          </TextWithColor>
          <TextInput style={stylePosts.input} onChangeText={(text) => setTitlePost(text)}
          value={title_post}
          />
        </View>

        <View style={stylePosts.containerContent}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Contenido de la publicación
          </TextWithColor>
          <TextInput style={stylePosts.contentInput} multiline={true} 
          value={description_post}
          onChangeText={(text) => setDescriptionPost(text)}
          />
        </View>

        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Palabras Clave
          </TextWithColor>
          <TextInput style={stylePosts.input} 
          onChangeText={(text) => setLabels(text)}
          value={labels}
          />
        </View>

        {loading !== true ? 
        <>
            <TouchableHighlight
            onPress={() => handleUpdate()}
            underlayColor={"#bd87da3a"}
            style={stylePosts.buttonSumbit}
            activeOpacity={0.6}
            >
            <TextWithColor color={"#C27BEA"} fontSize={15}>
                Actualizar
            </TextWithColor>
            </TouchableHighlight> 

            <TouchableHighlight
            onPress={() => Alert.alert(
              '¿Estás seguro que quieres borrar esta publicación?',
              'Esta acción no puede ser revertida!',
              [
                { text: 'Si', onPress: handleDelete },
                { text: 'No', onPress:  () => console.log('Cancel Pressed') },
              ],
            )}
            underlayColor={"#bd87da3a"}
            style={stylePosts.buttonSumbitDelete}
            activeOpacity={0.6}
            >
            <TextWithColor color={"#DF3352"} fontSize={15}>
                Eliminar
            </TextWithColor>
            </TouchableHighlight> 
        
        </>
        : <LoadingMessage message={"Procesando..."}/>}

        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12} textAlign={"center"}>
            Estás editando esta publicación como{" "}
            <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
          </TextWithColor>
        </View>
      </View> : <LoadingMessage message={"Cargando datos..."}/>}

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
