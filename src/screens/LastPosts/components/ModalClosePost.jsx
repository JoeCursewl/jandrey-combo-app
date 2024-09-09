import { Modal, View, Image, TouchableOpacity } from "react-native";
import { TextWithColor } from "../../../components/brdText";
import { ColorsButton } from "../../../static/ColorsButton";

export default function ModalInfoPost({ item, showModal, goToRoute, styleCardPost, setShowModal, likes, handleUpdateLike, statusLike }) {
  return (
    <Modal visible={showModal} statusBarTranslucent transparent={true}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            height: "80%",
          }}
        >
          <View style={{ gap: 5 }}>
            <View style={styleCardPost.cardPostTitle2}>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Image
                  source={require("../../../../assets/svgs-login/date-img.png")}
                  style={styleCardPost.imgPost}
                />
                <TextWithColor
                  style={{
                    color: ColorsButton.colorLetter.color,
                    fontSize: 14,
                  }}
                >
                  {item.name}
                </TextWithColor>
              </View>

              <TouchableOpacity onPress={() => goToRoute(-1)}>
                <Image
                  source={require("../../../../assets/svgs-login/post-back-img.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styleCardPost.datePost}>
              <Image
                source={require("../../../../assets/svgs-login/date-post-.png")}
                style={styleCardPost.imgDate}
              />
              <TextWithColor
                style={{ fontSize: 8, color: ColorsButton.colorLetter.color }}
              >
                publicado el {item.created_at}
              </TextWithColor>
            </View>
          </View>

          <View>
            <TextWithColor
              style={{
                color: ColorsButton.colorPrimaryApp.color,
                fontSize: 16,
              }}
            >
              {item.title_post}
            </TextWithColor>

            <TextWithColor
              style={{
                color: ColorsButton.colorLetter.color,
                fontSize: 14,
              }}
            >
              {item.description_post}
            </TextWithColor>
          </View>

          <View style={styleCardPost.cardLabels}>
            <Image
              source={require("../../../../assets/svgs-login/word-x.png")}
              style={styleCardPost.imgLabels}
            />
            <TextWithColor
              style={{ color: "#e240409a", fontSize: 12, width: "100%" }}
            >
              {item.labels}
            </TextWithColor>
          </View>

          <View style={styleCardPost.containerInteractions}>
            <TouchableOpacity
              onPress={() => {
                handleUpdateLike();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {statusLike ? (
                  <Image
                    source={require("../../../../assets/svgs-login/liked-img.png")}
                    style={styleCardPost.imgInteraction}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/svgs-login/like-img.png")}
                    style={styleCardPost.imgInteraction}
                  />
                )}
                {parseInt(likes) !== 0 ? (
                  <TextWithColor
                    style={{
                      color: ColorsButton.colorLetter.color,
                      fontSize: 11,
                    }}
                  >
                    {likes}
                  </TextWithColor>
                ) : null}
              </View>
            </TouchableOpacity>

            <View>
              <Image
                source={require("../../../../assets/svgs-login/comment-img.png")}
                style={styleCardPost.imgInteraction}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => setShowModal(false)}
          >
            <Image
              source={require("../../../../assets/svgs-login/close-post-info-img.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
