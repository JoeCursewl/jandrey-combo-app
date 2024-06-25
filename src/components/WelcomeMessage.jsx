import { Text, View, Image } from "react-native"
import { SpecialText } from '../components/brdText'

export default function WelcomeMessage({ stylesDash, username }) {

    const image = require('../../assets/svgs-login/novedades-img.png')

    return (
        <View style={stylesDash.dashContainer}>
            <View style={stylesDash.welcomeMsg}>
                <Image source={image} style={stylesDash.dashSvgs}/>
                <Text style={stylesDash.fontBig}>
                    Bienvenido <SpecialText>{username !== undefined ? username : '---'}</SpecialText>, estamos listos!
                </Text>
            </View>
        </View>
    )
}