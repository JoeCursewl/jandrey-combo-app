import { View, Image } from "react-native"
import { Link } from "react-router-native"
import { TextWithColor } from "./brdText"
export default function ArrowBack({ stylePosts, path, text, loading, packages, image }) {
    return (
        <View style={stylePosts.containerArrow}>
            <Link to={path}>
              <Image
                source={require("../../assets/svgs-login/arrow-back-img.png")}
                style={stylePosts.arrowBack}
                />
            </Link>

  
            <View style={stylePosts.containerInfoLink}>
              <Image
                source={image}
                style={stylePosts.newImage}
                />
                {loading === true ? <TextWithColor color={"#73E56D"} fontSize={10}>--</TextWithColor> : <TextWithColor fontSize={10} color={'#73E56D'}>{packages?.length}</TextWithColor>}
            </View>
  
            <TextWithColor color={"#A977C5"} fontSize={14}>
              {text}
            </TextWithColor>
          </View>
    )
}
