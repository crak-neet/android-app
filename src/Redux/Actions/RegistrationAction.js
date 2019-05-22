import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert, AsyncStorage } from 'react-native';
export function RegistrationAction(StudentName, MobileNumber, StudentEmail, Password, Address, Pincode, City, District, DistrictId, State,
    FathersName, FathersMobileNumber, FathersEmail, FathersOccupation, FathersDesignation, MothersName, MothersMobileNumber, MothersEmail, MothersOccupation, MothersDesignation,
    SchoolDetails, HscYear, siblings, BrotherSisterName, Class, BroSisSchoolDetails, AgentCode, ProfilePic,
    DeviceId, DeviceType, PushNotificationId) {
       
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "StudentName": StudentName,
                "Password": Password,
                "StudentMobile": MobileNumber,
                "StudentEmail": StudentEmail,
                "Address": Address,
                "Pincode": Pincode,
                "DistrictId": DistrictId,
                "City": City,
                "State": State,
                "District": District,
                "FatherName": FathersName,
                "FatherMobile": FathersMobileNumber,
                "FatherEmail": FathersEmail,
                "FatherOccupation": FathersOccupation,
                "FatherDesignation": FathersDesignation,
                "MotherName": MothersName,
                "MotherMobile": MothersMobileNumber,
                "MotherEmail": MothersEmail,
                "MotherOccupation": MothersOccupation,
                "MotherDesignation": MothersDesignation,
                "SchoolAddress": SchoolDetails,
                "HscYear": HscYear,
                "siblings": siblings,
                "siblingsName": BrotherSisterName,
                "ClassStudent": Class,
                "SiblingsSchoolAddress": BroSisSchoolDetails,
                "AgentCode": AgentCode,
                "ProfilePic": ProfilePic,
                "DeviceId": DeviceId,
                "DeviceType": DeviceType,
                "PushNotificationId": PushNotificationId
            }),
            method: 'post',
            url: 'user/studentregistration'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                AsyncStorage.setItem('Temp_token', JsonResponse.Token, () => {
                });
                var studentregistration_Deatils = JsonResponse
                var StudentMobileNumber = JsonResponse.MobileNumber
                dispatch(getServiceSuccess(studentregistration_Deatils, StudentMobileNumber))
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
        type: 'onRegistration',

    }
}
export function getServiceSuccess(studentregistration_Deatils, StudentMobileNumber) {
    return {
        type: 'onRegistration_SUCCESS',
        studentregistration_Deatils, StudentMobileNumber

    }
}
export function getServiceFailure() {
    return {
        type: 'onRegistration_FAILURE',
    }
}
