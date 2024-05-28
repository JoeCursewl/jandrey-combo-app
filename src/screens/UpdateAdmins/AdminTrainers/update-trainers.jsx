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
  import { getLastTrainers } from "../../../services/userStuff/getLastTrainers.js";
  import LoadingMessage from "../../../components/loading-message.jsx";
  import ArrowBack from "../../../components/arrow-back.jsx";
  import { date } from "../../../config/config.breadriuss.js";
  import TrainersCard from "../../../components/TrainersCard.jsx";
  
  export default function UpdateTrainers() {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
    const navigate = useNavigate();
    // States of the component
    const [loading, setLoading] = useState(false);
    const [trainers, setTrainers] = useState([]);
    const [page, setPage] = useState(1);
  
    // Functions
  
    const getTrainers = async () => {
      const { error, data } = await getLastTrainers(
        authToken,
        setLoading,
        page,
        setTrainers,
        trainers
      );
  
      if (error) {
        Alert.alert("FACEGYM | Error", error);
        console.log(error);
      }
    };
  
    const nextPage = () => {
      if (page < trainers?.length) {
        setPage(page + 1);
        console.log(trainers);
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
        <ArrowBack stylePosts={stylePosts} image={require("../../../../assets/svgs-login/entrenadores-img.png")} packages={trainers} path={"/update"} text={"FORCEGYM | Entrenadores"} loading={loading}/>
  
        <KeyboardAvoidingView behavior="height">
          {trainers?.length === 0 ? (
            <LoadingMessage message={"Buscando Entrenadores..."} />
          ) : (
            <FlatList
              style={{ height: "75%" }}
              data={trainers}
              initialNumToRender={10}
              onEndReached={() => nextPage()}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={<MessageEmptyArray />}
              renderItem={({ item }) => (
                <TrainersCard item={item} stylePosts={stylePosts} stylesShowPackages={stylesShowPackages}/>
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
  