import { View, Image, TouchableOpacity } from "react-native"
import { useNavigate } from "react-router-native"
import { TextWithColor } from "./brdText"
import { ColorsButton } from "../static/ColorsButton"

export default function ArrowBack({ stylePosts, path, text, loading, packages, image }) {

  const navigate = useNavigate();
  const goToRoute = (to) => {
    navigate(to);
  };

    return (
        <View style={stylePosts.containerArrow}>
            <TouchableOpacity onPress={() => goToRoute(path)}>
                <Image
                  source={require("../../assets/svgs-login/post-back-img.png")}
                  style={stylePosts.arrowBack}
                  />
            </TouchableOpacity>

  
            <View style={stylePosts.containerInfoLink}>
              <Image
                source={image}
                style={stylePosts.newImage}
                />
                {loading === true ? <TextWithColor color={"#73E56D"} fontSize={10}>--</TextWithColor> : <TextWithColor fontSize={10} color={'#73E56D'}>{packages?.length}</TextWithColor>}
            </View>
  
            <TextWithColor color={ColorsButton.colorTextApp.color} fontSize={14}>
              {text}
            </TextWithColor>
          </View>
    )
}
