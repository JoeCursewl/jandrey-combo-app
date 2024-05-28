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
  import { stylePosts } from "../../RegisterAdmins/AdminPosts/stylesPosts.js";
  import { styleModal } from "../../../static/stylesModal.js";
  import { TextWithColor } from "../../../components/brdText.jsx";
  import LoadingMessage from "../../../components/loading-message.jsx";
  import { date } from "../../../config/config.breadriuss.js";
  import ArrowBack from "../../../components/arrow-back.jsx";
  import { getTrainer } from "../../../services/adminManageTrainers/get-trainer.js";
  import { useParams } from "react-router-native";
  import { updateTrainer } from "../../../services/adminManageTrainers/update-trainer.js";
  import { deleteTrainer } from "../../../services/adminManageTrainers/delete-trainer.js";
  export default function UpdateAndDeleteTrainers() {
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
    const { id_trainer } = useParams();
  
    // Functions
    const showInfoTrainer = () => {
      setVisible(!visible);
    };

    const handleUpdateTrainer = async () => {
        const { error, trainer } = await updateTrainer(authToken, setLoading, name_trainer, packages_trainer, schedule_trainer, info_trainer, status_trainer, id_trainer);

        if (error) {
            Alert.alert("FACEGYM | Error", error);
        }

        if (trainer) {
            Alert.alert("FACEGYM | Éxito", trainer);
            setNameTrainer("");
            setPackageTrainer("");
            setScheduleTrainer("");
            setInfoTrainer("");
            setSelectedLanguage("");
            navigate("/edit/trainers");
        }
    }


    const handleDeleteTrainer = async () => {
        const { error, trainer } = await deleteTrainer(authToken, setLoading, id_trainer);

        if (error) {
            Alert.alert("FACEGYM | Error", error);
        }

        if (trainer) {
            Alert.alert("FACEGYM | Éxito", trainer);
            navigate("/edit/trainers");
        }
    }

    const handleGetTrainers = async () => {
        const { error, trainer } = await getTrainer(authToken, setLoading, id_trainer)

        if (error) {
            Alert.alert("FACEGYM | Error", error);
        }

        if (trainer) {
            setNameTrainer(trainer.name_trainer);
            setPackageTrainer(trainer.packages_trainer);
            setScheduleTrainer(trainer.schedule_trainer);
            setSelectedLanguage(trainer.status_trainer);
            setInfoTrainer(trainer.info_trainer);
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
        handleGetTrainers();
    }, []);
  
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
          <ArrowBack stylePosts={stylePosts} packages={"-"} loading={loading} text={"FORCEGYM | Editando"} image={require("../../../../assets/svgs-login/entrenadores-img.png")} path={"/edit/trainers"}/>
  
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
                  value={name_trainer}
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
                  value={packages_trainer}
                />
              </View>
  
              <View style={stylePosts.containerInput}>
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Horario del Entrenador
                </TextWithColor>
                <TextInput
                  style={stylePosts.input}
                  onChangeText={(text) => setScheduleTrainer(text)}
                  value={schedule_trainer}
                />
              </View>
  
              <View style={stylePosts.containerInput}>
                <TextWithColor color={"#A198A6"} fontSize={12}>
                  Información del Entrenador
                </TextWithColor>
                <TextInput
                  style={stylePosts.input}
                  onChangeText={(text) => setInfoTrainer(text)}
                  value={info_trainer}
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
                <>
                    <TouchableHighlight
                    onPress={() => handleUpdateTrainer()}
                    underlayColor={"#bd87da3a"}
                    style={stylePosts.buttonSumbit}
                    activeOpacity={0.6}
                    >
                    <TextWithColor color={"#C27BEA"} fontSize={15}>
                        Actualizar
                    </TextWithColor>
                    </TouchableHighlight>

                    <TouchableHighlight
                    onPress={() => Alert.alert("Eliminar Entrenador", "¿Estás seguro de eliminar este Entrenador?", [
                        {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                        },
                        {
                            text: "Eliminar",
                            onPress: () => handleDeleteTrainer(),
                        },
                    ])}
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
                <TextWithColor
                  color={"#A198A6"}
                  fontSize={12}
                  textAlign={"center"}
                >
                  Estás registrando esta publicación como{" "}
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
  