import { ColorsButton } from "../../static/ColorsButton";
import { View, Image, Alert, FlatList } from "react-native";
import { TextWithColor } from "../../components/brdText";
import { useEffect, useState } from "react";
import { getComments } from "../../services/adminManagePost/getComments";
import { getToken } from "../../services/asyncStorage/getAsyncStorage";
import CommentCard from "./CommentCard";
import { useGlobalState } from "../../utils/zustand/useGlobalState";
import LoadingComments from "./components/LoadingComments";
import NoComments from "./components/NoComments";
export default function Comments({ post_id, infoUser }) {
    // Estado que maneja la lista de comentarios
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estado @Global de la app para verificar si hubo un cambio en los comentarios
    const { commentsUpdate } = useGlobalState();

    const handleGetComments = async () => {
        const token = await getToken("AuthToken");
        const { error, data } = await getComments(token, setLoading, 1, setComments, comments, post_id);

        if (error) {
            return Alert.alert("FACEGYM | Error", error);
        }
    }

    useEffect(() => {
        handleGetComments();
    }, [commentsUpdate]);

  return (
    <FlatList 
    data={comments} 
    renderItem={({ item }) => (
        <CommentCard created_at={item.created_at} username={item.name} comment_content={item.comment_content} ColorsButton={ColorsButton} infoUser={infoUser} user_id={item.user_id} comment_id={item.id}/>
    )}
    style={{ height: comments.length > 0 ? 435 : "70%", width: "100%", backgroundColor: "#F7F9FD" }}
    keyExtractor={(item) => item.id}
    ListEmptyComponent={<NoComments />}
    ListFooterComponent={loading ? <LoadingComments /> : null}
    onEndReachedThreshold={0.5}

    />
  );
}
