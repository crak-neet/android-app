import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text, NetInfo, AsyncStorage
} from 'react-native';


const { width, height } = Dimensions.get("window");

const checkNetworkPermission = async () => {
    var is_Connected;
    await NetInfo.isConnected.fetch().then((isConnected) => {
        is_Connected = isConnected;
    });
    return is_Connected;
}
  
class Retry extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            spinner_Visibility: false
        };
    }

    componentWillMount() {
        this.setState({
            spinner_Visibility: false
        })
    }

    _reload() {
       
        checkNetworkPermission().done((isConnected) => {
            if (isConnected) {
                if (localStore.CurrentPage != null) {
                    this.props.navigator.push({
                        name: localStore.CurrentPage
                    })
                }
                else {
                    this.props.navigator.pop();
                }
            } else { }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }} >

            
                {/* <Spinner visibility={this.state.visibility} /> */}
                <Text style={{ fontSize: width / 100 * 10, color: '#000' }}>Oopsss !!!</Text>
                <Text style={{ fontSize: width / 100 * 8, color: 'red' }}>No Internet Connection !!!!!</Text>
                {/* <Image source={require('./../Asset/Images/Network_Image.jpg')} style={{ width: 300, height: 300 }} /> */}
                <TouchableOpacity onPress={() => { this._reload() }}>
                    <View style={{
                        //backgroundColor: '#fff',
                        borderColor: '#ddd',
                        borderRadius: 2,
                        borderWidth: 1,
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10,
                        paddingLeft: 30,
                        paddingRight: 30,
                        padding: 10,

                    }}>
                        <Text style={{ color: '#000', fontSize: width / 100 * 5, fontWeight: '700' }}>Retry</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}

export { Retry, checkNetworkPermission };	
