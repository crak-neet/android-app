import { AsyncStorage } from 'react-native';


export function Invaliduser_Action() {

    return (dispatch) => {
        AsyncStorage.setItem('Token', "", () => {
        });
        AsyncStorage.setItem('validuser', "0", () => {
        });
        dispatch(getService())
    }
}

export function getService() {
    return {
        type: 'Invaliduser_Action',
    }
}

