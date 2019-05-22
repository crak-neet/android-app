export function SkiplistArray(Skiplist_QuestionNumber,questioId) {
    
    return (dispatch) => {
        dispatch(getService(Skiplist_QuestionNumber,questioId))
    }
}

export function getService(Skiplist_QuestionNumber,questioId) {
    return {
        type: 'SkiplistArray',
        Skiplist_QuestionNumber,questioId
    }
}
