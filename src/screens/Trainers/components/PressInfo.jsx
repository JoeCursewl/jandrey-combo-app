import { ColorsButton } from "../../../static/ColorsButton";
import { TouchableOpacity, Image } from "react-native";
import { TextWithColor } from "../../../components/brdText";

export default function PressInfo({ onPress, imgPress, text }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorsButton.colorBackgroundGray.color,
        paddingTop: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <Image
        source={imgPress}
        style={{ width: 14, height: 14, marginBottom: 3 }}
      />
      <TextWithColor
        style={{
          color: ColorsButton.colorTextApp.color,
          fontSize: 14,
        }}
      >
        {text}
      </TextWithColor>
    </TouchableOpacity>
  );
}
