import { View, Image } from "react-native";
import { TextWithColor } from "./brdText";
import { Link } from "react-router-native";
export default function TrainersCard({ item, stylePosts, stylesShowPackages }) {
  const INA = require("../../assets/svgs-login/trainer-inactive-img.png");
  const AC = require("../../assets/svgs-login/trainer-active-img.png");

  return (
    <Link to={`/trainer/${item._id_trainer}`}>
      <View style={stylesShowPackages.containerPackage} key={item._id_trainer}>
        <View style={stylesShowPackages.packagesAll}>
          <View style={stylesShowPackages.containerInfoPackage}>
            <View style={stylesShowPackages.containerNamePackage}>
              <TextWithColor color={"#E5E3E4"} fontSize={12}>
                {item.name_trainer}
              </TextWithColor>

              <View style={stylesShowPackages.containerImgPackage}>
                <Image
                  source={item.status_trainer === "INA" ? INA : AC}
                  style={stylePosts.newImage}
                />
                <TextWithColor
                  color={item.status_trainer === "INA" ? "#E55374" : "#7CE061"}
                  fontSize={12}
                >
                  {item.status_trainer === "INA" ? "Inactivo" : "Activo"}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerPackagesTrainers}>
              <View>
                <TextWithColor color={"#E5E3E4"} fontSize={12}>
                  Paquetes
                </TextWithColor>
              </View>

              <View>
                <TextWithColor color={"#BEB9C2"} fontSize={12}>
                  {item.packages_trainer}
                </TextWithColor>
              </View>
            </View>

            <View style={stylesShowPackages.containerDescriptionPackage}>
              <TextWithColor color={"#8C8C8C"} fontSize={12}>
                {item.info_trainer}
              </TextWithColor>

              <TextWithColor color={"#DCDCDC"} fontSize={12}>
                {item.schedule_trainer}
              </TextWithColor>

              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                Creado el {item.created_at}
              </TextWithColor>

              {item.updated_at !== item.created_at ? <TextWithColor color={"#47AE82"} fontSize={10}>
                Actualizado el {item.updated_at}
              </TextWithColor> : null}

              <TextWithColor color={"#5A5A5A"} fontSize={10}>
                Estado {item.status_trainer === "INA" ? "Inactiva" : "Activa"}
              </TextWithColor>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}
