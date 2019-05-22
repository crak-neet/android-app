import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    FlatList,
    ScrollView,
} from 'react-native';

import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import Button from '../../Asset/Libraries/Button';
import { wp, hp } from '../../Asset/Libraries/ResponsiveScreen';
import { Header_BackIcon } from '../../Asset/Libraries/index'
import { debounce, connect } from '../../Asset/Libraries/NpmList';

class SpecialTest_Ranking extends Component {
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
    }
   
    backIconPress() {
        this.props.navigation.goBack()
    }
    goBack() {
        this.props.navigation.goBack()
    }
    render() {
        const { rankingPosition } = this.props.NeetReducer
        return (
            <View style={{ flex: 1, backgroundColor: color.white, }}>
                <Header_BackIcon onPressLeftIcon={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress()} HeaderText='Special Test' />
                <View style={{ height: hp('8%'), flexDirection: 'row', justifyContent: 'center', marginLeft: wp('5%'), marginRight: wp('5%'), borderBottomWidth: wp('0.2%'), borderColor: color.lightGray }}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={{ fontSize: fontSize.Small, fontFamily: fontFamily.OpenSansSemiBold, color: '#e68021', textAlign: 'center' }}>Know Your Position</Text>
                    </View>
                </View>
                {/* <View style={{ height: hp('5%'), }} /> */}
                <View style={{ height: hp('80%'), justifyContent: 'center' }}>
                    <View style={{ height: hp('70%'), marginLeft: wp('5%'), marginRight: wp('5%'), borderWidth: hp('0.1%'), borderRadius: wp('3%'), justifyContent: 'center', backgroundColor: "#ebebeb" }}>
                        <View style={{ height: hp('7%'), flexDirection: "row", borderBottomWidth: wp('0.1%') }}>
                            <View style={{ flex: 1.5 }}>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'left' }}>Rank</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'left', marginLeft: wp('2%') }}>Student</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'left' }}>Districts</Text>
                            </View>
                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansSemiBold, textAlign: 'left' }}>Marks</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <FlatList style={{ flex: 1 }}
                                        data={rankingPosition}
                                        keyExtractor={(item, index) => item.key}
                                        renderItem={({ item, index }) =>
                                            <View style={{ height: hp('6%'), flexDirection: 'row', backgroundColor: item.Status == "true" ? "#e68021" : null, }}>
                                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={{ uri: item.StudentProfile }} style={{ height: hp('4%'), width: hp('4%'), borderRadius: hp('2%') }} />
                                                    {/* <Image source={require('./../../Asset/Images/phonepicutres-TA.jpg')} style={{ height: hp('4%'), width: hp('4%'), borderRadius: hp('2%') }} /> */}
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                                    <Text numberOfLines={1} style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansRegular, textAlign: 'center', color: item.Status == "true" ? color.white : color.black }}>{item.StudentRank}</Text>
                                                </View>
                                                <View style={{ flex: 3, justifyContent: 'center' }}>
                                                    <Text numberOfLines={1} style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansRegular, textAlign: 'left', color: item.Status == "true" ? color.white : color.black, marginLeft: wp('1.5%') }}>{item.StudentName}</Text>
                                                </View>
                                                <View style={{ flex: 3, justifyContent: 'center' }}>
                                                    <Text numberOfLines={1} style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansRegular, textAlign: 'left', color: item.Status == "true" ? color.white : color.black }}>{item.StudentDistrict}</Text>
                                                </View>
                                                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                                    <Text numberOfLines={1} style={{ fontSize: hp('1.8%'), fontFamily: fontFamily.OpenSansRegular, textAlign: 'center', color: item.Status == "true" ? color.white : color.black }}>{item.Marks}</Text>
                                                </View>
                                            </View>
                                        }
                                    />
                                </ScrollView>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={{ height: hp('3%'), }} />
                <Button OnButtonClicked={() => this.props.skipDebounce ? this.props.backIconPress : this.backIconPress('')} ButtonText='Go Back' />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        NeetReducer: state.NeetReducer
    };
}


export default connect(mapStateToProps)(SpecialTest_Ranking);

