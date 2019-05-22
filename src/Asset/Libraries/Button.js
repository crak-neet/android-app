import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { fontSize, color, fontFamily } from './../NeetStyles/fontsAndColors';
import { wp, hp } from './ResponsiveScreen'
export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.OnButtonClicked()} style={{ height: hp('7%'), justifyContent: 'center', backgroundColor: color.appGreen, alignItems: 'center', borderRadius: hp("3.5"), marginLeft: wp('10%'), marginRight: wp('10%') }}>
                <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>{this.props.ButtonText}</Text>
            </TouchableOpacity>
        );
    }
}