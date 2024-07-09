import { View, Text, Alert, ImageBackground, Image } from "react-native"
import AppBar from "../AppBar/AppBar";
import stylesDash from "./stylesDash";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { useNavigate, Link } from "react-router-native";
import { useEffect } from "react";
import { getToken } from "../../services/asyncStorage/getAsyncStorage";
import { verifyToken } from "../../services/verifyToken/verifyToken";
import { TextWithColor } from "../../components/brdText";
import { styleMenu } from "./styleMenu";
export const MenuDashboard = () => {
    const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();

  const verify = async () => {
    const token = await getToken('AuthToken');
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
      verify();
  }, [])

    return (
        <View style={stylesDash.container}>
        <ImageBackground>
        <AppBar />


        <View style={{ paddingHorizontal: 25, paddingTop: 20, height: "auto", paddingBottom: 20 }}>
            <TextWithColor color={"#E5E3E4"} fontSize={18} style={{ fontStyle: "italic" }}>Hola <TextWithColor color={"#D37FF1"} fontSize={18}>{infoUser?.name}</TextWithColor>, te encuentras en el menu.</TextWithColor>
        </View>

        <View style={styleMenu.contMenu}>

            <Link to="/packages" style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/entrenadores-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Entrenadores</TextWithColor>
                </View>
            </Link>

        </View>

        <View style={styleMenu.contMenu}>

            <Link to="/packages" style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/packaging-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Información</TextWithColor>
                </View>
            </Link>

        </View>

        <View style={styleMenu.contMenu}>

            <Link to="/packages" style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/posts-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Publicaciones</TextWithColor>
                </View>
            </Link>

        </View>

        <View style={styleMenu.contMenu}>

            <Link to="/menu-pdf" style={styleMenu.link}>
                <View style={styleMenu.apartados}>
                    <Image source={require("../../../assets/svgs-login/pdf-img.png")} style={styleMenu.img}/>
                    <TextWithColor color={"#E5E3E4"} fontSize={15}>Generar PDFs</TextWithColor>
                </View>
            </Link>

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
