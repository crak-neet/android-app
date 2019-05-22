import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'

export function StartNeetModel_SaveAction(Token, TestDetailId, QuestionId) {
    
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "TestDetailId": TestDetailId,
                "QuestionId": QuestionId
            }),
            method: 'post',
            url: 'question/neetmodeltest'
        }).then((JsonResponse) => {

            if (JsonResponse.ResultStatus == "true") {
                var neetModelTestQuestions = JsonResponse.result
                var questionStatus = JsonResponse.QusetionStatus
                var nextQuestionId = JsonResponse.NextId
                var previousQuestionId = JsonResponse.PreviousId
                var TimeTaken = (JsonResponse.TimeTaken).split(":")
                var NeetTimeTaken_Seconds = (TimeTaken[0]) * (1000 * 60 * 60) + (TimeTaken[1]) * (1000 * 60) + (TimeTaken[2]) * 1000
                // var NeetTimeTaken_Seconds = 1000 * 60 * 60 * 3 - SpecialTimeTaken
                
                var NEETModel_TimeTakenStatus = JsonResponse.TimeTakenStatus

                dispatch(getServiceSuccess(neetModelTestQuestions, NeetTimeTaken_Seconds, NEETModel_TimeTakenStatus, questionStatus, nextQuestionId, previousQuestionId))
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
                title: "Please try aain,Later",
                duration: Snackbar.LENGTH_SHORT
            });
            dispatch(getServiceFailure())
        });
    }
}

export function getService() {
    return {
        type: 'onSaveNeetModelTest',
    }
}

export function getServiceSuccess(neetModelTestQuestions, NeetTimeTaken_Seconds, NEETModel_TimeTakenStatus, questionStatus, nextQuestionId, previousQuestionId) {

    return {
        type: 'onSaveNeetModelTest_SUCCESS',
        neetModelTestQuestions, NeetTimeTaken_Seconds, NEETModel_TimeTakenStatus,
        questionStatus, nextQuestionId, previousQuestionId
    }
}

export function getServiceFailure() {
    return {
        type: 'onSaveNeetModelTest_FAILURE',
    }
}
