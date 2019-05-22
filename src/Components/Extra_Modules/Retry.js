import React, { Component } from 'react';
import {
    View, Image, TouchableOpacity, Dimensions, Text, NetInfo, Alert, AsyncStorage
} from 'react-native';
import { debounce,connect } from './../../Asset/Libraries/NpmList';
import { color, fontFamily, fontSize, height } from './../../Asset/NeetStyles/fontsAndColors';
// const { height } = Dimensions.get("window");
import { wp, hp } from './../../Asset/Libraries/ResponsiveScreen'

export default class Retry extends Component {
    constructor(props) {
        console.disableYellowBox = true;
        super(props);
        this.state = {
        };
        this._reload = debounce(this._reload.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }
    
  
    _reload() {
        NetInfo.isConnected.fetch().done((data) => {
            if (data == false) {
                Alert.alert(
                    '',
                    'No internet connection available. Please try again later.',
                    [
                     
                        { text: 'OK', onPress: () => { cancelable: false } },
                    ],
                    { cancelable: false }
                )
            } else if (data == true) {
                this.props.navigation.goBack()
                // AsyncStorage.getItem("validuser", (error, validUser) => {
                //     if (validUser == "1") {
                        // this.props.navigation.navigate('Drawer')
                    // } else {
                    //     this.props.navigation.navigate('Login')
                    // }
                // })
            }
        })
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center',backgroundColor:color.white }}>
                <View style={{ height: '74%', justifyContent: 'center',alignItems:'center' }}>
                <Image source={require("./../../Asset/Images/logo.png")} style={{ height: wp('25%'), width: wp('75%')}}></Image>

                    <Text style={{ fontFamily: fontFamily.OpenSansBold, marginLeft: wp('5%'), marginRight: wp('5%'), marginTop: hp('24%'), fontSize: fontSize.Medium, color: color.black, textAlign: 'center' }}>No Internet Connection,Check Your Internet Connection</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.skipDebounce ? this.props._reload : this._reload()} style={{
                    height: '7%', justifyContent: 'center', alignContent: 'center', borderRadius: height / 100 * 10,
                    elevation: 6, marginHorizontal: '25%', backgroundColor: color.appGreen
                }}>
                    <Text style={{ fontFamily: fontFamily.OpenSansRegular, fontSize: fontSize.Small, color: color.white, textAlign: 'center' }}>Try Again</Text>
                </TouchableOpacity>
            </View >
        )
    }
}
