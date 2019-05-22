import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {PincodeAction} from './PincodeAction';
import {Invaliduser_Action} from './Invaliduser_Action'
export function ProfileDetailAction(Token) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
            }),
            method: 'post',
            url: 'user/studentprofile'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var profileDetail = JsonResponse.result
                var studentInfo = profileDetail.StudentInfo
                var fatherInfo = profileDetail.StudentFatherInfo
                var motherInfo = profileDetail.StudentMotherInfo

                dispatch(PincodeAction(studentInfo.Pincode))
                dispatch(getServiceSuccess(studentInfo,fatherInfo,motherInfo))
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
        type: 'profileDetail',

    }
}
export function getServiceSuccess(studentInfo,fatherInfo,motherInfo) {
    return {
        type: 'profileDetail_SUCCESS',
        studentInfo,fatherInfo,motherInfo
    }
}
export function getServiceFailure() {
    return {
        type: 'profileDetail_FAILURE',
    }
}
