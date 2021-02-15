import React, {lazy, Suspense, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Search from "./Search";
// import Card from "./Card";
import { Container, Title, SubContainer, FavoriteCounter, Spinner, RightArrow} from "./styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { fetchFavoriteData, getFavoriteTotal } from "../../store";

const Card = lazy(() => import("./Card"))
const FavoritePlayers = lazy(() => import("./FavoritePlayers"))

const Main = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getFavoriteData()
  }, [dispatch])

  const getFavoriteData = () => {
    fetch('http://localhost:3008/favorites')
    .then(res => res.json())
    .then(data => {
      dispatch(fetchFavoriteData(data))
      dispatch(getFavoriteTotal(data))
    })
  }
  const favCounter = useSelector(state => state.favoriteObj.favoriteCount)

  return (
  <Router>
    <Container>
      <Title>NBA Interview</Title>
      <SubContainer>
        <Search />
          <Link to="/favorite-players">
            <RightArrow size="50" />
          </Link>
          <FavoriteCounter to="/favorite-players">Favorite: {favCounter}</FavoriteCounter>
      </SubContainer>
      <Switch>
        <Route path="/favorite-players">
          <Suspense fallback={<h1 style={{textAlign: "center"} }><Spinner size="40" /></h1>}>
            <FavoritePlayers  getFavoriteData={getFavoriteData}/>
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense fallback={<h1 style={{textAlign: "center"} }><Spinner size="40" /></h1>}>
            <Card cardsFor={'home'} getFavoriteData={getFavoriteData}/>
          </Suspense>
        </Route>
      </Switch>
    </Container>
  </Router>
)}

export default Main;
