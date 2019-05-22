import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action';

export function ImageAnswerAction(Token, AnswerImageId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "AnswerImageId": AnswerImageId
            }),
            method: 'post',
            url: 'question/answerimage'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var answerImageZoom = JsonResponse.result
                dispatch(getServiceSuccess(answerImageZoom))
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
                Snackbar.show({
                    title: JsonResponse.Message,
                    duration: Snackbar.LENGTH_SHORT,
                });
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
        type: 'answerImage',

    }
}
export function getServiceSuccess(answerImageZoom) {
    return {
        type: 'answerImage_SUCCESS',
        answerImageZoom

    }
}
export function getServiceFailure() {
    return {
        type: 'answerImage_FAILURE',
    }
}