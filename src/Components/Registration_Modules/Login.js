import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,Alert,
    Platform,NativeModules
} from 'react-native';

import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import ButtonRed from '../../Asset/Libraries/ButtonRed';
import { textInputView, backIcon, title } from '../../Asset/NeetStyles/commonStyles';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, Icon, connect, DeviceInfo, FCM } from '../../Asset/Libraries/NpmList';
import { LoginAction } from './../../Redux/Actions/LoginAction';

const identifiers = [
    '1459350752', ""
  ];

  const { InAppUtils } = NativeModules

var DeviceId = DeviceInfo.getUniqueID();
class Login extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            Username: '',
            Password: '',
            DeviceType: "",
            PushNotificationId: "",
            eyeicon: "eye-with-line",
            secured: true,
            Device: "1"
        }
        this.loginNavigation = debounce(this.loginNavigation.bind(this), 1000, {
            leading: true,
            trailing: false,
        });

    }

    componentWillMount() {
        FCM.getFCMToken().then(PushNotId => {
            this.setState({
                PushNotificationId: PushNotId
            })
        })

        if (Platform.OS == "android") {
            this.setState({ DeviceType: "1", DeviceId: DeviceId })
        } else {
            this.setState({ DeviceType: "2", DeviceId: DeviceId })

        }
    }
    componentDidMount() {

    }
    passwordVisible() {
        if (this.state.eyeicon == "eye-with-line") {
            this.setState({
                eyeicon: "eye",
                secured: false
            });
        } else {
            this.setState({
                eyeicon: "eye-with-line",
                secured: true
            });
        }
    }

    loginNavigation(loginRoute) {

       // this.setState({ SpinnerVisibility: true })
        // var productIdentifier = '1459350752';
    
        // InAppUtils.loadProducts(identifiers, (error, products) => {
    
        //   InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
        //     // NOTE for v3.0: User can cancel the payment which will be available as error object here.
        //     if (response && response.productIdentifier) {
        //       //this.props.Goldcard_wechatPaymentAction(this.state.Token, this.state.Amount, date, "1")
        //       Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
        //       this.setState({ SpinnerVisibility: false })
    
        //     } else {
        //         console.error(error,error, products,response,productIdentifier)
        //       Alert.alert('Purchase Failed');
        //       this.setState({ SpinnerVisibility: false })
        //     }
    
        //   });
        //   //update store here.
        // });
        Keyboard.dismiss()
        if (loginRoute == "login") {
            if (this.state.Username == '') {
                Snackbar.show({
                    title: 'Enter your Username',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else if (this.state.Password == '') {
                Snackbar.show({
                    title: 'Enter your password',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                this.props.LoginAction(this.state.Username, this.state.Password, DeviceId, this.state.PushNotificationId, this.state.DeviceType, this.state.Device)
            }
        } else if (loginRoute == "forgotPassword") {
            this.props.navigation.navigate('ForgotPassword')

        } else {
            this.props.navigation.navigate('Registration_1')
        }
    }

    render() {
       
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: color.white, justifyContent: 'center' }}>
                    

                    <View style={{ height: hp('20%'), justifyContent: 'center', alignItems: 'center' }} >
                        <Image source={require('../../Asset/Images/logo.png')} style={{ height: wp('24%'), width: wp('75%') }} />
                    </View>

                    <View style={{ height: hp('6%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('4%') }}>
                        <Text style={{ fontSize: fontSize.Large, color: color.black, fontFamily: fontFamily.OpenSansSemiBold }}>Sign In</Text>
                    </View>
                    <View style={{ height: hp('3%'), }} />

                    <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('5%') }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../Asset/Icons/avatar.png')} style={textInputView.textInputIconStyle} />
                        </View>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <TextInput
                                placeholder='Mobile Number'
                                ref='Username'
                                returnKeyType='next'
                                maxLength={10}
                                keyboardType='numeric'
                                underlineColorAndroid='transparent'
                                style={{ fontSize: fontSize.lightMedium }}
                                onChangeText={(Username) => this.setState({ Username })}
                                onSubmitEditing={() => this.refs.Password.focus()}
                            />
                        </View>
                    </View>
                    <View style={{ height: hp('1%'), }} />

                    <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../Asset/Icons/lockk.png')} style={textInputView.textInputIconStyle} />
                        </View>
                        <View style={{ flex: 6, justifyContent: 'center' }}>
                            <TextInput
                                placeholder='Password'
                                ref='Password'
                                maxLength={25}
                                underlineColorAndroid='transparent'
                                secureTextEntry={this.state.secured}
                                style={{ fontSize: fontSize.lightMedium }}
                                returnKeyType={"go"}
                                maxLength={25}
                                onSubmitEditing={() => this.loginNavigation('login')}
                                onChangeText={(Password) => this.setState({ Password })}
                            />
                        </View>
                        <TouchableOpacity onPress={() => this.passwordVisible()} style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                            <Icon name={this.state.eyeicon} size={(wp('4.5%'))} style={{}} type="entypo" color={"#999999"} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.props.skipDebounce ? this.props.loginNavigation : this.loginNavigation('forgotPassword')} style={{ height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', marginTop: hp('1%'), marginLeft: wp('43%'), marginRight: wp('12%') }}>
                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, color: color.appThemePink, textDecorationLine: 'underline' }}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={{ height: hp('1%'), }} />

                    <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.loginNavigation : this.loginNavigation('login')} ButtonText='Login' />

                    <View style={{ height: hp('5%'), marginTop: hp('4%'), flexDirection: 'row', marginRight: wp('12%'), marginLeft: wp('12%') }}>
                        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: hp('0.2%'), width: wp('23%'), backgroundColor: color.lightGray }}></View>
                        </View>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: color.black, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular }}>Or</Text>
                        </View>
                        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: hp('0.2%'), width: wp('23%'), backgroundColor: color.lightGray }}></View>
                        </View>
                    </View>
                    <View style={{ height: hp('2%'), }} />
                    <ButtonRed OnButtonClicked={() => this.props.skipDebounce ? this.props.loginNavigation : this.loginNavigation('Register')} ButtonText='Register' />
                    <View style={{ height: hp('3%'), }} />
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
        LoginAction: (UserName, Password, DeviceId, PushNotificationId, DeviceType, Device) => {

            dispatch(LoginAction(UserName, Password, DeviceId, PushNotificationId, DeviceType, Device));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);