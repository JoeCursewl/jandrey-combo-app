import { View, Text, Image, Alert, ScrollView } from "react-native";
import { stylesPosts } from "../LastPosts/LastPosts";
import { TextWithColor } from "../../components/brdText";
import { useEffect, useState } from "react";

// Se importa la función que trae los últimos 10 entrenadores
import { getLastTrainers } from '../../services/userStuff/getLastTrainers'

import { getPosts } from "../../services/adminStuff/getPosts";
import { ColorsButton } from "../../static/ColorsButton";

// importamos el componente placeholder para cargar los posts
import { LoadingPostPlaceholder } from "../LastPosts/LoadingPlaceholder";

// Import del componente link para dirigirse a una ruta
import { Link } from "react-router-native";

export default function LastTrainers({ infoUser, textComponent, imgText, authToken }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Indice de la páginación
  const [page, setPage] = useState(1);

  const handleGetTrainers = async () => {
    const { data: trainers, error } = await getLastTrainers(authToken, setLoading, page, setData, data);

    if (error) {
      Alert.alert("FG | Error", error);
    }

    setData(trainers);
    console.log(trainers);
  };

  useEffect(() => {
    handleGetTrainers();
  }, []);

  return (
    <>
    <View style={{ flexDirection: "row", gap: 5, justifyContent: "flex-start", alignItems: "center" }}>
      <Image source={imgText} style={stylesPosts.imgLastPosts}/>
      <TextWithColor style={stylesPosts.titlePosts}>
         {textComponent}
      </TextWithColor>
    </View>

    <ScrollView horizontal style={{ width: "100%", paddingVertical: 5, gap: 20 }}>
      <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
        {loading ? (
          <LoadingPostPlaceholder />
        ) : (
          data?.map((trainer) => (
            <View key={trainer._id_trainer} style={{ padding: 10, width: 200, borderRadius: 15, backgroundColor: "#F7F9FD", gap: 10 }}>

              <View>
                <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
                    <Image source={require("../../../assets/svgs-login/just-a-cat-img.png")} style={stylesPosts.imgPost}/>
                
                    <TextWithColor style={{ color: ColorsButton.colorEnergy.color, width: "80%" }}>
                        {trainer.name_trainer}
                    </TextWithColor>
                </View>

                <View style={stylesPosts.containerDateTrainers}>
                    <Image source={require("../../../assets/svgs-login/date-post-.png")} style={{ width: 12, height: 12, marginBottom: 2 }}/>
                    <TextWithColor style={{ color: ColorsButton.colorTextApp.color, fontSize: 12 }}>
                        {trainer.created_at}
                    </TextWithColor>
                </View>

                <View style={{ flexDirection: "row", gap: 2, justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: "#f1dfff", width: 100, borderRadius: 15, paddingTop: 2 }}>
                    <TextWithColor style={{ color: "#977be5", fontSize: 12 }}>
                        {trainer.status_trainer === "INA" ? "Sin verificar" : "Verificado"}
                    </TextWithColor>
                    <Image source={trainer.status_trainer === "INA" ? require("../../../assets/svgs-login/info-unverified.png") : require("../../../assets/svgs-login/info-verified.png")} style={{ width: 15, height: 15, marginBottom: 1 }}/>
                </View>
              </View>
            

              <View style={{ width: "100%", gap: 10 }}>

                <View style={{ gap: 5 }}>
                    <View style={stylesPosts.packages10}>
                        <Image source={require("../../../assets/svgs-login/packages-trainers-10.png")} style={{ ...stylesPosts.imgPost, marginBottom: 2 }}/>
                        <TextWithColor style={{ color: ColorsButton.colorTextApp.color, fontSize: 14 }}>
                            Paquetes
                        </TextWithColor>
                    </View>

                    <TextWithColor style={{ ...stylesPosts.descriptionPost, paddingHorizontal: 4 }}>
                        {trainer.packages_trainer}
                    </TextWithColor>
                </View>

                <View style={{ gap: 5 }}>
                    <View style={stylesPosts.infoTrainers}>
                        <Image source={require("../../../assets/svgs-login/info-trainers-10.png")} style={{ ...stylesPosts.imgPost, marginBottom: 2 }}/>
                        <TextWithColor style={{ color: ColorsButton.colorTextApp.color, fontSize: 14 }}>
                            Información
                        </TextWithColor>
                    </View>

                    <TextWithColor style={{ ...stylesPosts.descriptionPost, paddingHorizontal: 4 }}>
                        {trainer.info_trainer}
                    </TextWithColor>
                </View>

                <View style={{ gap: 8 }}>
                    <View style={stylesPosts.scheduleTrainers}>
                        <Image source={require("../../../assets/svgs-login/info-trainers-schedule.png")} style={{ ...stylesPosts.imgPost, marginBottom: 2 }}/>
                        <TextWithColor style={{ color: ColorsButton.colorTextApp.color, fontSize: 14 }}>
                            Horario
                        </TextWithColor>
                    </View>

                    <TextWithColor style={{ ...stylesPosts.descriptionPost, paddingHorizontal: 4 }}>
                        {trainer.schedule_trainer}
                    </TextWithColor>
                </View>
              </View>

              <Link to={`/trainer/details/${trainer._id_trainer}`} underlayColor={ColorsButton.colorEnergy.color} style={{ borderWidth: 0.4, borderColor: ColorsButton.colorEnergy.color, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, textALign: "center", justifyContent: "center", alignItems: "center" }}>
                <TextWithColor style={stylesPosts.morePost}>Ver más</TextWithColor>
              </Link>

            </View>
          ))
        )}

      </View>
    </ScrollView>
    </>
  );
}
