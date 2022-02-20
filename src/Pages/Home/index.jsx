import React from 'react'
import { Link } from 'react-router-dom'
import { category, movieType, tvType } from '../../API/tmdbApi'
import { OutlineButton } from '../../Components/Button'
import HeroSlide from '../../Components/HeroSlide'
import MovieList from '../../Components/MovieList'
import Favourite from '../Favourite'

const Home = () => {

    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/topmv">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Upcoming Movies</h2>
                        <Link to="/upcomingmv">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.upcoming} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TVs</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TVs</h2>
                        <Link to="/toptv">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>On The Air</h2>
                        <Link to="/on_the_air">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.on_the_air} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Favourite</h2>
                        <Link to="/favourite">
                            <OutlineButton className="small">View More</OutlineButton>
                        </Link>
                    </div>
                    <Favourite />
                </div>
            </div>
        </>
    )
}

export default Home
