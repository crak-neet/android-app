export function SkipListQusIDAction(questioId) {
    
    return (dispatch) => {
        dispatch(getService(questioId))
    }
}

export function getService(questioId) {
    return {
        type: 'skipListQusID',
        questioId
    }
}
