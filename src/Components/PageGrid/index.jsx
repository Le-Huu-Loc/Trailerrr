import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import tmdbApi, { category, movieType, tvType } from '../../API/tmdbApi'
import Genres from '../../Pages/Catalog/Genres'
import { OutlineButton } from '../Button'
import Input from '../Input'
import MovieCard from '../MovieCard'
import './PageGrid.scss'

const PageGrid = props => {

    const likes = useSelector(state => state.likes)

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const { keywork } = useParams()
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getList = async () => {
            let reponse = null

            if (keywork === undefined && genres.length === 0) {
                const params = {}
                switch (props.category) {
                    case 'movie':
                        reponse = await tmdbApi.getMovieList(movieType.popular, { params })
                        break;
                    case 'topmv':
                        reponse = await tmdbApi.getMovieList(movieType.top_rated, { params })
                        break;
                    case 'upcomingmv':
                        reponse = await tmdbApi.getMovieList(movieType.upcoming, { params })
                        break;
                    case 'toptv':
                        reponse = await tmdbApi.getTvList(tvType.top_rated, { params })
                        break;
                    case 'on_the_air':
                        reponse = await tmdbApi.getTvList(tvType.on_the_air, { params })
                        break;
                    case 'favourite':
                        reponse = likes
                        break;

                    default:
                        reponse = await tmdbApi.getTvList(tvType.popular, { params })
                        break;
                }
            }

            if (keywork) {
                const params = {
                    query: keywork
                }
                reponse = await tmdbApi.search(props.category, { params })
            }

            if (genres.length > 0) {
                const params = {
                    with_genres: genres.join(',')
                }
                reponse = await tmdbApi.getByGenre(props.category, { params })
            }
            console.log(reponse)

            if (props.category === 'favourite') {
                setItems(reponse)
                setTotalPage(reponse)
            }
            else {
                setItems(reponse.results)
                setTotalPage(reponse.total_pages)
            }
        }

        getList()
    }, [props.category, keywork, genres, likes])

    const loadMore = async () => {
        let reponse = null

        if (keywork === undefined) {
            const params = {
                page: page + 1
            }
            switch (props.category) {
                case 'movie':
                    reponse = await tmdbApi.getMovieList(movieType.popular, { params })
                    break;
                case 'topmv':
                    reponse = await tmdbApi.getMovieList(movieType.top_rated, { params })
                    break;
                case 'upcomingmv':
                    reponse = await tmdbApi.getMovieList(movieType.upcoming, { params })
                    break;
                case 'toptv':
                    reponse = await tmdbApi.getTvList(tvType.top_rated, { params })
                    break;
                case 'on_the_air':
                    reponse = await tmdbApi.getTvList(tvType.on_the_air, { params })
                    break;

                default:
                    reponse = await tmdbApi.getTvList(tvType.popular, { params })
                    break;
            }
        }
        if (keywork) {
            const params = {
                page: page + 1,
                query: keywork
            }
            reponse = await tmdbApi.search(props.category, { params })
        }
        if (genres.length > 0) {
            const params = {
                page: page + 1,
                with_genres: genres.join(',')
            }
            reponse = await tmdbApi.getByGenre(props.category, { params })
        }
        setItems([...items, ...reponse.results])
        setPage(page + 1)

    }

    const searchByGenres = id => {
        const index = genres.findIndex(g => g === id)

        if (index < 0) {
            const newListGenres = [...genres]
            newListGenres.push(id)
            setGenres(newListGenres)
        }
        else {
            const newListGenres = [...genres]
            newListGenres.splice(index, 1)
            setGenres(newListGenres)
        }
    }

    const onClickKeywork = () => {
        setGenres([])
        document.querySelector('.search-keywork').classList.remove('active_search')
        document.querySelector('.search-genre').classList.add('active_search')
    }
    const onClickGenre = () => {
        document.querySelector('.search-genre').classList.remove('active_search')
        document.querySelector('.search-keywork').classList.add('active_search')
    }

    const showGenre = (e) => {
        e.target.nextSibling.classList.toggle('genre-mobile')
    }


    return (
        <>
            {items.length > 0 ? (
                <>
                    {
                        props.category === 'favourite' ? (null) : (
                            <fieldset className='search'>
                                <legend>Filters</legend>
                                <div className="search-keywork" onClick={onClickKeywork}>
                                    <PageSearch category={props.category} keywork={keywork} />
                                </div>
                                or
                                <div className="search-genre" onClick={onClickGenre}>
                                    <div className="title-show" onClick={showGenre}>Show Genres</div>
                                    <Genres category={props.category} onSetGenre={searchByGenres} listGenre={genres} />
                                </div>
                            </fieldset>
                        )
                    }

                    <div className="movie-grid">
                        {
                            items.map((item, index) => (
                                <MovieCard category={props.category} item={item} key={index} />
                            ))
                        }
                    </div>
                    {
                        page < totalPage ? (
                            <div className="movie-grid__loadmore">
                                <OutlineButton className="small" onClick={loadMore}>Load More</OutlineButton>
                            </div>
                        ) : null
                    }
                </>
            ) : (
                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}>No Items !</div>
            )}
        </>
    )
}

const PageSearch = props => {
    let navigate = useNavigate()

    const [keywork, setKeywork] = useState(props.keywork ? props.keywork : '')

    const gotoSearch = useCallback(() => {
        if (keywork.trim().length > 0) {
            navigate(`/${category[props.category]}/search/${keywork}`)
        }
    }, [keywork, props.category, navigate])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if (e.keyCode === 13) {
                gotoSearch()
            }
        }
        document.addEventListener('keyup', enterEvent)

        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [keywork, gotoSearch])

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keywork"
                value={keywork}
                onChange={(e) => setKeywork(e.target.value)}
            />
        </div>
    )
}

export default PageGrid