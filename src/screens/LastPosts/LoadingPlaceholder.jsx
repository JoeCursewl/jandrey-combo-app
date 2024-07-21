// Componente Link
import { Link } from "react-router-native";
import { stylesPosts } from "./LastPosts";
import { ColorsButton } from "../../static/ColorsButton";

// Componentes de React Native
import { View, Text, Image } from "react-native";

// Componente TextWithColor
import { TextWithColor } from "../../components/brdText";

export const LoadingPostPlaceholder = () => {
  const elements = ['1', '2', '3'];

  return (
    <>
        {elements.map(item => (
          <View
          style={{
            padding: 10,
            width: 200,
            borderRadius: 15,
            backgroundColor: "#F7F9FD",
            gap: 5,
          }}
          key={item}
        >
          <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
            <Image
              source={require("../../../assets/svgs-login/date-img.png")}
              style={stylesPosts.imgPost}
            />
            <TextWithColor style={stylesPosts.fontPost}>
              <View style={{ backgroundColor: ColorsButton.colorEnergy.color, width: "80%", height: 15, borderRadius: 100, color: '#ddd' }}>
                <TextWithColor style={{ color: 'transparent' }}>................................</TextWithColor>
              </View>
            </TextWithColor>
          </View>
  
          <View style={{ width: "100%", gap: 10 }}>
            <Text style={stylesPosts.descriptionPost}>
              <View style={{ backgroundColor: '#ddd', width: "80%", height: 15, borderRadius: 100, color: '#ddd' }}>
                <TextWithColor style={{ color: 'transparent' }}>...............................................</TextWithColor>
              </View>
            </Text>
  
            <Text style={stylesPosts.descriptionPost}>
              <View style={{ backgroundColor: '#ddd', width: "80%", height: 15, borderRadius: 100, color: '#ddd' }}>
                <TextWithColor style={{ color: 'transparent' }}>....................................</TextWithColor>
              </View>
            </Text>
          </View>
  
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image
              source={require("../../../assets/svgs-login/like-img.png")}
              style={stylesPosts.imgPost}
            />
            <Image
              source={require("../../../assets/svgs-login/comment-img.png")}
              style={stylesPosts.imgPost}
            />
          </View>
  
          <Link
            underlayColor={ColorsButton.colorEnergy.color}
            style={{
              borderWidth: 0.4,
              borderColor: ColorsButton.colorEnergy.color,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
              textALign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextWithColor style={stylesPosts.morePost}>...</TextWithColor>
          </Link>
        </View>
  
        ))}    
    </>
  )
};
