import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function cancelPendinTestAction(Token, TestDetailId) {

    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "TestDetailId": TestDetailId,

            }),
            method: 'post',
            url: 'question/canceltest'
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
        type: 'cancelPendinTest',
    }
}
export function getServiceSuccess() {
    return {
        type: 'cancelPendinTest_SUCCESS',


    }
}
export function getServiceFailure() {
    return {
        type: 'cancelPendinTest_FAILURE',
    }
}
