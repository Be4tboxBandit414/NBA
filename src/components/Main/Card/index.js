import React, { useEffect, useState } from "react";
import store from '../../../store'
import { useDispatch, useSelector } from 'react-redux';
import {domain, pageLimit} from '../../../constants'
import { favoriteIncrement, favoriteDecrement } from '../../../store/index'
import { Container, SubContainer, Name, PlayerImg, Team, Favorite, FavoriteRemove, EditButton, Button, Spinner } from "./styles";


const Card = ({getFavoriteData, cardsFor}) => {
	// Local State to hold data; Check for pagination
	const [isFetching, setIsFetching] = useState(false);
	const [playerState, setPlayerState] = useState([])
	const [playerLoad, setPlayerLoad] = useState(1)
	const [favoritePlayers, setFavoritePlayers] = useState([])

	// Get Filtered Search Player from Store
	const filteredData = useSelector(state => state.players)

	// Dispatch to Store
	const dispatch = useDispatch()
	
	// useEffect for GET calls on load of Card component
	useEffect(() => {
		fetchData()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll);
	}, [])

	useEffect(() => {
		getFavoriteData()
		if(filteredData.length > 0) {
			setPlayerState(filteredData)
		} 
		
	})

	useEffect(() => {
		if (!isFetching) return;
		getMorePlayers();
	  }, [isFetching]);

	// Fetches team data from endpoint: /teams; Fetches player data from endpoint: /players; Adds Favorite Key and default false as value
	const fetchData = async () => {
		const teamRes = await fetch(`${domain}/teams`)
		const teamData = await teamRes.json()
		const playerRes = await fetch(`${domain}/players?_page=${playerLoad}&_limit=${pageLimit}`)
		const playerData = await playerRes.json()
		const favoriteData = store.getState().favoriteObj.favorite
	
		playerData.forEach(player => {
			for(let team of teamData) {
				if(player.team === team.id) {
					player.team = team.name
				}
				player.favorite = false
			}
			for(let favPlayer of favoriteData){
				if(favPlayer.id === player.id) {
					player.favorite = true;
				}
			}
		})

		setPlayerState([...playerState, ...playerData])
		setFavoritePlayers(favoriteData)
		setPlayerLoad(playerLoad + 1)	
	}
	
	// Toggle Favorite and POST to: /favorites
	const toggleFavorite = (event) => {
		event.preventDefault()
		let combinedArr = [...playerState, ...favoritePlayers]
		const favTarget = Number(event.target.getAttribute('data-id'))
		const foundPlayer = combinedArr.find(element => element.id === favTarget)
		foundPlayer.favorite = !foundPlayer.favorite
		
		if(foundPlayer.favorite === true) {
			postFavorite(foundPlayer)
			dispatch(favoriteIncrement())
			playerState.sort((a,b) => b.favorite - a.favorite)
		} else {
			deleteFavorite(foundPlayer)
			dispatch(favoriteDecrement())
			fetchData()
		}

		
	}
	
	// POST Favorites
	const postFavorite = async (foundPlayer) => {
		const postSettings = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({...foundPlayer})
		}
		
		try {
			const fetchPost = await fetch(`${domain}/favorites`, postSettings)
			const fetchData = await fetchPost.json()
			return fetchData
		} catch(e) {
			console.error(e)
		}
	}

	// DELETE Favorites
	const deleteFavorite = async (foundPlayer) => {
		const postSettings = {
			method: "DELETE"	
		}
		
		try {
			const fetchPost = await fetch(`${domain}/favorites/${foundPlayer.id}`, postSettings)
			const fetchData = await fetchPost.json()
			return fetchData
		} catch(e) {
			console.error(e)
		}
	}

	// Edit Player on Click
	const editPlayer = (event) => {
		event.preventDefault()
		const editTarget = Number(event.target.getAttribute('data-id'))
		const editPlayerTarget = playerState.find(element => element.id === editTarget)
		console.log(editPlayerTarget)
	}
	
	// Set Fetching State to load more players
	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		setIsFetching(true);
	}

	// Fetch more players
	const getMorePlayers = () => {
		fetchData()
		setIsFetching(false);
	}



	// Will render component depending on cardsFor prop: 'home' or 'favorite'
	const renderSwitch = (location) => {
		const filterArr = [...favoritePlayers]
		const filterFavorite =  filterArr.filter(player => player.favorite === true)

		const renderContainer = player => (
			<Container key={player.id}>
				<SubContainer>
					<Name name={player.name}>{player.name}</Name>
					<Team>{player.team}</Team>
				</SubContainer>
				<PlayerImg src={`${domain}/${player.image}`} alt="player_image" />
				<Button data-id={player.id} onClick={(event) => editPlayer(event)}>
					<EditButton size="35"/>
				</Button>
				<Button data-id={player.id} onClick={(event) => toggleFavorite(event)}>
					{player.favorite ?
						<FavoriteRemove>-</FavoriteRemove>
						:
						<Favorite>+</Favorite>
					}
				</Button>
			</Container>
		)

		switch(location) {
			case 'home':
				return (
					playerState.map(player => renderContainer(player))
				)	
			case 'favorite': 
				return(
					filterFavorite.map(player => renderContainer(player))
				)
			default: 
				return;
		}
	}

	return (
		<>
			{renderSwitch(cardsFor)}
			{isFetching && <Spinner size="30"/>}
		</>	
	)
}

export default Card;
