import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'
export function StartChapterTest_SaveAction(Token, SubjectId, ChapterId, TestDetailId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SubjectId": SubjectId,
                "ChapterId": ChapterId,
                "TestDetailId": TestDetailId,
            }),
            method: 'post',
            url: 'question/chapterwisetest'
        }).then((JsonResponse, ) => {
            if (JsonResponse.ResultStatus == "true") {
                var ChapterQuestions = JsonResponse.result
                var SubjectId = JsonResponse.SubjectId
                var ChapterId = JsonResponse.ChapterId
                var Chapter_TimeTakenStatus = JsonResponse.TimeTakenStatus

                var chapterFullDetails = JsonResponse

                var TimeTaken = (JsonResponse.TimeTaken).split(":")
                var ChapterTimeTaken_Seconds = (TimeTaken[0])*(1000*60*60) + (TimeTaken[1])*(1000*60) + (TimeTaken[2])*1000 

                dispatch(getServiceSuccess(ChapterQuestions,SubjectId,ChapterId,ChapterTimeTaken_Seconds,Chapter_TimeTakenStatus,chapterFullDetails))
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
        type: 'StartChapterTest_SaveAction',
    }
}
export function getServiceSuccess(ChapterQuestions,SubjectId,ChapterId,ChapterTimeTaken_Seconds,Chapter_TimeTakenStatus,chapterFullDetails) {
    return {
        type: 'StartChapterTest_SaveAction_SUCCESS',
        ChapterQuestions,SubjectId,ChapterId,ChapterTimeTaken_Seconds,Chapter_TimeTakenStatus,chapterFullDetails
    }
}
export function getServiceFailure() {
    return {
        type: 'StartChapterTest_SaveAction_FAILURE',
    }
}
