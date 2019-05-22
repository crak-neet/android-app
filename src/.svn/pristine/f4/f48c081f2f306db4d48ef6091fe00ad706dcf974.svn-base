import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';


import { fontSize, color } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { textInputView } from '../../Asset/NeetStyles/commonStyles';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, Icon, connect } from '../../Asset/Libraries/NpmList';
import { Header_BackIcon } from '../../Asset/Libraries/index'

import { ChangePasswordAction } from './../../Redux/Actions/ChangePasswordAction';

class ChangePassword extends Component {
    constructor() {
        Keyboard.dismiss()
        super();
        this.state = {
            Token: '',
            OldPassword: '',
            NewPassword: '',
            ConfirmPassword: '',

            oldPasswordSecure: true,
            NewPasswordSecure: true,
            CNewPasswordSecure: true,
            eyeiconoldPassword: "eye-with-line",
            eyeiconNewPassword: 'eye-with-line',
            eyeiconCNewPassword: 'eye-with-line'
        }
        this.onChangePassword = debounce(this.onChangePassword.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }

    componentWillMount() {
        AsyncStorage.getItem("Token", (error, studentToken) => {
            if (studentToken) {
                this.setState({
                    Token: studentToken
                })
            }
        })
    }

    onChangePassword() {
        Keyboard.dismiss()
        if (this.state.OldPassword == '') {
            Snackbar.show({
                title: 'Old Password cannot be blank',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.NewPassword == '') {
            Snackbar.show({
                title: 'New Password cannot be blank',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.NewPassword.length < "6") {
            Snackbar.show({
                title: 'New Password should be greater than 6 Letters',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.ConfirmPassword == '') {
            Snackbar.show({
                title: 'Confirm Password cannot be blank',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.ConfirmPassword != this.state.NewPassword) {
            Snackbar.show({
                title: 'Please validate the Re-entered password, there is a mismatch',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            this.props.ChangePasswordAction(this.state.Token, this.state.OldPassword, this.state.NewPassword, this.state.ConfirmPassword)
        }
    }

    passwordVisible(id) {
        if (id == '1') {
            if (this.state.eyeiconoldPassword == "eye-with-line") {
                this.setState({
                    eyeiconoldPassword: "eye",
                    oldPasswordSecure: false
                });
            } else {
                this.setState({
                    eyeiconoldPassword: "eye-with-line",
                    oldPasswordSecure: true
                });
            }
        } else if (id == '2') {
            if (this.state.eyeiconNewPassword == "eye-with-line") {
                this.setState({
                    eyeiconNewPassword: "eye",
                    NewPasswordSecure: false
                });
            } else {
                this.setState({
                    eyeiconNewPassword: "eye-with-line",
                    NewPasswordSecure: true
                });
            }
        } else {
            if (this.state.eyeiconCNewPassword == "eye-with-line") {
                this.setState({
                    eyeiconCNewPassword: "eye",
                    CNewPasswordSecure: false
                });
            } else {
                this.setState({
                    eyeiconCNewPassword: "eye-with-line",
                    CNewPasswordSecure: true
                });
            }
        }
    }

    backIconPress() {
        this.props.navigation.goBack()
    }
    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: color.white, }}>
                    <Header_BackIcon onPressLeftIcon={() => this.backIconPress()} HeaderText='Change Password' />
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={{ height: hp('30%'), justifyContent: 'center', marginTop: hp('6%'), alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/changepassword.png')} style={{ height: hp('20%'), width: hp('20%') }} />
                            </View>

                            <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.1%'), marginTop: hp('5%') }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/lock.png')} style={textInputView.textInputIconStyle} />
                                </View>
                                <View style={{ flex: 6, justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder='Old Password'
                                        ref='OldPassword'
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.oldPasswordSecure}
                                        returnKeyType={"next"}
                                        style={{ fontSize: fontSize.lightMedium }}
                                        onChangeText={(OldPassword) => this.setState({ OldPassword })}
                                        onSubmitEditing={() => this.refs.NewPassword.focus()}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => this.passwordVisible('1')} style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                    <Icon name={this.state.eyeiconoldPassword} size={(wp('4.5%'))} style={{}} type="entypo" color={"#999999"} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: hp('1%'), }} />

                            <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.1%'), marginTop: wp('2%') }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/lock.png')} style={textInputView.textInputIconStyle} />
                                </View>
                                <View style={{ flex: 6, justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder='New Password'
                                        ref='NewPassword'
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.NewPasswordSecure}
                                        returnKeyType={"next"}
                                        style={{ fontSize: fontSize.lightMedium }}
                                        onChangeText={(NewPassword) => this.setState({ NewPassword })}
                                        onSubmitEditing={() => this.refs.ConfirmPassword.focus()}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => this.passwordVisible('2')} style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                    <Icon name={this.state.eyeiconNewPassword} size={(wp('4.5%'))} style={{}} type="entypo" color={"#999999"} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: hp('1%'), }} />

                            <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.1%'), marginTop: wp('2%') }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/lock.png')} style={textInputView.textInputIconStyle} />
                                </View>
                                <View style={{ flex: 6, justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder='Confirm Password'
                                        ref='ConfirmPassword'
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.CNewPasswordSecure}
                                        style={{ fontSize: fontSize.lightMedium }}
                                        onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                                        returnKeyType={"go"}
                                        onSubmitEditing={() => this.onChangePassword()}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => this.passwordVisible('3')} style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                    <Icon name={this.state.eyeiconCNewPassword} size={(wp('4.5%'))} style={{}} type="entypo" color={"#999999"} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: hp('2%'), }} />

                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onChangePassword : this.onChangePassword()} ButtonText='Submit' />

                        </ScrollView>
                    </TouchableWithoutFeedback>

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
        ChangePasswordAction: (Token, OldPassword, NewPassword, ConfirmPassword) => {
            dispatch(ChangePasswordAction(Token, OldPassword, NewPassword, ConfirmPassword));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);