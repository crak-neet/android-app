import { httpRequest } from './../../Asset/Utils/axios';
import { Snackbar } from './../../Asset/Libraries/NpmList';

export function ChangePasswordAction(Token, OldPassword, NewPassword, ConfirmPassword) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "OldPassword": OldPassword,
                "NewPassword": NewPassword,
                "ConfirmPassword": ConfirmPassword
            }),
            method: 'post',
            url: 'user/changepassword'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                dispatch(getServiceSuccess())
            }else if (JsonResponse.Message == "Invalid User") {
             
                Alert.alert(
                    '',
                    "Another device used, You have logged out",
                    
                    [
                        { text: 'OK', onPress: () => dispatch(Invaliduser_Action()) },
                    ],
                    { cancelable: false }
                )
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
        type: 'onChangePassword',

    }
}
export function getServiceSuccess() {
    return {
        type: 'onChangePassword_SUCCESS',

    }
}
export function getServiceFailure() {
    return {
        type: 'onChangePassword_FAILURE',
    }
}
