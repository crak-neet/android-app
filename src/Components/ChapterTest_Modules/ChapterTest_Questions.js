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
import { Header_BackIcon, Timer } from '../../Asset/Libraries/index'
import { ImageQuestionAction } from './../../Redux/Actions/ImageQuestionAction';
import { ImageAnswerAction } from './../../Redux/Actions/ImageAnswerAction';
import { StartChapterTest_SaveAction } from './../../Redux/Actions/StartChapterTest_SaveAction';
import { AllCancelTest_Action } from './../../Redux/Actions/AllCancelTest_Action';
import { AllSkipList_Action } from './../../Redux/Actions/AllSkipList_Action';
import { Invaliduser_Action } from './../../Redux/Actions/Invaliduser_Action';
import { QuickReportChapterAction } from './../../Redux/Actions/QuickReportChapterAction';
import { Background_Variable_Chapter } from './../../Redux/Actions/Background_Variable_Chapter';
class ChapterTest_Questions extends Component {
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
            totalDuration: '',
            LastQuestioninactive_Index: false,
            Option_ValueID: '',
            appState: ""
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
        AsyncStorage.getItem("Token", (error, Token) => {
            if (Token) {
                this.setState({
                    token: Token
                })
            }
        })
        const { Skiplist_QuestionNumber, ChapterQuestions } = this.props.NeetReducer
        if (Skiplist_QuestionNumber != 0 || Skiplist_QuestionNumber != undefined) {
            var ChapterQuestions_Lenght = ChapterQuestions.length - 1
            if (Skiplist_QuestionNumber == ChapterQuestions_Lenght) {
                this.setState({
                    QuestionIndex: Skiplist_QuestionNumber, LastQuestioninactive_Index: true
                })
            } else {
                this.setState({
                    QuestionIndex: Skiplist_QuestionNumber, LastQuestioninactive_Index: false
                })
            }
        } else {
            this.setState({
                QuestionIndex: 0
            })
        }
        this.props.Background_Variable_Chapter("true")
    }
    backIconPress() {
        const { Chapter_TimeTakenStatus } = this.props.NeetReducer

        if (Chapter_TimeTakenStatus == false) {
            this.Timeup_Alert()

        } else {
            this.setState({ CancelModel: true, })
        }
    }
    onConfirmSubmit() {
        const { ChapterQuestions, SubjectId, ChapterId, Chapter_TimeTakenStatus } = this.props.NeetReducer
        this.onRequestClose()

        if (Chapter_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (this.state.Option_ValueID != "") {
               
                fetch('https://www.crakneet.com/api/question/submitchaptertest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "Token": this.state.token,
                        "TestDetailId": ChapterQuestions[this.state.QuestionIndex].TestDetailId,
                        "QuestionId": ChapterQuestions[this.state.QuestionIndex].QuestionId,
                        "AnswerId": this.state.Option_ValueID
                    })
                })
                    .then((response) => response.json())
                    .then((JsonResponse) => {
                        if (JsonResponse.ResultStatus == "true") {
                            this.setState({
                                Option_ValueID: ""
                            })
                            this.props.StartChapterTest_SaveAction(this.state.token, SubjectId, ChapterId, ChapterQuestions[this.state.QuestionIndex].TestDetailId)
                            this.props.AllSkipList_Action(this.state.token, ChapterQuestions[this.state.QuestionIndex].TestDetailId, "Normal")
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
                this.props.AllSkipList_Action(this.state.token, ChapterQuestions[this.state.QuestionIndex].TestDetailId, "Normal")
            }
        }
    }
    OnQuesChange(tabRoute) {
        const { ChapterQuestions, SubjectId, ChapterId, Chapter_TimeTakenStatus } = this.props.NeetReducer
        if (Chapter_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (this.state.Option_ValueID != "") {
                fetch('https://www.crakneet.com/api/question/submitchaptertest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "Token": this.state.token,
                        "TestDetailId": ChapterQuestions[this.state.QuestionIndex].TestDetailId,
                        "QuestionId": ChapterQuestions[this.state.QuestionIndex].QuestionId,
                        "AnswerId": this.state.Option_ValueID
                    })
                })
                    .then((response) => response.json())
                    .then((JsonResponse) => {
                        if (JsonResponse.ResultStatus == "true") {
                            this.setState({
                                Option_ValueID: ""
                            })
                            this.props.StartChapterTest_SaveAction(this.state.token, SubjectId, ChapterId, ChapterQuestions[this.state.QuestionIndex].TestDetailId)
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
            }
            if (tabRoute == "Next") {
                if (ChapterQuestions.length - 2 == this.state.QuestionIndex) {
                    this.setState({
                        QuestionIndex: ++this.state.QuestionIndex, LastQuestioninactive_Index: true
                    })
                } else {
                    this.setState({
                        QuestionIndex: ++this.state.QuestionIndex, LastQuestioninactive_Index: false
                    })
                }
            } else {
                if (this.state.QuestionIndex == 0) {
                } else {
                    this.setState({
                        QuestionIndex: --this.state.QuestionIndex, LastQuestioninactive_Index: false
                    })
                }
            }
        }
    }
    Modelview_Method(Model_RouteName, QuestionId) {
        const { Chapter_TimeTakenStatus } = this.props.NeetReducer
        if (Chapter_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (Model_RouteName == "Question_ImageModel") {
                this.setState({ Question_ImageModel: true, })
                this.props.ImageQuestionAction(this.state.token, QuestionId)

            } else if (Model_RouteName == "Option_ImageModel") {
                this.setState({ Option_ImageModel: true, })
                this.props.ImageAnswerAction(this.state.token, QuestionId)

            } else if (Model_RouteName == "SubmitModel") {
                this.setState({ SubmitModel: true, })

            } else {
                this.setState({ CancelModel: true, })
            }
        }
    }
    onCancelQues() {
        const { ChapterQuestions } = this.props.NeetReducer
        this.setState({ CancelModel: false, })
        this.props.AllCancelTest_Action(this.state.token, ChapterQuestions[this.state.QuestionIndex].TestDetailId)
    }
    Alert_Submittest() {
        const { ChapterQuestions } = this.props.NeetReducer
        this.props.QuickReportChapterAction(this.state.token, ChapterQuestions[this.state.QuestionIndex].TestDetailId)
    }
    onRequestClose() {
        this.setState({
            Question_ImageModel: false,
            Option_ImageModel: false,
            SubmitModel: false,
            CancelModel: false
        });
    }
    Timeup_Alert() {
        Alert.alert(
            "Chapter Test ",
            "Time up, Do you want to ?",
            [
                { text: 'Cancel', onPress: () => dispatch(this.onCancelQues()), style: 'cancel' },
                { text: 'Submit', onPress: () => dispatch(this.Alert_Submittest()) },
            ],
            { cancelable: false }
        )
    }
    Option_Method(OptionId, QuestionOptions, Options) {
        const { ChapterQuestions, Chapter_TimeTakenStatus } = this.props.NeetReducer
        if (Chapter_TimeTakenStatus == false) {
            this.Timeup_Alert()
        } else {
            if (ChapterQuestions[this.state.QuestionIndex].Status == "true") {
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
        const { ChapterQuestions, Background_Variable_Chapter } = this.props.NeetReducer

        if (nextAppState === "background" && Background_Variable_Chapter == "true") {
            this.props.AllSkipList_Action(this.state.token, ChapterQuestions[this.state.QuestionIndex].TestDetailId, "Normal")
        }
        this.setState({ appState: nextAppState });
    }
    render() {
        const { QuestionZoomImage, chapterFullDetails, answerImageZoom, ChapterQuestions, SubjectId, ChapterId, ChapterTimeTaken_Seconds } = this.props.NeetReducer
        return (
            <View style={{ flex: 1, backgroundColor: "#F7F7F7", }}>
                <Header_BackIcon onPressLeftIcon={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress()} HeaderText='Chapter Test' />
                <View style={{ flex: 15, justifyContent: 'center', backgroundColor: color.white }}>
                    <View style={{ flex: 1, marginLeft: wp('3%'), marginRight: wp('3%'), justifyContent: 'center' }}>
                        <View style={{ height: hp('6%'), justifyContent: 'center', flexDirection: 'row', borderBottomColor: color.lightGray, borderBottomWidth: wp('0.15%') }}>
                            <View style={{ flex: 0.65, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/obook.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                </View>
                                <View style={{ flex: 0.8, justifyContent: 'center', }}>
                                    <Text numberOfLines={1} style={{ fontSize: fontSize.verySmall, color: color.lightGray, fontFamily: fontFamily.OpenSansSemiBold, }}>{chapterFullDetails.SubjectName} > {chapterFullDetails.ChapterName}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.35, justifyContent: 'center', flexDirection: 'row', }}>
                                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Asset/Icons/stopwatch.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                                </View>
                                <View style={{ flex: 0.6, justifyContent: 'center' }}>
                                    <Timer ms={ChapterTimeTaken_Seconds} />
                                </View>
                            </View>
                        </View>
                        <View style={{ height: hp('6%'), justifyContent: 'center', flexDirection: 'row', marginLeft: wp("2%"), marginRight: wp("2%") }}>
                            {
                                this.state.QuestionIndex != 0 ?
                                    <TouchableOpacity onPress={() => this.props.skipDebounce ? this.props.OnQuesChange : this.OnQuesChange("Previous")} style={{ flex: 0.25, justifyContent: 'center', flexDirection: "row" }}>
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
                                <Text style={{ fontSize: fontSize.Small, color: color.appRed, fontFamily: fontFamily.OpenSansBold, textAlign: 'center' }}>Q : {this.state.QuestionIndex + 1} - {ChapterQuestions.length}</Text>
                            </View>
                            {this.state.LastQuestioninactive_Index != false ?
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
                <View style={{ height: wp("2%") }} />
                <View style={{ flex: 76, marginLeft: wp('1%'), marginRight: wp('1%'), justifyContent: 'center', }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, justifyContent: 'center', borderRadius: wp("3%"), margin: wp('2%'), borderWidth: hp('0.1%'), borderColor: color.lightGray }}>
                                <View style={{ flex: 1, flexDirection: 'column', borderWidth: wp('0.2%'), margin: wp('2.5%'), borderColor: color.lightGray, justifyContent: 'center', borderRadius: wp('3%') }}>
                                    {ChapterQuestions[this.state.QuestionIndex].QuestionTitle == null ? null :
                                        <View style={{ flex: 0.5, justifyContent: 'center', paddingBottom: hp('2%'), paddingTop: hp('2%') }}>
                                            <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansSemiBold, marginLeft: wp('3%'), textAlign: 'justify', marginRight: wp('3%') }}>{ChapterQuestions[this.state.QuestionIndex].QuestionTitle}</Text>
                                        </View>}
                                    {ChapterQuestions[this.state.QuestionIndex].QuestionImage == "https://www.crakneet.com/superadmin/uploads/QA_images/" ? null :
                                        <View style={{ flex: 0.5, marginLeft: wp('3%'), marginRight: wp('3%'), paddingBottom: hp('1.5%') }}>
                                            <View style={{ height: hp('15%'), width: wp('80%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.Modelview_Method("Question_ImageModel", ChapterQuestions[this.state.QuestionIndex].QuestionId)}>
                                                    <Image source={{ uri: ChapterQuestions[this.state.QuestionIndex].QuestionImage }} style={{ height: hp('15%'), width: wp('60%'), resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>}
                                </View>
                                <View style={{ height: wp("1.5%") }} />
                                <View style={{ flex: 1, backgroundColor: "#ebebeb", flexDirection: 'column', justifyContent: 'center', margin: wp('2.5%'), borderColor: color.lightGray, borderWidth: wp('0.2'), borderRadius: wp('3%') }}>
                                    {/* <View style={{ flex: 5, flexDirection: 'row', paddingBottom: hp('2%'), paddingTop: hp('2%'), }}> */}
                                    <GridView
                                        style={{ paddingTop: wp("3%"), flex: 1, }}
                                        itemWidth={wp("60%")}
                                        items={ChapterQuestions[this.state.QuestionIndex].QuestionOptions}
                                        enableEmptySections={true}
                                        renderItem={QuestionOptions => (
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                {
                                                    QuestionOptions.OptionValue.startsWith("https://www.crakneet.com/superadmin/uploads/QA_images/") ?
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
                                                            <TouchableOpacity onPress={() => this.Modelview_Method("Option_ImageModel", QuestionOptions.OptionId)} style={{ flex: 0.75, justifyContent: 'center' }}>
                                                                <Image source={{ uri: QuestionOptions.OptionValue }} style={{ height: wp('10%'), width: wp('40%'), borderWidth: wp('0.2%'), backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%"), borderRadius: wp("1%"), }} />
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
                                                                {/* <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('1%'), textAlign: "justify", backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.OptionValue}</Text> */}
                                                                <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('1%'), textAlign: "justify", }}>{QuestionOptions.OptionValue}</Text>
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
                    <TouchableOpacity onPress={() => this.Modelview_Method("SubmitModel")} style={{ flex: 0.4, justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ height: hp('6%'), backgroundColor: color.appGreen, justifyContent: 'center', alignItems: 'center', borderRadius: hp("3.5") }}>
                            <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansSemiBold }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 0.1 }} />
                    <TouchableOpacity onPress={() => this.Modelview_Method("Cancel")} style={{ flex: 0.4, justifyContent: 'center', alignContent: 'center' }}>
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
                                    <Image source={require('../../Asset/Icons/closesymbol.png')} style={{ height: hp('8%'), width: hp('8%'), tintColor: "red" }} />
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
                                    <Image source={require('../../Asset/Icons/closesymbol.png')} style={{ height: hp('8%'), width: hp('8%'), tintColor: "red" }} />
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
        StartChapterTest_SaveAction: (Token, SubjectId, ChapterId, TestDetailId) => {
            dispatch(StartChapterTest_SaveAction(Token, SubjectId, ChapterId, TestDetailId));
        },
        AllCancelTest_Action: (Token, TestDetailId) => {
            dispatch(AllCancelTest_Action(Token, TestDetailId));
        },
        AllSkipList_Action: (Token, TestDetailId, Skip_Valid) => {
            dispatch(AllSkipList_Action(Token, TestDetailId, Skip_Valid));
        },
        Invaliduser_Action: () => { dispatch(Invaliduser_Action()); },
        QuickReportChapterAction: (Token, TestDetailId) => {
            dispatch(QuickReportChapterAction(Token, TestDetailId));
        },
        Background_Variable_Chapter: (Active) => {
            dispatch(Background_Variable_Chapter(Active));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChapterTest_Questions);