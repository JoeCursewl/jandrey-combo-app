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
  import LoadingMessage from "../../../components/loading-message.jsx";
  import { getLastInfo } from "../../../services/userStuff/getLastInfo.js";
  import InformationCard from "../../../components/InformationCard.jsx";
  import ArrowBack from "../../../components/arrow-back.jsx";
  
  export default function UpdateInformation() {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
    const navigate = useNavigate();

    // States of the component
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);
    const [page, setPage] = useState(1);
  
    const getTrainers = async () => {
      const { error, data } = await getLastInfo(
        authToken,
        setLoading,
        page,
        setInfo,
        info
      );
  
      if (error) {
        Alert.alert("FACEGYM | Error", error);
        console.log(error);
      }
    };
  
    const nextPage = () => {
      if (page < info?.length) {
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
      getTrainers();
    }, [authToken, page]);
  
    return (
      <View style={stylePosts.container}>
        <ArrowBack text={"FORCEGYM | Información"} stylePosts={stylePosts} path={"/update"} image={require("../../../../assets/svgs-login/contacto-img.png")} packages={info} loading={loading}/>
  
        <KeyboardAvoidingView behavior="height">
          {info?.length === 0 ? (
            <LoadingMessage message={"Buscando información de contacto..."} />
          ) : (
            <FlatList
              style={{ height: "75%" }}
              data={info}
              initialNumToRender={10}
              onEndReached={() => nextPage()}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={<MessageEmptyArray />}
              renderItem={({ item }) => (
                <InformationCard item={item} stylesShowPackages={stylesShowPackages} stylePosts={stylePosts}/>
              )}
            />
          )}
        </KeyboardAvoidingView>
  
        {loading !== true ? <View style={stylePosts.containerButtons}>
          <View style={stylePosts.containerInfoAdmins}>
            <Image
              source={require("../../../../assets/svgs-login/lock-img.png")}
              style={stylePosts.newImage}
            />
            <TextWithColor fontSize={12} color={"#A198A6"} textAlign={"center"}>
              Este apartado está disponible para todos los usuarios. Accesado como{" "}
              <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
            </TextWithColor>
          </View>
        </View> : null}
      </View>
    );
  }
  
  const MessageEmptyArray = () => {
    return (
      <TextWithColor color={"#AFDDA1"} fontSize={10}>
        No hay Entrenadores
      </TextWithColor>
    );
  };
  