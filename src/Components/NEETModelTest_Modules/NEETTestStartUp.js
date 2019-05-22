import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, connect } from '../../Asset/Libraries/NpmList';
import { Header_Only_Drawer } from '../../Asset/Libraries/Header_Only_Drawer';
import Button from '../../Asset/Libraries/Button';


class NEETTestStartUp extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {

        }
        this.backIconPress = debounce(this.backIconPress.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
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
            }
        })
    }
    backIconPress() {
        this.props.navigation.goBack()
    }
    onStartTest() {
        this.props.navigation.navigate("NEETModelTest")
    }
    render() {
        const { } = this.props.NeetReducer
        return (
            <View style={{ flex: 1, backgroundColor: "#F7F7F7", }}>
                <Header_Only_Drawer onPressLeftIcon={() => this.props.navigation.navigate('DrawerOpen')} HeaderText='NEET Model Test' />
                <View style={{ flex: 1, marginLeft: wp('5%'), marginRight: wp('5%'), marginTop: hp('3%'), marginBottom: hp('3%'), borderRadius: wp('3%'), borderColor: color.lightGray, borderWidth: wp("0.2%"), }}>
                    <View style={{ height: hp('6%'), justifyContent: 'center', borderBottomColor: color.black, borderBottomWidth: wp("0.15%") }}>
                        <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansBold, textAlign: 'center', }}>You are about to start the test</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: wp('4%'), marginRight: wp('4%'), marginTop: hp('2%'), marginBottom: hp('2%'), justifyContent: "center", }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>1.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>The duration of this test is 180 minutes.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>2.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>There will be 180 MCQ Questions.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>3.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>Each questions is alloted 4 (Four) marks of the correct response</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>4.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>One(1) mark will be deducted for indicating incorrect response for each question.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>5.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>No deduction from the total score will be made if no response is indicated.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>6.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>If you fail to submit within 3 hours the test will be submitted automatically.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>7.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>Questions once answered cannot be changed.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>8.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>Questions can be skipped to be answered later.</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: hp('1%') }}>
                                <View style={{ flex: 0.08 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>9.</Text>
                                </View>
                                <View style={{ flex: 0.92 }}>
                                    <Text style={{ fontSize: fontSize.Small, color: color.black, fontFamily: fontFamily.OpenSansRegular, }}>Tap on images in questions or options to enlarge for better view.</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ height: hp('2%'), justifyContent: 'center', }} />
                        <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest()} ButtonText='I am ready to begin' />

                    </View>

                </View>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NEETTestStartUp);
