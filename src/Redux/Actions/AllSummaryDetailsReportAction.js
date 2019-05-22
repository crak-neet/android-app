import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function AllSummaryDetailsReportAction(Token, Summary, TypeId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SummaryId": Summary,

            }),
            method: 'post',
            url: 'summary/viewsummarydetail'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {

                if (TypeId == "1") {

                    var ViewSummaryreportDetail = JsonResponse.SummaryDetail
                    dispatch(getServiceSuccess(ViewSummaryreportDetail))
                    dispatch(ChapterTest_SummaryDetailReports_Action())

                } else if (TypeId == "2") {

                    var ViewSummaryreportDetail = JsonResponse.SummaryDetail
                    dispatch(getServiceSuccess(ViewSummaryreportDetail))
                    dispatch(SubjectTest_SummaryDetailReports_Action())

                } else if (TypeId == "3") {

                    var ViewSummaryreportDetail = JsonResponse.SummaryDetail
                    dispatch(getServiceSuccess(ViewSummaryreportDetail))
                    dispatch(AssessmentTest_SummaryDetailReports_Action())

                } else if (TypeId == "4") {

                    var ViewSummaryreportDetail = JsonResponse.SummaryDetail
                    dispatch(getServiceSuccess(ViewSummaryreportDetail))
                    dispatch(NEETModelTest_SummaryDetailReports_Action())

                } else if (TypeId == "5") {

                    var ViewSummaryreportDetail = JsonResponse.SummaryDetail
                    dispatch(getServiceSuccess(ViewSummaryreportDetail))
                    dispatch(SpecialTest_SummaryDetailReports_Action())

                }
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
        type: 'AllSummaryDetailsReportAction',
    }
}
export function getServiceSuccess(ViewSummaryreportDetail) {
    return {
        type: 'AllSummaryDetailsReportAction_SUCCESS',
        ViewSummaryreportDetail

    }
}

export function getServiceFailure() {
    return {
        type: 'AllSummaryDetailsReportAction_FAILURE',
    }
}




export function ChapterTest_SummaryDetailReports_Action() {
    return {
        type: 'ChapterTest_SummaryDetailReports_Action',


    }
}
export function AssessmentTest_SummaryDetailReports_Action() {
    return {
        type: 'AssessmentTest_SummaryDetailReports_Action',


    }
} export function NEETModelTest_SummaryDetailReports_Action() {
    return {
        type: 'NEETModelTest_SummaryDetailReports_Action',


    }
} export function SpecialTest_SummaryDetailReports_Action() {
    return {
        type: 'SpecialTest_SummaryDetailReports_Action',


    }
} export function SubjectTest_SummaryDetailReports_Action() {
    return {
        type: 'SubjectTest_SummaryDetailReports_Action',


    }
}