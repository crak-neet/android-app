import { httpRequest } from '../../Asset/Utils/axios';
import { Snackbar } from '../../Asset/Libraries/NpmList';
import { Alert } from 'react-native';
import {Invaliduser_Action} from './Invaliduser_Action'

export function DropdownChaptersAction(Token,SubjectId) {
    return (dispatch) => {
        dispatch(getService())
        return httpRequest({
            data: JSON.stringify({
                "Token": Token,
                "SubjectId":SubjectId
            }),
            method: 'post',
            url: 'question/chapters'
        }).then((JsonResponse) => {
            if (JsonResponse.ResultStatus == "true") {
                var list = JsonResponse.result
                var chapterList = [];
                for (i = 0; i < list.length; i++) {
                    chapterList.push({
                        "ChapterId": list[i].ChapterId,
                        "label": list[i].ChapterName 
                    })
                }
                
                dispatch(getServiceSuccess(chapterList))
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
        type: 'chaptersLists',

    }
}
export function getServiceSuccess(chapterList) {
    return {
        type: 'chaptersLists_SUCCESS',
        chapterList

    }
}
export function getServiceFailure() {
    return {
        type: 'chaptersLists_FAILURE',
    }
}
