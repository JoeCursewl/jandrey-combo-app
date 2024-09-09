import { View, Image } from "react-native";
import { TextWithColor } from "../../../components/brdText";
import { Link } from "react-router-native";
import { stylesCardTrainer } from "../stylesCardTrainer";

export default function CardTrainer({ trainer, ColorsButton }) {
  // arroz

  const isVerified = trainer.status_trainer === "INA" ? "Sin verificar" : "Verificado"
  const isVerifiedImage = trainer.status_trainer === "INA" ? require("../../../../assets/svgs-login/info-unverified.png") : require("../../../../assets/svgs-login/info-verified.png");

  return (
    <View
      key={trainer._id_trainer}
      style={{
        padding: 10,
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#F7F9FD",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <View>
        <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
          <Image
            source={require("../../../../assets/svgs-login/just-a-cat-img.png")}
            style={stylesCardTrainer.imgPost}
          />
          <TextWithColor
            style={{ color: ColorsButton.colorEnergy.color, width: "80%" }}
          >
            {trainer.name_trainer}
          </TextWithColor>
        </View>

        <View style={stylesCardTrainer.containerDateTrainers}>
          <Image
            source={require("../../../../assets/svgs-login/date-post-.png")}
            style={{ width: 12, height: 12, marginBottom: 2 }}
          />
          <TextWithColor
            style={{ color: ColorsButton.colorTextApp.color, fontSize: 12 }}
          >
            {trainer.created_at}
          </TextWithColor>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            backgroundColor: "#f1dfff",
            width: 100,
            borderRadius: 15,
            paddingTop: 2,
          }}
        >
          <TextWithColor style={{ color: "#977be5", fontSize: 12 }}>
            {isVerified}
          </TextWithColor>
          <Image
            source={isVerifiedImage}
            style={{ width: 15, height: 15, marginBottom: 1 }}
          />
        </View>
      </View>

      <View style={{ width: "100%", gap: 20 }}>
        <View style={{ gap: 5 }}>
          <View style={stylesCardTrainer.packages10}>
            <Image
              source={require("../../../../assets/svgs-login/packages-trainers-10.png")}
              style={{ ...stylesCardTrainer.imgPost, marginBottom: 2 }}
            />
            <TextWithColor
              style={{ color: ColorsButton.colorTextApp.color, fontSize: 14 }}
            >
              Paquetes
            </TextWithColor>
          </View>

          <TextWithColor
            style={{ ...stylesCardTrainer.descriptionPost, paddingHorizontal: 4 }}
          >
            {trainer.packages_trainer}
          </TextWithColor>
        </View>

        <View style={{ gap: 5 }}>
          <View style={stylesCardTrainer.infoTrainers}>
            <Image
              source={require("../../../../assets/svgs-login/info-trainers-10.png")}
              style={{ ...stylesCardTrainer.imgPost, marginBottom: 2 }}
            />
            <TextWithColor
              style={{ color: ColorsButton.colorTextApp.color, fontSize: 14 }}
            >
              Información
            </TextWithColor>
          </View>

          <TextWithColor
            style={{ ...stylesCardTrainer.descriptionPost, paddingHorizontal: 4 }}
          >
            {trainer.info_trainer}
          </TextWithColor>
        </View>

        <View style={{ gap: 8 }}>
          <View style={stylesCardTrainer.scheduleTrainers}>
            <Image
              source={require("../../../../assets/svgs-login/info-trainers-schedule.png")}
              style={{ ...stylesCardTrainer.imgPost, marginBottom: 2 }}
            />
            <TextWithColor
              style={{ color: ColorsButton.colorTextApp.color, fontSize: 14 }}
            >
              Horario
            </TextWithColor>
          </View>

          <TextWithColor
            style={{ ...stylesCardTrainer.descriptionPost, paddingHorizontal: 4 }}
          >
            {trainer.schedule_trainer}
          </TextWithColor>
        </View>
      </View>
        
      <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}> 
        <Link
          to={`/trainer/details/${trainer._id_trainer}`}
          underlayColor={ColorsButton.colorEnergy.color}
          style={{
            borderWidth: 0.4,
            borderColor: ColorsButton.colorEnergy.color,
            paddingHorizontal: 5,
            paddingTop: 4,
            paddingBottom: 2,
            borderRadius: 20,
            textALign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
          }}
        >
            <TextWithColor style={stylesCardTrainer.morePost}>Ver detalles</TextWithColor>

        </Link>
      </View>
    </View>
  );
}
