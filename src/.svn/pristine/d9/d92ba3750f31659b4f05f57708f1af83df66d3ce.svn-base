import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'
export function StartSubjectSaveAction(Token, SubjectId, TestDetailId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SubjectId": SubjectId,
                "TestDetailId": TestDetailId,
            }),
            method: 'post',
            url: 'question/subjectwisetest'
        }).then((JsonResponse) => {

            if (JsonResponse.ResultStatus == "true") {
                
                var subjectTestQuestions = JsonResponse.result
                var _subjectIdSave = JsonResponse.SubjectId

                var TimeTaken = (JsonResponse.TimeTaken).split(":")
                var SubjectTimeTaken_Seconds = (TimeTaken[0])*(1000*60*60) + (TimeTaken[1])*(1000*60) + (TimeTaken[2])*1000 
                var Subject_TimeTakenStatus = JsonResponse.TimeTakenStatus
                var subjectFullDetails = JsonResponse

                dispatch(getServiceSuccess(subjectTestQuestions,_subjectIdSave,SubjectTimeTaken_Seconds,Subject_TimeTakenStatus,subjectFullDetails))
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
        type: 'subjectWiseSaved',
    }
}
export function getServiceSuccess(subjectTestQuestions,_subjectIdSave,SubjectTimeTaken_Seconds,Subject_TimeTakenStatus,subjectFullDetails) {
    return {
        type: 'subjectWiseSaved_SUCCESS',
        subjectTestQuestions,_subjectIdSave,SubjectTimeTaken_Seconds,Subject_TimeTakenStatus,subjectFullDetails
    }
}
export function getServiceFailure() {
    return {
        type: 'subjectWiseSaved_FAILURE',
    }
}
