import React, {lazy, Suspense} from 'react'
import {BackButton, Spinner} from './styles'
import { useHistory } from "react-router-dom";

const Card = lazy(() => import("../Card/index"))

const FavoritePlayers = ({getFavoriteData}) => {
    let history = useHistory()

    return (
        <>
            <BackButton size="30" onClick={() => history.goBack()}/>
            <Suspense fallback={<h1 style={{textAlign: "center"} }><Spinner size="40" /></h1>}>
                <Card cardsFor={'favorite'} getFavoriteData={getFavoriteData}/>
            </Suspense>
        </>
    )
}



export default FavoritePlayers

