import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
export function OtpResendAction(Token) {
    
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
           
            data: JSON.stringify({
                "Token": Token,
            }),
            method: 'post',
            url: 'user/resendotp'
        }).then((JsonResponse) => {
            
            if (JsonResponse.ResultStatus == "true") {
                dispatch(getServiceSuccess())

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
        type: 'onOtpResend',
    }
}
export function getServiceSuccess() {
    return {
        type: 'onOtpResend_SUCCESS',
        
    }
}
export function getServiceFailure() {
    return {
        type: 'onOtpResend_FAILURE',
    }
}