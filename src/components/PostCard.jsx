import { View, Image, TouchableHighlight } from "react-native";
import { TextWithColor } from "./brdText";
import { Link } from "react-router-native";
export default function PostCard({ stylesShowPackages, stylePosts, item, infoUser }) {
  return (
    <Link to={`/post/${item.uuid}`}>

      <View style={stylesShowPackages.containerPackage} key={item._id_package}>
        
        <View style={stylesShowPackages.packagesAll}>
          <View style={stylesShowPackages.containerInfoPackage}>

            <View style={stylesShowPackages.containerNamePackage}>
              <TextWithColor color={"#E5E3E4"} fontSize={12}>
                {item.title_post}
              </TextWithColor>

              <View style={stylesShowPackages.containerImgPackage}>
                <Image
                  source={require("../../assets/svgs-login/lil-book-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#AFDDA1"} fontSize={12}>
                  {item.price_package}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerDescriptionPackage}>
              <TextWithColor color={"#CDCDCD"} fontSize={12}>
                {item.description_post}
              </TextWithColor>

              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                Creado el {item.created_at}
              </TextWithColor>

              {item.updated_at !== item.created_at ? <TextWithColor color={"#47AE82"} fontSize={10}>Actualizado el {item.updated_at}</TextWithColor> : null }

              <TextWithColor color={"#B084D6"} fontSize={10}>
                {item._id_user === infoUser?._id ? `Registrado por ti (${infoUser?.name})` : `Registrado por @${item.name}`}
              </TextWithColor>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}
