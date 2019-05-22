import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action';

export function ImageAnswSpecialAction(Token, AnswerImageId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "AnswerImageId": AnswerImageId
            }),
            method: 'post',
            url: 'question/specialanswerimage'
        }).then((JsonResponse) => {
          
            if (JsonResponse.ResultStatus == "true") {
                var specialTestZoomImage = JsonResponse.result
                dispatch(getServiceSuccess(specialTestZoomImage))
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
        type: 'answerImageSpecialTest  ',

    }
}
export function getServiceSuccess(specialTestZoomImage) {
    return {
        type: 'answerImageSpecialTest_SUCCESS',
        specialTestZoomImage

    }
}
export function getServiceFailure() {
    return {
        type: 'answerImageSpecialTest_FAILURE',
    }
}
