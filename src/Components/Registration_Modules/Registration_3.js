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
    Platform
} from 'react-native';

import {
    StudentName, MobileNumber, StudentEmail, Password, Address, Pincode, City, District, DistrictId, State
} from './Registration_1';
import {
    FathersName, FathersMobileNumber, FathersEmail, FathersOccupation, FathersDesignation, MothersName, MothersMobileNumber, MothersEmail, MothersOccupation, MothersDesignation
} from './Registration_2';
import { fontSize, color, fontFamily, width, height, } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { textInputView, backIcon, title } from '../../Asset/NeetStyles/commonStyles';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { RegistrationAction } from '../../Redux/Actions/RegistrationAction';
import { debounce, Snackbar, FCM, DeviceInfo, connect, DateTimePicker, moment, ModalPicker, ImagePicker, ImageCropper, FileUpload } from '../../Asset/Libraries/NpmList';
import { Header_White } from '../../Asset/Libraries/index';
import { Validations } from '../../Asset/Libraries/Validations';
import { HscYearDropdownAction } from '../../Redux/Actions/HscYearDropdownAction';

import { CheckRuntimePermission } from '../../Asset/Utils/index'
var DeviceId = DeviceInfo.getUniqueID();

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



class Registration_3 extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            SchoolDetails: '',
            HscYear: '',
            BrotherSisterName: '',
            Class: '',
            BroSisSchoolDetails: '',
            siblings: "2",
            AgentCode: '',
            isToDateTimePickerVisible: false,

            DistrictId: "1234",
            ProfilePic: "",
            DeviceType: "1",
            PushNotificationId: "",
            DeviceId: "1",

            onClickYes: false,
            onClickNo: true,
            ComponentView: ScrollView
        }

        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onRegister = debounce(this.onRegister.bind(this), 1000, {
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
        this.props.HscYearDropdownAction()
    }

    backIconPress() {
        this.props.navigation.goBack()
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.setState({ ComponentView: KeyboardAwareScrollView })
        }else{
            this.setState({ ComponentView: ScrollView })

        }
    }
    onRegister() {


        const { districtheadId } = this.props.NeetReducer

        if (this.state.SchoolDetails == '') {
            Snackbar.show({
                title: "Enter Your School Details",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validateName(this.state.SchoolDetails)) {
            Snackbar.show({
                title: "Enter Valid School Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.HscYear == '') {
            Snackbar.show({
                title: "Enter Hsc Year",
                duration: Snackbar.LENGTH_SHORT,
            });
        }else if (this.state.AgentCode != "" && !Validations.validateName(this.state.AgentCode)) {
            Snackbar.show({
                title: "Enter valid agent code",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.onClickYes == true && this.state.BrotherSisterName == '') {
            Snackbar.show({
                title: "Enter Your Brother / Sister Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.onClickYes == true && !Validations.validate_SC(this.state.BrotherSisterName)) {
            Snackbar.show({
                title: "Enter Valid Name of your brother/sister",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.onClickYes == true && this.state.Class == "") {
            Snackbar.show({
                title: "Enter Brother/Sister Class",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.onClickYes == true && (!Validations.validateClass(this.state.Class))) {
            Snackbar.show({
                title: "Enter valid Class Name",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.onClickYes == true && this.state.BroSisSchoolDetails == '') {
            Snackbar.show({
                title: "Enter Your Siblings school",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.onClickYes == true && (!Validations.validateName(this.state.BroSisSchoolDetails))) {
            Snackbar.show({
                title: "Enter valid school of your Brother/sister",
                duration: Snackbar.LENGTH_SHORT,
            });
        }  else if (this.state.ProfilePic == '') {
            Snackbar.show({
                title: "Set your profile picture",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            this.props.RegistrationAction(StudentName, MobileNumber, StudentEmail, Password, Address, Pincode, City, District, districtheadId, State,
                FathersName, FathersMobileNumber, FathersEmail, FathersOccupation, FathersDesignation, MothersName, MothersMobileNumber, MothersEmail, MothersOccupation, MothersDesignation,
                this.state.SchoolDetails,this.state.HscYear+"-01-01", this.state.siblings, this.state.BrotherSisterName,
                this.state.Class, this.state.BroSisSchoolDetails, this.state.AgentCode, this.state.ProfilePic,
                this.state.DeviceId, this.state.DeviceType, this.state.PushNotificationId)
        }
    }

    onBroSisConfirm(tabRoute) {
        if (tabRoute == "1") {
            if (this.state.onClickYes == false) {
                this.setState({
                    onClickYes: true,
                    onClickNo: false,
                    siblings: "1",
                })

            } else {
                this.setState({
                    onClickYes: false,
                    onClickNo: true,
                })
            }
        } else {
            if (this.state.onClickYes == true) {
                this.setState({
                    onClickYes: false,
                    onClickNo: true,
                    siblings: "2",
                })
            } else {
                this.setState({
                    onClickYes: true,
                    onClickNo: false,
                })
            }
        }
    }

    showPicker = () => {
        const { startYear, endYear, selectedYear, selectedMonth } = this.state;
        this.picker
            .show({ startYear, endYear, selectedYear, selectedMonth })
            .then(({ year, month }) => {
                this.setState({
                    selectedYear: year,
                    selectedMonth: month
                })
            })
    }

    UploadImage_Method() {

        if (Platform.OS == "android") {
            CheckRuntimePermission('CAMERA').done((granted) => {
                if (granted == 'true') {
                    const options = {
                        quality: 1.0,
                        maxWidth: 500,
                        maxHeight: 500,
                        storageOptions: {
                            skipBackup: true
                        }
                    };
                    ImagePicker.showImagePicker(options, (response) => {

                        this.setState({ Status: true, });
                        if (response.didCancel) {

                        } else if (response.error) {

                        } else if (response.customButton) {

                        } else {

                            ImageCropper.openCropper({
                                path: response.uri,
                                compressImageQuality: 1,
                                cropperCircleOverlay: false,
                                compressImageMaxWidth: 300,
                                compressImageMaxHeight: 300,
                                cropping: true,
                                width: 300,
                                height: 300,
                                includeExif: true,

                            }).then(image => {

                                var sizeInMB = (((image.size) / (1024)) / 1024).toFixed(0);
                                var Crop_Image = image.cropRect

                                if (sizeInMB > 10) {
                                    Snackbar.show({
                                        title: 'Image size should be lessthen 10 MB',
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                                } else if (Crop_Image.width < 200 && Crop_Image.height < 200) {
                                    Snackbar.show({
                                        title: 'Image Resolution should be Greaterthen 200 * 200',
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                                } else {
                                    var thiskey = this;
                                    thiskey.setState({
                                        filename: response.fileName,
                                        filepath: response.path,
                                        filetype: response.type,
                                    });

                                    var obj = {
                                        uploadUrl: "https://www.crakneet.com/api/user/imagefileupload",
                                        method: 'POST', // default 'POST',support 'POST' and 'PUT' 
                                        headers: {
                                            'Accept': 'application/json',
                                        },
                                        fields: {
                                            // data: _this.state.filepath
                                            // data : _this.state
                                        },
                                        files: [
                                            {
                                                name: 'data', // optional, if none then `filename` is used instead 
                                                filename: thiskey.state.filename, // require, file name 
                                                filepath: thiskey.state.filepath, // require, file absoluete path 
                                                filetype: thiskey.state.filetype,
                                            },
                                        ]
                                    };


                                    FileUpload.upload(obj, function (err, result) {

                                        try {
                                            // alert()
                                            var jsonresponse = JSON.parse(result.data);
                                            if (jsonresponse.ResultStatus == 'true') {
                                                thiskey.setState({ ProfilePic: jsonresponse.FileName })
                                                Snackbar.show({
                                                    title: 'Successfully Uploaded',
                                                    duration: Snackbar.LENGTH_SHORT,
                                                });

                                            }
                                            else {
                                                Snackbar.show({
                                                    title: jsonresponse.Message,
                                                    duration: Snackbar.LENGTH_SHORT,
                                                });
                                            }

                                        }
                                        catch (e) {
                                            Snackbar.show({
                                                title: "Please try again,Later",
                                                duration: Snackbar.LENGTH_SHORT
                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                } else {
                    Snackbar.show({
                        title: 'Camera/Video Permission not granted',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            });
        } else {
            ImagePicker.showImagePicker((response) => {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                } else {

                    ImageCropper.openCropper({
                        path: response.uri,
                        compressImageQuality: 1,
                        cropperCircleOverlay: false,
                        compressImageMaxWidth: 300,
                        compressImageMaxHeight: 300,
                        cropping: true,
                        width: 300,
                        height: 300,
                        includeExif: true,

                    }).then(image => {

                        var sizeInMB = (((image.size) / (1024)) / 1024).toFixed(0);
                        var Crop_Image = image.cropRect

                        if (sizeInMB > 10) {
                            Snackbar.show({
                                title: 'Image size should be lessthen 10 MB',
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        } else if (Crop_Image.width < 200 && Crop_Image.height < 200) {
                            Snackbar.show({
                                title: 'Image Resolution should be Greaterthen 200 * 200',
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        } else {
                            var objfileName = !(image.path) ? 'SAMPLE.PNG' : image.path;

                            var _this = this;

                            _this.setState({
                                filename: image.path,
                                filepath: image.path,
                                filetype: response.type,
                            });
                            var obj = {
                                uploadUrl: "https://www.crakneet.com/api/user/imagefileupload",
                                method: 'POST', // default 'POST',support 'POST' and 'PUT' 
                                headers: {
                                    'Accept': 'application/json',
                                },
                                fields: {
                                    data: _this.state.filepath,
                                },
                                files: [
                                    {

                                        name: 'data', // optional, if none then `filename` is used instead 
                                        filename: objfileName, // require, file name 
                                        filepath: _this.state.filepath, // require, file absoluete path 
                                        filetype: _this.state.filetype,
                                    },
                                ]
                            };

                            FileUpload.upload(obj, function (err, result) {
                                try {
                                    var jsonresponse = JSON.parse(result.data);
                                    if (jsonresponse.ResultStatus == 'true') {

                                        Snackbar.show({
                                            title: 'Successfully Uploaded',
                                            duration: Snackbar.LENGTH_SHORT,
                                        });

                                        _this.setState({ ProfilePic: jsonresponse.FileName })

                                    }
                                    else {
                                        Snackbar.show({
                                            title: jsonresponse.Message,
                                            duration: Snackbar.LENGTH_SHORT,
                                        });
                                    }
                                }
                                catch (e) {

                                    Snackbar.show({
                                        title: "Please try again,Later",
                                        duration: Snackbar.LENGTH_SHORT
                                    });
                                }
                            })
                        }
                    });
                }
            });
        }
    }

    SchoolDetailsText(School_Details) {
        this.setState({ SchoolDetails: School_Details.trim() });
    }

    BrotherSisterName_Text(BrotherSister_Name) {
        this.setState({ BrotherSisterName: BrotherSister_Name.trim() });
    }

    Class_text(Class_name) {
        this.setState({ Class: Class_name.trim() });
    }

    BroSisSchoolDetails_Text(BroSisSchoolDetails_Name) {
        this.setState({ BroSisSchoolDetails: BroSisSchoolDetails_Name.trim() });
    }

    AgentCode_Text(AgentCode_Name) {
        this.setState({ AgentCode: AgentCode_Name.trim() });
    }

    HscYear_Method(HscYear_Code) {
        this.setState({ HscYear: HscYear_Code });
    }

    render() {
        const { HscYearDropdown } = this.props.NeetReducer
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

                            <View style={{ height: hp('0.3'), width: wp('13%'), backgroundColor: color.appRed }} />

                            <View style={{ height: wp('8%'), width: wp('8%'), borderRadius: wp('8%'), backgroundColor: color.appRed, borderColor: color.appRed, borderWidth: wp('0.6%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.white, fontFamily: fontFamily.OpenSansRegular }}>3</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: hp('6%'), justifyContent: 'center', marginTop: hp('1%') }}>
                        <Text style={{ color: color.appRed, fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>School Details</Text>
                    </View>

                    <this.state.ComponentView showsVerticalScrollIndicator={false}>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/university.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.SchoolDetails == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="School Name & Address"
                                    ref='SchoolDetails'
                                    returnKeyType='next'
                                    maxLength={150}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(SchoolDetails) => this.SchoolDetailsText(SchoolDetails)}
                                    defaultValue={this.state.SchoolDetails}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/smartphone.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.HscYear == "" ? color.appRed : color.appGreen }} />
                            </View>
                            <View style={{ flex: 7.5, justifyContent: 'center' }}>
                                <ModalPicker
                                    data={HscYearDropdown}
                                    initValue={this.state.HscYear == "" ? "HSC Year" : this.state.HscYear}
                                    optionStyle={{ paddingTop: height / 100 * 2, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center', }}

                                    cancelContainer={{ borderRadius: 0, width: width, top: (height - height / 100 * 75) / 2 }}
                                    cancelStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                    cancelTextStyle={{ fontSize: fontSize.Medium, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15, color: '#fff', }}

                                    overlayStyle={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}
                                    optionTextStyle={{ fontSize: fontSize.Small, padding: width / 100 * 0.5, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}

                                    sectionStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                    sectionTextStyle={{ fontSize: fontSize.Small, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectTextStyle={{ color: this.state.HscYear == "" ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectStyle={{ height: height / 100 * 5, flex: 0, borderColor: '#fff', justifyContent: 'center', borderWidth: 0, padding: 0, borderRadius: 0 }}
                                    onChange={(option) => { this.HscYear_Method(option.label) }}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/employee.png')} style={textInputView.textInputIconStyle} />
                            </View>
                            <View style={{ flex: 8, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder="Agent Code (Optional)"
                                    ref='AgentCode'
                                    maxLength={100}
                                    returnKeyType="go"
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                    onChangeText={(AgentCode) => this.AgentCode_Text(AgentCode)}
                                    defaultValue={this.state.AgentCode}
                                    onSubmitEditing={() => this.onRegister()}
                                />
                            </View>
                        </View>

                        <View style={{ height: hp('10%'), marginLeft: wp('10%'), marginRight: wp('10%'), marginTop: hp('2%') }}>
                            <View style={{ height: hp('4%'), justifyContent: 'center' }}>
                                <Text style={{ fontSize: fontSize.Small, color: color.lightGray, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>Do You Have Younger Brother/Sister</Text>
                            </View>
                            <View style={{ height: hp('4%'), flexDirection: 'row', justifyContent: 'center', marginLeft: wp('15%'), marginRight: wp('15%'), }}>
                                <TouchableOpacity onPress={() => this.onBroSisConfirm("1")} style={{ flex: 2, justifyContent: 'center' }}>
                                    {this.state.onClickYes == true ?
                                        <Image source={require('../../Asset/Icons/dot-and-circle.png')} style={{ height: wp('4.5%'), width: wp('4.5%'), tintColor: color.black }} />
                                        :
                                        <Image source={require('../../Asset/Icons/circle-shape-outline.png')} style={{ height: wp('4.5%'), width: wp('4.5%'), tintColor: color.lightGray }} />
                                    }

                                </TouchableOpacity>
                                <View style={{ flex: 4, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.Small, color: this.state.onClickYes == false ? color.lightGray : color.black, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('1%') }}>Yes</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.onBroSisConfirm("0")} style={{ flex: 2, justifyContent: 'center' }}>
                                    {this.state.onClickNo == true ?
                                        <Image source={require('../../Asset/Icons/dot-and-circle.png')} style={{ height: wp('4.5%'), width: wp('4.5%'), tintColor: color.black }} />
                                        :
                                        <Image source={require('../../Asset/Icons/circle-shape-outline.png')} style={{ height: wp('4.5%'), width: wp('4.5%'), tintColor: color.lightGray }} />
                                    }
                                </TouchableOpacity>
                                <View style={{ flex: 4, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.Small, color: this.state.onClickNo == false ? color.lightGray : color.black, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('1%') }}>No</Text>
                                </View>
                            </View>
                        </View>
                        {this.state.onClickNo == false ?
                            <View>
                                <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../Asset/Icons/children.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.BrotherSisterName == "" ? color.appRed : color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 8, justifyContent: 'center' }}>
                                        <TextInput
                                            placeholder="Brother/Sister Name"
                                            ref='BrotherSisterName'
                                            returnKeyType='next'
                                            maxLength={50}
                                            underlineColorAndroid='transparent'
                                            style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                            onChangeText={(BrotherSisterName) => this.BrotherSisterName_Text(BrotherSisterName)}
                                            onSubmitEditing={() => this.refs.Class.focus()}
                                            defaultValue={this.state.BrotherSisterName}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../Asset/Icons/personal-card.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.Class == "" ? color.appRed : color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 8, justifyContent: 'center' }}>
                                        <TextInput
                                            placeholder="Class"
                                            ref='Class'
                                            // keyboardType="numeric"
                                            returnKeyType='next'
                                            maxLength={30}
                                            underlineColorAndroid='transparent'
                                            style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                            onChangeText={(Class) => this.Class_text(Class)}
                                            onSubmitEditing={() => this.refs.BroSisSchoolDetails.focus()}
                                            defaultValue={this.state.Class}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('2%') }}>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../Asset/Icons/university.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: this.state.BroSisSchoolDetails == "" ? color.appRed : color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 8, justifyContent: 'center' }}>
                                        <TextInput
                                            placeholder="School Name & Address"
                                            ref='BroSisSchoolDetails'
                                            returnKeyType='next'
                                            maxLength={150}
                                            underlineColorAndroid='transparent'
                                            style={{ fontSize: fontSize.lightMedium, height: hp('7%'), fontFamily: fontFamily.OpenSansRegular, }}
                                            onChangeText={(BroSisSchoolDetails) => this.BroSisSchoolDetails_Text(BroSisSchoolDetails)}
                                            onSubmitEditing={() => this.refs.AgentCode.focus()}
                                            defaultValue={this.state.BroSisSchoolDetails}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: hp('1%') }}></View>
                            </View>
                            : null}
                        {this.state.onClickNo == false ?

                            <View style={{ height: hp('13%'), justifyContent: 'center', marginTop: hp('4%'), marginBottom: hp('4%'), alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.UploadImage_Method()}>
                                    {
                                        this.state.ProfilePic == "" ?

                                            <Image source={require('../../Asset/Icons/cameraadd.png')} style={{ height: wp('30%'), width: wp('30%'), tintColor: color.lightGray }} />
                                            :
                                            <Image source={{ uri: "https://www.crakneet.com/superadmin/" + this.state.ProfilePic }} style={{ height: wp('30%'), width: wp('30%'), borderRadius: wp('15%'), borderColor: color.lightGray, borderWidth: wp("0.2%") }} />

                                    }
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ height: hp('13%'), justifyContent: 'center', marginTop: hp('4%'), marginBottom: hp('4%'), alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.UploadImage_Method()}>

                                    {
                                        this.state.ProfilePic == "" ?

                                            <Image source={require('../../Asset/Icons/cameraadd.png')} style={{ height: wp('30%'), width: wp('30%'), tintColor: color.lightGray }} />
                                            :
                                            <Image source={{ uri: "https://www.crakneet.com/superadmin/" + this.state.ProfilePic }} style={{ height: wp('30%'), width: wp('30%'), borderRadius: wp('15%'), borderColor: color.lightGray, borderWidth: wp("0.2%") }} />

                                    }
                                </TouchableOpacity>
                            </View>
                        }

                        <View style={{ height: hp('3%') }}></View>

                        <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onRegister : this.onRegister()} ButtonText='Register' />

                        <View style={{ height: hp('3%') }}></View>
                        </this.state.ComponentView>
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
        RegistrationAction: (StudentName, MobileNumber, StudentEmail, Password, Address, Pincode, City, District, DistrictId, State,
            FathersName, FathersMobileNumber, FathersEmail, FathersOccupation, FathersDesignation, MothersName, MothersMobileNumber, MothersEmail, MothersOccupation, MothersDesignation,
            SchoolDetails, HscYear, siblings, BrotherSisterName, Class, BroSisSchoolDetails, AgentCode, ProfilePic,
            DeviceId, DeviceType, PushNotificationId) => {
            dispatch(RegistrationAction(StudentName, MobileNumber, StudentEmail, Password, Address, Pincode, City, District, DistrictId, State,
                FathersName, FathersMobileNumber, FathersEmail, FathersOccupation, FathersDesignation, MothersName, MothersMobileNumber, MothersEmail, MothersOccupation, MothersDesignation,
                SchoolDetails, HscYear, siblings, BrotherSisterName, Class, BroSisSchoolDetails, AgentCode, ProfilePic,
                DeviceId, DeviceType, PushNotificationId));
        },
        HscYearDropdownAction: () => {
            dispatch(HscYearDropdownAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration_3);