import axios from 'axios';

export const REMOVE_BOOK='REMOVE_BOOK';

export const SEARCH_BOOK_REQUEST='SEARCH_BOOK_REQUEST';
export const SEARCH_BOOK_SUCCESS='SEARCH_BOOK_SUCCESS';
export const SEARCH_BOOK_FAILURE='SEARCH_BOOK_FAILURE';
export const MIN_THREE_CHAR='MIN_THREE_CHAR';

export const AUTH_REQUEST='AUTH_REQUEST';
export const AUTH_SUCCESS='AUTH_SUCCESS';
export const AUTH_FAILURE='AUTH_FAILURE';


export const FETCH_BOOKS_REQUEST='FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS='FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE='FETCH_BOOKS_FAILURE';

export const LOG_OUT='LOG_OUT';

export const GET_CURRENT_USER_REQUEST='GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS='GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE='GET_CURRENT_USER_FAILURE';

export const REGISTER_REQUEST='REGISTER_REQUEST';
export const REGISTER_SUCCESS='REGISTER_SUCCESS';
export const REGISTER_FAILURE='REGISTER_FAILURE';

export const CLEAR_ERROR='CLEAR_ERROR';

export const ADD_BOOK_REQUEST='ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS='ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE='ADD_BOOK_FAILURE';

const API='http://192.168.1.32:8080/api';


export const fetchBooks=()=>async(dispatch)=>{
    dispatch({
        type:FETCH_BOOKS_REQUEST
    });
    return axios.get(API+"/book/search/all")
    .then(payload=>{
        console.log(payload);
        dispatch({
            type:FETCH_BOOKS_SUCCESS,
            payload
        })
    })
    .catch(err=>{
        // console.log(err);
        dispatch({
            type:FETCH_BOOKS_FAILURE
        })
    })
}


export const logOut=()=>{
    return {
        type: LOG_OUT
    }
}

export const removeBook=(id)=>{
    return {
        type:REMOVE_BOOK,
        payload:{
            id
        }
    }
}

export const getUserLoginAction=(token)=>async(dispatch)=>{
    dispatch({
        type:GET_CURRENT_USER_REQUEST
    });
    return axios.get('https://reqres.in/api/login/',{
        headers: {
            "Authorization": "Bearer "+token
        }
    })
    .then(payload=>{
        // console.log(payload);
        dispatch({
            type:GET_CURRENT_USER_SUCCESS,
            payload
        })
    })
    .catch(err=>{
        // console.log(err);
        dispatch({
            type:GET_CURRENT_USER_FAILURE
        })
    })
}

export const authUser=(email,password)=>async(dispatch)=>{
    dispatch({
        type:AUTH_REQUEST
    })
    return axios.post('https://reqres.in/api/login',{
        email,
        password
    })
    .then(payload=>{
        // console.log(payload);
        dispatch({
            type:AUTH_SUCCESS,
            payload
        })
    })
    .catch(err=>{
        // console.log(err);
        dispatch({
            type:AUTH_FAILURE,
            err
        })
    })
}

export const addBook=(title,author,publisher,genres,amount)=>async(dispatch)=>{
    dispatch({
        type:ADD_BOOK_REQUEST
    })
    return axios.post(API+"/book/add",{
        title,
        author,
        publisher,
        genres,
        amount
    })
    .then(payload=>{
        console.log(payload);
        dispatch({
            type:ADD_BOOK_SUCCESS,
            payload
        })        
    })
    .catch(err=>{
        console.log(err.response.data.message);
        console.log(err.response.data.details);
        dispatch({
            type:ADD_BOOK_FAILURE,
            err
        })  
    })
}

export const registerUser=(email,password,name,lastname)=>async(dispatch)=>{
    dispatch({
        type:REGISTER_REQUEST
    })
    return axios.post('https://reqres.in/api/register', {
        // name,
        // lastname,
        email,
        password
    })
    .then(payload=>{
        // console.log(payload);
        dispatch({
            type:REGISTER_SUCCESS,
            payload
        })
    })
    .catch(err=>{
        dispatch({
            type:REGISTER_FAILURE,
            err
        })
    })
}

export const cleanErrors=()=>{
    return {
        type:CLEAR_ERROR
    }
}


// test below

export const searchBook=(phrase)=>async(dispatch)=>{
    dispatch({
        type:SEARCH_BOOK_REQUEST
    })
    if(phrase.length>=3){
        return axios.get(API+"/book/search/phrase",{ params: { phrase } })
        .then(payload=>{
            console.log(payload);
            dispatch({
                type:SEARCH_BOOK_SUCCESS,
                payload
            })
        })
        .catch(err=>{
            dispatch({
                type:SEARCH_BOOK_FAILURE
            })
        })
    } else {
        return dispatch({
            type: MIN_THREE_CHAR
        })
    }
}

// export const addBook=(title,author,publisher,bookType,amount)=>async(dispatch)=>{
//     dispatch({
//         type:ADD_BOOK_REQUEST
//     })
//     return axios.post('http://localhost:8080/api/book/add',{
//         title,
//         author,
//         publisher,
//         bookType,
//         amount
//     })
//     .then(payload=>{
//         console.log(payload);
//         dispatch({
//             type:ADD_BOOK_SUCCESS,
//             payload
//         })        
//     })
//     .catch(err=>{
//         console.log(err.response.data.message);
//         console.log(err.response.data.details);
//         dispatch({
//             type:ADD_BOOK_FAILURE,
//             err
//         })  
//     })
// }