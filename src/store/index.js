import { createStore, combineReducers } from "redux";

// Favorite Data from API on Success

export const fetchFavoriteData = (playerData) => ({
    type: "FETCH_FAVORITE_DATA",
    payload: playerData
})

// Get Total for Favorite Counter 

export const getFavoriteTotal = (playerData) => ({
    type: "GET_FAVORITE_TOTAL",
    payload: playerData.length
})

// Favorite Increment

export const favoriteIncrement = () => ({
        type: 'INCREMENT'
})

// Favorite Decrement 

export const favoriteDecrement= () => ({
        type: 'DECREMENT'
})

// Iniital State

const initialState = {
    favorite: [],
    favoriteCount: 0
}

// Favorite Reducer

const favoriteCounter = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT': 
            return {
                ...state, 
                favoriteCount: state.favoriteCount + 1
            }; 
        case 'DECREMENT': 
            return {
                ...state, 
                favoriteCount: state.favoriteCount - 1
            }; 
        case 'FETCH_FAVORITE_DATA':
            return state = {
                ...state, 
                favorite: [...action.payload]
            }
        case 'GET_FAVORITE_TOTAL': 
            return {
                ...state, 
                favoriteCount: action.payload
            }
        default: 
            return state
    }
}

const combinedReducers = combineReducers({
    favoriteObj: favoriteCounter
});

export default createStore(combinedReducers);