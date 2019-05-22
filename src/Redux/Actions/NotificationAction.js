import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert,AsyncStorage } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action';
// import { DashboardTestDetailAction } from './DashboardTestDetailAction';

export function NotificationAction(Token) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
            }),
            method: 'post',
            url: 'user/notification'
        }).then((JsonResponse) => {

            if (JsonResponse.ResultStatus == "true") {
                // AsyncStorage.getItem("Token", (error, Token) => {
                //     dispatch(DashboardTestDetailAction(Token))
                // })

                var notificationDetail = JsonResponse.result

                // var Notification_DetailArray = [];

                // for (i = 0; i < notificationDetail.length; i++) {

                //     for (j = 0; j < notificationDetail[i].MessageResult.length; j++) {
                //         Notification_DetailArray.push({
                //             "NotificationId": notificationDetail[i].MessageResult[j].NotificationId,
                //             "Title": notificationDetail[i].MessageResult[j].Title,
                //             "Message": notificationDetail[i].MessageResult[j].Message,
                //             "Date": notificationDetail[i].MessageResult[j].Date,
                //             "Time": notificationDetail[i].MessageResult[j].Time,
                //             "checked": notificationDetail[i].MessageResult[j].checked,
                //             "Expand": false
                //         })
                //     }
                // }


                dispatch(getServiceSuccess(notificationDetail))

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
        type: 'notificationDetail',

    }
}
export function getServiceSuccess(notificationDetail) {
    return {
        type: 'notificationDetail_SUCCESS',
        notificationDetail
    }
}
export function getServiceFailure(notificationDetail) {
    return {
        type: 'notificationDetail_FAILURE',
        notificationDetail
    }
}
