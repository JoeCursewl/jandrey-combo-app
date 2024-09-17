import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Modal,
  Linking,
  FlatListComponent,
} from "react-native";
import { TextWithColor } from "../../components/brdText";

// Hook useNavigate para manejar las rutas
import { useNavigate, useParams } from "react-router-native";

// Constantes de los colores de los botones
import { ColorsButton } from "../../static/ColorsButton";

// Componente touchableOpacity para manejar cada tap en la app
import { useEffect, useState } from "react";
import { useGlobalState } from "../../utils/zustand/useGlobalState";

import { getToken } from "../../services/asyncStorage/getAsyncStorage";

// Importamos la función para verirficar el token
import { verifyToken } from "../../services/verifyToken/verifyToken";

// Importamos el componente 'AppBar' para la accesibilidad de las rutas
import AppBar from "../AppBar/AppBar";

// importación de los estilos stylePosts
import { stylesPosts } from "../LastPosts/LastPosts";

// Expo-sharing para manejar los envios de información
import { shareAsync } from "expo-sharing";

// Importamos el modal que refleja toda la información del post
import ModalInfoPost from "../LastPosts/components/ModalClosePost";
import { stylesDetailTrainer } from "./stylesDetailTrainer";
import {
  PLACEHOLDER_PROFILE,
  PLACEHOLDER_TRAINER_PRFOFILE,
  PLACEHOLDERS_INFO,
} from "../../config/config.breadriuss";
import { getTrainer } from "../../services/adminManageTrainers/get-trainer";
import PlaceholderLoading from "../../components/placeholder-loading";

// Componente para contactar al entrenador
import PressInfo from "./components/PressInfo";
import { stylesModalToEdit } from "./stylesModalToEdit";

import { deleteTrainer } from "../../services/adminManageTrainers/delete-trainer";
import { saveTrainer } from "./saveTrainer";
import { verifyIfSaved } from "./verifyIfSaved";

export default function ShowTrainerDetail() {
  // Hook useGlobalState para manejar el estado global
  const { setAuthToken, infoUser } = useGlobalState();
  
  // Estado de carga de los detalles
  const [loading, setLoading] = useState(false);
  
  // Estado para almanecar los datos del entrenador
  const [trainer, setTrainer] = useState({});
  const { id_trainer } = useParams();

  // Estado del modal para editar entrenadores
  const [showModal, setShowModal] = useState(false);

  const verify = async () => {
    const token = await getToken("AuthToken");
    setAuthToken(token);
    const { error, data } = await verifyToken(token);

    if (error) {
      Alert.alert("FACEGYM | Error", error.message);
      navigate("/login");
    }
  };

  const handleEmailPress = async () => {
    const email = trainer?.info_trainer?.trim();

    const trainerName = trainer?.name_trainer?.split(" ")[0];

    try {
      await Linking.openURL(
        `mailto:${email}?subject=Interesad@ en asesoramiento por parte del Entrenador ${trainerName}.&body=Hola ${trainerName}, estoy interesad@ en asesoramiento de tu parte, me gustaría probar tus paquetes! Soy el usuario @${infoUser?.name}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhonePress = async () => {
    const trainerName = trainer?.name_trainer?.split(" ")[0];

    const trainerPhone = trainer?.area_code?.trim() + trainer?.phone_trainer?.trim();
    console.log(trainerPhone)

    try {
      await Linking.openURL(
        `https://wa.me/${trainerPhone}?text=Hola *${trainerName}*, estoy interesado en tus servicios de ${trainer?.packages_trainer}. Me gustaría saber más sobre los *paquetes* que ofreces. Mi nombre es *${infoUser?.name}* y mi email de contacto es ${infoUser?.email}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const handleOpenModal = () => {
    setShowModal(!showModal);
  }

  const handleVerifyTrainer = async () => {
    const token = await getToken("AuthToken");
    const { error, state } = await verifyIfSaved(id_trainer, token, setLoading);

    if (error) {
      Alert.alert("FACEGYM | Error obteniendo estado de verificación", error);
    }

    if (state === true) {
        setIsSavedTrainer(true);
    } else {
        setIsSavedTrainer(false);
    }
  }

  useEffect(() => {
    handleVerifyTrainer();
  }, [])

  const isVerified = trainer?.status_trainer === "INA" ? require("../../../assets/svgs-login/info-unverified.png") : require("../../../assets/svgs-login/info-verified.png");

  const getTrainerData = async () => {
    const token = await getToken("AuthToken");
    const { error, trainer } = await getTrainer(token, setLoading, id_trainer);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }

    if (trainer) {
      setTrainer(trainer);
    }
  };

  useEffect(() => {
    getTrainerData();
  }, []);

  // Maneja las rutas con el objeto que devuelve el useNavigate
  const navigate = useNavigate();
  const goToRoute = (to) => {
    navigate(to);
  };

  const handleDeleteTrainerApi = async () => {
    const token = await getToken("AuthToken");
    const { error, trainer } = await deleteTrainer(token, setLoading, id_trainer);

    if (error) {
        Alert.alert("FACEGYM | Error", error);
    }

    if (trainer) {
        Alert.alert("FACEGYM | Éxito", trainer);
        navigate("/trainers");
    }
}


  const handleDeleteTrainer = () => {
    Alert.alert(
      "FORCEGYM | Eliminar Entrenador",
      "¿Estas seguro de eliminar este Entrenador? Esta acción es irreversible.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            await handleDeleteTrainerApi();
          },
        },
      ],
      { cancelable: false }
    );
  }

  const[isSavedTrainer, setIsSavedTrainer] = useState(false);

  const handleSaveTrainer = async () => {
    setIsSavedTrainer(!isSavedTrainer);
    const authToken = await getToken('AuthToken');

    const { error, data } = await saveTrainer(id_trainer, infoUser?._id, authToken, setLoading);

    if (error) {
      Alert.alert("FACEGYM | Error", error);
    }
  }

  


  return (
    <>
      <Modal visible={showModal} transparent>
        
          <View style={stylesModalToEdit.containerModal}>
            <View style={stylesModalToEdit.modalContent}>

              <View style={stylesModalToEdit.containerInfo}> 
                <TextWithColor style={stylesModalToEdit.titleModal}>{trainer?.name_trainer}</TextWithColor>
                <TextWithColor color={"#a893bb"} fontSize={12} textAlign={"center"}>¿Que acción deseas realizar con {trainer?.name_trainer}?</TextWithColor>
              </View>

              <View style={stylesModalToEdit.containerButtons}>

                <TouchableOpacity style={stylesModalToEdit.editButton} onPress={() => {goToRoute(`/trainer/${trainer?._id_trainer}`)}}>
                  <TextWithColor>Editar</TextWithColor>
                </TouchableOpacity>

                <TouchableOpacity style={stylesModalToEdit.deleteButton} onPress={handleDeleteTrainer}>
                  <TextWithColor>Eliminar</TextWithColor>
                </TouchableOpacity>

                <TouchableOpacity style={stylesModalToEdit.deleteButton} onPress={handleOpenModal}>
                  <TextWithColor>Cancelar</TextWithColor>
                </TouchableOpacity>

              </View>

            </View>
          </View>

      </Modal>

      <KeyboardAvoidingView behavior="height">
        <ScrollView style={stylesDetailTrainer.container}>
          <View style={stylesDetailTrainer.mainContainer}>
            <View style={stylesDetailTrainer.topContainer}>

              <View>
                <TouchableOpacity onPress={() => goToRoute(-1)}>
                  <Image
                    source={require("../../../assets/svgs-login/post-back-img.png")}
                    style={{ width: 28, height: 28 }}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => infoUser?._role === 'A'  ? handleOpenModal() : null}>
                  <View>
                    <Image
                      source={{ uri: PLACEHOLDER_PROFILE }}
                      style={{ width: 28, height: 28, borderRadius: 100 }}
                      />
                  </View>
                </TouchableOpacity>
            </View>

            <View style={stylesDetailTrainer.profileTrainer}>
              <Image
                source={{ uri: PLACEHOLDER_TRAINER_PRFOFILE }}
                style={{ width: 90, height: 90, borderRadius: 100 }}
              />

              <View style={stylesDetailTrainer.nameTrainer}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextWithColor color={ColorsButton.colorTextApp.color}>
                    {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.small}/> : trainer?.name_trainer}
                  </TextWithColor>
                  
                  {loading ? <PlaceholderLoading size={"..........."}/> : <Image
                    source={isVerified}
                    style={{ width: 22, height: 22, marginBottom: 3 }}
                  />}
                </View>

                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Image
                    source={require("../../../assets/svgs-login/date-post-.png")}
                    style={{ width: 12, height: 12 }}
                  />
                  <TextWithColor
                    color={ColorsButton.colorTextApp.color}
                    style={{ fontSize: 10 }}
                  >
                    {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.small}/> : trainer?.created_at}
                  </TextWithColor>
                </View>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View style={{ gap: 8 }}>
                <View style={stylesDetailTrainer.packageTrainer}>
                  <Image
                    source={require("../../../assets/svgs-login/packages-trainers-10.png")}
                    style={{ ...stylesPosts.imgPost, marginBottom: 2 }}
                  />
                  <TextWithColor
                    style={{
                      color: ColorsButton.colorTextApp.color,
                      fontSize: 14,
                    }}
                  >
                    Paquetes
                  </TextWithColor>
                </View>

                <TextWithColor color={ColorsButton.colorTextApp.color}>
                  {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.big}/> : trainer?.packages_trainer}
                </TextWithColor>
              </View>

              <View style={{ gap: 8 }}>
                <View style={stylesDetailTrainer.infoTrainers}>
                  <Image
                    source={require("../../../assets/svgs-login/info-trainers-10.png")}
                    style={{ ...stylesPosts.imgPost, marginBottom: 2 }}
                  />
                  <TextWithColor
                    style={{
                      color: ColorsButton.colorTextApp.color,
                      fontSize: 14,
                    }}
                  >
                    Información
                  </TextWithColor>
                </View>

                <View>
                  <TextWithColor color={ColorsButton.colorTextApp.color}>
                    {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.big}/> : trainer?.info_trainer}
                  </TextWithColor>
                </View>
              </View>

              <View style={{ gap: 10 }}>
                <View style={stylesDetailTrainer.scheduleTrainers}>
                  <Image
                    source={require("../../../assets/svgs-login/info-trainers-schedule.png")}
                    style={{ ...stylesPosts.imgPost, marginBottom: 2 }}
                  />
                  <TextWithColor
                    style={{
                      color: ColorsButton.colorTextApp.color,
                      fontSize: 14,
                    }}
                  >
                    Contacto
                  </TextWithColor>
                </View>

                <View>
                  <TextWithColor color={ColorsButton.colorTextApp.color}>
                    {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.small}/> : trainer?.area_code} {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.small}/> : trainer?.phone_trainer}
                  </TextWithColor>
                </View>
              </View>

              <View style={{ gap: 10 }}>
                <View style={stylesDetailTrainer.scheduleTrainers}>
                  <Image
                    source={require("../../../assets/svgs-login/info-trainers-schedule.png")}
                    style={{ ...stylesPosts.imgPost, marginBottom: 2 }}
                  />
                  <TextWithColor
                    style={{
                      color: ColorsButton.colorTextApp.color,
                      fontSize: 14,
                    }}
                  >
                    Horario
                  </TextWithColor>
                </View>

                <View>
                  <TextWithColor color={ColorsButton.colorTextApp.color}>
                    {loading ? <PlaceholderLoading size={PLACEHOLDERS_INFO.medium}/> : trainer?.schedule_trainer}
                  </TextWithColor>
                </View>
              </View>

            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              {loading ? 
              <PlaceholderLoading 
              size={PLACEHOLDERS_INFO.moreSmall}/> : 
              <PressInfo 
              text={"Email"} 
              onPress={handleEmailPress} 
              imgPress={require("../../../assets/svgs-login/trainer-email-info.png")}
              />}

              {loading ? 
              <PlaceholderLoading 
              size={PLACEHOLDERS_INFO.moreSmall}/> : 
              <PressInfo 
              text={"Teléfono"} 
              onPress={handlePhonePress} 
              imgPress={require("../../../assets/svgs-login/trainer-phone-info.png")} 
              />}
            
              {loading ? 
              <PlaceholderLoading 
              size={PLACEHOLDERS_INFO.moreSmall}/> : 
              <PressInfo 
              text={isSavedTrainer ? "Guardado" : "Guardar"} 
              onPress={() => {handleSaveTrainer()}} 
              imgPress={isSavedTrainer ? require("../../../assets/svgs-login/something-to-save-as.png") : require("../../../assets/svgs-login/something-to-save.png")} 
              />}

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
