import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'
export function StartSpecialTestAction(Token, SpecialTestId, SpecialTestName) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SpecialTestId": SpecialTestId,
                "SpecialTestName": SpecialTestName
            }),
            method: 'post',
            url: 'question/specialtest'
        }).then((JsonResponse) => {
                
            if (JsonResponse.ResultStatus == "true") {
                var SpecialTestFullDetails = JsonResponse
                var specialTestQuestions = JsonResponse.result

                
                var _saveSpecialTestId = JsonResponse.SpecialTestId
                var SpecialTimeTaken_Seconds = 10800000

                var nextQuestionIdSpcl = JsonResponse.NextId
                var previousQuestionIdSpcl = JsonResponse.PreviousId
                var questionStatusSpcl = JsonResponse.QusetionStatus
                dispatch(getServiceSuccess(SpecialTestFullDetails, specialTestQuestions, _saveSpecialTestId, SpecialTimeTaken_Seconds, nextQuestionIdSpcl, previousQuestionIdSpcl, questionStatusSpcl))
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
                title: "Please try again,Later",
                duration: Snackbar.LENGTH_SHORT
            });
            dispatch(getServiceFailure())
        });
    }
}
export function getService() {
    return {
        type: 'StartSpecialTest',
    }
}
export function getServiceSuccess(SpecialTestFullDetails, specialTestQuestions, _saveSpecialTestId, SpecialTimeTaken_Seconds, nextQuestionIdSpcl, previousQuestionIdSpcl, questionStatusSpcl) {
    return {
        type: 'StartSpecialTest_SUCCESS',
        SpecialTestFullDetails, specialTestQuestions, _saveSpecialTestId, SpecialTimeTaken_Seconds, nextQuestionIdSpcl, previousQuestionIdSpcl, questionStatusSpcl
    }
}
export function getServiceFailure() {
    return {
        type: 'StartSpecialTest_FAILURE',
    }
}
