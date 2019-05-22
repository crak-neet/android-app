import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'
export function Report_SpecialTestAction(Token, FromDate, ToDate) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "FromDate": FromDate,
                "ToDate": ToDate,
            }),
            method: 'post',
            url: 'report/specialtestreport'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                
                var Special_ReportDetail = JsonResponse.result
                dispatch(getServiceSuccess(Special_ReportDetail))
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
        type: 'Report_SpecialTestAction',
    }
}
export function getServiceSuccess(Special_ReportDetail) {
    return {
        type: 'Report_SpecialTestAction_SUCCESS',
        Special_ReportDetail
        
    }
}
export function getServiceFailure(Special_ReportDetail) {
    return {
        type: 'Report_SpecialTestAction_FAILURE',
        Special_ReportDetail
    }
}
