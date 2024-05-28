import { Text, View, Image } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { stylesRouter } from "../RegisterAdmins/stylesRouter";
import { TextWithColor } from "../../components/brdText";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { useEffect } from "react";
import { getToken } from "../../services/asyncStorage/getAsyncStorage";
import { verifyToken } from "../../services/verifyToken/verifyToken";

const NEW_IMG_URL = require("../../../assets/svgs-login/new-img.png");

export default function RouterAdminUpdate() {
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
    <View style={stylesRouter.container}>

      <View style={stylesRouter.containerArrow}>
        <Link to={"/dashboard"}>
          <Image
            source={require("../../../assets/svgs-login/arrow-back-img.png")}
            style={stylesRouter.arrowBack}
          />
        </Link>

        <TextWithColor color={"#9760B6"} fontSize={14}>
          Admins | {infoUser?.name} 
        </TextWithColor>
      </View>

      <View style={stylesRouter.containerButtons}>

        <Link style={stylesRouter.allLinks} to={"/edit/posts"}>
          <View style={stylesRouter.containerButton}>
            <View style={stylesRouter.containerInfoLink}>
              <Image
                source={require("../../../assets/svgs-login/posts-img.png")}
                style={stylesRouter.imageButton}
              />
              <TextWithColor color={"white"} fontSize={15}>
                Publicaciones
              </TextWithColor>
            </View>

            <Image source={NEW_IMG_URL} style={stylesRouter.newImage} />
          </View>
        </Link>

        <Link style={stylesRouter.allLinks} to={"/edit/packages"}>
          <View style={stylesRouter.containerButton}>
            <View style={stylesRouter.containerInfoLink}>
              <Image
                source={require("../../../assets/svgs-login/packaging-img.png")}
                style={stylesRouter.imageButton}
              />
              <TextWithColor color={"white"} fontSize={15}>
                Paquetes
              </TextWithColor>
            </View>

            <Image source={NEW_IMG_URL} style={stylesRouter.newImage} />
          </View>
        </Link>

        <Link style={stylesRouter.allLinks} to={"/edit/trainers"}>
          <View style={stylesRouter.containerButton}>
            <View style={stylesRouter.containerInfoLink}>
              <Image
                source={require("../../../assets/svgs-login/entrenadores-img.png")}
                style={stylesRouter.imageButton}
              />
              <TextWithColor color={"white"} fontSize={15}>
                Entrenadores
              </TextWithColor>
            </View>

            <Image source={NEW_IMG_URL} style={stylesRouter.newImage} />
          </View>
        </Link>

        <Link style={stylesRouter.allLinks} to={"/edit/information"}>
          <View style={stylesRouter.containerButton}>
            <View style={stylesRouter.containerInfoLink}>
              <Image
                source={require("../../../assets/svgs-login/contacto-img.png")}
                style={stylesRouter.imageButton}
              />
              <TextWithColor color={"white"} fontSize={15}>
                Información de Contacto
              </TextWithColor>
            </View>

            <Image source={NEW_IMG_URL} style={stylesRouter.newImage} />
          </View>
        </Link>
      </View>

      <View style={stylesRouter.containerButtons}>
        
        <View style={stylesRouter.containerInfoAdmins}>

          <Image source={NEW_IMG_URL} style={stylesRouter.newImage} />
          <TextWithColor fontSize={12} color={"#A198A6"} textAlign={"center"}>Este apartado solo está disponible para administradores. Accesado como <TextWithColor color={"#9760B6"}>{infoUser?.email}</TextWithColor>
          </TextWithColor> 
        </View>
      
      </View>

    </View>
  );
}
