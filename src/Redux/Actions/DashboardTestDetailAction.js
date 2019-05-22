import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert, AsyncStorage } from 'react-native';

import { Invaliduser_Action } from './Invaliduser_Action'
import { DropdownSubjectAction } from './DropdownSubjectAction'
import { cancelPendinTestAction } from './cancelPendinTestAction';
import { AllSkipList_Action } from './AllSkipList_Action';

import { QuickReportAssesmentAction } from './QuickReportAssesmentAction';
import { QuickReportChapterAction } from './QuickReportChapterAction';
import { QuickReportModelAction } from './QuickReportModelAction';
import { QuickReportSpcialAction } from './QuickReportSpcialAction';
import { QuickReportSubjectAction } from './QuickReportSubjectAction';

var token = ''
export function DashboardTestDetailAction(Token) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
            }),
            method: 'post',
            url: 'user/studenttestdetails'
        }).then((JsonResponse) => {

            if (JsonResponse.ResultStatus == "true") {
                var Examvalidation = JsonResponse.Examvalidation
                var testDetail = JsonResponse.result

                var lastTestInfo = JsonResponse.LastAttendTestDetails == null ? "" : JsonResponse.LastAttendTestDetails

                if (lastTestInfo != "") {
                    AsyncStorage.getItem("Token", (error, Token) => {
                        token = Token
                    })
                    // TestTypeId :
                    // 1->Chapter Test,
                    // 2->Subject Test,
                    // 3->Assesment Test,
                    // 4->Neet Model Test,
                    // 5->Special Test
                    if (lastTestInfo.TimeTakenStatus == false) {

                        //Time is Up
                        if (lastTestInfo.TestTypeId == 1) {
                            Alert.alert(
                                "Chapter test ",
                                "Time up, Submit your test now",
                                [
                                    { text: 'OK', onPress: () => dispatch(QuickReportChapterAction(token, lastTestInfo.TestDetailId)) },
                                ],
                                { cancelable: false }
                            )
                        } else if (lastTestInfo.TestTypeId == 2) {
                            Alert.alert(
                                "Subject test ",
                                "Time up, Submit your test now",
                                [
                                    { text: 'OK', onPress: () => dispatch(QuickReportSubjectAction(token, lastTestInfo.TestDetailId)) },
                                ],
                                { cancelable: false }
                            )
                        } else if (lastTestInfo.TestTypeId == 3) {
                            Alert.alert(
                                "Assesment test",
                                "Time up, Submit your test now",
                                [
                                    { text: 'OK', onPress: () => dispatch(QuickReportAssesmentAction(token, lastTestInfo.TestDetailId)) },
                                ],
                                { cancelable: false }
                            )
                        } else if (lastTestInfo.TestTypeId == 4) {
                            Alert.alert(
                                "Neet Model Test",
                                "Time up, Submit your test now", [
                                    { text: 'OK', onPress: () => dispatch(QuickReportModelAction(token, lastTestInfo.TestDetailId)) },
                                ],
                                { cancelable: false }
                            )
                        } else if (lastTestInfo.TestTypeId == 5) {
                            Alert.alert(
                                "Special Test",
                                "Time up, Submit your test now",
                                [
                                    { text: 'OK', onPress: () => dispatch(QuickReportSpcialAction(token, lastTestInfo.TestDetailId)) },
                                ],
                                { cancelable: false }
                            )
                        }
                    } else {
                        Alert.alert(
                            "Pending Test",
                            "Do you want to continue ?",
                            [
                                { text: 'Cancel', onPress: () => dispatch(cancelPendinTestAction(token, lastTestInfo.TestDetailId)), style: 'cancel' },
                                { text: 'Continue', onPress: () => dispatch(AllSkipList_Action(token, lastTestInfo.TestDetailId,"Skip_From")) },
                            ],
                            { cancelable: false }
                        )
                    }

                }
                dispatch(getServiceSuccess(testDetail, lastTestInfo, Examvalidation))
                dispatch(DropdownSubjectAction(Token))

            } else if (JsonResponse.Message == "Invalid User") {
                alert()

                Alert.alert(
                    '',
                    "Another device used, You have logged out",

                    [
                        { text: 'OK', onPress: () => dispatch(Invaliduser_Action()) },
                    ],
                    { cancelable: false }
                )
            }
            else {
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
        type: 'testDetailDashboard',

    }
}
export function getServiceSuccess(testDetail, lastTestInfo, Examvalidation) {
    return {
        type: 'testDetailDashboard_SUCCESS',
        testDetail, lastTestInfo, Examvalidation
    }
}

export function getServiceFailure() {
    return {
        type: 'testDetailDashboard_FAILURE',
    }
}

export function goIncompleteTest(pendingTestID, typeOfTest) {
    return {
        type: 'AttendIncompleteTest',
        pendingTestID, typeOfTest
    }
}
