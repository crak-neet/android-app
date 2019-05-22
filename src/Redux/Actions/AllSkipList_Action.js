import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'

export function AllSkipList_Action(Token, TestDetailId, Skip_Valid) {

    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "TestDetailId": TestDetailId,
            }),
            method: 'post',
            url: 'report/skiplist'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {

                var Skiplist_data = JsonResponse
                var Skiplist = JsonResponse.result
                if (Skiplist_data.TestTypeId == 4 && Skiplist != null || Skiplist_data.TestTypeId == 5 && Skiplist != null) {
                    var Skiplist_SkipListQuestionId = Skiplist[0].SkipListQuestionId
                } else {
                    var Skiplist_SkipListQuestionId = "1"
                }


                // TestTypeId :
                // 1->Chapter Test,
                // 2->Subject Test,
                // 3->Assesment Test,
                // 4->Neet Model Test,
                // 5->Special Test

                if (Skiplist_data.TestTypeId == 1) {
                    var TimeTaken = (JsonResponse.StudentTestTime).split(":")
                    var ChapterTimeTaken_Seconds = (TimeTaken[0]) * (1000 * 60 * 60) + (TimeTaken[1]) * (1000 * 60) + (TimeTaken[2]) * 1000
                } else if (Skiplist_data.TestTypeId == 2) {

                    var TimeTaken = (JsonResponse.StudentTestTime).split(":")
                    var SubjectTimeTaken_Seconds = (TimeTaken[0]) * (1000 * 60 * 60) + (TimeTaken[1]) * (1000 * 60) + (TimeTaken[2]) * 1000
                } else if (Skiplist_data.TestTypeId == 3) {
                    var TimeTaken = (JsonResponse.StudentTestTime).split(":")
                    var AssesmentTimeTaken_Seconds = (TimeTaken[0]) * (1000 * 60 * 60) + (TimeTaken[1]) * (1000 * 60) + (TimeTaken[2]) * 1000
                } else if (Skiplist_data.TestTypeId == 4) {
                    var TimeTaken = (JsonResponse.StudentTestTime).split(":")
                    var NeetTimeTaken_Seconds = (TimeTaken[0]) * (1000 * 60 * 60) + (TimeTaken[1]) * (1000 * 60) + (TimeTaken[2]) * 1000
                } else if (Skiplist_data.TestTypeId == 5) {
                    var TimeTaken = (JsonResponse.StudentTestTime).split(":")
                    var SpecialTimeTaken_Seconds = (TimeTaken[0]) * (1000 * 60 * 60) + (TimeTaken[1]) * (1000 * 60) + (TimeTaken[2]) * 1000
                }

                dispatch(getServiceSuccess(Skiplist, Skiplist_data, ChapterTimeTaken_Seconds, SubjectTimeTaken_Seconds, AssesmentTimeTaken_Seconds, NeetTimeTaken_Seconds, SpecialTimeTaken_Seconds, Skiplist_SkipListQuestionId, Skip_Valid))
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
        type: 'AllSkipList_Action',
    }
}
export function getServiceSuccess(Skiplist, Skiplist_data, ChapterTimeTaken_Seconds, SubjectTimeTaken_Seconds, AssesmentTimeTaken_Seconds, NeetTimeTaken_Seconds, SpecialTimeTaken_Seconds, Skiplist_SkipListQuestionId, Skip_Valid) {
    return {
        type: 'AllSkipList_Action_SUCCESS',
        Skiplist, Skiplist_data, ChapterTimeTaken_Seconds, SubjectTimeTaken_Seconds, AssesmentTimeTaken_Seconds, NeetTimeTaken_Seconds, SpecialTimeTaken_Seconds, Skiplist_SkipListQuestionId, Skip_Valid

    }
}
export function getServiceFailure() {
    return {
        type: 'AllSkipList_Action_FAILURE',
    }
}