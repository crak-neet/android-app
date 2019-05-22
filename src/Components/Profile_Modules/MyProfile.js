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
    AsyncStorage,
    Platform
} from 'react-native';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, Icon, connect, ImagePicker, ImageCropper, FileUpload, moment } from '../../Asset/Libraries/NpmList';
import { Header_ProfileBack } from '../../Asset/Libraries/index'
import { Header_BackIcon } from '../../Asset/Libraries/index'
import { CheckRuntimePermission } from '../../Asset/Utils/index'
import { Validations } from '../../Asset/Libraries/Validations';
import { ProfileDetailAction } from './../../Redux/Actions/ProfileDetailAction';
import { ProfileUpdateAction } from './../../Redux/Actions/ProfileUpdateAction';
import { PincodeAction } from '../../Redux/Actions/PincodeAction';

class MyProfile extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            Token: '',
            studentEmail: '',
            fatherMobile: '',
            motherMobile: '',
            address: '',
            studentPincode: '',
            city: '',
            district: '',
            state: '',
            ProfilePic: '',
            profileStudentVisible: false,
            profileFatherVisible: false,
            profileMotherVisible: false,
            EditProfileView: false,
        }
        this.onProfileEdit = debounce(this.onProfileEdit.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onUpdate = debounce(this.onUpdate.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }
    componentWillMount() {
        AsyncStorage.getItem("Token", (error, token) => {
            if (token) {
                this.setState({
                    Token: token
                })
                this.props.ProfileDetailAction(token)
            }
        })
    }
    componentDidMount() {

    }
    backIconPress() {
        // this.props.navigation.goBack()
        this.setState({
            EditProfileView: false
        })
    }
    onProfileEdit() {
        const { studentInfo, fatherInfo, motherInfo } = this.props.NeetReducer
        this.setState({
            studentEmail: studentInfo.Email,
            fatherMobile: fatherInfo.FatherPhone,
            motherMobile: motherInfo.MotherPhone,
            address: studentInfo.Address,
            studentPincode: studentInfo.Pincode,
            EditProfileView: true
        })
    }
    onUpdate() {
        const { PincodeFetchDetails } = this.props.NeetReducer
        if (this.state.studentEmail == "") {
            Snackbar.show({
                title: 'Enter Your Email',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (!Validations.validateEmail(this.state.studentEmail)) {
            Snackbar.show({
                title: "Enter your valid email address",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.fatherMobile == "") {
            Snackbar.show({
                title: "Enter Your Father's Email",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.fatherMobile.length != 10) {
            Snackbar.show({
                title: 'Mobile Number Must be in 10 Digit',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.motherMobile == "") {
            Snackbar.show({
                title: "Enter Your Mother's Email",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.motherMobile.length != 10) {
            Snackbar.show({
                title: 'Mobile Number Must be in 10 Digit',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else if (this.state.address == "") {
            Snackbar.show({
                title: 'Enter Your Address',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        else {
            this.props.ProfileUpdateAction(this.state.Token,
                this.state.studentEmail,
                this.state.fatherMobile,
                this.state.motherMobile,
                this.state.address,
                this.state.studentPincode,
                PincodeFetchDetails.City,
                PincodeFetchDetails.District,
                PincodeFetchDetails.State,
                this.state.ProfilePic)
        }
    }
    onProfileVisible(RouteName) {
        if (RouteName == "Student") {
            if (this.state.profileStudentVisible == false) {
                this.setState({
                    profileStudentVisible: true,
                    profileFatherVisible: false,
                    profileMotherVisible: false,
                })
            } else {
                this.setState({
                    profileStudentVisible: false,
                })
            }
        } else if (RouteName == "Father") {
            if (this.state.profileFatherVisible == false) {
                this.setState({
                    profileFatherVisible: true,
                    profileMotherVisible: false,
                    profileStudentVisible: false,
                })
            } else {
                this.setState({
                    profileFatherVisible: false,
                })
            }
        } else {
            if (this.state.profileMotherVisible == false) {
                this.setState({
                    profileMotherVisible: true,
                    profileFatherVisible: false,
                    profileStudentVisible: false,
                })
            } else {
                this.setState({
                    profileMotherVisible: false,
                })
            }
        }
    }
    onPincodeFetch() {
        if (this.state.studentPincode.length < 6) {
            Snackbar.show({
                title: 'Enter Valid Pincode',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            this.props.PincodeAction(this.state.studentPincode)
        }
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

                        this.setState({ Status: true });
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
    render() {
        const { studentInfo, fatherInfo, motherInfo, PincodeFetchDetails } = this.props.NeetReducer
        return (
            // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: color.white, }}>
                {this.state.EditProfileView == false ?
                    <Header_ProfileBack onPressLeftIcon={() => this.props.navigation.navigate('DrawerOpen')} HeaderText='My Profile' onPressRightIcon={() => this.props.skipDebounce ? this.props.onProfileEdit : this.onProfileEdit()} />
                    :
                    <Header_BackIcon onPressLeftIcon={() => this.backIconPress()} HeaderText='Profile' />
                }
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.EditProfileView == false ?
                            <View>
                                <View style={{ height: hp('16%'), justifyContent: 'center', marginTop: hp('3%'), alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: studentInfo.StudentProfile }}
                                        style={{ height: hp('16%'), width: hp('16%'), borderRadius: hp('8%'), borderColor: color.lightGray, borderWidth: wp("0.2%") }} />
                                </View>
                                <View style={{ height: wp("2%") }} />
                                <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: wp('4%'), marginBottom: wp('4%'), borderRadius: wp('3%'), borderWidth: hp('0.15%'), borderColor: color.lightGray }}>
                                    {/* {profileDetail.map((result, index) => (<View> */}
                                    <View style={{ marginLeft: wp('4%'), marginRight: wp('4%'), marginTop: this.state.profileStudentVisible == false ? hp('1.5%') : hp('1%'), marginBottom: this.state.profileStudentVisible == false ? hp('1.5%') : hp('0.5%') }}>
                                        <TouchableOpacity onPress={() => this.onProfileVisible("Student")} style={{ flex: 1, flexDirection: 'row', }}>
                                            <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                    <Image source={require('../../Asset/Icons/profile.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                </View>
                                                <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Student</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                            </View>
                                            <View style={{ flex: 4.7, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.Student}</Text>
                                            </View>
                                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.profileStudentVisible == true ?
                                                    <Image source={require('../../Asset/Icons/small-to-up.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    :
                                                    <Image source={require('../../Asset/Icons/small-circle.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.profileStudentVisible == true ?
                                        <View style={{ flex: 1, marginLeft: wp('4%'), marginRight: wp('4%'), }}>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/personal-card.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Student Id</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.StudentId}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Email Address</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start', }}>
                                                    <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.Email}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/smartphone.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Phone</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.Phone}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/university.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>School</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.School}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/employee.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Agent Code</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.AgentCode}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/calendar.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>HSC Year</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{moment(studentInfo.HscYear).format('YYYY')}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', }}>
                                                    <View style={{ flex: 0.15, }}>
                                                        <Image source={require('../../Asset/Icons/home.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Address</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text numberOfLines={3} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.Address}</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', }}>
                                                    <View style={{ flex: 0.15, }}>
                                                        <Image source={require('../../Asset/Icons/subscription.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Subscription</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{studentInfo.Subscription}</Text>
                                                </View>
                                            </View> */}
                                            <View style={{ height: hp('1%') }}></View>

                                        </View>
                                        : null}
                                    {/* </View>))} */}
                                </View>
                                <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: wp('4%'), marginBottom: wp('4%'), borderRadius: wp('3%'), borderWidth: hp('0.15%'), borderColor: color.lightGray }}>
                                    <View style={{ marginLeft: wp('4%'), marginRight: wp('4%'), marginTop: this.state.profileFatherVisible == false ? hp('1.5%') : hp('1%'), marginBottom: this.state.profileFatherVisible == false ? hp('1.5%') : hp('0.5%') }}>
                                        <TouchableOpacity onPress={() => this.onProfileVisible("Father")} style={{ flex: 1, flexDirection: 'row', }}>
                                            <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                    <Image source={require('../../Asset/Icons/avatar.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                </View>
                                                <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Father's Name</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                            </View>
                                            <View style={{ flex: 4.7, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{fatherInfo.FatherName}</Text>
                                            </View>
                                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.profileFatherVisible == true ?
                                                    <Image source={require('../../Asset/Icons/small-to-up.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    :
                                                    <Image source={require('../../Asset/Icons/small-circle.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.profileFatherVisible == true ?
                                        <View style={{ flex: 1, marginLeft: wp('4%'), marginRight: wp('4%'), }}>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Email Address</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start', }}>
                                                    <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{fatherInfo.FatherEmail}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/mob_men.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Phone</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{fatherInfo.FatherPhone}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('0.5%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/portfolio.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Occupation</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{fatherInfo.FatherOccupation}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/personal-card.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Designation</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{fatherInfo.FatherDesignation}</Text>
                                                </View>
                                            </View>
                                            <View style={{ height: hp('1%') }}></View>
                                        </View>
                                        : null}
                                </View>
                                <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: wp('4%'), marginBottom: wp('4%'), borderRadius: wp('3%'), borderWidth: hp('0.15%'), borderColor: color.lightGray }}>
                                    <View style={{ marginLeft: wp('4%'), marginRight: wp('4%'), marginTop: this.state.profileMotherVisible == false ? hp('1.5%') : hp('0.5%'), marginBottom: this.state.profileMotherVisible == false ? hp('1.5%') : hp('0.5%') }}>
                                        <TouchableOpacity onPress={() => this.onProfileVisible("Mother")} style={{ flex: 1, flexDirection: 'row', }}>
                                            <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                    <Image source={require('../../Asset/Icons/mother.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                </View>
                                                <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                    <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Mother's Name</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                            </View>
                                            <View style={{ flex: 4.7, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{motherInfo.MotherName}</Text>
                                            </View>
                                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.profileMotherVisible == true ?
                                                    <Image source={require('../../Asset/Icons/small-to-up.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    :
                                                    <Image source={require('../../Asset/Icons/small-circle.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.profileMotherVisible == true ?
                                        <View style={{ flex: 1, marginLeft: wp('4%'), marginRight: wp('4%'), }}>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Email Address</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{motherInfo.MotherEmail}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'center', }}>
                                                        <Image source={require('../../Asset/Icons/mob_female.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'center', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Phone</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{motherInfo.MotherPhone}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('0.5%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/portfolio.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Occupation</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{motherInfo.MotherOccupation}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: hp('1%'), marginTop: hp('1%') }}>
                                                <View style={{ flex: 4.8, flexDirection: 'row', justifyContent: 'center', }}>
                                                    <View style={{ flex: 0.15, justifyContent: 'flex-start', }}>
                                                        <Image source={require('../../Asset/Icons/personal-card.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                                    </View>
                                                    <View style={{ flex: 0.85, justifyContent: 'flex-start', }}>
                                                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>Designation</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'flex-start', }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>:</Text>
                                                </View>
                                                <View style={{ flex: 5.0, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, }}>{fatherInfo.MotherDesignation}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        : null}
                                </View>
                                <View style={{ height: hp('5%') }}></View>
                            </View>
                            :
                            <View>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={{ height: hp('16%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                                            <TouchableOpacity onPress={() => this.UploadImage_Method()}>
                                                {
                                                    this.state.ProfilePic == "" ?
                                                        <Image
                                                            source={{ uri: studentInfo.StudentProfile }}
                                                            style={{ height: hp('16%'), width: hp('16%'), borderRadius: hp('8%'), borderColor: color.lightGray, borderWidth: wp("0.2%") }} />
                                                        :
                                                        <Image
                                                            source={{ uri: "https://www.crakneet.com/superadmin/" + this.state.ProfilePic }}
                                                            style={{ height: hp('16%'), width: hp('16%'), borderRadius: hp('8%'), borderColor: color.lightGray, borderWidth: wp("0.2%") }} />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ height: wp('3%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: hp('1%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/e-mail-envelope.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                <TextInput
                                                    placeholder='Student Email Address'
                                                    ref='StudentEmailAddresss'
                                                    underlineColorAndroid='transparent'
                                                    // secureTextEntry={true}
                                                    style={{ fontSize: fontSize.Small, height: hp('7%') }}
                                                    returnKeyType={"next"}
                                                    onChangeText={(studentEmail) => this.setState({ studentEmail })}
                                                    onSubmitEditing={() => this.refs.FathersMobileNumber.focus()}
                                                    defaultValue={studentInfo.Email}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        {/* {this.state.fatherMobile != "" ?
                                            <View style={{ height: hp('4%'), justifyContent: 'center', marginTop: wp('2%')  }}>
                                                <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, marginLeft:wp('11%'),}}>Father's Mobile Number</Text>
                                            </View>
                                            : null} */}
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/mob_men.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                <TextInput
                                                    placeholder={"Father's Mobile Number"}
                                                    ref="FathersMobileNumber"
                                                    maxLength={10}
                                                    keyboardType='numeric'
                                                    underlineColorAndroid='transparent'
                                                    returnKeyType={"next"}
                                                    style={{ fontSize: fontSize.Small, height: hp('7%') }}
                                                    onChangeText={(fatherMobile) => this.setState({ fatherMobile })}
                                                    onSubmitEditing={() => this.refs.MothersMobileNumber.focus()}
                                                    defaultValue={fatherInfo.FatherPhone}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/mob_female.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center', }}>
                                                <TextInput
                                                    placeholder={"Mother's Mobile Number"}
                                                    ref={"MothersMobileNumber"}
                                                    maxLength={10}
                                                    keyboardType='numeric'
                                                    underlineColorAndroid='transparent'
                                                    style={{ fontSize: fontSize.Small, height: hp('7%') }}
                                                    returnKeyType={"next"}
                                                    onChangeText={(motherMobile) => this.setState({ motherMobile })}
                                                    onSubmitEditing={() => this.refs.Address.focus()}
                                                    defaultValue={motherInfo.MotherPhone}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/home.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                <TextInput
                                                    placeholder='Address'
                                                    ref='Address'
                                                    underlineColorAndroid='transparent'
                                                    style={{ fontSize: fontSize.Small, height: hp('7%') }}
                                                    returnKeyType={"next"}
                                                    onChangeText={(address) => this.setState({ address })}
                                                    onSubmitEditing={() => this.refs.Pincode.focus()}
                                                    defaultValue={studentInfo.Address}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/post-it.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                <TextInput
                                                    placeholder="Pincode"
                                                    ref='Pincode'
                                                    maxLength={6}
                                                    keyboardType='numeric'
                                                    returnKeyType={"go"}
                                                    underlineColorAndroid='transparent'
                                                    style={{ fontSize: fontSize.Small, height: hp('7%') }}
                                                    onChangeText={(studentPincode) => this.setState({ studentPincode })}
                                                    onBlur={() => this.onPincodeFetch()}
                                                    defaultValue={studentInfo.Pincode.toString()}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/skyline.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                {/* <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular,color:color.black, marginLeft: wp('2%') }}>{PincodeFetchDetails.City == "" ? studentInfo.City: PincodeFetchDetails.City }</Text> */}
                                                <TextInput
                                                    placeholder='City'
                                                    editable={false}
                                                    ref='City'
                                                    value={PincodeFetchDetails.City}
                                                    underlineColorAndroid='transparent'
                                                    style={{ fontSize: fontSize.Small, color: color.black }}
                                                    onChangeText={(city) => this.setState({ city })}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/placeholder.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                <TextInput
                                                    placeholder='District'
                                                    editable={false}
                                                    ref='District'
                                                    value={PincodeFetchDetails.District}
                                                    underlineColorAndroid='transparent'
                                                    style={{ fontSize: fontSize.Small, color: color.black }}
                                                    onChangeText={(district) => this.setState({ district })}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('0.1%'), }} />
                                        <View style={{ height: hp('6%'), flexDirection: 'row', borderRadius: 30, marginLeft: wp('10%'), marginRight: wp('10%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), marginTop: wp('2%') }}>
                                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/placeholder.png')} style={{ height: hp('2.5%'), width: hp('2.5%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 8.5, justifyContent: 'center' }}>
                                                <TextInput
                                                    placeholder='State'
                                                    editable={false}
                                                    ref='State'
                                                    value={PincodeFetchDetails.State}
                                                    underlineColorAndroid='transparent'
                                                    style={{ fontSize: fontSize.Small, color: color.black }}
                                                    onChangeText={(state) => this.setState({ state })}

                                                />
                                            </View>
                                        </View>
                                        <View style={{ height: hp('2%'), }} />
                                        <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onUpdate : this.onUpdate()} ButtonText='Update' />
                                    </ScrollView>
                                </TouchableWithoutFeedback>
                            </View>}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
            // </TouchableWithoutFeedback>
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
        ProfileDetailAction: (Token) => {
            dispatch(ProfileDetailAction(Token));
        },
        PincodeAction: (Pincode) => {
            dispatch(PincodeAction(Pincode));
        },
        ProfileUpdateAction: (Token, StudentEmail, FatherMobile, MotherMobile, Address, Pincode, City, District, State, ProfilePic) => {
            dispatch(ProfileUpdateAction(Token, StudentEmail, FatherMobile, MotherMobile, Address, Pincode, City, District, State, ProfilePic));
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);