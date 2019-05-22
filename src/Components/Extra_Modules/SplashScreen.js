import React, { Component } from 'react';
import { View, NetInfo, AsyncStorage } from 'react-native';
import { SplashScreen, connect } from '../../Asset/Libraries/NpmList';
import { DashboardTestDetailAction } from './../../Redux/Actions/DashboardTestDetailAction';

global.isConnected = true
class splashscreen extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        AsyncStorage.getItem("validuser", (error, validUser) => {
            if (validUser == "1") {
                if (global.isConnected == true) {

                    this.props.navigation.navigate('Drawer')
                }
            } else {
                if (global.isConnected == true) {
                    this.props.navigation.navigate('Login')
                }
            }
        })
    }

    componentDidMount() {

        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        })
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            global.isConnected = true
        } else {
            global.isConnected = false
            // alert('there is no internet connection')
            this.props.navigation.navigate("Retry")
        }
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />

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
        DashboardTestDetailAction: (Token) => {

            dispatch(DashboardTestDetailAction(Token));
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(splashscreen);
