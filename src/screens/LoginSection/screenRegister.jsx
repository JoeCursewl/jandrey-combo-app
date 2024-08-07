import {
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  Button,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  TextComponent,
  ScrollView
} from "react-native";
import { stylesRegister } from "./stylesRegister";
import { useNavigate, Link } from "react-router-native";
import brdRegisterApp from "../../services/brdRegisterApp";
import passwordComparator from "../../services/paswordComparator";
import { useEffect, useState } from "react";
import { SpecialText, TextWithColor } from "../../components/brdText";
import * as Animatable from "react-native-animatable";
import { setToken } from "../../services/asyncStorage/setAsyncStorage";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorsButton } from "../../static/ColorsButton";
import { stylesLogin } from "./stylesLogin";

export default function ScreenRegister() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComp, setPasswordComp] = useState("");
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState([]);
  const { setAuthToken } = useGlobalState();

  const useNav = useNavigate();
  const date = new Date();

  const handleRegister = async () => {
    const { error, state } = await brdRegisterApp(name, lastname, email, password, passwordComp, date.toLocaleDateString(), setLoading);
    if (error) Alert.alert("Error | Intenta de Nuevo!", error)

    if (state) {

      Alert.alert("FG | Cuenta creada", "Ya puedes iniciar sesión 🎉"); 

      setTimeout(() => {
        useNav("/login");
      }, 1000);
    }
  };


  return ( 
    <Animatable.View animation={"shake"} duration={200}>
      <View>
        <ScrollView>

        <ImageBackground source={require("../../../assets/bg-login.png")}>


          <View style={stylesRegister.containerLogin}>

            <View style={stylesLogin.flexCenter}>
              <Image source={require("../../../assets/svgs-login/logo-gym.png")} style={{ width: 100, height: 100}}/>
            </View>

            <View style={stylesRegister.flexCenter}>
              <Text style={{ color: ColorsButton.colorLetter.color, fontSize: 18 }}>Registrate abajo 👇🏻</Text>
            </View>

            <View style={stylesRegister.everyInput}>
              <Text style={stylesRegister.colorWhite}>Nombre</Text>

              <TextInput
                style={stylesRegister.appInputs}
                onChangeText={(text) => setName(text)}
                value={name}
                />
            </View>

            <View style={stylesRegister.everyInput}>
              <Text style={stylesRegister.colorWhite}>Apellido</Text>

              <TextInput
                style={stylesRegister.appInputs}
                onChangeText={(text) => setLastname(text)}
                value={lastname}
                />
            </View>

            <View style={stylesRegister.everyInput}>
              <Text style={stylesRegister.colorWhite}>Correo Electrónico</Text>

              <TextInput
                style={stylesRegister.appInputs}
                onChangeText={(text) => setEmail(text)}
                value={email}
                />
            </View>

            <View style={stylesRegister.everyInput}>
              <Text style={stylesRegister.colorWhite}>Contraseña</Text>

              <TextInput
                style={stylesRegister.appInputs}
                onChangeText={text => setPassword(text)}
                value={password}
                />
            </View>

            <View style={stylesRegister.everyInput}>
              <Text style={stylesRegister.colorWhite}>
                Repita su contraseña
              </Text>

              <TextInput
                style={stylesRegister.appInputs}
                onChangeText={text => setPasswordComp(text)}
                value={passwordComp}
                />
            </View>

            <View style={stylesRegister.buttonRegister}>
              {loading !== true ? (
                <TouchableHighlight onPress={() => handleRegister()} style={stylesLogin.appButton} underlayColor={ColorsButton.colorBackground.color}>
                <View>
                  <TextWithColor color={ColorsButton.colorNegative.color}>Registrame</TextWithColor>
                </View>
              </TouchableHighlight>
              ) : (
                <ActivityIndicator size={"large"} color={"#AA4ACD"} />
              )}

              <View style={stylesRegister.adminLogin}>

                <Link style={stylesRegister.adminLink} to={"/login"} underlayColor={ColorsButton.colorBackground.color}>
                  <Text style={{ color: ColorsButton.colorLetter.color }}>
                    ¿Ya tienes cuenta?{" "}
                    <TextWithColor color={ColorsButton.colorPress.color}>
                      Inicia sesión aquí!
                    </TextWithColor>
                  </Text>
                </Link>
                
              </View>
            </View>

          </View>
        </ImageBackground>
        </ScrollView>
      </View>
    </Animatable.View>
  );
}

