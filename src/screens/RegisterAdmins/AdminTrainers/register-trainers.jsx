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
  TouchableOpacity,
  TouchableOpacityBase,
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

export default function RegisterTrainers() {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();
  // States of the component
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name_trainer, setNameTrainer] = useState("");
  const [packages_trainer, setPackageTrainer] = useState("");
  const [schedule_trainer, setScheduleTrainer] = useState("");
  const [info_trainer, setInfoTrainer] = useState('');
  const [status_trainer, setSelectedLanguage] = useState();
  const [phone, setPhone] = useState('');
  const [areacode, setAreaCode] = useState('');

  // Functions
  const showInfoTrainer = () => {
    setVisible(!visible);
  };

  const handleRegisterTrainer = async () => {
    const { data, error } = await registerTrainers(authToken, setLoading, infoUser?._id, name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, phone, areacode);
    
    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (data) {
      Alert.alert(
        "FACEGYM | Éxito",
        `Entrenador ${name_trainer} registrado con éxito`
      );
      navigate("/trainers");
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
          <TouchableOpacity onPress={() => navigate(-1)}>
            <Image
              source={require("../../../../assets/svgs-login/arrow-back-img.png")}
              style={stylePosts.arrowBack}
            />
          </TouchableOpacity>

          <Image
            source={require("../../../../assets/svgs-login/entrenadores-img.png")}
            style={stylePosts.newImage}
          />

          <TextWithColor color={"#A977C5"} fontSize={14}>
            Admins | Registrar entrenadores
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
                Nombre del Entrenador
              </TextWithColor>
              <TextInput
                style={stylePosts.input}
                onChangeText={(text) => setNameTrainer(text)}
              />
            </View>

            <View style={stylePosts.containerContent}>
              <TextWithColor color={"#A198A6"} fontSize={12}>
                Paquetes que ofrecerá el entrandor e.g (Rutinas, Clases, etc.)
              </TextWithColor>
              <TextInput
                style={stylePosts.contentInput}
                multiline={true}
                onChangeText={(text) => setPackageTrainer(text)}
              />
            </View>

            <View style={stylePosts.containerInput}>
              <TextWithColor color={"#A198A6"} fontSize={12}>
                Horario del Entrenador
              </TextWithColor>
              <TextInput
                style={stylePosts.input}
                onChangeText={(text) => setScheduleTrainer(text)}
              />
            </View>

            <View style={stylePosts.containerInput}>
              <TextWithColor color={"#A198A6"} fontSize={12}>
                Información del Entrenador
              </TextWithColor>
              <TextInput
                style={stylePosts.input}
                onChangeText={(text) => setInfoTrainer(text)}
              />
            </View>

            <View style={stylePosts.containerInput}>
              <TextWithColor color={"#A198A6"} fontSize={12}>
                Número de teléfono del Entrandor
              </TextWithColor>
              <TextInput
                style={stylePosts.input}
                onChangeText={(text) => setPhone(text)}
              />
            </View>

            <View style={stylePosts.containerInput}>
              <TextWithColor color={"#A198A6"} fontSize={12}>
                Código de Area (Telefonico) ejemp. +58
              </TextWithColor>
              <TextInput
                style={stylePosts.input}
                onChangeText={(text) => setAreaCode(text)}
              />
            </View>

            <View style={stylePosts.containerInput}>
              <TextWithColor color={"#A198A6"} fontSize={12}>
                Estado del Entrenador
              </TextWithColor>

              <View style={styleModal.input}>
                <Picker
                  selectedValue={status_trainer}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
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
                  Registrar
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
                Estás registrando este entrandor como{" "}
                <TextWithColor color={"#9760B6"}>
                  {infoUser?.email}
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
