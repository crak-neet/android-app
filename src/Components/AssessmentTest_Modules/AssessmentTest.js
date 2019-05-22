import React, { Component } from 'react';
import {
    View,
    Keyboard,
    Image,
    AsyncStorage,
} from 'react-native';
import { fontSize, color, width, height, } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, connect, ModalPicker } from '../../Asset/Libraries/NpmList';
import { Header_Only_Drawer } from '../../Asset/Libraries/index';
import { DropdownAssesmentAction } from './../../Redux/Actions/DropdownAssesmentAction';
import { StartAssessmentTestAction } from './../../Redux/Actions/StartAssessmentTestAction';
import { SkiplistArrayReducer_ClearAction } from './../../Redux/Actions/SkiplistArrayReducer_ClearAction';
class AssessmentTest extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            AssesmentNameVisble: false,
            subjectId: '',
            subjectName: '',
            AssessmentId: '',
            AssesmentName: '',
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
                });
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
            if (this.state.subjectId == '') {
                Snackbar.show({
                    title: "Kindy choose any subject",
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
            else if (this.state.AssessmentId == "") {
                Snackbar.show({
                    title: "Kindy choose any Assesment Name",
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
            else {
                this.props.StartAssessmentTestAction(this.state.token, this.state.subjectId, this.state.subjectName, this.state.AssessmentId, this.state.AssesmentName)
            }
        }
    }
    onChapeterDetail(SubjectId, SubjectName) {
        this.props.DropdownAssesmentAction(this.state.token, SubjectId)
        this.setState({ AssesmentNameVisble: true, subjectId: SubjectId, AssessmentId: '', subjectName: SubjectName })
    }
    render() {
        const { subjectList, assesmentList, Examvalidation } = this.props.NeetReducer
        return (
            <View style={{ flex: 1, backgroundColor: color.white, }}>
                <Header_Only_Drawer onPressLeftIcon={() => this.props.navigation.navigate('DrawerOpen')} HeaderText='Assessment Test' />
                <Image source={require('./../../Asset/Images/NeetBg.png')} style={{ height: hp('85%'), marginTop: hp('8%'), marginLeft: wp('10%'), width: wp('90%'), position: 'absolute' }} />
                <View style={{ flex: 0.1, justifyContent: 'center' }} />
                <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../Asset/Icons/004-exam.png')} style={{ height: wp('35%'), width: wp('35%'), tintColor: color.appGreen }} />
                </View>
                <View style={{ flex: 0.25, justifyContent: 'center', marginLeft: wp('10%'), marginRight: wp('10%') }}>
                    <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: hp('3.5%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), }}>
                        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../Asset/Icons/books-stack-of-three.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: color.appGreen }} />
                        </View>
                        <View style={{ flex: 0.80, justifyContent: 'center' }}>
                            <ModalPicker
                                data={subjectList}
                                initValue={"Select subject name"}
                                optionStyle={{ paddingTop: height / 100 * 2, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center', }}
                                cancelContainer={{ borderRadius: 0, width: width, top: (height - height / 100 * 75) / 2 }}
                                cancelStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                cancelTextStyle={{ fontSize: fontSize.Medium, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15, color: '#fff', }}
                                overlayStyle={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}
                                optionTextStyle={{ fontSize: fontSize.Small, padding: width / 100 * 0.5, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                sectionStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                sectionTextStyle={{ fontSize: fontSize.Small, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                selectTextStyle={{ color: this.state.subjectId == "" ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                selectStyle={{ height: height / 100 * 5, flex: 0, borderColor: '#fff', justifyContent: 'center', borderWidth: 0, padding: 0, borderRadius: 0 }}
                                onChange={(option) => { this.onChapeterDetail(option.SubjectId, option.label) }}
                            />
                        </View>
                    </View>
                    <View style={{ height: hp('3%'), }} />
                    {this.state.AssesmentNameVisble == false ? null :
                        <View style={{ height: hp('7%'), flexDirection: 'row', borderRadius: hp('3.5%'), borderColor: color.lightGray, borderWidth: hp('0.2%'), }}>
                            <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/test98.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: color.appGreen }} />
                            </View>
                            <View style={{ flex: 0.80, justifyContent: 'center' }}>
                                <ModalPicker
                                    data={assesmentList}
                                    initValue={"Assessment Test Name"}
                                    optionStyle={{ paddingTop: height / 100 * 2, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center', }}
                                    cancelContainer={{ borderRadius: 0, width: width, top: (height - height / 100 * 75) / 2 }}
                                    cancelStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                    cancelTextStyle={{ fontSize: fontSize.Medium, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15, color: '#fff', }}
                                    overlayStyle={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}
                                    optionTextStyle={{ fontSize: fontSize.Small, padding: width / 100 * 0.5, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    sectionStyle={{ borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                    sectionTextStyle={{ fontSize: fontSize.Small, color: '#393939', fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectTextStyle={{ color: this.state.AssessmentId == "" ? color.lightGray : color.black, fontSize: fontSize.Small, fontFamily: 'OpenSans-Regular', letterSpacing: width / 100 * 0.15 }}
                                    selectStyle={{ height: height / 100 * 5, flex: 0, borderColor: '#fff', justifyContent: 'center', borderWidth: 0, padding: 0, borderRadius: 0 }}
                                    onChange={(option) => { this.setState({ AssessmentId: option.AssessmentId, AssesmentName: option.label }) }}
                                />
                            </View>
                        </View>
                    }
                </View>
                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                    {
                        Examvalidation == true ?
                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest("true")} ButtonText='Start Test' />
                            :
                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest("false")} ButtonText='Start Test' />
                    }
                </View>
                <View style={{ flex: 0.2, justifyContent: 'center' }} />
            </View>
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
        DropdownAssesmentAction: (Token, SubjectId) => {
            dispatch(DropdownAssesmentAction(Token, SubjectId));
        },
        StartAssessmentTestAction: (Token, SubjectId, subjectName, AssesmentId, AssesmentName) => {
            dispatch(StartAssessmentTestAction(Token, SubjectId, subjectName, AssesmentId, AssesmentName));
        },
        SkiplistArrayReducer_ClearAction: (ReducerClear) => {
            dispatch(SkiplistArrayReducer_ClearAction(ReducerClear));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentTest);
