import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
    Modal,
    AsyncStorage,
    Dimensions
} from 'react-native';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { ImageQuestionAction } from './../../Redux/Actions/ImageQuestionAction';
import { ImageAnswerAction } from './../../Redux/Actions/ImageAnswerAction';

import { debounce, connect, GridView, ImageZoom } from '../../Asset/Libraries/NpmList';
import { Header_BackIcon } from '../../Asset/Libraries/index'

class Revise_Results extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            token: '',
            QuestionIndex: 0,
            LastQuestioninactive_Index: false,
            Question_ImageModel: false,
            Option_ImageModel: false

        }
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

    backIconPress() {
        this.props.navigation.goBack()
    }

    OnQuesChange(tabRoute) {
        const { ViewSummaryreportDetail } = this.props.NeetReducer
        if (tabRoute == "Next") {
            if (ViewSummaryreportDetail.length - 2 == this.state.QuestionIndex) {

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
    modelViewMethod(Model_RouteName, imageId) {

        if (Model_RouteName == "Question_ImageModel") {
            this.setState({ Question_ImageModel: true, })
            this.props.ImageQuestionAction(this.state.token, imageId)

        } else if (Model_RouteName == "Option_ImageModel") {
            this.setState({ Option_ImageModel: true, })
            this.props.ImageAnswerAction(this.state.token, imageId)

        }

    }
    onRequestClose() {
        this.setState({
            Question_ImageModel: false,
            Option_ImageModel: false,
        });
    }



    render() {
        const { ViewSummaryreportDetail, QuestionZoomImage, answerImageZoom } = this.props.NeetReducer

        return (

            <View style={{ flex: 1, backgroundColor: "#F7F7F7", }}>
                <Header_BackIcon onPressLeftIcon={() => this.backIconPress()} HeaderText='Incorrectly Answered Questions Report' />

                <View style={{ flex: 0.16, justifyContent: 'center', backgroundColor: color.white }}>

                    <View style={{ height: hp('6%'), justifyContent: 'center', flexDirection: 'row', borderBottomColor: color.lightGray, borderBottomWidth: wp('0.15%') }}>
                        <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../Asset/Icons/book.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: color.appGreen }} />
                            </View>
                            <View style={{ flex: 0.8, justifyContent: 'center', }}>
                                {ViewSummaryreportDetail[this.state.QuestionIndex].SubjectName == "" ? null :
                                    <View style={{ flex: 0.5, justifyContent: 'center', paddingBottom: hp('2%'), paddingTop: hp('2%') }}>
                                        <Text style={{ fontSize: fontSize.verySmall, color: color.lightGray, fontFamily: fontFamily.OpenSansSemiBold, }}>{ViewSummaryreportDetail[this.state.QuestionIndex].SubjectName} > {ViewSummaryreportDetail[this.state.QuestionIndex].ChapterName}</Text>
                                    </View>}
                            </View>
                        </View>

                        <View style={{ flex: 0.3, justifyContent: 'center', flexDirection: 'row', }} />

                    </View>


                    <View style={{ height: hp('6%'), justifyContent: 'center', flexDirection: 'row', marginLeft: wp("2%"), marginRight: wp("2%") }}>
                        {
                            this.state.QuestionIndex != 0 ?
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

                            <Text style={{ fontSize: fontSize.Small, color: color.appRed, fontFamily: fontFamily.OpenSansBold, textAlign: 'center' }}>Q : {this.state.QuestionIndex + 1} - {ViewSummaryreportDetail.length}</Text>

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

                <View style={{ flex: 1, marginLeft: wp('1%'), marginRight: wp('1%'), justifyContent: 'center', }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={{ flex: 1, justifyContent: 'center', borderRadius: wp("3%"), margin: wp('2%'), borderWidth: hp('0.1%'), borderColor: color.lightGray }}>
                                <View style={{ flex: 1, flexDirection: 'column', borderWidth: wp('0.2%'), margin: wp('2.5%'), borderColor: color.lightGray, justifyContent: 'center', borderRadius: wp('3%') }}>
                                    {ViewSummaryreportDetail[this.state.QuestionIndex].QuestionTitle == null ? null :
                                        <View style={{ flex: 0.5, justifyContent: 'center', paddingBottom: hp('2%'), paddingTop: hp('2%') }}>
                                            <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansSemiBold, marginLeft: wp('3%'), textAlign: 'justify', marginRight: wp('3%') }}>{ViewSummaryreportDetail[this.state.QuestionIndex].QuestionTitle}</Text>
                                        </View>}
                                    {ViewSummaryreportDetail[this.state.QuestionIndex].QuestionImage == "https://www.crakneet.com/superadmin/uploads/QA_images/" ? null :
                                        <View style={{ flex: 0.5, marginLeft: wp('3%'), marginRight: wp('3%'), paddingBottom: hp('1.5%') }}>
                                            <View style={{ height: hp('15%'), width: wp('80%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.modelViewMethod("Question_ImageModel", ViewSummaryreportDetail[this.state.QuestionIndex].QuestionId)}>
                                                    <Image source={{ uri: ViewSummaryreportDetail[this.state.QuestionIndex].QuestionImage }} style={{ height: hp('15%'), width: wp('80%'), resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>}
                                </View>
                                <View style={{ height: wp("1.5%") }} />

                                <View style={{ flex: 1, backgroundColor: "#ebebeb", flexDirection: 'column', justifyContent: 'center', margin: wp('2.5%'), borderColor: color.lightGray, borderWidth: wp('0.2'), borderRadius: wp('3%') }}>

                                    <GridView
                                        style={{ paddingTop: wp("3%"), flex: 1, }}
                                        itemWidth={wp("60%")}
                                        items={ViewSummaryreportDetail[this.state.QuestionIndex].QuestionOptions}
                                        enableEmptySections={true}
                                        renderItem={QuestionOptions => (
                                            <View style={{ flex: 1, justifyContent: 'center' }}>

                                                {
                                                    QuestionOptions.OptionValue.startsWith("https://www.crakneet.com/superadmin/uploads/QA_images/") ?

                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: wp("2%") }}>
                                                            <View style={{ flex: 0.05 }}></View>

                                                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                                                {
                                                                    QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].SelectedAnswer && QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].CorrectAnswer ?
                                                                        <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                        :
                                                                        // QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].CorrectAnswer ?
                                                                        //     <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                        //     :
                                                                        QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].SelectedAnswer ?
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appRed, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                            :
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                }
                                                            </View>
                                                            <View style={{ flex: 0.05 }}></View>

                                                            <TouchableOpacity onPress={() => this.modelViewMethod("Option_ImageModel", QuestionOptions.OptionId)} style={{ flex: 0.75, justifyContent: 'center' }}>
                                                                <Image source={{ uri: QuestionOptions.OptionValue }} style={{ height: wp('10%'), width: wp('40%'), borderWidth: wp('0.2%'), backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%"), borderRadius: wp("1%"), }} />
                                                            </TouchableOpacity>
                                                            <View style={{ flex: 0.05 }}></View>
                                                        </View>
                                                        :
                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: wp("2%") }}>
                                                            <View style={{ flex: 0.05 }}></View>

                                                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                                                {
                                                                    QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].SelectedAnswer && QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].CorrectAnswer ?
                                                                        <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                        :
                                                                        // QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].CorrectAnswer ?
                                                                        //     <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                        //     :
                                                                        QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].SelectedAnswer ?
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.appRed, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                            :
                                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.black, fontFamily: fontFamily.OpenSansBold, marginLeft: wp('1%'), textAlign: 'center', backgroundColor: color.white, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                                }
                                                            </View>
                                                            <View style={{ flex: 0.05 }}></View>

                                                            <View style={{ flex: 0.75, justifyContent: 'center' }}>
                                                                <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('1%'), textAlign: "justify", }}>{QuestionOptions.OptionValue}</Text>
                                                            </View>

                                                            <View style={{ flex: 0.05 }}></View>

                                                        </View>

                                                }

                                            </View>

                                        )}
                                    />

                                </View>
                                <View style={{ flex: 1, backgroundColor: '#e1e1e1', flexDirection: 'column', justifyContent: 'center', margin: wp('2.5%'), borderRadius: wp('3%'), elevation: 2, shadowOffset: { width: 6, height: 6, }, shadowOpacity: 0.1, shadowColor: "#515860" }}>
                                    <View style={{ height: hp('5%'), justifyContent: 'center' }}>
                                        <Text style={{ fontSize: fontSize.Small, color: color.appRed, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: color.appRed }}>correct answer</Text>
                                    </View>
                                    <View style={{ height: wp("3%"), justifyContent: 'center', alignItems: 'center' }} />

                                    <View style={{ flex: 1, paddingBottom: hp('2%'), flexDirection: 'row' }}>
                                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} />
                                        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>{ViewSummaryreportDetail[this.state.QuestionIndex].CorrectAnswerValue}</Text>
                                        </View>
                                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} />
                                    </View>

                                    <View style={{ flex: 1, paddingBottom: hp('2%'), flexDirection: 'row' }}>
                                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>

                                            {ViewSummaryreportDetail[this.state.QuestionIndex].QuestionOptions.map((QuestionOptions, index) => (
                                                <View>
                                                    {QuestionOptions.OptionId == ViewSummaryreportDetail[this.state.QuestionIndex].CorrectAnswer ?
                                                        <View style={{ backgroundColor: color.appGreen, width: wp('7%') }}>
                                                            <Text style={{ fontSize: fontSize.lightMedium, color: color.white, fontFamily: fontFamily.OpenSansBold, textAlign: 'center', backgroundColor: color.appGreen, borderColor: color.black, borderWidth: wp("0.2%") }}>{QuestionOptions.Options}</Text>
                                                        </View>
                                                        : null}
                                                </View>))}

                                        </View>
                                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                            {ViewSummaryreportDetail[this.state.QuestionIndex].CorrectoptionTitle == null ?
                                                <Image source={{ uri: ViewSummaryreportDetail[this.state.QuestionIndex].CorrectoptionImage }} style={{ height: hp('15%'), width: wp('50%'), resizeMode: 'contain' }} />
                                                :
                                                <Text style={{ fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, textAlign: 'center' }}>{ViewSummaryreportDetail[this.state.QuestionIndex].CorrectoptionTitle}</Text>
                                            }
                                        </View>
                                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }} />
                                    </View>

                                    <View style={{ height: wp("3%"), justifyContent: 'center', alignItems: 'center' }} />

                                </View>
                                <View style={{ height: wp("3%"), justifyContent: 'center', alignItems: 'center' }} />
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Revise_Results);