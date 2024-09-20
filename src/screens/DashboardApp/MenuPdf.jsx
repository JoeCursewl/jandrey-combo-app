import { View, Text, Alert, ImageBackground, Image, TouchableHighlight } from "react-native"
import AppBar from "../AppBar/AppBar";
import stylesDash from "./stylesDash";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { useNavigate, Link } from "react-router-native";
import { useEffect } from "react";
import { getToken } from "../../services/asyncStorage/getAsyncStorage";
import { verifyToken } from "../../services/verifyToken/verifyToken";
import { TextWithColor } from "../../components/brdText";
import { styleMenu } from "./styleMenu";
import { getLastTrainers } from "../../services/userStuff/getLastTrainers";

// pdf generator
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

// Importamos los estados para poder renderizar una carga
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export const MenuPDF = () => {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [page, setPage] = useState(1);

  const verify = async () => {
    const token = await getToken('AuthToken');
    setAuthToken(token)
    const { error, data } = await verifyToken(token);

    if (error) {
      Alert.alert("FACEGYM | Error", error.message);
      navigate('/login');
    }

    if (data) {
      setInfoUser(data.message);
    }
  }

  useEffect(() => {
    getTrainers();
  }, [])

  const getTrainers = async () => {
    const { error, data } = await getLastTrainers(
      authToken,
      setLoading,
      page,
      setTrainers,
      trainers
    );

    if (data) {
      console.log(data);
    }

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
  
  let html = `
    <html>
        <body>
            <h1 style="text-align: left; color: red;">FORCE GYM | PDF Generado por ${infoUser?.name}</h1>
            <h3 style="text-align: left; color: blue;">Lista de entrenadores generado por ${infoUser?.name}</h3>

            ${trainers ? trainers.map((trainer) => {
                   return  `<p>${trainer.name_trainer}</p>
                    <p>${trainer.info_trainer}</p>
                    <p>${trainer.schedule_trainer}</p>`

            }) : null}
        </body>
    </html>
  `;


  const contentNoAvailable = () => {
    Alert.alert("FACEGYM | Excepción", "Este apartado no se encuentra disponible. Intenta más tarde.");
}

  const createPDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
      fileName: `${infoUser?.name}-entrenadores.pdf`,
    })

    Alert.alert("FORCEGYM | PDF Creado", "PDF Creado con éxito 🎉");

    await shareAsync(file.uri)
  }
  useEffect(() => {
    verify();
  }, [])

    return (
        <View style={stylesDash.container}>
        <ImageBackground>
        <AppBar />

        <View style={{ paddingHorizontal: 25, paddingTop: 20, height: "auto", paddingBottom: 20 }}>
            <TextWithColor color={"#E5E3E4"} fontSize={18} style={{ fontStyle: "italic" }}>Hola <TextWithColor color={"#D37FF1"} fontSize={18}>{infoUser?.name}</TextWithColor>, te encuentras en el apartado de generación de PDF.</TextWithColor>
        </View>

        <View style={styleMenu.contMenu}>

            <TouchableHighlight onPress={loading !== true ? createPDF : null} style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/entrenadores-img.png")} style={styleMenu.img}/>
                    {loading === true ? <ActivityIndicator /> : <TextWithColor color={"#E5E3E4"} fontSize={15}>Generar Entrenadores {loading === true ? <ActivityIndicator /> : null}</TextWithColor>}
                </View>
            </TouchableHighlight>

        </View>

        <View style={styleMenu.contMenu}>

            <TouchableHighlight onPress={contentNoAvailable} style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/packaging-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Generar Información</TextWithColor>
                </View>
            </TouchableHighlight>

        </View>

        <View style={styleMenu.contMenu}>

            <TouchableHighlight onPress={contentNoAvailable} style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/posts-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Generar Publicaciones</TextWithColor>
                </View>
            </TouchableHighlight>

        </View>

        <View style={styleMenu.contMenu}>

            <Link to="/dashboard" style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/dashboard-back-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Volver al dashboard</TextWithColor>
                </View>
            </Link>

        </View>
    
      </ImageBackground>
    </View>
    )
}


export const PdfContent = () => {
    return (
        <View>
            <View>
                <Text>PDF {infoUser?.name}</Text>
            </View>


        </View>
    )
}