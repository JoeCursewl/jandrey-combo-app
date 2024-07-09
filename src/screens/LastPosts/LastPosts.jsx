import { View, Text, Image, Alert, FlatList } from "react-native";
import { stylesPosts } from "./LastPosts";
import { TextWithColor } from "../../components/brdText";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/adminStuff/getPosts";
import LoadingMessage from "../../components/loading-message";

export default function LastPosts({ infoUser }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handlePosts = async () => {
    const { posts, error } = await getPosts(setLoading);

    if (error) {
      Alert.alert("FG | Error", error);
    }

    setData(posts);
    console.log(data);
  };

  useEffect(() => {
    handlePosts();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 25,
        paddingTop: 0,
        height: "auto",
        paddingBottom: 20,
      }}
    >
      <View style={stylesPosts.titlePost}>
        <Image
          source={require("../../../assets/svgs-login/posts-img.png")}
          style={stylesPosts.sizeImage}
        />

        <TextWithColor color={"#fff"} fontSize={16}>
          Últimas Novedades
        </TextWithColor>
      </View>

      {data?.message?.length === 0 ? (
        loading !== false ? null : (
          <View style={stylesPosts.noPosts}>
            <TextWithColor color={"#aaa"} fontSize={15}>
              No hay novedadess
            </TextWithColor>
          </View>
        )
      ) : null}

      {loading !== false ? (
        <LoadingMessage message={"Cargando...."} />
      ) : (
        <FlatList
          data={data.message}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <View style={stylesPosts.containerPost}>
              <View style={stylesPosts.namePost}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <TextWithColor color={"#fdfdfd"} fontSize={18}>
                    {item.title_post}
                  </TextWithColor>

                  <TextWithColor color={"#aaa"} fontSize={12}>
                    {item.created_at}
                  </TextWithColor>
                </View>

                <TextWithColor color={"#6A6565"} fontSize={12}>
                  @{item.name}
                </TextWithColor>
              </View>

              <View style={stylesPosts.descriptionPost}>
                <TextWithColor color={"#fdfdfd"} fontSize={16}>
                  {item.description_post}
                </TextWithColor>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
