import { View, Text, TouchableHighlight, Image, Alert } from "react-native";
import { Link } from "react-router-native";

export default function ButtonModes({ stylesDash, name, imageRoute, path }) {
  return (
    <Link to={path}>
      <View style={stylesDash.buttonModes}>
        <Text style={stylesDash.textWhiteButton}>{name}</Text>

        <Image source={imageRoute} style={stylesDash.imgModes} />
      </View>
    </Link>
  );
}
