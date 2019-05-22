export function SkiplistArrayReducer_ClearAction(Skiplist_QuestionNumber_Clear) {
    return (dispatch) => {
        dispatch(getService(Skiplist_QuestionNumber_Clear))
    }
}

export function getService(Skiplist_QuestionNumber_Clear) {
    return {
        type: 'SkiplistArrayReducer_ClearAction',
        Skiplist_QuestionNumber_Clear
    }
}
