import { httpRequest } from './../../Asset/Utils/axios';
import { Snackbar } from './../../Asset/Libraries/NpmList';
import { AsyncStorage } from 'react-native';

import { OtpResendAction } from './OtpResendAction'
export function LoginAction(UserName, Password, DeviceId, PushNotificationId, DeviceType, Device) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "UserName": UserName,
                "Password": Password,
                "DeviceId": DeviceId,
                "PushNotificationId": PushNotificationId,
                "DeviceType": DeviceType,
                "Device": Device,
            }),
            method: 'post',
            url: 'user/login'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                if (JsonResponse.PaymentStatus == 1) {
                    AsyncStorage.setItem('Token', JsonResponse.Token, () => {
                    });
                    AsyncStorage.setItem('validuser', "1", () => {
                    });
                    dispatch(getServiceSuccess())
                    // Snackbar.show({
                    //     title: JsonResponse.Message,
                    //     duration: Snackbar.LENGTH_SHORT,
                    // });
                } else {
                    var paymentLink = JsonResponse.PaymentUrl
                    dispatch(didNotPayed(paymentLink))
                }

            } else {
                if (JsonResponse.Message == "Verify the OTP ") {
                    var StudentMobileNumber = JsonResponse.MobileNumber
                    AsyncStorage.setItem('Temp_token', JsonResponse.Token, () => {
                    });
                    AsyncStorage.setItem('validuser', "0", () => {
                    });
                    dispatch(OtpResendAction(JsonResponse.Token))
                    dispatch(Verify_Validuser())
                    dispatch(getServiceFailure(StudentMobileNumber))

                } else {
                    dispatch(getServiceFailure())
                    this.setTimeout(() => {
                        Snackbar.show({
                            title: JsonResponse.Message,
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }, 1000);
                }
            }
        }).catch((error) => {

            Snackbar.show({
                title: "Please try again,Later",
                duration: Snackbar.LENGTH_SHORT
            });
            dispatch(getServiceFailure())
        });
    }
}
export function getService() {
    return {
        type: 'onLoginAction',
    }
}
export function getServiceSuccess() {
    return {
        type: 'onLoginAction_SUCCESS',
    }
}
export function getServiceFailure(StudentMobileNumber) {
    return {
        type: 'onLoginAction_FAILURE',
        StudentMobileNumber
    }
}

export function Verify_Validuser() {
    return {
        type: 'Verify_Validuser',
    }
}

export function didNotPayed(paymentLink) {
    return {
        type: 'nonPayedUser',
        paymentLink
    }
}
