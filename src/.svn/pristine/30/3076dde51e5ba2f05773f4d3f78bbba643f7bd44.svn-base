import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'

export function AllCancelTest_Action(Token, TestDetailId) {

    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "TestDetailId": TestDetailId,
            }),
            method: 'post',
            url: 'question/canceltest'
        }).then((JsonResponse) => {

            if (JsonResponse.ResultStatus == "true") {
                var lastTestInfo = ""

                var ChapterTimeTaken_Seconds = 1000
                var AssesmentTimeTaken_Seconds = 1000
                var SubjectTimeTaken_Seconds = 1000

                var SpecialTimeTaken_Seconds = 10800000
                var NeetTimeTaken_Seconds = 10800000


                dispatch(getServiceSuccess(lastTestInfo, ChapterTimeTaken_Seconds, AssesmentTimeTaken_Seconds, SubjectTimeTaken_Seconds, SpecialTimeTaken_Seconds, NeetTimeTaken_Seconds))

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
        type: 'AllCancelTest_Action',
    }
}
export function getServiceSuccess(lastTestInfo,ChapterTimeTaken_Seconds, AssesmentTimeTaken_Seconds, SubjectTimeTaken_Seconds, SpecialTimeTaken_Seconds, NeetTimeTaken_Seconds) {
    return {
        type: 'AllCancelTest_Action_SUCCESS',
        lastTestInfo,ChapterTimeTaken_Seconds, AssesmentTimeTaken_Seconds, SubjectTimeTaken_Seconds, SpecialTimeTaken_Seconds, NeetTimeTaken_Seconds
    }
}
export function getServiceFailure() {
    return {
        type: 'AllCancelTest_Action_FAILURE',
    }
}
