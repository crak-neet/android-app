import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
    AsyncStorage,
    FlatList, TouchableOpacity
} from 'react-native';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, Snackbar, connect } from '../../Asset/Libraries/NpmList';
import { Header_BackIcon } from '../../Asset/Libraries/index'
import { Invaliduser_Action } from './../../Redux/Actions/Invaliduser_Action';
import { NotificationOpenAction } from './../../Redux/Actions/NotificationOpenAction';
class Notification extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            Token: '',
        }
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
    }
    componentWillMount() {
        AsyncStorage.getItem("Token", (error, Token) => {
            if (Token != "") {
                this.setState({ Token: Token })
            }
            this.props.NotificationOpenAction(Token)
        })
    }
    backIconPress() {
        this.props.navigation.goBack()
    }

    render() {
        const { notificationDetail } = this.props.NeetReducer
        return (
            <View style={{ flex: 1, backgroundColor: color.white }}>
                <Header_BackIcon onPressLeftIcon={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress()} HeaderText='Notification History' />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {notificationDetail.map((item, index) => (
                            <View style={{ flex: 1 }}>
                                <View style={{ height: hp('4.5%'), justifyContent: 'center', marginTop: hp('2%'), marginLeft: wp('2.5%'), marginRight: wp('2.5%'), flexDirection: 'row' }}>
                                    <View style={{ flex: 0.015, backgroundColor: color.appRed, borderRadius: wp('1.2%'), marginTop: wp("1%"), }}></View>
                                    <View style={{ flex: 0.985, justifyContent: 'center' }}>
                                        <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, marginLeft: wp('2%') }}>{item.Date}</Text>
                                    </View>
                                </View>
                                {item.MessageResult.map((MessageResult, index) => (<View>
                                    {MessageResult.checked == 1 ?
                                        <View style={{ flex: 1, justifyContent: 'center', marginTop: hp('2%'), }}>
                                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={require('./../../Asset/Icons/Appicon1.png')} style={{ height: wp('16%'), width: wp('16%'), tintColor: color.appGreen }}></Image>
                                                </View>
                                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                                    <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, }}>{MessageResult.Title}</Text>
                                                </View>
                                                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                                    <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, textAlign: 'right' }}>{MessageResult.Time}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%') }}>
                                                <View style={{ flex: 0.15, width: wp('16%'), }}></View>
                                                <View style={{ flex: 0.85, flexDirection: 'row', justifyContent: 'center' }}>
                                                    <View style={{ height: hp('3%'), width: wp('6%'), marginRight: wp('5%'), justifyContent: 'flex-start', marginBottom: hp('2%') }}>
                                                        <Image source={require('./../../Asset/Icons/ta.png')} style={{ height: wp('8%'), width: wp('8%'), tintColor: color.appGreen, }}></Image>
                                                    </View>
                                                    <View style={{ flex: 0.9, justifyContent: "flex-start" }}>
                                                        <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, marginTop: hp('1.2%'), }}>{MessageResult.Message}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        // <TouchableOpacity onPress={() => this.Notification_Open(MessageResult, "New", MessageResult.NotificationId)} style={{ flex: 1, justifyContent: 'center', marginTop: hp('2%'), }}>
                                        //     <View style={{ flex: 1, justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                        //         <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                        //             <Image source={require('./../../Asset/Icons/Appicon1.png')} style={{ height: wp('16%'), width: wp('16%'), tintColor: color.appGreen }}></Image>
                                        //         </View>
                                        //         <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                        //             <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, }}>{MessageResult.Title}</Text>
                                        //         </View>
                                        //         <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                        //             <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, textAlign: 'right' }}>{MessageResult.Time}</Text>
                                        //         </View>
                                        //     </View>
                                        //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%') }}>
                                        //         <View style={{ flex: 0.2, width: wp('16%'), }}></View>
                                        //         <View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'center' }}>
                                        //             <View style={{ height: hp('3%'), width: wp('6%'), marginRight: wp('3%') }}>
                                        //                 <Image source={require('./../../Asset/Icons/ta.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: color.appGreen }}></Image>
                                        //             </View>
                                        //             <View style={{ flex: 0.9, justifyContent: 'center' }}>
                                        //                 <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, marginTop: hp('0.5%'), }}>{MessageResult.Message}</Text>
                                        //             </View>
                                        //         </View>
                                        //     </View>
                                        // </TouchableOpacity>

                                        <View style={{ flex: 1, justifyContent: 'center', marginTop: hp('2%'), }}>
                                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={require('./../../Asset/Icons/Appicon1.png')} style={{ height: wp('16%'), width: wp('16%'), tintColor: color.appGreen }}></Image>
                                                </View>
                                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                                    <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, }}>{MessageResult.Title}</Text>
                                                </View>
                                                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                                    <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, textAlign: 'right' }}>{MessageResult.Time}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%') }}>
                                                <View style={{ flex: 0.2, width: wp('16%'), }}></View>
                                                <View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'center' }}>
                                                    <View style={{ height: hp('3%'), width: wp('6%'), marginRight: wp('3%') }}>
                                                        <Image source={require('./../../Asset/Icons/ta.png')} style={{ height: wp('6%'), width: wp('6%'), tintColor: color.appGreen }}></Image>
                                                    </View>
                                                    <View style={{ flex: 0.9, justifyContent: 'center' }}>
                                                        <Text style={{ color: color.black, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, marginTop: hp('0.5%'), }}>{MessageResult.Message}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    }

                                </View>))}
                            </View>
                        ))}
                    </ScrollView>
                </TouchableWithoutFeedback>
                <View style={{ height: hp('3%') }}></View>
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
        Invaliduser_Action: () => {
            dispatch(Invaliduser_Action());
        },
        NotificationOpenAction: (Token) => {
            dispatch(NotificationOpenAction(Token));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification);


{/* <FlatList style={{ flex: 1 }}
                            data={notificationDetail}
                            keyExtractor={(item, index) => item.key}
                            renderItem={({ item, index }) => */}


                            // {MessageResult.checked == 1 ?
                            //     <TouchableOpacity onPress={() => this.Notification_Open(MessageResult, "Old", "", index)} style={{ flex: 1, justifyContent: 'center', marginTop: hp('2%'), }}>
                            //         <View style={{ flex: 1, justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%'), flexDirection: 'row' }}>
                            //             <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            //                 <Image source={require('./../../Asset/Icons/Appicon1.png')} style={{ height: wp('16%'), width: wp('16%'), tintColor: color.appGreen }}></Image>
                            //             </View>
                            //             <View style={{ flex: 0.5, justifyContent: 'center' }}>
                            //                 <Text style={{ color: color.lightGray, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, }}>{MessageResult.Title}</Text>
                            //             </View>
                            //             <View style={{ flex: 0.3, justifyContent: 'center' }}>
                            //                 <Text style={{ color: color.lightGray, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, textAlign: 'right' }}>{MessageResult.Time}</Text>
                            //             </View>
                            //         </View>
                            //         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: wp('3%'), marginRight: wp('3%') }}>
                            //             <View style={{ flex: 0.15, width: wp('16%'), }}></View>
                            //             <View style={{ flex: 0.85, flexDirection: 'row', justifyContent: 'center' }}>
                            //                 <View style={{ height: hp('3%'), width: wp('6%'), marginRight: wp('5%'), justifyContent: 'flex-start', marginBottom: hp('2%') }}>
                            //                     <Image source={require('./../../Asset/Icons/ta.png')} style={{ height: wp('8%'), width: wp('8%'), tintColor: color.appGreen, }}></Image>
                            //                 </View>
                            //                 <View style={{ flex: 0.9, justifyContent: "flex-start" }}>
                            //                     <Text style={{ color: color.lightGray, fontSize: fontSize.verySmall, fontFamily: fontFamily.OpenSansRegular, marginTop: hp('1.2%'), }}>{MessageResult.Message}</Text>
                            //                 </View>
                            //             </View>
                            //         </View>
                            //     </TouchableOpacity>