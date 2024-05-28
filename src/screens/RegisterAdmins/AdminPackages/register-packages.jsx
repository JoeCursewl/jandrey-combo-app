import { View, Image, TextInput, TouchableHighlight, Alert, KeyboardAvoidingView } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { verifyToken } from "../../../services/verifyToken/verifyToken.js";
import { getToken } from "../../../services/asyncStorage/getAsyncStorage.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/zustand/useGlobalState.js";
import { stylePosts } from "../AdminPosts/stylesPosts.js";
import { TextWithColor } from "../../../components/brdText.jsx";
import { registerPackages } from "../../../services/adminStuff/registerPackages.js";
import LoadingMessage from "../../../components/loading-message.jsx";
import { date } from "../../../config/config.breadriuss.js";

export default function RegisterPackages() {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();
  // States of the component
  const [loading, setLoading] = useState(false);
  const [name_package, setNamePackage] = useState("");
  const [description_package, setDescriptionPackage] = useState("");
  const [price_package, setPricePackage] = useState(0);

  const created_at = date.toLocaleTimeString('es-ES') + " " + date.toLocaleDateString('es-ES');	

  // Functions
  const handleRegisterPackage = async () => {
    const { data, error } = await registerPackages(authToken, setLoading, infoUser?._id, name_package, description_package, price_package, created_at, infoUser?.name);
    console.log(description_package)

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      Alert.alert("FACEGYM | Éxito", "Paquete registrado con éxito");
      navigate("/register");
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
    verify();
  }, []);

  return (
    <View style={stylePosts.container}>
      <View style={stylePosts.containerArrow}>
        <Link to={"/register"}>
          <Image
            source={require("../../../../assets/svgs-login/arrow-back-img.png")}
            style={stylePosts.arrowBack}
          />
        </Link>

        <Image source={require("../../../../assets/svgs-login/packaging-img.png")} style={stylePosts.newImage}/>

        <TextWithColor color={"#A977C5"} fontSize={14}>
          Admins | Registrar paquetes
        </TextWithColor>
      </View>

    <KeyboardAvoidingView behavior="height">
      <View style={stylePosts.containerButtons}>
        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Titulo del paquete
          </TextWithColor>
          <TextInput style={stylePosts.input} onChangeText={(text) => setNamePackage(text)} placeholder="Zamba estilo libre..." placeholderTextColor={"#A198A6"}/>
        </View>

        <View style={stylePosts.containerContent}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Descripción del paquete
          </TextWithColor>
          <TextInput style={stylePosts.contentInput} multiline={true} 
          onChangeText={(text) => setDescriptionPackage(text)}
          />
        </View>

        <View style={stylePosts.containerInput}>
          <TextWithColor color={"#A198A6"} fontSize={12}>
            Precio del paquete
          </TextWithColor>
          <TextInput style={stylePosts.input} 
          onChangeText={(text) => setPricePackage(text)}
          />
        </View>

        {loading !== true ? <TouchableHighlight
          onPress={handleRegisterPackage}
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
    </KeyboardAvoidingView>

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
