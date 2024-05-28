import {
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import { verifyToken } from "../../../services/verifyToken/verifyToken.js";
import { getToken } from "../../../services/asyncStorage/getAsyncStorage.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/zustand/useGlobalState.js";
import { stylePosts } from "../../RegisterAdmins/AdminPosts/stylesPosts.js";
import { TextWithColor } from "../../../components/brdText.jsx";
import LoadingMessage from "../../../components/loading-message.jsx";
import { getPackage } from "../../../services/adminManagePackages/get-package.js";
import { deletePackage } from "../../../services/adminManagePackages/delete-package.js";
import { useParams } from "react-router-native";
import ArrowBack from "../../../components/arrow-back.jsx";
import { updatePackages } from "../../../services/adminManagePackages/update-packages.js";

export default function UpdateAndDeletePackages() {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();
  // States of the component
  const [loading, setLoading] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [name_package, setNamePackage] = useState("");
  const [description_package, setDescriptionPackage] = useState("");
  const [price_package, setPricePackage] = useState(0);
  const { id_package } = useParams();


  const handleGetPackage = async () => {
    const { error, data } = await getPackage(authToken, setLoading, id_package);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }
    
    if (data) {
      setNamePackage(data.name_package);
      setDescriptionPackage(data.description_package);
      setPricePackage(data.price_package);
    }
  }

  const handleUpdate = async () => {
    const { error, data } = await updatePackages(authToken, setLoadingProcess, id_package, name_package, description_package, price_package);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      Alert.alert("FACEGYM | Éxito", `Paquete con ID ${id_package} actualizado correctamente.`);
      navigate("/edit/packages");
    }
  }

  const handleDelete = async () => {
    const { error, data } = await deletePackage(authToken, setLoadingProcess, id_package);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      Alert.alert("FACEGYM | Éxito", `Paquete con ID ${id_package} eliminado correctamente.`);
      navigate("/edit/packages");
      setNamePackage("");
      setDescriptionPackage("");
      setPricePackage(0);
    }
  }

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

  useEffect(() => {
    handleGetPackage();
  }, []);

  return (
    <View style={stylePosts.container}>
        <ArrowBack packages={"-"} path={"/edit/packages"} text={"FORCEGYM | Edición de paquetes"} stylePosts={stylePosts} loading={loading} image={require("../../../../assets/svgs-login/packaging-img.png")}/>

      {loading !== true ? <KeyboardAvoidingView behavior="height">
        <View style={stylePosts.containerButtons}>
          <View style={stylePosts.containerInput}>
            <TextWithColor color={"#A198A6"} fontSize={12}>
              {id_package}
            </TextWithColor>
            <TextWithColor color={"#A198A6"} fontSize={12}>
              Titulo del paquete
            </TextWithColor>
            <TextInput
              style={stylePosts.input}
              onChangeText={(text) => setNamePackage(text)}
              placeholder="Zamba estilo libre..."
              placeholderTextColor={"#A198A6"}
              value={name_package}
            />
          </View>

          <View style={stylePosts.containerContent}>
            <TextWithColor color={"#A198A6"} fontSize={12}>
              Descripción del paquete
            </TextWithColor>
            <TextInput
              style={stylePosts.contentInput}
              multiline={true}
              onChangeText={(text) => setDescriptionPackage(text)}
              value={description_package}
            />
          </View>

          <View style={stylePosts.containerInput}>
            <TextWithColor color={"#A198A6"} fontSize={12}>
              Precio del paquete
            </TextWithColor>
            <TextInput
              style={stylePosts.input}
              onChangeText={(text) => setPricePackage(text)}
              value={price_package.toString()}
            />
          </View>

          {loadingProcess !== true ? (
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
                onPress={() => Alert.alert("¿Seguro de eliminar este paquete?", 
                "Esta accion no se puede deshacer.", 
                [{ text: "Cancelar", style: "cancel" }, 
                { text: "Eliminar", onPress: () => handleDelete() }]
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
          ) : (
            <LoadingMessage message={"Procesando..."} />
          )}

          <View style={stylePosts.containerInput}>
            <TextWithColor color={"#A198A6"} fontSize={12} textAlign={"center"}>
              Estás registrando esta publicación como{" "}
              <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
            </TextWithColor>
          </View>
        </View>
      </KeyboardAvoidingView> : <LoadingMessage message={"Cargando datos del paquete..."}/>}

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
