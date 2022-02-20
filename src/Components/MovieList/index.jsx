import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbApi, { category } from '../../API/tmdbApi'
import MovieCard from '../MovieCard'

import './MovieList.scss'

const MovieList = props => {

    const [item, setItem] = useState([])

    useEffect(() => {
        const getList = async () => {
            let reponse = null
            const params = {}
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        reponse = await tmdbApi.getMovieList(props.type, { params })
                        break;

                    default:
                        reponse = await tmdbApi.getTvList(props.type, { params })
                        break;
                }
            }
            else {
                reponse = await tmdbApi.similar(props.category, props.id)
            }
            setItem(reponse.results)
        }
        getList()
    }, [props.category, props.id, props.type])

    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {item.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default MovieList

