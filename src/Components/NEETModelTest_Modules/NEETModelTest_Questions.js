import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Modal,
    ScrollView,
    Dimensions,
    AsyncStorage, Alert, AppState
} from 'react-native';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import ButtonRed from '../../Asset/Libraries/ButtonRed';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, connect, GridView, ImageZoom } from '../../Asset/Libraries/NpmList';
import { Header_BackIcon, Timer_Testing, Spinner } from '../../Asset/Libraries/index'
import { ImageQuestionAction } from './../../Redux/Actions/ImageQuestionAction';
import { ImageAnswerAction } from './../../Redux/Actions/ImageAnswerAction';
import { AllCancelTest_Action } from './../../Redux/Actions/AllCancelTest_Action';
import { AllSkipList_Action } from './../../Redux/Actions/AllSkipList_Action';
import { StartNeetModel_SaveAction } from './../../Redux/Actions/StartNeetModel_SaveAction';
import { Invaliduser_Action } from './../../Redux/Actions/Invaliduser_Action';
import { QuickReportModelAction } from './../../Redux/Actions/QuickReportModelAction';
import { Background_Variable_Chapter } from './../../Redux/Actions/Background_Variable_Chapter';
var length = 180;
class NEETModelTest_Questions extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            token: '',
            Question_ImageModel: false,
            SubmitModel: false,
            Option_ImageModel: false,
            CancelModel: false,
            onQuesChange: false,
            QuestionIndex: 0,
            Option_ValueID: '',
            tabRoute: ''
        }
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onConfirmSubmit = debounce(this.onConfirmSubmit.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
        this.onCancelQues = debounce(this.onCancelQues.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }

    componentWillMount() {

        const { Skiplist_QuestionNumber, neetModelTestQuestions, questioId } = this.props.NeetReducer

        AsyncStorage.getItem("Token", (error, Token) => {
            if (Token) {
                this.setState({
                    token: Token
                })
            }
            if (questioId != null && questioId != "" && questioId != undefined) {

                this.props.StartNeetModel_SaveAction(Token, neetModelTestQuestions.TestDetailId, questioId)
                // length = 180 - 1
                var Questions_Lenght = neetModelTestQuestions.length - 1
                if (Skiplist_QuestionNumber == Questions_Lenght) {
                    this.setState({
                        QuestionIndex: Skiplist_QuestionNumber,
                    })
                } else {
                    this.setState({
                        QuestionIndex: Skiplist_QuestionNumber,
                    })
                }

            } else {
                this.setState({
                    QuestionIndex: 0
                })
            }
        })
        this.props.Background_Variable_Chapter("true")
    }

    backIconPress() {
        const { NEETModel_TimeTakenStatus } = this.props.NeetReducer
        if (NEETModel_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            this.setState({ CancelModel: true, })
        }
    }
    onConfirmSubmit() {
        const { neetModelTestQuestions, NEETModel_TimeTakenStatus, nextQuestionId, previousQuestionId, questioId } = this.props.NeetReducer
        this.onRequestClose()

        if (NEETModel_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (this.state.Option_ValueID != "") {
                fetch('https://www.crakneet.com/api/question/submitneetmodeltest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "Token": this.state.token,
                        "TestDetailId": neetModelTestQuestions.TestDetailId,
                        "QuestionId": neetModelTestQuestions.QuestionId,
                        "AnswerId": this.state.Option_ValueID
                    })
                })
                    .then((response) => response.json())
                    .then((JsonResponse) => {
                        if (JsonResponse.ResultStatus == "true") {

                            this.setState({
                                Option_ValueID: ""
                            })

                            this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, questioId)

                            this.props.AllSkipList_Action(this.state.token, neetModelTestQuestions.TestDetailId,"Normal")
                        } else if (JsonResponse.Message == "Invalid User") {
                            Alert.alert(
                                '',
                                "Another device used, You have logged out",

                                [
                                    { text: 'OK', onPress: () => this.props.Invaliduser_Action() },
                                ],
                                { cancelable: false }
                            )
                        } else {
                            Snackbar.show({
                                title: JsonResponse.Message,
                                duration: Snackbar.LENGTH_SHORT
                            });
                        }
                    })
                    .catch((error) => {
                        Snackbar.show({
                            title: "Please try again,Later",
                            duration: Snackbar.LENGTH_SHORT
                        });
                    });
            } else {
                this.props.AllSkipList_Action(this.state.token, neetModelTestQuestions.TestDetailId,"Normal")
            }
        }
    }
    onCancelQues() {
        const { neetModelTestQuestions } = this.props.NeetReducer
        this.setState({ CancelModel: false, })
        this.props.AllCancelTest_Action(this.state.token, neetModelTestQuestions.TestDetailId)
    }

    OnQuesChange(tabRoute) {
        const { neetModelTestQuestions, NEETModel_TimeTakenStatus, nextQuestionId, previousQuestionId } = this.props.NeetReducer
        if (NEETModel_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (this.state.Option_ValueID != "") {
                fetch('https://www.crakneet.com/api/question/submitneetmodeltest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "Token": this.state.token,
                        "TestDetailId": neetModelTestQuestions.TestDetailId,
                        "QuestionId": neetModelTestQuestions.QuestionId,
                        "AnswerId": this.state.Option_ValueID
                    })
                })
                    .then((response) => response.json())
                    .then((JsonResponse) => {
                        if (JsonResponse.ResultStatus == "true") {
                            this.forceUpdate()
                            if (tabRoute == "Next") {
                                if (length == this.state.QuestionIndex) {
                                    this.setState({
                                        QuestionIndex: ++this.state.QuestionIndex,
                                    })
                                } else {
                                    this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, nextQuestionId)
                                    this.setState({
                                        QuestionIndex: ++this.state.QuestionIndex,
                                    })
                                }
                            } else {
                                if (this.state.QuestionIndex == 0) {
                                } else {
                                    this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, previousQuestionId)
                                    this.setState({
                                        QuestionIndex: --this.state.QuestionIndex,
                                    })
                                }
                            }
                            this.setState({
                                Option_ValueID: ""
                            })
                            // if (tabRoute == "Next") {
                            //     this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, nextQuestionId)
                            // } else {
                            //     this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, previousQuestionId)
                            // }

                            // this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId)
                            // this.props.AllSkipList_Action(this.state.token, neetModelTestQuestions.TestDetailId)

                        } else if (JsonResponse.Message == "Invalid User") {
                            Alert.alert(
                                '',
                                "Another device used, You have logged out",
                                [
                                    { text: 'OK', onPress: () => this.props.Invaliduser_Action() },
                                ],
                                { cancelable: false }
                            )
                        } else {
                            Snackbar.show({
                                title: JsonResponse.Message,
                                duration: Snackbar.LENGTH_SHORT
                            });
                        }
                    })
                    .catch((error) => {
                        Snackbar.show({
                            title: "Please try again,Later",
                            duration: Snackbar.LENGTH_SHORT
                        });
                    });
            } else {

                if (tabRoute == "Next") {
                    if (length == this.state.QuestionIndex) {

                        this.setState({
                            QuestionIndex: ++this.state.QuestionIndex,
                        })
                    } else {

                        this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, nextQuestionId)
                        this.setState({
                            QuestionIndex: ++this.state.QuestionIndex,
                        })
                    }
                } else {
                    if (this.state.QuestionIndex == 0) {

                    } else {
                        this.props.StartNeetModel_SaveAction(this.state.token, neetModelTestQuestions.TestDetailId, previousQuestionId)
                        this.setState({
                            QuestionIndex: --this.state.QuestionIndex,
                        })
                    }
                }
            }
        }
        this.setState({
            tabRoute: tabRoute
        })
    }
    modelViewMethod(Model_RouteName, QuestionImageId) {
        const { NEETModel_TimeTakenStatus } = this.props.NeetReducer
        if (NEETModel_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (Model_RouteName == "Question_ImageModel") {
                this.props.ImageQuestionAction(this.state.token, QuestionImageId)
                this.setState({ Question_ImageModel: true, })
            } else if (Model_RouteName == "Option_ImageModel") {
                this.props.ImageAnswerAction(this.state.token, QuestionImageId)
                this.setState({ Option_ImageModel: true, })
            } else if (Model_RouteName == "SubmitModel") {
                this.setState({ SubmitModel: true, })
            } else {
                this.setState({ CancelModel: true, })
            }
        }
    }
    Option_Method(OptionId, QuestionOptions, Options) {
        const { neetModelTestQuestions, NEETModel_TimeTakenStatus } = this.props.NeetReducer
        if (NEETModel_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (neetModelTestQuestions.Status == "true") {
                Snackbar.show({
                    title: 'Already Answered',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                if (QuestionOptions.Status == "false" && this.state.Option_ValueID != OptionId) {
                    this.setState({ Option_ValueID: OptionId });
                } else {
                    this.setState({ Option_ValueID: "" });
                }
            }
        }
    }

    onRequestClose() {
        this.setState({
            Question_ImageModel: false,
            Option_ImageModel: false,
            SubmitModel: false,
            CancelModel: false
        });
    }
    Alert_Submittest() {
        const { neetModelTestQuestions } = this.props.NeetReducer
        this.props.QuickReportModelAction(this.state.token, neetModelTestQuestions.TestDetailId)
    }
    Timeup_Alert() {
        Alert.alert(
            "NEET Model Test ",
            "Time up, Submit your test now",
            [
                { text: 'OK', onPress: () => dispatch(this.Alert_Submittest()) },
            ],
            { cancelable: false }
        )
    }
    state = {
        appState: AppState.currentState
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange = (nextAppState) => {
        const { neetModelTestQuestions, Background_Variable_Chapter } = this.props.NeetReducer
        if (nextAppState === "background" && Background_Variable_Chapter == "true") {
            this.props.AllSkipList_Action(this.state.token, neetModelTestQuestions.TestDetailId,"Normal")
        }
    }
    render() {
        const { QuestionZoomImage, answerImageZoom, neetModelTestQuestions, NeetTimeTaken_Seconds, previousQuestionId, nextQuestionId, isFetchingSave } = this.props.NeetReducer
       
        var spinner = false;
        if (isFetchingSave == true) {
            spinner = <Spinner visibility={true} />
        } else {
            spinner = false
        }
        return (
            <View style={{ flex: 1, backgroundColor: "#F7F7F7", }}>

                {isFetchingSave == true ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <Header_BackIcon onPressLeftIcon={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress()} HeaderText='NEET Model Test' />

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {spinner}

                            <Text numberOfLines={1} style={{ fontSize: wp("6%"), color: color.lightGray, fontFamily: fontFamily.OpenSansSemiBold, textAlign: "center" }}>{"Loading..."}</Text>

                        </View>
                    </View>

                    :
                    <View style={{ flex: 1, backgroundColor: "#F7F7F7", }}>
                        <Header_BackIcon onPressLeftIcon={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress()} HeaderText='NEET Model Test' />
                        <View style={{ flex: 15, justifyContent: 'center', backgroundColor: color.white }}>
                            <View style={{ flex: 1, marginLeft: wp('3%'), marginRight: wp('3%'), justifyContent: 'center' }}>
                                <View style={{ height: hp('6%'), justifyContent: 'center', flexDirection: 'row', borderBottomColor: color.lightGray, borderBottomWidth: wp('0.15%') }}>
                                    <View style={{ flex: 0.65, flexDirection: 'row', justifyContent: 'center' }}>
                                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../Asset/Icons/book.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                        </View>
                                        <View style={{ flex: 0.8, justifyContent: 'center', }}>
                                            <Text numberOfLines={1} style={{ fontSize: fontSize.verySmall, color: color.lightGray, fontFamily: fontFamily.OpenSansSemiBold, }}>{"Model Test"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.35, justifyContent: 'center', flexDirection: 'row', }}>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../Asset/Icons/stopwatch.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                        </View>
                                        <View style={{ flex: 0.6, justifyContent: 'center' }}>
                                            <Timer_Testing ms={NeetTimeTaken_Seconds} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: hp('6%'), justifyContent: 'center', flexDirection: 'row', marginLeft: wp("2%"), marginRight: wp("2%") }}>

                                    {previousQuestionId !== null ?
                                        <TouchableOpacity onPress={() => this.OnQuesChange("Previous")} style={{ flex: 0.25, justifyContent: 'center', flexDirection: "row" }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/arrow_right_left1.png')} style={{ height: hp('4%'), width: hp('4%'), tintColor: color.appGreen }} />
                                            </View>
                                            <View style={{ flex: 0.5, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, color: color.appGreen, fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'center' }}>Prev</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <View style={{ flex: 0.25, justifyContent: 'center', flexDirection: "row" }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/arrow_right_left1.png')} style={{ height: hp('4%'), width: hp('4%'), tintColor: color.lightGray }} />
                                            </View>
                                            <View style={{ flex: 0.5, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, color: color.lightGray, fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'center' }}>Prev</Text>
                                            </View>
                                        </View>
                                    }

                                    <View style={{ flex: 0.5, justifyContent: 'center', }}>
                                        <Text style={{ fontSize: fontSize.Small, color: color.appRed, fontFamily: fontFamily.OpenSansBold, textAlign: 'center' }}>Q : {this.state.QuestionIndex + 1} - {length}</Text>
                                    </View>

                                    {nextQuestionId == null ?
                                        <View style={{ flex: 0.25, justifyContent: 'center', flexDirection: "row" }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, color: color.lightGray, fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'center' }}>Next</Text>
                                            </View>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/right-arrow-circular-button.png')} style={{ height: hp('4%'), width: hp('4%'), tintColor: color.lightGray }} />
                                            </View>
                                        </View>
                                        :
                                        <TouchableOpacity onPress={() => this.OnQuesChange("Next")} style={{ flex: 0.25, justifyContent: 'center', flexDirection: "row" }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: fontSize.Small, color: color.appGreen, fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'center' }}>Next</Text>
                                            </View>

                                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../Asset/Icons/right-arrow-circular-button.png')} style={{ height: hp('4%'), width: hp('4%'), tintColor: color.appGreen }} />
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 76, marginLeft: wp('1%'), marginRight: wp('1%'), justifyContent: 'center', }}>
                            {spinner}
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{ flex: 1, justifyContent: 'center', borderRadius: wp("3%"), margin: wp('2%'), borderWidth: hp('0.1%'), borderColor: color.lightGray }}>
                                        <View style={{ flex: 1, flexDirection: 'column', borderWidth: wp('0.2%'), margin: wp('2.5%'), borderColor: color.lightGray, justifyContent: 'center', borderRadius: wp('3%') }}>
                                            {neetModelTestQuestions.QuestionTitle == null ? null :
                                                <View style={{ flex: 0.5, justifyContent: 'center', paddingBottom: hp('2%'), paddingTop: hp('2%') }}>
                                                    {/* <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansSemiBold, marginLeft: wp('3%'), textAlign: 'justify', marginRight: wp('3%') }}>{neetModelTestQuestions[this.state.QuestionIndex].QuestionTitle}</Text> */}
                                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansSemiBold, marginLeft: wp('3%'), textAlign: 'justify', marginRight: wp('3%') }}>{neetModelTestQuestions.QuestionTitle}</Text>

                                                </View>}
                                            {neetModelTestQuestions.QuestionImage == "https://www.crakneet.com/superadmin/uploads/QA_images/" ? null :
                                                <View style={{ flex: 0.5, marginLeft: wp('3%'), marginRight: wp('3%'), paddingBottom: hp('1.5%') }}>
                                                    <View style={{ height: hp('15%'), width: wp('80%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={() => this.modelViewMethod("Question_ImageModel", neetModelTestQuestions.QuestionId)} >
                                                            <Image source={{ uri: neetModelTestQuestions.QuestionImage }} style={{ height: hp('15%'), width: wp('60%'), resizeMode: 'contain' }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>}
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "#ebebeb", flexDirection: 'column', justifyContent: 'center', margin: wp('2.5%'), borderColor: color.lightGray, borderWidth: wp('0.2'), borderRadius: wp('3%') }}>
                                            <GridView
                                                style={{ paddingTop: wp("3%"), flex: 1, }}
                                                itemWidth={wp("60%")}
                                                items={neetModelTestQuestions.QuestionOptions}
                                                enableEmptySections={true}
                                                renderItem={QuestionOptions => (
                                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                                        {QuestionOptions.OptionValue.startsWith("https://www.crakneet.com/superadmin/uploads/QA_images/") ?
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: wp("2%") }}>
                                                                <View style={{ flex: 0.05 }}></View>
                                                                <TouchableOpacity onPress={() => this.Option_Method(QuestionOptions.OptionId, QuestionOptions, QuestionOptions.Options)} style={{ flex: 0.1, justifyContent: 'center' }}>
                                                                    {
                                                                        this.state.Option_ValueID == QuestionOptions.OptionId || QuestionOptions.Status == "true" ?
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                            :
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                    }
                                                                </TouchableOpacity>
                                                                <View style={{ flex: 0.05 }}></View>
                                                                <TouchableOpacity onPress={() => this.modelViewMethod("Option_ImageModel", QuestionOptions.OptionId)} style={{ flex: 0.75, justifyContent: 'center' }}>
                                                                    <Image source={{ uri: QuestionOptions.OptionValue }} style={{ height: wp('10%'), width: wp('40%'), borderWidth: wp('0.2%'), backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%"), borderRadius: wp("1%") }} />
                                                                </TouchableOpacity>
                                                                <View style={{ flex: 0.05 }}></View>
                                                            </View>
                                                            :
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: wp("2%") }}>
                                                                <View style={{ flex: 0.05 }}></View>
                                                                <TouchableOpacity onPress={() => this.Option_Method(QuestionOptions.OptionId, QuestionOptions, QuestionOptions.Options)} style={{ flex: 0.1, justifyContent: 'center' }}>
                                                                    {
                                                                        this.state.Option_ValueID == QuestionOptions.OptionId || QuestionOptions.Status == "true" ?
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                            :
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                    }
                                                                </TouchableOpacity>
                                                                <View style={{ flex: 0.05 }}></View>
                                                                <View style={{ flex: 0.75, justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('1%'), textAlign: "justify" }}>{QuestionOptions.OptionValue}</Text>
                                                                </View>
                                                                <View style={{ flex: 0.05 }}></View>
                                                            </View>
                                                        }
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flex: 9, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', backgroundColor: color.white }}>
                            <View style={{ flex: 0.05 }} />
                            <TouchableOpacity onPress={() => this.modelViewMethod("SubmitModel")} style={{ flex: 0.4, justifyContent: 'center', alignContent: 'center' }}>
                                <View style={{ height: hp('6%'), backgroundColor: color.appGreen, justifyContent: 'center', alignItems: 'center', borderRadius: hp("3.5") }}>
                                    <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 0.1 }} />
                            <TouchableOpacity onPress={() => this.modelViewMethod("Cancel")} style={{ flex: 0.4, justifyContent: 'center', alignContent: 'center' }}>
                                <View style={{ height: hp('6%'), backgroundColor: color.appRed, justifyContent: 'center', alignItems: 'center', borderRadius: hp("3.5") }}>
                                    <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 0.05 }} />
                        </View>

                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.Question_ImageModel}
                            onRequestClose={() => { this.setState({ Question_ImageModel: false }) }}>
                            <View style={{ flex: 1, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ height: hp('100%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingBottom: hp('2%') }}>
                                    <View style={{ height: hp('85%'), width: wp('100%'), alignSelf: 'center', backgroundColor: color.white, borderRadius: hp('1.5%') }}>
                                        <ImageZoom cropWidth={Dimensions.get('window').width}
                                            cropHeight={Dimensions.get('window').height}
                                            imageWidth={200}
                                            imageHeight={200}
                                            enableCenterFocus={true}>
                                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: QuestionZoomImage }} />
                                        </ImageZoom>
                                    </View>
                                    <View style={{ height: hp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPressOut={() => this.onRequestClose()} >
                                            <Image source={require('../../Asset/Icons/closesymbol.png')} style={{ height: hp('8%'), width: hp('8%'), tintColor: color.appRed }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.Option_ImageModel}
                            onRequestClose={() => { this.setState({ Option_ImageModel: false }) }}>
                            <View style={{ flex: 1, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ height: hp('100%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingBottom: hp('2%') }}>
                                    <View style={{ height: hp('85%'), width: wp('100%'), alignSelf: 'center', backgroundColor: color.white, borderRadius: hp('1.5%') }}>
                                        <ImageZoom cropWidth={Dimensions.get('window').width}
                                            cropHeight={Dimensions.get('window').height}
                                            imageWidth={200}
                                            imageHeight={200}
                                            enableCenterFocus={true}>
                                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: answerImageZoom }} />
                                        </ImageZoom>
                                    </View>
                                    <View style={{ height: hp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPressOut={() => this.onRequestClose()} >
                                            <Image source={require('../../Asset/Icons/closesymbol.png')} style={{ height: hp('8%'), width: hp('8%'), tintColor: color.appRed }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.SubmitModel}
                            onRequestClose={() => { this.setState({ SubmitModel: false }) }}>
                            <TouchableOpacity activeOpacity={0} onPressOut={() => this.onRequestClose()} style={{ flex: 1, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ height: hp('100%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'transparent' }}>
                                    <TouchableWithoutFeedback>
                                        <View style={{ height: hp('33%'), width: wp('80%'), backgroundColor: color.white, borderRadius: hp('1.5%'), elevation: 2 }}>
                                            <View style={{ height: hp('7%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), borderBottomColor: color.appGreen, borderBottomWidth: hp('0.15%') }}>
                                                <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1.5%') }}>Confirmation</Text>
                                            </View>
                                            <View style={{ height: hp('4%'), justifyContent: 'center', marginTop: hp('2%') }}>
                                                <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>Do you want to submit?</Text>
                                            </View>
                                            <View style={{ marginLeft: wp('10%'), marginRight: wp('10%'), marginTop: hp('2%') }}>

                                                <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onConfirmSubmit : this.onConfirmSubmit()} ButtonText='Ok' />

                                                <ButtonRed OnButtonClicked={() => this.props.skipDebounce ? this.props.onRequestClose : this.onRequestClose()} ButtonText='Cancel' />
                                                <View style={{ height: hp('1%') }}></View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.CancelModel}
                            onRequestClose={() => { this.setState({ CancelModel: false }) }}>
                            <TouchableOpacity activeOpacity={0} onPressOut={() => this.onRequestClose()} style={{ flex: 1, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ height: hp('100%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'transparent' }}>
                                    <TouchableWithoutFeedback>
                                        <View style={{ height: hp('33%'), width: wp('80%'), backgroundColor: color.white, borderRadius: hp('1.5%'), elevation: 2 }}>
                                            <View style={{ height: hp('7%'), justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), borderBottomColor: color.appGreen, borderBottomWidth: hp('0.15%') }}>
                                                <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1.5%') }}>Confirmation</Text>
                                            </View>
                                            <View style={{ height: hp('4%'), justifyContent: 'center', marginTop: hp('2%') }}>
                                                <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>Do you want to Cancel?</Text>
                                            </View>
                                            <View style={{ marginLeft: wp('10%'), marginRight: wp('10%'), marginTop: hp('2%') }}>

                                                <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onCancelQues : this.onCancelQues()} ButtonText='Ok' />

                                                <ButtonRed OnButtonClicked={() => this.props.skipDebounce ? this.props.onRequestClose : this.onRequestClose()} ButtonText='Cancel' />
                                                <View style={{ height: hp('1%') }}></View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                }
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
        ImageQuestionAction: (Token, QuestionImageId) => {
            dispatch(ImageQuestionAction(Token, QuestionImageId));
        },
        ImageAnswerAction: (Token, AnswerImageId) => {
            dispatch(ImageAnswerAction(Token, AnswerImageId));
        },
        AllCancelTest_Action: (Token, TestDetailId) => {
            dispatch(AllCancelTest_Action(Token, TestDetailId));
        },
        AllSkipList_Action: (Token, TestDetailId,Skip_Valid) => {
            dispatch(AllSkipList_Action(Token, TestDetailId,Skip_Valid));
        },
        StartNeetModel_SaveAction: (Token, TestDetailId, QuestionId) => {
            dispatch(StartNeetModel_SaveAction(Token, TestDetailId, QuestionId))
        },
        Invaliduser_Action: () => { dispatch(Invaliduser_Action()); },
        QuickReportModelAction: (Token, TestDetailId) => {
            dispatch(QuickReportModelAction(Token, TestDetailId));
        },
        Background_Variable_Chapter: (Active) => {
            dispatch(Background_Variable_Chapter(Active));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NEETModelTest_Questions);
