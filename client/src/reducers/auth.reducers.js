/**
 * Reducer that updates authentication state from actions dispatched to Redux store
 * @param {*} state The current state of the authentication data in the Redux store.
 * @param {*} action An object containing the action type and any associated data.
 * @returns new state
 */
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};


export default authReducer;