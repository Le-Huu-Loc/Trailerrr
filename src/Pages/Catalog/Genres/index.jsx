import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import tmdbApi, { category } from '../../../API/tmdbApi'

const Genres = props => {

    let navigate = useNavigate()

    const { onSetGenre, listGenre } = props

    let cate = props.category

    if (cate === 'topmv' || cate === 'upcomingmv' || cate === 'movie') {
        cate = 'movie'
    }
    else cate = 'tv'

    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getGenre = async () => {
            let reponse = null
            const params = {}
            reponse = await tmdbApi.genre(cate, { params })
            setGenres(reponse.genres)
        }

        getGenre()
    }, [cate])

    const searchByGenres = (id) => {
        if (onSetGenre) {
            onSetGenre(id)
            navigate(`/${category[cate]}/genre`)
        }
    }

    return (
        <div className="genres">
            {
                genres && genres.map((g, i) => (
                    <span key={i} className={`genres__item ${listGenre.includes(g.id) ? 'active_genre' : ''}`} onClick={() => searchByGenres(g.id)}>{g.name}</span>
                ))
            }
        </div>
    )
}

Genres.propTypes = {
    category: PropTypes.string.isRequired,
    onSetGenre: PropTypes.func,
    listGenre: PropTypes.array
}
Genres.defaultProps = {
    onSetGenre: null,
    listGenre: [],
}

export default Genres