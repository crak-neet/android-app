import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert,AsyncStorage } from 'react-native';
export function OtpVerificationAction(Token, OtpValue) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "Otpvalue":OtpValue,
            }),
            method: 'post',
            url: 'user/otpverification'
        }).then((JsonResponse) => {

           
            if (JsonResponse.ResultStatus == "true") {
                var paymentLink = JsonResponse.PaymentUrl
                AsyncStorage.setItem('Token', JsonResponse.Token, () => {
                });
                AsyncStorage.setItem('Temp_token', "", () => {
                });
                 dispatch(getServiceSuccess(paymentLink))
            } else {
                dispatch(getServiceFailure())
            }
            Snackbar.show({
                title: JsonResponse.Message,
                duration: Snackbar.LENGTH_SHORT,
            });
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
        type: 'onOtpVerify',
    }
}
export function getServiceSuccess(paymentLink) {
    return {
        type: 'onOtpVerify_SUCCESS',
        paymentLink
        
    }
}
export function getServiceFailure() {
    return {
        type: 'onOtpVerify_FAILURE',
    }
}
