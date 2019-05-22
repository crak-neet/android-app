import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'

export function StartNeetModelTestAction(Token) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token
            }),
            method: 'post',
            url: 'question/neetmodeltest'
        }).then((JsonResponse) => {
         
            if (JsonResponse.ResultStatus == "true") {
                var neetModelTestQuestions = JsonResponse.result
                var _saveTestDetailId = JsonResponse.TestDetailId
                //  SpecialTimeTaken_Seconds: 10800000,
                var NeetTimeTaken_Seconds = 10800000

                var questionStatus = JsonResponse.QusetionStatus
                var nextQuestionId = JsonResponse.NextId
                var previousQuestionId = JsonResponse.PreviousId
                dispatch(getServiceSuccess(neetModelTestQuestions, _saveTestDetailId, NeetTimeTaken_Seconds, questionStatus, nextQuestionId, previousQuestionId))
            } else if (JsonResponse.Message == "Invalid User") {

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
                title: "Something Went Wrong",
                duration: Snackbar.LENGTH_SHORT,
            });
            dispatch(getServiceFailure())
        });
    }
}
export function getService() {
    return {
        type: 'onStartNeetModelTest',
    }
}
export function getServiceSuccess(neetModelTestQuestions, _saveTestDetailId, NeetTimeTaken_Seconds, questionStatus, nextQuestionId, previousQuestionId) {

    return {
        type: 'onStartNeetModelTest_SUCCESS',
        neetModelTestQuestions, _saveTestDetailId, NeetTimeTaken_Seconds, questionStatus, nextQuestionId, previousQuestionId
    }
}
export function getServiceFailure() {
    return {
        type: 'onStartNeetModelTest_FAILURE',
    }
}
