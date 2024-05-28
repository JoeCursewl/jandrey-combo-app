import {
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Alert,
    KeyboardAvoidingView,
    FlatList,
    ScrollView,
  } from "react-native";
  import { Link, useNavigate } from "react-router-native";
  import { verifyToken } from "../../../services/verifyToken/verifyToken.js";
  import { getToken } from "../../../services/asyncStorage/getAsyncStorage.js";
  import { useEffect, useState } from "react";
  import { useGlobalState } from "../../../utils/zustand/useGlobalState.js";
  import { stylePosts } from "../../RegisterAdmins/AdminPosts/stylesPosts.js";
  import { stylesShowPackages } from "../../Packaging/stylesShowPackages.js";
  import { TextWithColor } from "../../../components/brdText.jsx";
  import { getLastPost } from "../../../services/userStuff/getLastPosts.js";
  import LoadingMessage from "../../../components/loading-message.jsx";
  import PostCard from "../../../components/PostCard.jsx";
  import { date } from "../../../config/config.breadriuss.js";
  import ArrowBack from "../../../components/arrow-back.jsx";
  
  export default function UpdatePosts() {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
    const navigate = useNavigate();
    // States of the component
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingComponents, setLoadingComponents] = useState(false);
  
    const getPackages = async () => {
      const { error, data } = await getLastPost(
        authToken,
        setLoading,
        page,
        setPosts,
        posts
      );
  
      if (error) {
        Alert.alert("FACEGYM | Error", error);
        console.log(error);
      }
    };
  
    const nextPage = () => {
      if (page < posts?.length) {
          setPage(page + 1);
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
    };
  
    useEffect(() => {
      verify();
      getPackages();
    }, [authToken, page]);
  
    useEffect(() => {
      setLoadingComponents(true)
  
      setTimeout(() => {
        setLoadingComponents(false)
      }, 500);
    }, [])
  
    return (
      <View style={stylePosts.container}>
  
        <ArrowBack stylePosts={stylePosts} path={"/update"} text={"FORCEGYM | Publicaciones"}/>
  
          <KeyboardAvoidingView behavior="height">
            {posts?.length === 0 ? (
              <LoadingPackages />
            ) : (
              <FlatList
                style={{ height: "75%" }}
                data={posts}
                initialNumToRender={10}
                onEndReached={() => nextPage()}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<TextWithColor>No hay publicaciones</TextWithColor>}
                renderItem={({ item }) => (
                  <PostCard stylePosts={stylePosts} 
                  stylesShowPackages={stylesShowPackages} 
                  item={item} 
                  infoUser={infoUser}/>
                )}
              />
            )}
          </KeyboardAvoidingView>
  
          {loadingComponents !== true ? <View style={stylePosts.containerButtons}>
            <View style={stylePosts.containerInfoAdmins}>
              <Image
                source={require("../../../../assets/svgs-login/lock-img.png")}
                style={stylePosts.newImage}
              />
              <TextWithColor fontSize={12} color={"#A198A6"} textAlign={"center"}>
                Este apartado está disponible para todos los usuarios.
                Accesado como{" "}
                <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
              </TextWithColor>
            </View>
          </View> : null}
  
        </View>  
    )
  }
  
  const LoadingPackages = () => {
    return <LoadingMessage message={'Cargando publicaciones'}/>
  }
  