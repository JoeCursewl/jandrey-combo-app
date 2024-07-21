import { View, Text, Image, Alert, ScrollView } from "react-native";
import { stylesPosts } from "./LastPosts";
import { TextWithColor } from "../../components/brdText";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/adminStuff/getPosts";
import LoadingMessage from "../../components/loading-message";
import { ColorsButton } from "../../static/ColorsButton";
import { Shadow } from "react-native-shadow-2";

// importamos el componente placeholder para cargar los posts
import { LoadingPostPlaceholder } from "./LoadingPlaceholder";

// Import del componente link para dirigirse a una ruta
import { Link } from "react-router-native";

export default function LastPosts({ infoUser, textComponent, imgText }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Indice de la páginación
  const [page, setPage] = useState(1);

  const handlePosts = async () => {
    const { posts, error } = await getPosts(setLoading, page);

    if (error) {
      Alert.alert("FG | Error", error);
    }

    setData(posts.message);
  };

  useEffect(() => {
    handlePosts();
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

          data?.map((post) => (
            <View style={{ padding: 10, width: 200, borderRadius: 15, backgroundColor: "#F7F9FD", gap: 5 }} key={post.uuid}>

              <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
                <Image source={require("../../../assets/svgs-login/date-img.png")} style={stylesPosts.imgPost}/>
                <TextWithColor style={stylesPosts.fontPost}>
                  {post.name}
                </TextWithColor>
              </View>

              <View style={{ width: "100%" }}>
                <Text style={stylesPosts.descriptionPost}>
                  {post.description_post}
                </Text>

                <Text style={stylesPosts.descriptionPost}>
                  ...
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <Image source={require("../../../assets/svgs-login/like-img.png")} style={stylesPosts.imgPost}/>
                <Image source={require("../../../assets/svgs-login/comment-img.png")} style={stylesPosts.imgPost}/>
              </View>

              <Link underlayColor={ColorsButton.colorEnergy.color} style={{ borderWidth: 0.4, borderColor: ColorsButton.colorEnergy.color, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, textALign: "center", justifyContent: "center", alignItems: "center" }}>
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
