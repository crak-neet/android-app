import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
} from 'react-native';
var StudentName = ''
var MobileNumber = ''
var StudentEmail = ''
var Password = ''
var Address = ''
var Pincode = ''
var City = ''
var District = ''
var DistrictId = ''
var State = ''
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import ButtonRed from '../../Asset/Libraries/ButtonRed';
import { textInputView, backIcon, title } from '../../Asset/NeetStyles/commonStyles';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, Icon, connect } from '../../Asset/Libraries/NpmList';
import { PincodeAction } from '../../Redux/Actions/PincodeAction';
import { Validations } from '../../Asset/Libraries/Validations';
import { Header_White } from '../../Asset/Libraries/index'

class Registration_1 extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            StudentName: '',
            MobileNumber: '',
            StudentEmail: '',
            Password: '',
            ConfirmPassword: '',
            Address: '',
            Pincode: '',
            City: '',
            District: '',
            DistrictId: '1234',
            State: '',
            eyeiconPassword: "eye-with-line",
            eyeiconConfirmPassword: 'eye-with-line',
            securedConfirmPassword: true,
            securedPassword: true
        }
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onNext = debounce(this.onNext.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }

    backIconPress() {
        this.props.navigation.goBack()
    }

    onNext() {
        if (this.state.StudentName == "") {
            Snackbar.show({
                title: 'Enter Your Name',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validate_SC(this.state.StudentName)) {
            Snackbar.show({
                title: "Enter your valid Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MobileNumber == "") {
            Snackbar.show({
                title: 'Enter Your Mobile Number',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MobileNumber.length != 10) {
            Snackbar.show({
                title: 'Mobile number should be 10 digit',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.StudentEmail == "") {
            Snackbar.show({
                title: 'Enter Your Email',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validateEmail(this.state.StudentEmail)) {
            Snackbar.show({
                title: "Enter your valid email address",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.Password == "") {
            Snackbar.show({
                title: 'Enter Your Password',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.Password.length < "6") {
            Snackbar.show({
                title: 'Password should be greater than 6 Letters',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.ConfirmPassword == "") {
            Snackbar.show({
                title: 'Enter Confirm Password',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.Password != this.state.ConfirmPassword) {
            Snackbar.show({
                title: 'Please validate the Re-entered password, there is a mismatch',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.Address == "") {
            Snackbar.show({
                title: 'Enter Your Address',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.Pincode == "") {
            Snackbar.show({
                title: 'Enter your area pincode',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.Password != this.state.ConfirmPassword) {
            Snackbar.show({
                title: 'Password mismatch',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            const { PincodeFetchDetails } = this.props.NeetReducer

            StudentName = this.state.StudentName,
                MobileNumber = this.state.MobileNumber,
                StudentEmail = this.state.StudentEmail,
                Password = this.state.Password,
                Address = this.state.Address,
                Pincode = this.state.Pincode,
                City = PincodeFetchDetails.City,
                District = PincodeFetchDetails.District,
                DistrictId = this.state.DistrictId,
                State = PincodeFetchDetails.State

            this.props.navigation.navigate('Registration_2')
        }
    }
    onPincodeFetch() {
        if (this.state.Pincode.length < 6) {
            Snackbar.show({
                title: 'Enter Valid Pincode',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            this.props.PincodeAction(this.state.Pincode)
        }
    }


    passwordVisible(id) {

        if (id == '1') {
            if (this.state.eyeiconPassword == "eye-with-line") {
                this.setState({
                    eyeiconPassword: "eye",
                    securedPassword: false
                });
            } else {
                this.setState({
                    eyeiconPassword: "eye-with-line",
                    securedPassword: true
                });
            }
        } else {
            if (this.state.eyeiconConfirmPassword == "eye-with-line") {
                this.setState({
                    eyeiconConfirmPassword: "eye",
                    securedConfirmPassword: false
                });
            } else {
                this.setState({
                    eyeiconConfirmPassword: "eye-with-line",
                    securedConfirmPassword: true
                });
            }
        }
    }

    StudentNameText(Student_Name) {
        this.setState({ StudentName: Student_Name.trim() });
    }

    StudentEmailText(Student_Email) {
        this.setState({ StudentEmail: Student_Email.trim() });
    }

    MobileNumberText(Mobile_Number) {
        Mobile_Number = Mobile_Number.replace(/[^0-9]/g, "");
        this.setState({ MobileNumber: Mobile_Number.trim() });
    }

    PasswordText(Password_Text) {
        Password_Text = Password_Text.replace(/[^A-Za-z0-9]/g, "");
        this.setState({ Password: Password_Text.trim() });
    };

    ConfirmPasswordText(ConfirmPassword_Text) {
        ConfirmPassword_Text = ConfirmPassword_Text.replace(/[^A-Za-z0-9]/g, "");
        this.setState({ ConfirmPassword: ConfirmPassword_Text.trim() });
    };

    StudentAddressText(Student_Address) {
        this.setState({ Address: Student_Address.trim() });
    }

    render() {
        const { PincodeFetchDetails } = this.props.NeetReducer

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: color.white, }}>
                    <Header_White onPressLeftIcon={() => this.backIconPress()} HeaderText='Registration' />

                    <View style={{ height: hp('7%'), justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: wp('18%'), marginRight: wp('18%') }}>
                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.appRed, borderColor: color.appRed, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>1</Text>
                            </View>

                            <View style={{ height: hp('0.3'), width: wp('13%'), backgroundColor: color.black }} />

                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.white, borderColor: color.black, borderWidth: wp('0.6%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansSemiBold }}>2</Text>
                            </View>

                            <View style={{ height: hp('0.3'), width: wp('13%'), backgroundColor: color.black }} />

                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.white, borderColor: color.black, borderWidth: wp('0.6%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular }}>3</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: hp('6%'), justifyContent: 'center', marginTop: hp('1%') }}>
                        <Text style={{ color: color.appRed, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>Student Details</Text>
                    </View>


                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/profile.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.StudentName == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Student Name'
                                    ref='StudentName'
                                    maxLength={50}
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onSubmitEditing={() => this.refs.MobileNumber.focus()}
                                    onChangeText={StudentName => this.StudentNameText(StudentName)}
                                    defaultValue={this.state.StudentName}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/smartphone.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.MobileNumber == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Student Mobile'
                                    ref='MobileNumber'
                                    maxLength={10}
                                    keyboardType="numeric"
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={MobileNumber => this.MobileNumberText(MobileNumber)}
                                    onSubmitEditing={() => this.refs.StudentEmail.focus()}
                                    defaultValue={this.state.MobileNumber}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.StudentEmail == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Student Email'
                                    ref='StudentEmail'
                                    returnKeyType='next'
                                    maxLength={50}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={StudentEmail => this.StudentEmailText(StudentEmail)}
                                    onSubmitEditing={() => this.refs.Password.focus()}
                                    defaultValue={this.state.StudentEmail}

                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/lock.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Password == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 6, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Password'
                                    ref='Password'
                                    secureTextEntry={this.state.securedPassword}
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={Password => this.PasswordText(Password)}
                                    maxLength={25}
                                    onSubmitEditing={() => this.refs.ConfirmPassword.focus()}
                                    defaultValue={this.state.Password}

                                />
                            </View>
                            <TouchableOpacity onPress={() => this.passwordVisible('1')} style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                <Icon name={this.state.eyeiconPassword} size={(wp('4.5%'))} style={{}} type="entypo" color={"#999999"} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/lockk.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.ConfirmPassword == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 6, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Confirm Password'
                                    ref='ConfirmPassword'
                                    secureTextEntry={this.state.securedConfirmPassword}
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={ConfirmPassword => this.ConfirmPasswordText(ConfirmPassword)}
                                    maxLength={25}
                                    onSubmitEditing={() => this.refs.Address.focus()}
                                    defaultValue={this.state.ConfirmPassword}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.passwordVisible('2')} style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                <Icon name={this.state.eyeiconConfirmPassword} size={(wp('4.5%'))} style={{}} type="entypo" color={"#999999"} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/home.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Address == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Address'
                                    ref='Address'
                                    // multiline={true}
                                    returnKeyType='next'
                                    maxLength={150}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(Address) => this.StudentAddressText(Address)}
                                    onSubmitEditing={() => this.refs.Pincode.focus()}
                                    defaultValue={this.state.Address}

                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/post-it.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Pincode == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Enter Your Pincode'
                                    keyboardType="numeric"
                                    ref='Pincode'
                                    maxLength={6}
                                    returnKeyType="go"
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(Pincode) => this.setState({ Pincode })}
                                    onBlur={() => this.onPincodeFetch()}
                                    defaultValue={this.state.Pincode}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/skyline.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Pincode.length < 6 ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <Text style={{ color: this.state.Pincode.length < 6 ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{this.state.Pincode.length < 6 ? "City" : PincodeFetchDetails.City}</Text>
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/bo-kaap.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Pincode.length < 6 ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <Text style={{ color: this.state.Pincode.length < 6 ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{this.state.Pincode.length < 6 ? "District" : PincodeFetchDetails.District}</Text>
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/placeholder.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Pincode.length < 6 ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <Text style={{ color: this.state.Pincode.length < 6 ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{this.state.Pincode.length < 6 ? "Address" : PincodeFetchDetails.State}</Text>
                            </View>
                        </View>
                        <View style={{ height: hp('2%') }}></View>

                        <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onNext : this.onNext()} ButtonText='Next' />

                        <View style={{ height: hp('3%') }}></View>
                    </ScrollView>

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
        PincodeAction: (Pincode) => {
            dispatch(PincodeAction(Pincode));
        }
    }
}

export {
    StudentName, MobileNumber, StudentEmail, Password, Address, Pincode, City, District, DistrictId, State
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration_1);