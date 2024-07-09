import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  TouchableHighlight
} from "react-native";
import * as Animatable from "react-native-animatable";
import { stylesLogin } from "./stylesLogin";
import React from "react";
import { useNavigate, Link } from "react-router-native";
import brdLoginApp from "../../services/brdLoginApp";
import { TextWithColor } from "../../components/brdText";
import { ActivityIndicator } from "react-native";
import { ColorsButton } from "../../static/ColorsButton";

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
    <Animatable.View animation={"fadeIn"} duration={200} style={{ backgroundColor: ColorsButton.colorBackground.color }}>

      <View>
        <ImageBackground source={require("../../../assets/bg-login.png")}>
        <ScrollView>

          <View style={stylesLogin.containerLogin}>
            <View style={stylesLogin.flexCenter}>
              <Image source={require("../../../assets/svgs-login/logo-gym.png")} style={{ width: 100, height: 100}}/>
            </View>

            <View style={{ gap: 12 }}>
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
                placeholderTextColor={"white"}
                />
            </View>

            <View style={{ gap: 12 }}>
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
              <TouchableHighlight onPress={() => handleLogin()} style={stylesLogin.appButton} underlayColor={ColorsButton.colorBackground.color}>
                <View>
                  <TextWithColor color={ColorsButton.colorNegative.color}>Iniciar Sesion</TextWithColor>
                </View>
              </TouchableHighlight>
            ) : (
                <ActivityIndicator size={"large"} color={ColorsButton.colorLetter.color} />
              )}

            <View style={stylesLogin.adminLogin}>

              <Link style={stylesLogin.adminLink} to={"/login-admin"} underlayColor={ColorsButton.colorBackground.color}>
                <Text style={{ color: ColorsButton.colorLetter.color }}>
                  ¿No tienes cuenta?{" "}
                  <TextWithColor color={ColorsButton.colorPress.color}>
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
