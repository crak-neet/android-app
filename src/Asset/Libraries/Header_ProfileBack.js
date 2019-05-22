
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import { wp, hp } from './ResponsiveScreen'
import { fontSize, color, fontFamily, } from '../NeetStyles/fontsAndColors';
import { Mystatusbar } from './index'

export class Header_ProfileBack extends Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <View>
                <Mystatusbar />
                <View style={{ height: hp('8%'), backgroundColor: color.appGreen, flexDirection: 'row', justifyContent: 'center', shadowColor: color.lightGray, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1 }}>
                    <TouchableOpacity onPress={() => this.props.onPressLeftIcon()} style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../Icons/menu.png')} style={{ height: wp('7.5%'), width: wp('7.5%'), tintColor: color.white }} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.70, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: fontSize.Medium, color: color.white, fontFamily: fontFamily.OpenSansRegular }}>{this.props.HeaderText}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.onPressRightIcon()} style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../Icons/edit.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: color.white }} />
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
};











