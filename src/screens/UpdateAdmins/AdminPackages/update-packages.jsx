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
  import { getLastPackages } from "../../../services/userStuff/getLastPackages.js";
  import LoadingMessage from "../../../components/loading-message.jsx";
  import ArrowBack from "../../../components/arrow-back.jsx";
  import PackageCard from "../../../components/PackageCard.jsx";
  
  export default function UpdatePackages() {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
    const navigate = useNavigate();
    // States of the component
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingComponents, setLoadingComponents] = useState(false);
  
    const getPackages = async () => {
      const { error, data } = await getLastPackages(
        authToken,
        setLoading,
        page,
        setPackages,
        packages
      );
  
      if (error) {
        Alert.alert("FACEGYM | Error", error);
        console.log(error);
      }
    };
  
    const nextPage = () => {
      if (page < packages?.length) {
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
          <ArrowBack stylePosts={stylePosts} text={"FORCEGYM | Paquetes"} path={"/update"} loading={loading} packages={packages} image={require("../../../../assets/svgs-login/packaging-img.png")}/>
  
          <KeyboardAvoidingView behavior="height">
            {packages?.length === 0 ? (
              <LoadingPackages />
            ) : (
              <FlatList
                style={{ height: "75%" }}
                data={packages}
                initialNumToRender={10}
                onEndReached={() => nextPage()}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<TextWithColor>No hay paquetes</TextWithColor>}
                renderItem={({ item }) => (
                  <PackageCard item={item} stylePosts={stylePosts} stylesShowPackages={stylesShowPackages}/>
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
    return <LoadingMessage message={'Cargando paquetes...'}/>
  }
  