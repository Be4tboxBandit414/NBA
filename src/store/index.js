import { createStore, combineReducers } from "redux";

//Fetch filtered players from API on Success 
export const fetchFilteredPlayers = (playerData) => ({
    type: "FETCH_FILTERED_DATA",
    payload: playerData
})


// Fetch paginated players from API on Success 
export const fetchPlayersData = (playerData) => ({
    type: "FETCH_PLAYERS_DATA",
    payload: playerData
})

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

// Paginated Players Reducer

const getPlayers =(state = [], action) => {
    switch(action.type) {
        case 'FETCH_PLAYERS_DATA':
            return [...action.payload]
        case 'FETCH_FILTERED_DATA':
            return [...action.payload]
        default:
            return state
    }
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
    favoriteObj: favoriteCounter,
    players: getPlayers
});

export default createStore(combinedReducers);