import { Link } from "react-router-native";
import { TextWithColor } from "./brdText";
import { View, Image } from "react-native";
export default function PackageCard({ item, stylesShowPackages, stylePosts }) {
  return (
    <Link to={`/package/${item._id_package}`}>
      <View style={stylesShowPackages.containerPackage} key={item._id_package}>
        <View style={stylesShowPackages.packagesAll}>
          <View style={stylesShowPackages.containerInfoPackage}>
            <View style={stylesShowPackages.containerNamePackage}>
              <TextWithColor color={"#E5E3E4"} fontSize={12}>
                {item.name_package}
              </TextWithColor>

              <View style={stylesShowPackages.containerImgPackage}>
                <Image
                  source={require("../../assets/svgs-login/money-img.png")}
                  style={stylePosts.newImage}
                />
                <TextWithColor color={"#AFDDA1"} fontSize={12}>
                  {item.price_package}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerDescriptionPackage}>
              <TextWithColor color={"#CDCDCD"} fontSize={12}>
                {item.description_package}
              </TextWithColor>

              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                Creado el {item.created_at}
              </TextWithColor>

              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                Registrado por @{item.name_user}
              </TextWithColor>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}
