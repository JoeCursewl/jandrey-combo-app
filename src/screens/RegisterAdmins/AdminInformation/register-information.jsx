import {
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
    Modal,
  } from "react-native";
  import { Picker } from "@react-native-picker/picker";
  import { Link, useNavigate } from "react-router-native";
  import { verifyToken } from "../../../services/verifyToken/verifyToken.js";
  import { getToken } from "../../../services/asyncStorage/getAsyncStorage.js";
  import { useEffect, useState } from "react";
  import { useGlobalState } from "../../../utils/zustand/useGlobalState.js";
  import { stylePosts } from "../AdminPosts/stylesPosts.js";
  import { styleModal } from "../../../static/stylesModal.js";
  import { TextWithColor } from "../../../components/brdText.jsx";
  import { registerTrainers } from "../../../services/adminStuff/registerTrainers.js";
  import LoadingMessage from "../../../components/loading-message.jsx";
  import { date } from "../../../config/config.breadriuss.js";
import { registerInformation } from "../../../services/adminStuff/registerInformation.js";
  
  export default function RegisterInformation() {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
    const navigate = useNavigate();
    // States of the component
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [name_contact, setNameContact] = useState("");
    const [description_contact, setDescriptionContact] = useState("");
    const [email_contact, setEmailContact] = useState("");
    const [phones_contact, setPhonesContact] = useState("");
    const [status_contact, setStatusContact] = useState("");

  
    // Functions
    const showInfoTrainer = () => {
      setVisible(!visible);
    };
  
    const handleRegisterTrainer = async () => {
      const { data, error } = await registerInformation(authToken, setLoading, infoUser?._id, name_contact, description_contact, email_contact, phones_contact, status_contact)
      
      if (error) {
        Alert.alert("FACEGYM | Error", error);
      }
  
      if (data) {
        Alert.alert(
          "FACEGYM | Éxito",
          `Información registrada con éxito!`
        );
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
      <ScrollView>
        <Modal
          visible={visible}
          onRequestClose={showInfoTrainer}
          transparent={true}
          animationType="fade"
        >
          <View style={styleModal.containerModal}>
            <View style={styleModal.contentModal}>
              <View style={styleModal.containerInfo}>
                <Image
                  source={require("../../../../assets/svgs-login/id-card-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#EBD3F9"} fontSize={12}>
                  ID {infoUser?._id}
                </TextWithColor>
              </View>
  
              <View style={styleModal.containerInfo}>
                <Image
                  source={require("../../../../assets/svgs-login/profile-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#EBD3F9"} fontSize={12}>
                  {infoUser?.name}
                </TextWithColor>
              </View>
  
              <View style={styleModal.containerInfo}>
                <Image
                  source={require("../../../../assets/svgs-login/email-info-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#EBD3F9"} fontSize={12}>
                  {infoUser?.email}
                </TextWithColor>
              </View>
  
              <View style={styleModal.containerInfo}>
                <Image
                  source={require("../../../../assets/svgs-login/iat-exp-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#EBD3F9"} fontSize={12}>
                  EXP {infoUser?.exp}
                </TextWithColor>
              </View>
  
              <View style={styleModal.containerInfo}>
                <Image
                  source={require("../../../../assets/svgs-login/iat-exp-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#EBD3F9"} fontSize={12}>
                  IAT {infoUser?.iat}
                </TextWithColor>
              </View>
  
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableWithoutFeedback onPress={showInfoTrainer}>
                  <Image
                    source={require("../../../../assets/svgs-login/close-something.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
  
        <View style={stylePosts.container}>
          <View style={stylePosts.containerArrow}>
            <Link to={"/register"}>
              <Image
                source={require("../../../../assets/svgs-login/arrow-back-img.png")}
                style={stylePosts.arrowBack}
              />
            </Link>
  
            <Image
              source={require("../../../../assets/svgs-login/contacto-img.png")}
              style={stylePosts.newImage}
            />
  
            <TextWithColor color={"#A977C5"} fontSize={14}>
              Admins | Registrar Información
            </TextWithColor>
          </View>
  
          <KeyboardAvoidingView>
            <View style={stylePosts.containerButtons}>
              <View style={stylePosts.containerInput}>
                <View style={stylePosts.logoName}>
                  <View style={stylePosts.containerLogo}>
                    <Image
                      source={require("../../../../assets/svgs-login/id-card-img.png")}
                      style={stylePosts.newImage}
                    />
                    <TextWithColor color={"#C292DE"} fontSize={12}>
                      ID {infoUser?._id}
                    </TextWithColor>
                  </View>
  
                  <TouchableWithoutFeedback onPress={() => showInfoTrainer()}>
                    <View style={stylePosts.containerLogo}>
                      <Image
                        source={require("../../../../assets/svgs-login/paper-img.png")}
                        style={stylePosts.newImage}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
  
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Nombre de Contacto (Empresarial, personal)
                </TextWithColor>
                <TextInput
                  style={stylePosts.input}
                  onChangeText={(text) => setNameContact(text)}
                />
              </View>
  
              <View style={stylePosts.containerContent}>
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Descripción acerca del Contacto e.g (Contact para entrenadores con rutinas personalizadas)
                </TextWithColor>
                <TextInput
                  style={stylePosts.contentInput}
                  multiline={true}
                  onChangeText={(text) => setDescriptionContact(text)}
                />
              </View>
  
              <View style={stylePosts.containerInput}>
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Email del Contacto e.g (entrenador@example.com)
                </TextWithColor>
                <TextInput
                  style={stylePosts.input}
                  onChangeText={(text) => setEmailContact(text)}
                />
              </View>
  
              <View style={stylePosts.containerInput}>
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Número de Contacto
                </TextWithColor>
                <TextInput
                  style={stylePosts.input}
                  onChangeText={(text) => setPhonesContact(text)}
                />
              </View>
  
              <View style={stylePosts.containerInput}>
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Estado del Contacto e.g (Activo, Inactivo)
                </TextWithColor>
  
                <View style={styleModal.input}>
                  <Picker
                    selectedValue={status_contact}
                    onValueChange={(itemValue, itemIndex) =>
                      setStatusContact(itemValue)
                    }
                    style={{ color: "#A198A6", backgroundColor: "#6b5c7456", borderRadius: 10 }}
                    >
                    <Picker.Item label="Activo" value="AC" />
                    <Picker.Item label="Inactivo" value="INA"/>
                  </Picker>
                </View>
              </View>
  
              {loading !== true ? (
                <TouchableHighlight
                  onPress={handleRegisterTrainer}
                  underlayColor={"#bd87da3a"}
                  style={stylePosts.buttonSumbit}
                  activeOpacity={0.6}
                >
                  <TextWithColor color={"#C27BEA"} fontSize={15}>
                    Publicar
                  </TextWithColor>
                </TouchableHighlight>
              ) : (
                <LoadingMessage message={"Publicando..."} />
              )}
  
              <View style={stylePosts.containerInput}>
                <TextWithColor
                  color={"#A198A6"}
                  fontSize={12}
                  textAlign={"center"}
                >
                  Estás registrando este contacto en la fecha{" "}
                  <TextWithColor color={"#9760B6"}>
                    {date.toLocaleDateString("es-ES")} - {date.toLocaleTimeString()}
                  </TextWithColor>
                </TextWithColor>
              </View>

            </View>
          </KeyboardAvoidingView>
  
          <View style={stylePosts.containerInfo}>
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
      </ScrollView>
    );
  }
  