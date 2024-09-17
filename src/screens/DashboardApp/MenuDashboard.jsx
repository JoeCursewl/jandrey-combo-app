import { View, Text, Alert, ImageBackground, Image } from "react-native";
import AppBar from "../AppBar/AppBar";
import stylesDash from "./stylesDash";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { useNavigate, Link } from "react-router-native";
import { useEffect } from "react";
import { getToken } from "../../services/asyncStorage/getAsyncStorage";
import { verifyToken } from "../../services/verifyToken/verifyToken";
import { TextWithColor } from "../../components/brdText";
import { styleMenu } from "./styleMenu";
import { ColorsButton } from "../../static/ColorsButton";
export const MenuDashboard = () => {
  const { setAuthToken, authToken, setInfoUser, infoUser } = useGlobalState();
  const navigate = useNavigate();

  const verify = async () => {
    const token = await getToken("AuthToken");
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
    <View style={stylesDash.container}>
      <AppBar />

      <View
        style={{
          backgroundColor: "#fefffc",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          gap: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            paddingHorizontal: 25,
            paddingTop: 20,
            height: "auto",
            paddingBottom: 20,
            width: "100%",
          }}
        >
          <TextWithColor
            color={ColorsButton.colorTextApp.color }
            fontSize={18}
            style={{ fontStyle: "italic", width: "100%" }}
          >
            Hola{" "}
            <TextWithColor color={"#D37FF1"} fontSize={18}>
              {infoUser?.name}
            </TextWithColor>
            , te encuentras en el menu.
          </TextWithColor>
        </View>

        <View style={styleMenu.contMenu}>
          <Link to={infoUser?._role === 'A' ? "/register/new-trainer" : "/trainers"} style={styleMenu.link} underlayColor={"white"}>
            <View style={styleMenu.apartados}>
              <Image
                source={require("../../../assets/svgs-login/entrenadores-img.png")}
                style={styleMenu.img}
              />
              <TextWithColor color={ColorsButton.colorTextApp.color} fontSize={15}>
                Entrenadores
              </TextWithColor>
            </View>
          </Link>
        </View>

        <View style={styleMenu.contMenu}>
          <Link to={infoUser?._role === 'A' ? "/register/new-post" : "/posts"} style={styleMenu.link} underlayColor={"white"}>
            <View style={styleMenu.apartados}>
              <Image
                source={require("../../../assets/svgs-login/posts-img.png")}
                style={styleMenu.img}
              />
              <TextWithColor color={ColorsButton.colorTextApp.color} fontSize={15}>
                Publicaciones
              </TextWithColor>
            </View>
          </Link>
        </View>

        <View style={styleMenu.contMenu}>
            
          <Link to="/dashboard" style={styleMenu.link} underlayColor={"white"}>

            <View style={styleMenu.apartados}>
              <Image
                source={require("../../../assets/svgs-login/dashboard-back-img.png")}
                style={styleMenu.img}
              />
              <TextWithColor color={ColorsButton.colorTextApp.color} fontSize={15}>
                Volver al dashboard
              </TextWithColor>
            </View>

          </Link>

        </View>

      </View>
    </View>
  );
};
