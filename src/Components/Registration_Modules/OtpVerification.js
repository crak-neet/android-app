import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    AsyncStorage,
} from 'react-native';


import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { textInputView, backIcon, title } from '../../Asset/NeetStyles/commonStyles';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, Icon, connect } from '../../Asset/Libraries/NpmList';
import { OtpVerificationAction } from '../../Redux/Actions/OtpVerificationAction';
import { OtpResendAction } from '../../Redux/Actions/OtpResendAction';
import { Header_White } from '../../Asset/Libraries/index'

class OtpVerification extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            OtpValue: '',
            token: '',
        }
        this.onValidate = debounce(this.onValidate.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onResendOTP = debounce(this.onResendOTP.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }
    componentWillMount() {
        AsyncStorage.getItem("Temp_token", (error, Token) => {
            if (Token) {
                this.setState({
                    token: Token
                });
            }
        })
    }

    onValidate() {
        if (this.state.OtpValue == "") {
            Snackbar.show({
                title: "Enter Your OTP",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            this.props.OtpVerificationAction(this.state.token, this.state.OtpValue)
        }
    }
    onResendOTP() {
        this.props.OtpResendAction(this.state.token)
    }
    backIconPress() {
        this.props.navigation.goBack()
    }
    render() {

        const { StudentMobileNumber } = this.props.NeetReducer


        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ flex: 1, backgroundColor: color.white }}>
                   
                    <Header_White onPressLeftIcon={() => this.backIconPress()} HeaderText='OTP Verification' />

                    <View style={{ height: hp('17%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('10%') }}>
                        <Image source={require('../../Asset/Icons/hand-holding-a-mobile-phone.png')} style={{ height: hp('16%'), width: hp('16%'), tintColor: color.appGreen }} />
                    </View>
                    <View style={{ height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginLeft: wp('5%'), marginRight: wp('5%'), marginTop: hp('2%') }}>
                        <Text style={{ fontSize: fontSize.Small, color: color.lightGray, textAlign: 'center', fontFamily: fontFamily.OpenSansRegular }}>One Time Password Send To</Text>
                    </View>
                    <View style={{ height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                        <Text style={{ fontSize: fontSize.Small, color: color.black, textAlign: 'center', fontFamily: fontFamily.OpenSansSemiBold }}>{StudentMobileNumber}</Text>
                    </View>
                    <View style={[textInputView.View, { marginTop: hp('2.8%') }]}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../Asset/Icons/smartphone-with-email.png')} style={textInputView.textInputIconStyle} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <TextInput
                                placeholder='Enter your OTP'
                                keyboardType='numeric'
                                ref='OtpValue'
                                maxLength={6}
                                underlineColorAndroid='transparent'
                                style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular }}
                                onChangeText={(OtpValue) => this.setState({ OtpValue })}
                            />
                        </View>
                    </View>
                    <View style={{ height: hp('1.5%') }}></View>
                    <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onValidate : this.onValidate()} ButtonText='Validate' />

                    <TouchableOpacity onPress={() => this.props.skipDebounce ? this.props.onResendOTP : this.onResendOTP()} style={{ height: hp('4%'), justifyContent: 'center', marginTop: hp('3%') }}>
                        <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, textAlign: 'right', marginRight: wp('14%'), textDecorationLine: 'underline', textDecorationColor: color.lightGray }}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        NeetReducer: state.NeetReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        OtpVerificationAction: (Token, OtpValue) => {
            dispatch(OtpVerificationAction(Token, OtpValue));
        },
        OtpResendAction: (Token, OtpValue) => {
            dispatch(OtpResendAction(Token, OtpValue));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);


