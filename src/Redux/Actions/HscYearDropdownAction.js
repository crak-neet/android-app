import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import { Invaliduser_Action } from './Invaliduser_Action'

export function HscYearDropdownAction() {

    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({

            }),
            method: 'post',
            url: 'user/hscyear'
        }).then((JsonResponse) => {

            if (JsonResponse.ResultStatus == "true") {

                var list = JsonResponse.year

                var HscYearDropdown = [];
                for (i = 0; i < list.length; i++) {
                    HscYearDropdown.push({
                        "label": list[i]
                    })
                }

                dispatch(getServiceSuccess(HscYearDropdown))

            } else {
                dispatch(getServiceFailure())
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
        type: 'hscYearDropDown_Action',
    }
}
export function getServiceSuccess(HscYearDropdown) {
    return {
        type: 'hscYearDropDown_Action_SUCCESS',
        HscYearDropdown

    }
}
export function getServiceFailure() {
    return {
        type: 'hscYearDropDown_Action_FAILURE',
    }
}
