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
import { stylesShowPackages } from "./stylesShowPackages.js";
import { TextWithColor } from "../../components/brdText.jsx";
import { getLastPackages } from "../../services/userStuff/getLastPackages.js";
import LoadingMessage from "../../components/loading-message.jsx";
import { date } from "../../config/config.breadriuss";

export default function ShowPackages() {
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
        <View style={stylePosts.containerArrow}>
          <Link to={"/dashboard"}>
            <Image
              source={require("../../../assets/svgs-login/arrow-back-img.png")}
              style={stylePosts.arrowBack}
            />
          </Link>

          <View style={stylePosts.containerInfoLink}>
            <Image
              source={require("../../../assets/svgs-login/packaging-img.png")}
              style={stylePosts.newImage}
            />
            <TextWithColor color={"#AFDDA1"} fontSize={10}>
              {loading === true ? (
                <TextWithColor color={"#AFDDA1"} fontSize={10}>
                  --
                </TextWithColor>
              ) : (
                packages?.length
              )}
            </TextWithColor>
          </View>

          <TextWithColor color={"#A977C5"} fontSize={14}>
            FORCEGYM | Paquetes
          </TextWithColor>
        </View>

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
                <View
                  style={stylesShowPackages.containerPackage}
                  key={item._id_package}
                >
                  <View style={stylesShowPackages.packagesAll}>
                    <View style={stylesShowPackages.containerInfoPackage}>
                      <View style={stylesShowPackages.containerNamePackage}>
                        <TextWithColor color={"#E5E3E4"} fontSize={12}>
                          {item.name_package}
                        </TextWithColor>

                        <View style={stylesShowPackages.containerImgPackage}>
                          <Image
                            source={require("../../../assets/svgs-login/money-img.png")}
                            style={stylePosts.newImage}
                          />
                          <TextWithColor color={"#AFDDA1"} fontSize={12}>
                            {item.price_package}
                          </TextWithColor>
                        </View>
                      </View>

                      <View
                        style={stylesShowPackages.containerDescriptionPackage}
                      >
                        <TextWithColor color={"#CDCDCD"} fontSize={12}>
                          {item.description_package}
                        </TextWithColor>

                        <TextWithColor color={"#5A5A5A"} fontSize={10}>
                          Creado el {item.created_at}
                        </TextWithColor>

                        <TextWithColor color={"#5A5A5A"} fontSize={10}>
                          Registrado por @{item.name_user}
                        </TextWithColor>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </KeyboardAvoidingView>

        {loadingComponents !== true ? <View style={stylePosts.containerButtons}>
          <View style={stylePosts.containerInfoAdmins}>
            <Image
              source={require("../../../assets/svgs-login/lock-img.png")}
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
