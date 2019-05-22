import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'
export function ReportChapterTestAction(Token, FromDate, ToDate, ChapterId, SubjectId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "FromDate": FromDate,
                "ToDate": ToDate,
                "ChapterId": ChapterId,
                "SubjectId": SubjectId
            }),
            method: 'post',
            url: 'report/chapterreport'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var chapterReportDetail = JsonResponse.result
                dispatch(getServiceSuccess(chapterReportDetail))
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
                dispatch(getServiceFailure([]))
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
        type: 'onReportForChapter',
    }
}
export function getServiceSuccess(chapterReportDetail) {
    return {
        type: 'onReportForChapter_SUCCESS',
        chapterReportDetail
        
    }
}
export function getServiceFailure(chapterReportDetail) {
    return {
        type: 'onReportForChapter_FAILURE',
        chapterReportDetail
    }
}
