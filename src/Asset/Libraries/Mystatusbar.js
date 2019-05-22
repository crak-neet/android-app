import React from 'react';
import { StatusBar, View, Dimensions, Platform } from 'react-native';
import { LinearGradient } from './NpmList';
import { fontSize, color, fontFamily, } from '../NeetStyles/fontsAndColors';
import { wp, hp } from './ResponsiveScreen'

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[{ height: hp('2%'), justifyContent: 'center' }, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const Mystatusbar = () => {
    return (

        <View style={{ backgroundColor: color.appGreen }}>
            {Platform.OS == "android" ?

                <MyStatusBar barStyle="default" />

                : <MyStatusBar barStyle="light-content" />}
            {Platform.OS == "android" ?

                <View style={{ height: wp('2%'), }} />

                : null}


        </View>
    )
}

export { Mystatusbar };