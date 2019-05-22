import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView
} from 'react-native';

var FathersName = ''
var FathersMobileNumber = ''
var FathersEmail = ''
var FathersOccupation = ''
var FathersDesignation = ''
var MothersName = ''
var MothersMobileNumber = ''
var MothersEmail = ''
var MothersOccupation = ''
var MothersDesignation = ''

import { fontSize, color, fontFamily, width, height, } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';

import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, connect, ModalPicker } from '../../Asset/Libraries/NpmList';
import { Validations } from '../../Asset/Libraries/Validations';
import { Header_White } from '../../Asset/Libraries/index'


class Registration_2 extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            FathersName: '',
            FathersMobileNumber: '',
            FathersEmail: '',
            FathersOccupation: '',
            FatherOccupationText: '',
            FathersDesignation: '',
            MotherOccupationText: '',
            MothersName: '',
            MothersMobileNumber: '',
            MothersEmail: '',
            MothersOccupation: '',
            MothersDesignation: '',
            fatherOtherInput: false,
            motherOtherInput: false
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
        if (this.state.FathersName == "") {
            Snackbar.show({
                title: "Enter Your Father's Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validate_SC(this.state.FathersName)) {
            Snackbar.show({
                title: "Enter Valid Father's Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersMobileNumber == "") {
            Snackbar.show({
                title: "Enter Your Father's MobileNumber",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersMobileNumber.length != 10) {
            Snackbar.show({
                title: "Father's Mobile number should be 10 digit",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersEmail == "") {
            Snackbar.show({
                title: "Enter Your Father's Email",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validateEmail(this.state.FathersEmail)) {
            Snackbar.show({
                title: "Invalid Father's email",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersOccupation == "") {
            Snackbar.show({
                title: "Select Father's Occupation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersOccupation == "Others" && this.state.FatherOccupationText == "") {
            Snackbar.show({
                title: "Enter Father's Occupation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersOccupation == "Others" && !Validations.validate_SC(this.state.FatherOccupationText)) {
            Snackbar.show({
                title: "Enter Valid Father's Occupation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.FathersDesignation == "") {
            Snackbar.show({
                title: "Enter Your Father's Designation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersName == "") {
            Snackbar.show({
                title: "Enter Your Mother's Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validate_SC(this.state.MothersName)) {
            Snackbar.show({
                title: "Enter Valid Mother's Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersMobileNumber == "") {
            Snackbar.show({
                title: "Enter Your Mother's MobileNumber",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersMobileNumber.length != 10) {
            Snackbar.show({
                title: "Mother's Mobile number should be 10 digit",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersEmail == "") {
            Snackbar.show({
                title: "Enter Your Mother's Email",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validateEmail(this.state.MothersEmail)) {
            Snackbar.show({
                title: "Mother's Email is Invalid",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersOccupation == "") {
            Snackbar.show({
                title: "Select Mother's Occupation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersOccupation == "Others" && this.state.MotherOccupationText == "") {
            Snackbar.show({
                title: "Enter Mother's Occupation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersOccupation == "Others" && !Validations.validate_SC(this.state.MotherOccupationText)) {
            Snackbar.show({
                title: "Enter Valid Mother's Occupation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.MothersDesignation == "") {
            Snackbar.show({
                title: "Enter Your Mother's Designation",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {

            FathersName = this.state.FathersName,
                FathersMobileNumber = this.state.FathersMobileNumber,
                FathersEmail = this.state.FathersEmail,
                FathersOccupation = this.state.FathersOccupation == "Others" ? this.state.FatherOccupationText : this.state.FathersOccupation,
                FathersDesignation = this.state.FathersDesignation,
                MothersName = this.state.MothersName,
                MothersMobileNumber = this.state.MothersMobileNumber,
                MothersEmail = this.state.MothersEmail,
                MothersOccupation = this.state.MothersOccupation == "Others" ? this.state.MotherOccupationText : this.state.MothersOccupation,
                MothersDesignation = this.state.MothersDesignation,
                this.props.navigation.navigate('Registration_3')
        }
    }


    FathersNameText(Fathers_Name) {
        this.setState({ FathersName: Fathers_Name.trim() });
    }

    Fathers_OccupationText(Fathers_Occupation) {
        this.setState({ FatherOccupationText: Fathers_Occupation.trim() });
    }

    FathersMobile_NumberText(FathersMobile_Number) {
        FathersMobile_Number = FathersMobile_Number.replace(/[^0-9]/g, "");
        this.setState({ FathersMobileNumber: FathersMobile_Number.trim() });
    }

    FathersEmailText(Fathers_Email) {
        this.setState({ FathersEmail: Fathers_Email.trim() });
    }
    FathersDesigText(Fathers_Designation) {
        this.setState({ FathersDesignation: Fathers_Designation.trim() });
    }
    MothersDesigText(Mothers_Designation) {
        this.setState({ MothersDesignation: Mothers_Designation.trim() });
    }
    MotherNameText(Mother_Name) {
        this.setState({ MothersName: Mother_Name.trim() });
    }
    Mother_OccupationText(Mother_Occupation) {
        this.setState({ MotherOccupationText: Mother_Occupation.trim() });
    }

    MotherMobile_NumberText(MotherMobile_Number) {
        MotherMobile_Number = MotherMobile_Number.replace(/[^0-9]/g, "");
        this.setState({ MothersMobileNumber: MotherMobile_Number.trim() });
    }

    MothersEmailText(Mothers_Email) {
        this.setState({ MothersEmail: Mothers_Email.trim() });

    }

    render() {
        let index = 0;
        const FatherOccupationArray = [
            { key: index++, label: 'Salaried Govt' },
            { key: index++, label: 'Salaried Private' },
            { key: index++, label: 'Self Employed - Business' },
            { key: index++, label: 'Self Employed - Professionals(Doctors)' },
            { key: index++, label: 'Self Employed - Professionals(Auditors)' },
            { key: index++, label: 'Self Employed - Professionals(Lawers)' },
            { key: index++, label: 'Others' }
        ];
        const MotherOccupationArray = [
            { key: index++, label: 'Salaried Govt' },
            { key: index++, label: 'Salaried Private' },
            { key: index++, label: 'Self Employed - Business' },
            { key: index++, label: 'Self Employed - Professionals(Doctors)' },
            { key: index++, label: 'Self Employed - Professionals(Auditors)' },
            { key: index++, label: 'Self Employed - Professionals(Lawers)' },
            { key: index++, label: 'Home Maker' },
            { key: index++, label: 'Others' }
        ];

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: color.white, }}>
                    <Header_White onPressLeftIcon={() => this.backIconPress()} HeaderText='Registration' />

                    <View style={{ height: hp('7%'), justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: wp('18%'), marginRight: wp('18%') }}>
                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.appRed, borderColor: color.appRed, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>1</Text>
                            </View>

                            <View style={{ height: hp('0.3'), width: wp('13%'), backgroundColor: color.appRed }} />

                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.appRed, borderColor: color.appRed, borderWidth: wp('0.6%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>2</Text>
                            </View>

                            <View style={{ height: hp('0.3'), width: wp('13%'), backgroundColor: color.black }} />

                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.white, borderColor: color.black, borderWidth: wp('0.6%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular }}>3</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: hp('6%'), justifyContent: 'center', marginTop: hp('1%') }}>
                        <Text style={{ color: color.appRed, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>Parent Details</Text>
                    </View>


                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/avatar.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.FathersName == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Father's Name"
                                    ref='FathersName'
                                    maxLength={30}
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(FathersName) => this.FathersNameText(FathersName)}
                                    defaultValue={this.state.FathersName}
                                    onSubmitEditing={() => this.refs.FathersMobileNumber.focus()}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/mob_men.png')} style={{ height: wp('7%'), width: wp('7%'), tintColor: this.state.FathersMobileNumber == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Father's Mobile"
                                    keyboardType="numeric"
                                    ref='FathersMobileNumber'
                                    maxLength={10}
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(FathersMobileNumber) => this.FathersMobile_NumberText(FathersMobileNumber)}
                                    onSubmitEditing={() => this.refs.FathersEmail.focus()}
                                    defaultValue={this.state.FathersMobileNumber}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.FathersEmail == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Father's Email"
                                    ref='FathersEmail'
                                    returnKeyType='next'
                                    maxLength={50}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(FathersEmail) => this.FathersEmailText(FathersEmail)}
                                    defaultValue={this.state.FathersEmail}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 0.19, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/portfolio.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.FathersOccupation == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 0.81, justifyContent: 'center', marginRight: wp('2%') }}>
                                <ModalPicker
                                    data={FatherOccupationArray}
                                    initValue={"Father's Occupation"}
                                    optionStyle={{ paddingTop: height / 100 * 2, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center', }}

                                    cancelContainer={{ borderRadius: 0, width: width, top: (height - height / 100 * 75) / 2 }}
                                    cancelStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                    cancelTextStyle={{ fontSize: fontSize.Medium, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15, color: '#fff', }}

                                    overlayStyle={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}
                                    optionTextStyle={{ fontSize: fontSize.Small, padding: width / 100 * 0.5, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}

                                    sectionStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                    sectionTextStyle={{ fontSize: fontSize.Small, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectTextStyle={{ color: this.state.FathersOccupation == "" ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectStyle={{ height: height / 100 * 5, flex: 0, borderColor: '#fff', justifyContent: 'center', borderWidth: 0, padding: 0, borderRadius: 0 }}

                                    onChange={(option) => {
                                        if (option.label == "Others") {
                                            this.setState({ FathersOccupation: option.label, fatherOtherInput: true })
                                        } else {
                                            this.setState({ FathersOccupation: option.label, fatherOtherInput: false })
                                        }
                                    }
                                    }

                                />
                            </View>
                        </View>
                        {this.state.fatherOtherInput == true ?
                            <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/portfolio.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.FatherOccupationText == "" ? color.appRed : color.appGreen }} />
                                </View>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder="Enter Father's Occupation"
                                        ref='FathersOccupation'
                                        returnKeyType='next'
                                        maxLength={50}
                                        underlineColorAndroid='transparent'
                                        style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                        onChangeText={(FatherOccupationText) => this.Fathers_OccupationText(FatherOccupationText)}
                                        defaultValue={this.state.FatherOccupationText}
                                    />
                                </View>
                            </View>
                            : null}

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/personal-card.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.FathersDesignation == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Father's Designation"
                                    ref='FathersDesignation'
                                    returnKeyType='next'
                                    maxLength={50}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(FathersDesignation) => this.FathersDesigText(FathersDesignation)}
                                    onSubmitEditing={() => this.refs.MothersName.focus()}
                                    defaultValue={this.state.FathersDesignation}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/mother.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.MothersName == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Mother's Name"
                                    ref='MothersName'
                                    returnKeyType='next'
                                    maxLength={50}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(MothersName) => this.MotherNameText(MothersName)}
                                    onSubmitEditing={() => this.refs.MothersMobileNumber.focus()}
                                    defaultValue={this.state.MothersName}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/mob_female.png')} style={{ height: wp('7%'), width: wp('7%'), tintColor: this.state.MothersMobileNumber == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Mother's Mobile"
                                    keyboardType="numeric"
                                    ref='MothersMobileNumber'
                                    maxLength={10}
                                    returnKeyType='next'
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(MothersMobileNumber) => this.MotherMobile_NumberText(MothersMobileNumber)}
                                    onSubmitEditing={() => this.refs.MothersEmail.focus()}
                                    defaultValue={this.state.MothersMobileNumber}

                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.MothersEmail == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Mother's Email"
                                    ref='MothersEmail'
                                    returnKeyType='next'
                                    maxLength={50}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(MothersEmail) => this.MothersEmailText(MothersEmail)}
                                    defaultValue={this.state.MothersEmail}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 0.19, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/portfolio.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.MothersOccupation == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 0.81, justifyContent: 'center', marginRight: wp('2%') }}>
                                <ModalPicker
                                    data={MotherOccupationArray}
                                    initValue={"Mother's Occupation"}
                                    optionStyle={{ paddingTop: height / 100 * 2, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center', }}

                                    cancelContainer={{ borderRadius: 0, width: width, top: (height - height / 100 * 75) / 2 }}
                                    cancelStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                    cancelTextStyle={{ fontSize: fontSize.Medium, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15, color: '#fff', }}

                                    overlayStyle={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}
                                    optionTextStyle={{ fontSize: fontSize.Small, padding: width / 100 * 0.5, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}

                                    sectionStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                    sectionTextStyle={{ fontSize: fontSize.Small, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectTextStyle={{ color: this.state.MothersOccupation == "" ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectStyle={{ height: height / 100 * 5, flex: 0, borderColor: '#fff', justifyContent: 'center', borderWidth: 0, padding: 0, borderRadius: 0 }}

                                    onChange={(option) => {
                                        if (option.label == "Others") {
                                            this.setState({ MothersOccupation: option.label, motherOtherInput: true })
                                        } else {
                                            this.setState({ MothersOccupation: option.label, motherOtherInput: false })
                                        }
                                    }
                                    }
                                />
                            </View>
                        </View>
                        {this.state.motherOtherInput == true ?
                            <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/portfolio.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.MotherOccupationText == "" ? color.appRed : color.appGreen }} />
                                </View>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder="Enter Mother's Occupation"
                                        ref='MothersOccupation'
                                        returnKeyType="next"
                                        maxLength={50}
                                        underlineColorAndroid='transparent'
                                        style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                        onChangeText={(MotherOccupationText) => this.Mother_OccupationText(MotherOccupationText)}
                                        onSubmitEditing={() => this.onNext()}
                                        defaultValue={this.state.MotherOccupationText}

                                    />
                                </View>
                            </View>
                            : null}

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/personal-card.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.MothersDesignation == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Mother's Designation"
                                    ref='MothersDesignation'
                                    returnKeyType='go'
                                    maxLength={50}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(MothersDesignation) => this.MothersDesigText(MothersDesignation)}
                                    // onSubmitEditing={() => this.refs.MothersName.focus()}
                                    defaultValue={this.state.MothersDesignation}
                                />
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
      
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}
export {
    FathersName, FathersMobileNumber, FathersEmail, FathersOccupation, FathersDesignation, MothersName, MothersMobileNumber, MothersEmail, MothersOccupation, MothersDesignation
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration_2);