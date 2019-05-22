import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    Image,
    AsyncStorage
} from 'react-native';

import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import ButtonRed from '../../Asset/Libraries/ButtonRed';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, connect } from '../../Asset/Libraries/NpmList';
import { Header_Only_Drawer } from '../../Asset/Libraries/index';
import { SpecialTestRankingAction } from '../../Redux/Actions/SpecialTestRankingAction';
import { AllSummaryDetailsReportAction } from './../../Redux/Actions/AllSummaryDetailsReportAction';


class SpecialTest_Scorecard extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            Token: "",
            SpecialTestId: ""
        }
        this.onViewRank = debounce(this.onViewRank.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onReports = debounce(this.onReports.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }


    componentWillMount() {
        AsyncStorage.getItem("Token", (error, Token) => {
            if (Token) {
                this.setState({
                    Token: Token
                })
            }
        })

    }

    onViewRank() {

        const { SpecialTest_TestDetailId } = this.props.NeetReducer
        this.props.SpecialTestRankingAction(this.state.Token, SpecialTest_TestDetailId)

    }
    onReports(Summary_ID) {
        // TypeId =>1 Chapter
        // TypeId =>2 Subject
        // TypeId =>3 Assessment
        // TypeId =>4 Neet
        // TypeId =>5 Special 
        this.props.AllSummaryDetailsReportAction(this.state.Token, Summary_ID, "5")
        // this.props.navigation.navigate("SpecialTest_Reports")
    }

    render() {
        const { quickReportSpecialTest, SpecialTestStatus } = this.props.NeetReducer

        return (
            <View style={{ flex: 1, backgroundColor: color.white, }}>

                <Header_Only_Drawer onPressLeftIcon={() => this.props.navigation.navigate('DrawerOpen')} HeaderText='Special Test' />

                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <ScrollView> */}

                <View style={{ height: hp('6%'), flexDirection: 'row', marginLeft: wp('5%'), marginRight: wp('5%'), marginTop: hp('1%'), borderBottomWidth: hp('0.1%'), borderColor: color.lightGray }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../Asset/Icons/019-test-1.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                    </View>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={{ fontSize: fontSize.Small, color: color.lightGray, fontFamily: fontFamily.OpenSansRegular }}>Score Card</Text>
                    </View>
                </View>
                <View style={{ height: hp('20%'), justifyContent: 'center', marginTop: hp('2%'), alignItems: 'center' }}>
                    <Image source={{ uri: quickReportSpecialTest.StudentProfile }} style={{ height: hp('16%'), width: hp('16%'), borderRadius: hp("8%"), borderColor: color.lightGray, borderWidth: wp("0.2%") }} />
                </View>
                <View style={{ height: hp('4%'), justifyContent: 'center' }}>
                    <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansSemiBold, color: color.lightGray, textAlign: 'center' }}>{quickReportSpecialTest.StudentName}</Text>
                </View>
                <View style={{ height: hp('32%'), justifyContent: 'center', backgroundColor: "#ebebeb", marginLeft: wp('6%'), marginRight: wp('6%'), borderWidth: hp('0.1%'), borderRadius: wp('3%'), marginTop: hp('3%'), }}>
                    {/* <View style={{ flex: 0.5, flexDirection: 'row', marginTop: hp('2%') }}>
                                <View style={{ flex: 4.8, justifyContent: 'flex-start', marginLeft: wp('5%'), }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Test Id</Text>
                                </View>
                                <View style={{ flex: 0.4, justifyContent: 'flex-start', }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>:</Text>
                                </View>
                                <View style={{ flex: 4.8, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                                    <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>{quickReportSpecialTest.TestId}</Text>
                                </View>
                            </View> */}
                    <View style={{ flex: 0.5, flexDirection: 'row', marginTop: hp('2.5%') }}>
                        <View style={{ flex: 4.8, justifyContent: 'flex-start', marginLeft: wp('5%') }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Test Name</Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'flex-start', }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>:</Text>
                        </View>
                        <View style={{ flex: 4.8, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>{quickReportSpecialTest.TestName}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 4.8, justifyContent: 'flex-start', marginLeft: wp('5%') }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Marks</Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'flex-start', }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>:</Text>
                        </View>
                        <View style={{ flex: 4.8, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>{quickReportSpecialTest.StudentMarks}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 4.8, justifyContent: 'flex-start', marginLeft: wp('5%') }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Total Marks</Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'flex-start', }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>:</Text>
                        </View>
                        <View style={{ flex: 4.8, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>{quickReportSpecialTest.TotalMarks}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <View style={{ flex: 4.8, justifyContent: 'flex-start', marginLeft: wp('5%') }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Grade</Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'flex-start', }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>:</Text>
                        </View>
                        <View style={{ flex: 4.8, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>{quickReportSpecialTest.Grade}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <View style={{ flex: 4.8, justifyContent: 'flex-start', marginLeft: wp('5%') }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>Comments</Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.black }}>:</Text>
                        </View>
                        <View style={{ flex: 4.8, marginLeft: wp('3%'), justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, color: color.lightGray }}>{quickReportSpecialTest.Result}</Text>
                        </View>
                    </View>
                    <View style={{ height: hp('0.3%'), }} />

                </View>
                <View style={{ height: hp('3%'), }} />

                <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onReports : this.onReports(quickReportSpecialTest.TestDetailId)} ButtonText='Detailed Report' />


                <ButtonRed OnButtonClicked={() => this.props.skipDebounce ? this.props.onViewRank : this.onViewRank()} ButtonText={SpecialTestStatus == true ? 'View Rank' : "First Attempt Rank"} />

                <View style={{ height: hp('5%'), }} />
                {/* 
                    </ScrollView>
                </TouchableWithoutFeedback> */}

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
        SpecialTestRankingAction: (Token, SpecialTestId) => {
            dispatch(SpecialTestRankingAction(Token, SpecialTestId));
        },
        AllSummaryDetailsReportAction: (Token, Summary, TypeId) => {
            dispatch(AllSummaryDetailsReportAction(Token, Summary, TypeId));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SpecialTest_Scorecard);
