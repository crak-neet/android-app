import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
export function PincodeAction(Pincode) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Pincode": Pincode,
            }),
            method: 'post',
            url: 'user/pincodemapping'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var PincodeFetchDetails = JsonResponse
                var districtheadId = JsonResponse.DistrictheadId
                
                dispatch(getServiceSuccess(PincodeFetchDetails,districtheadId))
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
        type: 'onPincodeDetails',
    }
}
export function getServiceSuccess(PincodeFetchDetails,districtheadId) {
    return {
        type: 'onPincodeDetails_SUCCESS',
        PincodeFetchDetails,districtheadId
    }
}
export function getServiceFailure() {
    return {
        type: 'onPincodeDetails_FAILURE',
    }
}