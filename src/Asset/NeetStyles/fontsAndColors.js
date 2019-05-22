import { Dimensions, StyleSheet } from 'react-native'
import { wp, hp } from './../Libraries/ResponsiveScreen';
const { width, height } = Dimensions.get("window");

const fontFamily = {
    OpenSansBold:'OpenSans-Bold',
    OpenSansSemiBold: 'OpenSans-SemiBold',
    OpenSansRegular: 'OpenSans-Regular'
}

const fontSize = {
    // fontsize need to change for neet requirement
    verySmall: hp('2%'),
    Small: hp('2.3%'),
    lightMedium: hp('2.5%'),
    Medium: hp('3.0%'),
    Large: hp('4%')
}

const color = {
    black: '#000',
    appGreen:'#106110',
    ButtonRed:'#131313',
    white: '#ffffff',
    appRed:'#ff420e',
    lightGray:'#999999'
}
export { fontFamily, fontSize, color, width, height }