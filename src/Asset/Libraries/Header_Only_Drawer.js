
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

export class Header_Only_Drawer extends Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <View>
                <Mystatusbar />
                <View style={{ height: hp('8%'), backgroundColor: color.appGreen, flexDirection: 'row', justifyContent: 'center', shadowColor: color.lightGray, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1 }}>
                    <TouchableOpacity onPress={() => this.props.onPressLeftIcon()} style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../Icons/menu.png')} style={{ height: wp('8%'), width: wp('8%'), tintColor: color.white }} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.70, justifyContent: 'center', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ fontSize: fontSize.Medium, color: color.white, fontFamily: fontFamily.OpenSansRegular }}>{this.props.HeaderText}</Text>
                    </View>
                    <View style={{ flex: 0.15, justifyContent: 'center' }}></View>
                </View>
            </View>

        )
    }
};













