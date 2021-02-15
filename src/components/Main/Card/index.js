import React, { useEffect, useState } from "react";
import store from '../../../store'
import { useDispatch } from 'react-redux';
import {domain, pageLimit} from '../../../constants'
import { favoriteIncrement, favoriteDecrement } from '../../../store/index'
import { Container, SubContainer, Name, PlayerImg, Team, Favorite, FavoriteRemove, EditButton, Button } from "./styles";


const Card = ({getFavoriteData, cardsFor}) => {
	// Local State to hold data; Check for pagination
	const [playerState, setPlayerState] = useState([])
	const [playerLoad, setPlayerLoad] = useState(1)
	const [favortePlayers, setFavoritePlayers] = useState([])

	// Dispatch to Store
	const dispatch = useDispatch()
	
	// useEffect for GET calls on load of Card component
	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		getFavoriteData()
	}, [favortePlayers])

	// Fetches team data from endpoint: /teams; Fetches player data from endpoint: /players; Adds Favorite Key and default false as value
	const fetchData = async () => {
		const teamRes = await fetch(`${domain}/teams`)
		const teamData = await teamRes.json()
		const playerRes = await fetch(`${domain}/players?_page=${playerLoad}&_limit=${pageLimit}`)
		const playerData = await playerRes.json()
		// const favoriteRes = await fetch(`${domain}/favorites`)
		// const favoriteData = await favoriteRes.json()

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
	
	}
	
	// Toggle Favorite and POST to: /favorites
	const toggleFavorite = (event) => {
		let playersCopy = [...playerState]
		let favoriteArr = []
	
		const favTarget = Number(event.target.getAttribute('data-id'))
		const foundPlayer = playersCopy.find(element => element.id === favTarget)
		
		foundPlayer.favorite = !foundPlayer.favorite
		favoriteArr = playersCopy.filter(player => player.favorite === true)
		setFavoritePlayers(favoriteArr)
		setPlayerState([...playersCopy])

		foundPlayer.favorite ? dispatch(favoriteIncrement()) : dispatch(favoriteDecrement())
		
		if(foundPlayer.favorite === true) {
			postFavorite(foundPlayer)
		} else {
			deleteFavorite(foundPlayer)
		}
	}
	
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
		const editTarget = Number(event.target.getAttribute('data-id'))
		const editPlayerTarget = playerState.find(element => element.id === editTarget)
		console.log(editPlayerTarget)
	}
	
	const handleScroll = () => {
		if(window.innerHeight + window.scrollY >= document.body.clientHeight) {
			try {
				// fetchData()
				console.log('fetching new data')
			}
			catch(err) {
				console.error(err)
			}
		}
	}

 	window.addEventListener('scroll', handleScroll)

	// Will render component depending on cardsFor prop: 'home' or 'favorite'
	const renderSwitch = location => {
		switch(location) {
			case 'home':
			return(
				playerState.map(player => (
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
				))
			)	
			case 'favorite': 
				console.log('Favorite cards')
				return(
					favortePlayers.map(player => (
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
					))
				)
			default: 
				return;
		}
	}

	return (
		<>
			{renderSwitch(cardsFor)}
		</>	
	)
}

export default Card;
