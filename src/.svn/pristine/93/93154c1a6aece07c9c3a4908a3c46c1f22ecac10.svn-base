import { StyleSheet } from 'react-native';
import { fontSize, color, fontFamily, width, height } from "./fontsAndColors";
import { wp, hp, loc, rol } from './../Libraries/ResponsiveScreen';

const textInputView = StyleSheet.create({
    View: {
        height: hp('7%'),
        flexDirection: 'row',
        borderRadius: 30,
        marginLeft: wp('10%'),
        marginRight: wp('10%'),
        borderWidth: hp('0.2%'),
        marginTop: hp('2.5%'),
        borderColor: color.lightGray
    },
    textInputIconStyle: {
        height: wp('6%'),
        width: wp('6%'),
        tintColor: color.appGreen
    },
});
const backIcon = StyleSheet.create({
    containerView: {
        height: hp('6%'),
        flexDirection: 'row',
        marginTop: hp('2%')
    },
    iconView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: wp('8%'),
        width: wp('8%')
    },
})
const title = StyleSheet.create({
    titleView: {
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: fontSize.Large,
        color: color.black,
        fontFamily: fontFamily.OpenSansSemiBold
    },
    titleBelowTextView: {
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp('10%'),
        marginRight: wp('10%')
    },
    titleBelowTextStyle: {
        color: color.black,
        fontSize: fontSize.Small,
        fontFamily: fontFamily.OpenSansRegular,
        textAlign: 'center'
    }
})
const drawerComponentStyle = StyleSheet.create({
    View: {
        height: hp('6.5%'),
        flexDirection: 'row'
    },
    iconView: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textView: {
        flex: 7.5,
        justifyContent: 'center'
    }
})

export { textInputView, backIcon, title, drawerComponentStyle };
