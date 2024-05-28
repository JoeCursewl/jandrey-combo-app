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
  import { verifyToken } from "../../services/verifyToken/verifyToken.js";
  import { getToken } from "../../services/asyncStorage/getAsyncStorage.js";
  import { useEffect, useState } from "react";
  import { useGlobalState } from "../../utils/zustand/useGlobalState.js";
  import { stylePosts } from "../RegisterAdmins/AdminPosts/stylesPosts.js";
  import { stylesShowPackages } from '../../screens/Packaging/stylesShowPackages.js'
  import { TextWithColor } from "../../components/brdText.jsx";
  import LoadingMessage from "../../components/loading-message.jsx";
  import { getLastInfo } from "../../services/userStuff/getLastInfo.js";
  
  export default function ShowContact() {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
    const navigate = useNavigate();

    // States of the component
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);
    const [page, setPage] = useState(1);
  
    const INA = require("../../../assets/svgs-login/trainer-inactive-img.png")
    const AC = require("../../../assets/svgs-login/trainer-active-img.png")
  
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
        console.log(info);
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
        <View style={stylePosts.containerArrow}>
          <Link to={"/dashboard"}>
            <Image
              source={require("../../../assets/svgs-login/arrow-back-img.png")}
              style={stylePosts.arrowBack}
            />
          </Link>
  
          <View style={stylePosts.containerInfoLink}>
            <Image
              source={require("../../../assets/svgs-login/contacto-img.png")}
              style={stylePosts.newImage}
            />
            <TextWithColor color={"#AFDDA1"} fontSize={10}>
              {loading === true ? (
                <TextWithColor color={"#AFDDA1"} fontSize={10}>
                  --
                </TextWithColor>
              ) : (
                info?.length
              )}
            </TextWithColor>
          </View>
  
          <TextWithColor color={"#A977C5"} fontSize={14}>
            FORCEGYM | Información de Contacto
          </TextWithColor>
        </View>
  
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
                <View
                  style={stylesShowPackages.containerPackage}
                  key={item._id_info}
                >
                  <View style={stylesShowPackages.packagesAll}>
                    <View style={stylesShowPackages.containerInfoPackage}>
  
                      <View style={stylesShowPackages.containerNamePackage}>
                        <TextWithColor color={"#E5E3E4"} fontSize={12}>
                          {item.name_contact}
                        </TextWithColor>
  
                        <View style={stylesShowPackages.containerImgPackage}>
                          <Image
                            source={item.status_contact === "INA" ? INA : AC}
                            style={stylePosts.newImage}
                          />
                          <TextWithColor color={item.status_contact === "INA" ? "#E55374" : "#7CE061"} fontSize={12}>
                            {item.status_contact === "INA" ? "Inactivo" : "Activo"}
                          </TextWithColor>
                        </View>
                      </View>
  
                      <View style={stylesShowPackages.containerPackagesTrainers}>
                          <View>
                              <TextWithColor color={"#E5E3E4"} fontSize={12}>
                              {item.description_contact}
                              </TextWithColor>
                          </View>
                          <View>
                              <TextWithColor color={"#BEB9C2"} fontSize={12}>
                              {item.email_contact}
                              </TextWithColor>
                          </View>
                      </View>

                      <View style={stylesShowPackages.containerPackagesTrainers}>
                          <View>
                              <TextWithColor color={"#E5E3E4"} fontSize={12}>
                              Teléfonos
                              </TextWithColor>
                          </View>
                          <View>
                              <TextWithColor color={"#BEB9C2"} fontSize={12}>
                              {item.phones_contact}
                              </TextWithColor>
                          </View>
                      </View>
  
                      <View
                        style={stylesShowPackages.containerDescriptionPackage}
                      >
  
                        <TextWithColor color={"#5A5A5A"} fontSize={10}>
                          Creado el {item.created_at}
                        </TextWithColor>
  
                        <TextWithColor color={"#5A5A5A"} fontSize={10}>
                          {item.updated_at !== item.created_at ? `Actualizado el ${item.updated_at}` : `Esta información no ha sido actualizada`}
                        </TextWithColor>
                      </View>
  
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </KeyboardAvoidingView>
  
        {loading !== true ? <View style={stylePosts.containerButtons}>
          <View style={stylePosts.containerInfoAdmins}>
            <Image
              source={require("../../../assets/svgs-login/lock-img.png")}
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
  