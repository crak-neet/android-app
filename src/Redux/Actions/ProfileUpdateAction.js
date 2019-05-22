import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'
export function ProfileUpdateAction(Token, StudentEmail, FatherMobile, MotherMobile, Address, Pincode, City, District, State, ProfilePic) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "StudentEmail": StudentEmail,
                "FatherMobile": FatherMobile,
                "MotherMobile": MotherMobile,
                "Address": Address,
                "Pincode": Pincode,
                "City": City,
                "District": District,
                "State": State,
                "ProfilePic": ProfilePic
            }),
            method: 'post',
            url: 'user/updatestudent'
        }).then((JsonResponse) => {
          
            if (JsonResponse.ResultStatus == "true") {

                dispatch(getServiceSuccess())
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
            Snackbar.show({
                title: JsonResponse.Message,
                duration: Snackbar.LENGTH_SHORT,
            });

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
        type: 'studentUpdateProfile',

    }
}
export function getServiceSuccess() {
    return {
        type: 'studentUpdateProfile_SUCCESS',

    }
}
export function getServiceFailure() {
    return {
        type: 'studentUpdateProfile_FAILURE',
    }
}
