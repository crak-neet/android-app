import { httpRequest } from './../../Asset/Utils/axios';
import { Snackbar } from './../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
export function ForgotPasswordAction(Email) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Email": Email,
            }),
            method: 'post',
            url: 'user/forgotpassword'
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
        type: 'onForgotPassword',
    }
}
export function getServiceSuccess() {
    return {
        type: 'onForgotPassword_SUCCESS',
    }
}
export function getServiceFailure() {
    return {
        type: 'onForgotPassword_FAILURE',
    }
}
