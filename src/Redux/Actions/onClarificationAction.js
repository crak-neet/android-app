import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert,AsyncStorage } from 'react-native';
export function onClarificationAction(Token, TestDetailId, AnswerId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "TestDetailId":TestDetailId,
                "AnswerId":AnswerId
            }),
            method: 'post',
            url: 'report/helpsubmit'
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
        type: 'onClarifiacation',
    }
}
export function getServiceSuccess() {
    return {
        type: 'onClarifiacation_SUCCESS',
    }
}
export function getServiceFailure() {
    return {
        type: 'onClarifiacation_FAILURE',
    }
}
