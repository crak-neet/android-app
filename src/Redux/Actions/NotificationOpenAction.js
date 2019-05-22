import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert ,AsyncStorage} from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action';
// import { NotificationAction } from './NotificationAction';
import { DashboardTestDetailAction } from './DashboardTestDetailAction';
export function NotificationOpenAction(Token) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
            }),
            method: 'post',
            url: 'user/notificationcheck'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                AsyncStorage.getItem("Token", (error, Token) => {
                    dispatch(DashboardTestDetailAction(Token))
                })

                // AsyncStorage.getItem("Token", (error, Token) => { 
                //     // this.props.NotificationAction(Token)
                //     dispatch(NotificationAction(Token))
                // })
                dispatch(getServiceSuccess())

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
        type: 'NotificationOpenAction',

    }
}
export function getServiceSuccess() {
    return {
        type: 'NotificationOpenAction_SUCCESS',

    }
}
export function getServiceFailure() {
    return {
        type: 'NotificationOpenAction_FAILURE',

    }
}
