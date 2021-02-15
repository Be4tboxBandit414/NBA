import styled from "styled-components";
import {Edit} from "@styled-icons/boxicons-regular/Edit"
import {PlusCircle} from "@styled-icons/boxicons-regular/PlusCircle"
import {MinusCircle} from "@styled-icons/boxicons-regular/MinusCircle"

export const Container = styled.div`
	background-color: #f2f2f2;
	border: 1px solid #EEE;
	border-radius: 4px;
	padding: 16px;
	width: 280px;
	text-align: center;
	margin: auto;
	margin-top: 50px;
	margin-left: 50px;
	display: inline-block;
	&:hover {
		cursor: pointer;
	}
`
export const SubContainer = styled.div `

`

export const Name = styled.p`
	font-size: 25px;
	font-weight: 600;
`

export const PlayerImg = styled.img`
	padding-bottom: 16px;
`

export const Team = styled.p`
	font-size: 20px;
	position: relative;
    bottom: 18px;
	
`

export const Button = styled.button`
	border: none;
	cursor: pointer;
	outline: none;
`

export const Favorite = styled(PlusCircle)`
	height: 40px;  
	width: 40px;  
	font-size: 2em;
	border-radius: 50%;
	background-color: #FFA500;
	color: white;
	cursor: pointer;
	float: right;
	pointer-events: none;
    // position: relative;
    // right: 0;
    // bottom: 6.5rem;
`

export const FavoriteRemove = styled(MinusCircle)`
	height: 40px;  
	width: 40px;  
	font-size: 2em;
	border-radius: 50%;
	background-color: #FF0000;
	color: white;
	cursor: pointer;
	float: right;
	pointer-events: none;
    // position: relative;
    // right: 0;
    // bottom: 6.5rem;
`

export const EditButton = styled(Edit)`
	float: right;
	padding-right: 15px;
    padding-top: 4px;
	pointer-events: none;
`
