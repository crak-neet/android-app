import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from 'react-native';

import { fontSize, color, fontFamily, width, height, } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, Icon, connect, ModalPicker, } from '../../Asset/Libraries/NpmList';
import { Header_Only_Drawer } from '../../Asset/Libraries/index'
import { SkiplistArrayReducer_ClearAction } from './../../Redux/Actions/SkiplistArrayReducer_ClearAction';
import { StartSubjectTestAction } from './../../Redux/Actions/StartSubjectTestAction';
class SubjectTest extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            token: '',
            subjectId: "",
            subjectName: "",
            ReducerClear: 0

        }
        this.onStartTest = debounce(this.onStartTest.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }

    componentWillMount() {
        AsyncStorage.getItem("Token", (error, Token) => {
            if (Token) {
                this.setState({
                    token: Token
                })
                // this.props.DropdownSubjectAction(Token)
            }
        })
    }

    componentDidMount() {
        this.props.SkiplistArrayReducer_ClearAction(this.state.ReducerClear)
    }

    onStartTest(Route_Name) {

        if (Route_Name == "false") {
            alert("Your subscription has been Expired, Please contact Admin")
        } else {
        if (this.state.subjectId == "") {
            Snackbar.show({
                title: "Kindy choose any subject",
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            this.props.StartSubjectTestAction(this.state.token, this.state.subjectId, this.state.subjectName)
            // this.props.navigation.navigate("SubjectTest_Questions")
        }
    }
    }

    render() {
        const { subjectList,Examvalidation } = this.props.NeetReducer
       
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: color.white, }}>

                    <Header_Only_Drawer onPressLeftIcon={() => this.props.navigation.navigate('DrawerOpen')} HeaderText='Subject Test' />
                    <Image source={require('./../../Asset/Images/NeetBg.png')} style={{ height: hp('85%'), marginTop: hp('8%'), marginLeft: wp('10%'), width: wp('90%'), position: 'absolute' }} />

                    <View style={{ flex: 0.1, justifyContent: 'center' }} />
                    <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={require('../../Asset/Icons/books-stack-of-three.png')} style={{ height: wp('35%'), width: wp('35%'), tintColor: color.appGreen }} />
                    </View>

                    <View style={{ flex: 0.15, justifyContent: 'center', marginLeft: wp('10%'), marginRight: wp('10%') }}>
                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: hp('3.5%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), }}>
                            <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/test1.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: color.appGreen }} />
                            </View>
                            <View style={{ flex: 0.80, justifyContent: 'center' }}>
                                <ModalPicker
                                    data={subjectList}
                                    initValue={"Subject Name"}
                                    optionStyle={{ paddingTop: height / 100 * 2, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center', }}

                                    cancelContainer={{ borderRadius: 0, width: width, top: (height - height / 100 * 75) / 2 }}
                                    cancelStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                    cancelTextStyle={{ fontSize: fontSize.Medium, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15, color: '#fff', }}

                                    overlayStyle={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}
                                    optionTextStyle={{ fontSize: fontSize.Small, padding: width / 100 * 0.5, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}

                                    sectionStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                    sectionTextStyle={{ fontSize: fontSize.Small, color: '  ', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectTextStyle={{ color: this.state.subjectId == "" ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectStyle={{ height: height / 100 * 5, flex: 0, borderColor: '#fff', justifyContent: 'center', borderWidth: 0, padding: 0, borderRadius: 0 }}
                                    onChange={(option) => { this.setState({ subjectId: option.SubjectId, subjectName: option.label }) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'center' }}>
                    {
                        Examvalidation == true ?
                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest("true")} ButtonText='Start Test' />
                            :
                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest("false")} ButtonText='Start Test' />

                    }                  
                      </View>
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
        SkiplistArrayReducer_ClearAction: (ReducerClear) => {
            dispatch(SkiplistArrayReducer_ClearAction(ReducerClear));
        },
        StartSubjectTestAction: (Token, SubjectId,subjectName) => {
            dispatch(StartSubjectTestAction(Token, SubjectId,subjectName));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubjectTest);
