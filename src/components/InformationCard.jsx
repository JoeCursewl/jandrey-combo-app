import { View, Image } from "react-native";
import { TextWithColor } from "./brdText";
import { Link } from "react-router-native";
export default function InformationCard({
  stylesShowPackages,
  item,
  stylePosts,
}) {
  const INA = require("../../assets/svgs-login/trainer-inactive-img.png");
  const AC = require("../../assets/svgs-login/trainer-active-img.png");

  return (
    <Link to={`/information/${item._id_info}`}>
      <View style={stylesShowPackages.containerPackage} key={item._id_info}>
        <View style={stylesShowPackages.packagesAll}>
          <View style={stylesShowPackages.containerInfoPackage}>
            <View style={stylesShowPackages.containerNamePackage}>
              <TextWithColor color={"#E5E3E4"} fontSize={12}>
                {item.name_contact}
              </TextWithColor>

              <View style={stylesShowPackages.containerImgPackage}>
                <Image
                  source={item.status_contact === "INA" ? INA : AC}
                  style={stylePosts.newImage}
                />
                <TextWithColor
                  color={item.status_contact === "INA" ? "#E55374" : "#7CE061"}
                  fontSize={12}
                >
                  {item.status_contact === "INA" ? "Inactivo" : "Activo"}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerPackagesTrainers}>
              <View>
                <TextWithColor color={"#E5E3E4"} fontSize={12}>
                  {item.description_contact}
                </TextWithColor>
              </View>
              <View>
                <TextWithColor color={"#BEB9C2"} fontSize={12}>
                  {item.email_contact}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerPackagesTrainers}>
              <View>
                <TextWithColor color={"#E5E3E4"} fontSize={12}>
                  Teléfonos
                </TextWithColor>
              </View>
              <View>
                <TextWithColor color={"#BEB9C2"} fontSize={12}>
                  {item.phones_contact}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerDescriptionPackage}>
              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                Creado el {item.created_at}
              </TextWithColor>

              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                {item.updated_at !== item.created_at
                  ? `Actualizado el ${item.updated_at}`
                  : `Esta información no ha sido actualizada`}
              </TextWithColor>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}
