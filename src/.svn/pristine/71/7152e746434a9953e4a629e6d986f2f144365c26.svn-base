import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function DropdownAssesmentAction(Token,SubjectId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SubjectId":SubjectId,
            }),
            method: 'post',
            url: 'question/subjectwiseassesments'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var list = JsonResponse.result
                var assesmentList = [];
                for (i = 0; i < list.length; i++) {
                    assesmentList.push({
                        "AssessmentId": list[i].AssessmentId,
                        "label": list[i].AssessmentName
                    })
                }

                dispatch(getServiceSuccess(assesmentList))
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
        type: 'assesmentLists',
    }
}
export function getServiceSuccess(assesmentList) {
    return {
        type: 'assesmentLists_SUCCESS',
        assesmentList
    }
}
export function getServiceFailure() {
    return {
        type: 'assesmentLists_FAILURE',
    }
}
