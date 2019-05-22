import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function Report_ReviseSearchAction(Token, FromDate, ToDate) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "FromDate": FromDate,
                "ToDate": ToDate,
            }),
            method: 'post',
            url: 'report/rewise'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var ViewSummaryreportDetail = JsonResponse.result
                dispatch(getServiceSuccess(ViewSummaryreportDetail))
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
        type: 'Report_ReviseSearchAction',
    }
}
export function getServiceSuccess(ViewSummaryreportDetail) {
    return {
        type: 'Report_ReviseSearchAction_SUCCESS',
        ViewSummaryreportDetail
        
    }
}
export function getServiceFailure(ViewSummaryreportDetail) {
    return {
        type: 'Report_ReviseSearchAction_FAILURE',
        ViewSummaryreportDetail
    }
}