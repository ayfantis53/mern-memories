// npm installs
import axios from 'axios';


// creates a new instance of Axios as the base URL.
const API = axios.create({ baseURL: '/api' });

// Help auth Middleware, happens before each request, used to send token to backend to verify were logged in.
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`;
    }

    return req;
});

// POSTS CREATE. -------------------------------------------------------------------------
export const createPosts        = (newPost, navigate) => API.post('/posts', newPost                    );

// POSTS READ. ---------------------------------------------------------------------------
export const fetchPost          = (id               ) => API.get(`/posts/${id}`                        );
export const fetchPosts         = (page             ) => API.get(`/posts?page=${page}`                 );
export const fetchPostsBySearch = (searchQuery      ) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

// POSTS UPDATE. -------------------------------------------------------------------------
export const likePosts          = (id               ) => API.patch(`/posts/${id}/likePost`             );
export const commentPost        = (value, id        ) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePosts        = (id, updatePosts  ) => API.patch(`/posts/${id}`, updatePosts         );

// POSTS DELETE. -------------------------------------------------------------------------
export const deletePosts        = (id, navigate     ) => API.delete(`/posts/${id}`                     );

// AUTH CREATE. --------------------------------------------------------------------------
export const signIn             = (formData        ) => API.post('/user/signin', formData              );
export const signUp             = (formData        ) => API.post('/user/signup', formData              );
