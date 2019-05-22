import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'
export function StartChapterTestAction(Token, SubjectId, subjectName, ChapterId, chapterName) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SubjectId": SubjectId,
                "SubjectName": subjectName,
                "ChapterId": ChapterId,
                "ChapterName": chapterName
            }),
            method: 'post',
            url: 'question/chapterwisetest'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var chapterFullDetails = JsonResponse
                var ChapterQuestions = JsonResponse.result
                var SubjectId = JsonResponse.SubjectId
                var ChapterId = JsonResponse.ChapterId
                var ChapterTimeTaken_Seconds = 1000
                dispatch(getServiceSuccess(chapterFullDetails, ChapterQuestions, SubjectId, ChapterId,ChapterTimeTaken_Seconds))
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
        type: 'startChapterWiseTest',
    }
}
export function getServiceSuccess(chapterFullDetails, ChapterQuestions, SubjectId, ChapterId,ChapterTimeTaken_Seconds) {
    return {
        type: 'startChapterWiseTest_SUCCESS',
        chapterFullDetails, ChapterQuestions, SubjectId, ChapterId,ChapterTimeTaken_Seconds

    }
}
export function getServiceFailure() {
    return {
        type: 'startChapterWiseTest_FAILURE',
    }
}
