import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image,TouchableOpacity,
    AsyncStorage, Modal
} from 'react-native';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, connect } from '../../Asset/Libraries/NpmList';
import { Header_BackIcon } from '../../Asset/Libraries/index'
import { AllSummaryDetailsReportAction } from './../../Redux/Actions/AllSummaryDetailsReportAction';
class AssessmentTest_SummaryReports extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            token: "",
            subjectModalVisible: false
        }
        this.onViewDetail = debounce(this.onViewDetail.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
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
            }
        })
    }
    onViewDetail() {
        const { SummaryreportDetail_SummaryId } = this.props.NeetReducer
        // TestTypeId :
        // 1->Chapter Test,
        // 2->Subject Test,
        // 3->Assesment Test,
        // 4->Neet Model Test,
        // 5->Special Test
        this.props.AllSummaryDetailsReportAction(this.state.token, SummaryreportDetail_SummaryId, "3")
    }
    backIconPress() {
        this.props.navigation.goBack()
    }
    onSubName() {
        this.setState({
            subjectModalVisible: true
        })
    }

    onRequestClose() {
        this.setState({
            subjectModalVisible: false
        });
    }
    render() {
        const { SummaryreportDetail } = this.props.NeetReducer
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: color.white, }}>
                    <Header_BackIcon onPressLeftIcon={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress()} HeaderText='Summary Report' />
                    <View style={{ height: hp('70%'), marginTop: hp('5%'), marginLeft: wp('5%'), marginRight: wp('5%'), borderWidth: wp('0.2%'), borderRadius: wp('3%') }}>
                        <View style={{ height: hp('20%'), justifyContent: 'center' }}>
                            <View style={{ height: hp('5%'), justifyContent: 'center', flexDirection: 'row', marginTop: hp('1%') }}>
                                <View style={{ flex: 4.5, justifyContent: 'center', borderBottomWidth: hp('0.1%'), marginLeft: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('./../../Asset/Icons/calendar.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>{SummaryreportDetail[0].TestDate}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}></View>
                                <View style={{ flex: 4.5, justifyContent: 'center', borderBottomWidth: hp('0.1%'), marginRight: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('./../../Asset/Icons/stopwatch.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>{SummaryreportDetail[0].TimeTaken}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', flexDirection: 'row', marginTop: hp('1%') }}>
                                <View style={{ flex: 4.5, justifyContent: 'center', borderBottomWidth: hp('0.1%'), marginLeft: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('./../../Asset/Icons/test98.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>{SummaryreportDetail[0].TestName}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}></View>
                                <View style={{ flex: 4.5, justifyContent: 'center', borderBottomWidth: hp('0.1%'), marginRight: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('./../../Asset/Icons/book.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                    </View>
                                    <TouchableOpacity onPress={() => this.onSubName()}  style={{ flex: 7, justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>{SummaryreportDetail[0].Subject[0].SubjectName}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', flexDirection: 'row', marginTop: hp('1%') }}>
                                <View style={{ flex: 4.5, justifyContent: 'center', borderBottomWidth: hp('0.1%'), marginLeft: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('./../../Asset/Icons/test3.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>{SummaryreportDetail[0].StudentMarks}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}></View>
                                <View style={{ flex: 4.5, justifyContent: 'center', borderBottomWidth: hp('0.1%'), marginRight: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('./../../Asset/Icons/grade.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Grade-{SummaryreportDetail[0].Grade}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{ height: hp('5%'), justifyContent: 'center', flexDirection: 'row', marginTop: hp('1%'), borderBottomWidth: hp('0.1%'), marginLeft: wp('4%'), marginRight: wp('4%'), borderBottomColor: color.lightGray, flexDirection: 'row' }}>
                                <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('./../../Asset/Icons/Average.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                </View>
                                <View style={{ flex: 8.8, justifyContent: 'center' }}>
                                    <Text numberOfLines={2} style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, color: color.black, marginLeft: wp("1%") }}>{SummaryreportDetail[0].Result}</Text>
                                </View>
                            </View> */}
                        </View>
                        <View style={{ height: hp('6%'), justifyContent: 'center', marginTop: hp('1.6%') }}>
                            <View style={{ height: hp('3.5%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'flex-start' }} />
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: "center" }}>
                                    <Image source={require('./../../Asset/Icons/Average.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                </View>
                                <View style={{ flex: 0.6, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansRegular, color: color.black, marginLeft: wp("1%") }}>{SummaryreportDetail[0].Result}</Text>
                                </View>
                                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'flex-start' }} />
                            </View>
                        </View>
                        <View style={{ height: hp('37%'), justifyContent: 'center', backgroundColor: '#ebebeb', marginTop: hp('1%'), borderBottomLeftRadius: wp('3.1%'), borderBottomRightRadius: wp('3%') }}>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Number of questions</Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].TotalNoofQestion}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Number of correct answer </Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].NoofCorrectAnswer}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Marks of correct answer </Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].MarkofCorrectAnswer}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Number of Wrong Answer </Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].NoofWrongAnswer}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Negative marks of wrong answer </Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].NegativeMarksOfWrongAnswer}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Number of unanswered Questions </Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].NoofUnAnswer}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('5%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>Marks of unanswered Questions </Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>:</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray, textAlign: 'center' }}>{SummaryreportDetail[0].MarkofUnAnswer}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: hp('3%') }} />
                    <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onViewDetail : this.onViewDetail()} ButtonText='View Detail' />

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.subjectModalVisible}
                        onRequestClose={() => { this.setState({ subjectModalVisible: false }) }}>
                        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <TouchableOpacity onPressOut={() => this.onRequestClose()} style={{ height: hp('100%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingBottom: hp('2%') }}>
                                <View style={{ flex: 0.2, width: wp('80%'), justifyContent: 'center', backgroundColor: color.white, borderRadius: hp('1.5%') }}>
                                    <View style={{ height: hp('7%'), justifyContent: 'center', borderBottomColor: color.appGreen, borderBottomWidth: hp('0.15%') }}>
                                        <Text style={{ fontSize: fontSize.lightMedium, color: color.appRed, fontFamily: fontFamily.OpenSansBold, textAlign: 'center' }}>Subject Name</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', marginTop: hp('0.5%'), marginBottom: hp('0.5%'), marginLeft: wp('2%'), marginRight: wp('2%') }}>
                                        <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>{SummaryreportDetail[0].Subject[0].SubjectName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback >
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
        AllSummaryDetailsReportAction: (Token, Summary, TypeId) => {
            dispatch(AllSummaryDetailsReportAction(Token, Summary, TypeId));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentTest_SummaryReports);