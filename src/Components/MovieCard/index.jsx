import React from 'react'
import './MovieCard.scss'

import { Link } from 'react-router-dom'
import { category } from '../../API/tmdbApi'
import apiConfig from '../../API/apiConfig'
import Button from '../Button'

const MovieCard = props => {

    const item = props.item

    const categoryy = category[props.category] || item.category

    const link = '/' + categoryy + '/' + item.id

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <i className="bx bx-play">Play</i>
                </Button>
            </div>
        </Link>
    )
}


export default MovieCard
