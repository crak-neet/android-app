import React, { Component } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    AsyncStorage,
} from 'react-native';
import { color } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { debounce, connect } from '../../Asset/Libraries/NpmList';
import { Header_Only_Drawer, Spinner } from '../../Asset/Libraries/index'
import { StartNeetModelTestAction } from './../../Redux/Actions/StartNeetModelTestAction'
import { SkiplistArrayReducer_ClearAction } from './../../Redux/Actions/SkiplistArrayReducer_ClearAction';
class NEETModelTest extends Component {
    constructor() {
        console.disableYellowBox = true;
        Keyboard.dismiss()
        super();
        this.state = {
            token: '',
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
            this.props.StartNeetModelTestAction(this.state.token)
        }
    }
    render() {
        const { Examvalidation ,isFetchingStartModel} = this.props.NeetReducer
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                <View style={{ flex: 1, backgroundColor: color.white, }}>
                    <Header_Only_Drawer onPressLeftIcon={() => this.props.navigation.navigate('DrawerOpen')} HeaderText='NEET Model Test' />
                    <Image source={require('./../../Asset/Images/NeetBg.png')} style={{ height: hp('85%'), marginTop: hp('8%'), marginLeft: wp('10%'), width: wp('90%'), position: 'absolute' }} />
                    <View style={{ flex: 0.1, justifyContent: 'center' }} />
                    <View style={{ flex: 0.35, justifyContent: 'center', marginTop: hp('15%'), alignItems: 'center', }}>
                        <Image source={require('../../Asset/Icons/017-exam-2.png')} style={{ height: wp('40%'), width: wp('40%'), tintColor: color.appGreen }} />
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'center', marginTop: hp('20%') }}>
                        {Examvalidation == true ?
                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest("true")} ButtonText='Start Test' />
                            :
                            <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.onStartTest : this.onStartTest("false")} ButtonText='Start Test' />
                        }
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center' }} />
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
        StartNeetModelTestAction: (Token) => {
            dispatch(StartNeetModelTestAction(Token));
        },
        SkiplistArrayReducer_ClearAction: (ReducerClear) => {
            dispatch(SkiplistArrayReducer_ClearAction(ReducerClear));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NEETModelTest);
