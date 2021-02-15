import styled from "styled-components";
import {Spinner3} from "@styled-icons/icomoon/Spinner3"
import {Link} from 'react-router-dom';
import {RightArrowCircle} from '@styled-icons/boxicons-regular/RightArrowCircle';

export const Container = styled.div`
	height: 100%;
	width: 100%;
`

export const Title = styled.p`
	font-size: 70px;
	padding-bottom: 32px;
 	text-align: center;
	color: #FFFFFF;
	font-family: 'Anton', sans-serif;
	
`

export const SubContainer = styled.div `
	text-align: center;
`

export const FavoriteCounter = styled(Link)`
	position: absolute;
	top: 17.75rem;
	right: 11rem;
    font-weight: 600;
    font-size: 25px;
	color: #FFFFFF;
	text-decoration: none;
	@media (max-width: 1100px) {
		top: 13rem;
	}
`

export const RightArrow = styled(RightArrowCircle)`
	position: absolute;
	top: 17rem;
	right: 18.85rem;
	color: #FFFFFF;
	@media (max-width: 1100px) {
		top: 12rem;
	}
`

export const Spinner = styled(Spinner3)`
	
`