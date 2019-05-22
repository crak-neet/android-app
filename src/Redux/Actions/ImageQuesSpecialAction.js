import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function ImageQuesSpecialAction(Token, QuestionImageId) {

    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "QuestionImageId": QuestionImageId
            }),
            method: 'post',
            url: 'question/specialquestionimage'
        }).then((JsonResponse) => {
           
            if (JsonResponse.ResultStatus == "true") {
                var questionImageSpecialTest = JsonResponse.result
                dispatch(getServiceSuccess(questionImageSpecialTest))
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
        type: 'imageQuesSpecialTest',

    }
}
export function getServiceSuccess(questionImageSpecialTest) {
    return {
        type: 'imageQuesSpecialTest_SUCCESS',
        questionImageSpecialTest

    }
}
export function getServiceFailure() {
    return {
        type: 'imageQuesSpecialTest_FAILURE',
    }
}
