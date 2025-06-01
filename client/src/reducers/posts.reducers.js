/**
 * Reducer that updates posts state from actions dispatched to Redux store
 * @param {*} state The current state of the posts data in the Redux store.
 * @param {*} action An object containing the action type and any associated data.
 * @returns new state
 */
 const postReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        // LOADING ------------------------------
        case 'START_LOADING':
            return { 
                ...state, 
                isLoading:      true 
            };
        case 'END_LOADING':
            return { 
                ...state, 
                isLoading:      false 
            };
        // CREATE -------------------------------
        case 'CREATE':
            return { 
                ...state, 
                posts: [
                    ...state.posts, 
                    action.payload] 
                };
        // READ ---------------------------------
        case 'FETCH_POST':
            return { 
                ...state, 
                post:          action.payload.post 
            };
        case 'FETCH_ALL':
            return { 
                ...state,     
                posts:         action.payload.data, 
                currentPage:   action.payload.currentPage, 
                numberOfPages: action.payload.numberOfPages 
            };
        case 'FETCH_BY_SEARCH':
            return { 
                ...state, 
                posts:         action.payload.data 
            };
        // UPDATE -------------------------------
        case 'UPDATE':
            return { 
                ...state, 
                posts: state.posts.map((post) => (
                    post._id === action.payload._id ? action.payload : post)) 
            };
        case 'LIKE':
            return { 
                ...state, 
                posts: state.posts.map((post) => (
                    post._id === action.payload._id ? action.payload : post))
            };
        case 'COMMENT':
            return { 
                ...state, 
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }

                    return post;
                })
            };
        // DELETE -------------------------------
        case 'DELETE':
            return { 
                ...state, 
                posts: state.posts.filter((post) => post._id !== action.payload) 
            };
        default:
            return state;
    }
}

export default postReducer;