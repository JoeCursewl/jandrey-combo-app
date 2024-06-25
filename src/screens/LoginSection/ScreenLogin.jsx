import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { stylesLogin } from "./stylesLogin";
import React from "react";
import { useNavigate, Link } from "react-router-native";
import brdLoginApp from "../../services/brdLoginApp";
import { TextWithColor } from "../../components/brdText";
import { ActivityIndicator } from "react-native";

export default function ScreenLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const useNav = useNavigate();

  const handleLogin = async () => {
    const { error, state } = await brdLoginApp(email, password, setLoading);
    if (error) return Alert.alert("BRD | Error", error);

    if (state) {
      Alert.alert("BRD | Success", "Sesión Iniciada correctamente. 🎉");
      setTimeout(() => useNav("/dashboard"), 1000);
    }
  };

  return (
    <Animatable.View animation={"slideInUp"} duration={500} style={{ backgroundColor: '#000'}}>

      <View>
        <ImageBackground source={require("../../../assets/benee_god_3.png")}>
        <ScrollView>
          <View style={stylesLogin.logoApp}>
            <Image
              source={require("../../../assets/logo_recortado.png")}
              style={stylesLogin.imageStyle}
            />
          </View>

          <View style={stylesLogin.containerLogin}>
            <View style={stylesLogin.flexCenter}>
              <Text style={stylesLogin.fontMain}>Iniciar Sesión</Text>
            </View>

            <View>
              <View style={stylesLogin.titleLg}>
                <Image
                  source={require("../../../assets/svgs-login/email-img.png")}
                  style={stylesLogin.imagesInput}
                  />
                <Text style={stylesLogin.colorWhite}>Correo Electrónico</Text>
              </View>

              <TextInput
                editable
                maxLength={40}
                onChangeText={(text) => setEmail(text)}
                style={stylesLogin.appInputs}
                cursorColor={"white"}
                selectionColor={"white"}
                placeholderTextColor={"white"}
                />
            </View>

            <View>
              <View style={stylesLogin.titleLg}>
                <Image
                  source={require("../../../assets/svgs-login/password-img.png")}
                  style={stylesLogin.imagesInput}
                  />
                <Text style={stylesLogin.colorWhite}>Contraseña</Text>
              </View>

              <TextInput style={stylesLogin.appInputs} secureTextEntry onChangeText={(text) => setPassword(text)}/>
            </View>

            {loading !== true ? (
              <Button title="INICIAR SESION" color={"#623273"} onPress={() => {
                handleLogin()
              }}/>
            ) : (
                <ActivityIndicator size={"large"} color={"#AA4ACD"} />
              )}

            <View style={stylesLogin.adminLogin}>
              <Link style={stylesLogin.adminLink} to={"/login-admin"}>
                <Text style={{ color: "#bbb" }}>
                  ¿No tienes cuenta?{" "}
                  <TextWithColor color={"#813D99"}>
                    Registrate aquí!
                  </TextWithColor>
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView> 
        </ImageBackground>

      </View>
    </Animatable.View>
  );
}
