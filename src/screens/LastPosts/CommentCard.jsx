import { TextWithColor } from "../../components/brdText";
import { View, Image, Alert, TextInput, Modal, ActivityIndicator} from "react-native";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { useEffect, useState } from "react";
import { updateComment } from "../../services/adminManagePost/updateComment";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import { deleteComment } from "../../services/adminManagePost/deleteComment";

export default function CommentCard({ ColorsButton, username, created_at, comment_content, infoUser, user_id, comment_id }) {
  const [isEditing, setIsEditing] = useState(false);

  // Estado @Global de la app 
  const { authToken, setCommentsUpdate, commentsUpdate } = useGlobalState();

  // Estados de la verificación del comentario
  const [comment, setComment] = useState(comment_content);
  const [disable, setDisable] = useState(true);

  // Estado de carga para los botones editar y eliminar
  const [loading, setLoading] = useState(false);

  // Estado para ver si mostrar el comentario en modo edición
  const [isEditingComment, setIsEditingComment] = useState(false);

  // Controla cuando el usuario presiona el botón de editar
  const editComment = () => {
    setIsEditingComment(!isEditingComment);
  }

  const showAuthor = () => {
    Alert.alert("FORCEGYM | Reportar", "Si deseas reportar un comentario puedes hacerlo aquí brdcontact@breadriuss.store");
  };

  const onPressEdit = () => {
    setIsEditingComment(false);
    setIsEditing(!isEditing);
  }


  // Verificación de el contenido del comentario
  const verifyTextComment = (e) => {
    if (e.length > 0) {
      setDisable(false);
      setComment(e);

      if (e.length > 255) {
        setDisable(true);
      }
    } else {
      setDisable(true);
      setComment(null);
    }
  };

  // Función para editar el comentario
  const handleUpdateComment = async () => {
    const { error, data } = await updateComment(authToken, setLoading, comment_id, comment);

    if (error) {
      Alert.alert("FORCEGYM | Error", error);
    }

    if (data) {
      setCommentsUpdate(!commentsUpdate);
      editComment();
    }
  }

  const handleDeleteComment = async () => {
    Alert.alert("FACEGYM | Eliminar", "¿Estás seguro que deseas eliminar este comentario?", 
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            const { error, data } = await deleteComment(authToken, setLoading, comment_id);
            if (error) {
              Alert.alert("FORCEGYM | Error", error);
            }

            if (data) {
              setCommentsUpdate(!commentsUpdate);
            }
          },
        },
      ],
    );
  }
  
  // Verificación de autor de comentario
  const VerifyAuthorComment = () => {
   return (
    <>
      {infoUser._id === user_id 
      ?
        <TouchableOpacity onPress={() => onPressEdit()}>
          <Image source={require("../../../assets/svgs-login/edit-comment-img.png")} style={{ width: 18, height: 18 }}/>
        </TouchableOpacity> 
      :
        <TouchableOpacity onPress={showAuthor}>
          <Image source={require("../../../assets/svgs-login/edit-comment-img.png")} style={{ width: 18, height: 18 }}/>
        </TouchableOpacity>
      }
    </>
    )
  }

  return (
    <>
    <View style={{ backgroundColor: "#fefffc", paddingTop: 10, paddingBottom: 5, gap: 10, alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
      {isEditing && (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}>
          
          <Shadow style={{ borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 2, paddingTop: 4, alignItems: "center", justifyContent: "center" }} distance={2}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity onPress={() => editComment()} style={{ flexDirection: "row", gap: 5 }}>

                <Image source={require("../../../assets/svgs-login/update-comment-img.png")} style={{ width: 18, height: 18 }}/>
                <TextWithColor>
                  Editar
                </TextWithColor>

              </TouchableOpacity>
            </View>
          </Shadow>

          <Shadow style={{ borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 2, paddingTop: 4, alignItems: "center", justifyContent: "center" }} distance={2}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity onPress={() => handleDeleteComment()} style={{ flexDirection: "row", gap: 5 }}>

                <Image source={require("../../../assets/svgs-login/delete-comments-img.png")} style={{ width: 18, height: 18 }}/>
                <TextWithColor>
                  Borrar
                </TextWithColor>

              </TouchableOpacity>
            </View>
          </Shadow>

        </View>
      )}      
    </View>

    <View
      style={{
        backgroundColor: "#fefffc",
        padding: 15,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
      >
      <View style={{ gap: 5 }}>
        <View style={{ justifyContent: "space-between", flexDirection: "row", gap: 5 }}>

          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image
              source={require("../../../assets/svgs-login/thing-gym.png")}
              style={{ width: 20, height: 20 }}
              />

            <TextWithColor
              style={{
                fontWeight: "bold",
                color: ColorsButton.colorLetter.color,
              }}
              >
              {username}
            </TextWithColor>
          </View>
          
          <View>
            <TouchableOpacity onPress={() => {
              {}
            }}>
              <VerifyAuthorComment />
            </TouchableOpacity>
          </View>

        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            backgroundColor: "#f0f0f0",
            paddingVertical: 3,
            paddingHorizontal: 6,
            borderRadius: 20,
            width: 128,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/svgs-login/date-post-.png")}
            style={{ width: 10, height: 10 }}
          />
          <TextWithColor
            style={{ color: ColorsButton.colorLetter.color, fontSize: 8 }}
          >
            publicado el {created_at?.slice(0, 10)}
          </TextWithColor>
        </View>
      </View>

      <View
        style={{ backgroundColor: "#f0f0f0", padding: 10, borderRadius: 20 }}>
          <TextWithColor
          style={{ color: ColorsButton.colorLetter.color, fontSize: 13 }}
          >
            {comment_content}
          </TextWithColor>
        </View>
    </View>

    <Modal visible={isEditingComment} style={{ backgroundColor: "#00"}} transparent={true} statusBarTranslucent>

      <View style={{ backgroundColor: "#0808082c", height: "100%", width: "100%", justifyContent: "center", alignItems: "center", gap: 10 }}>

        <View style={{ backgroundColor: "#f0f0f0", padding: 10, borderRadius: 20, gap: 10, width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <TextInput value={comment} onChangeText={(e) => verifyTextComment(e)} 
            style={{ borderColor: "#a3a3a3", borderWidth: 0.8, padding: 8, borderRadius: 20, width: 250 }}
            />

            {disable ?
              <Image source={require("../../../assets/svgs-login/send-comment-none.png")} style={{ width: 30, height: 30 }}/>
              : (
                loading === true ? <ActivityIndicator color={ColorsButton.colorLetter.color}/> 
                :
                <TouchableOpacity onPress={() => handleUpdateComment()}>
                  <Image source={require("../../../assets/svgs-login/send-comment.png")} style={{ width: 30, height: 30 }}/>
                </TouchableOpacity>
              )
            }
        </View>
        
        <TouchableOpacity onPress={() => editComment()}>
          <TextWithColor style={{ color: "#fe7171", backgroundColor: "#b14545", paddingTop: 4, paddingBottom: 2, paddingHorizontal: 14, borderRadius: 20 }}>
            Cancelar
          </TextWithColor>
        </TouchableOpacity>

      </View>

    </Modal>
  </>
  );
}
