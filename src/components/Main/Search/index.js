import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredPlayers } from '../../../store/index'
import {domain} from "../../../constants"
import { Container, SearchInput } from "./styles";

const Search = () => {
	const dispatch = useDispatch()
	const filteredData = useSelector(state => state.players)
	const filterPlayers = event => {
		event.preventDefault()
		const userFilter = event.target.value.trim()
		if(userFilter.length > 3) {
			fetch(`${domain}/players?q=${userFilter}`)
			.then(res => res.json())
			.then(data => {
				dispatch(fetchFilteredPlayers(data))
				console.log(filteredData)
			})
		}
	}

	return (
		<>
		<Container>
			<SearchInput placeholder="Search..." onChange={event => filterPlayers(event)} />
		</Container>
		</>
	)
}

export default Search;
