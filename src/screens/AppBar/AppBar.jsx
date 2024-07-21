import { View, Text, Image, TouchableHighlight, Alert } from "react-native";
import { styleAppBar } from "./styleAppBar";
import { Link, useNavigate } from "react-router-native";
import React from "react";
import { setToken } from '../../services/asyncStorage/setAsyncStorage.js';
import { date } from "../../config/config.breadriuss.js";
import { useGlobalState } from "../../utils/zustand/useGlobalState.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to}>
      <Text style={styleAppBar.textWhite}>{children}</Text>
    </Link>
  );
};

export default function AppBar() {
  const navigate = useNavigate();
  const { setAuthToken } = useGlobalState();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('AuthToken')
    setAuthToken(null)
    navigate("/login")
  }

  const alertDialog = () => {
    Alert.alert("FACEGYM | Cerrar Sesión", "¿Estás seguro que quieres cerrar sesión?",
        [
        { text: 'Sí', onPress: () => handleLogout() },
        { text: 'No', onPress: () => console.log('Presionado No') },
      ]
      )
  }


  return (
    <View style={styleAppBar.appBar}>

      <View>
        <Text style={styleAppBar.textDark}>FORCEGYM</Text>

        <View style={styleAppBar.appBarDate}>
          <Image
            source={require("../../../assets/svgs-login/date-img.png")}
            style={styleAppBar.imgDate}
          />

          <Text style={styleAppBar.textDate}>
            {date.toLocaleDateString("es-ES")}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>

        <TouchableHighlight onPress={() => alertDialog()}>
          <Image source={require("../../../assets/svgs-login/logout-img.png")} style={{ width: 30, height: 30 }}/>
        </TouchableHighlight>

        <Link to={"/menu"}>
          <Image source={require("../../../assets/svgs-login/h-menu.png")} style={{ width: 30, height: 30 }}/>
        </Link>

      </View>

    </View>
  );
}
