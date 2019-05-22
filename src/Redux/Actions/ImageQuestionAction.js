import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function ImageQuestionAction(Token, QuestionImageId) {

    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "QuestionImageId": QuestionImageId
            }),
            method: 'post',
            url: 'question/questionimage'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var questionImage = JsonResponse.result
                dispatch(getServiceSuccess(questionImage))
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
        type: 'questionImage',

    }
}
export function getServiceSuccess(questionImage) {
    return {
        type: 'questionImage_SUCCESS',
        questionImage

    }
}
export function getServiceFailure() {
    return {
        type: 'questionImage_FAILURE',
    }
}
