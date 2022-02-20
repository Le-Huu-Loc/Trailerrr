import React, { useEffect, useRef, useState } from 'react'
import './HeroSlide.scss'
import { Link } from 'react-router-dom'

import tmdbApi, { movieType, category } from '../../API/tmdbApi'
import SwiperCore, { Autoplay } from 'swiper'
import apiConfig from '../../API/apiConfig'
import Button, { OutlineButton } from '../Button'
import Modal, { ModalContent } from '../Modal'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

const HeroSlide = () => {

    SwiperCore.use([Autoplay])

    const [movieItem, setMovieItem] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const reponse = await tmdbApi.getMovieList(movieType.popular, { params })
                setMovieItem(reponse.results.slice(0, 10))
            }
            catch {
                console.log('Error')
            }
        }
        getMovies()
    }, [])

    const setModalActive = async (item) => {

        const modal = document.querySelector(`#modal__${item.id}`)
        const videos = await tmdbApi.getVideos(category.movie, item.id)

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
        }
        else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer'
        }

        modal.classList.toggle('active')
    }

    const TrailerModal = props => {
        const item = props.item

        const iframRef = useRef(null)

        const onClose = () => iframRef.current.setAttribute('src', '')

        return (
            <Modal active={false} id={`modal__${item.id}`}>
                <ModalContent onClose={onClose}>
                    <iframe ref={iframRef} width="100%" height="400px" title="Trailer"></iframe>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                loop={true}
                loopedSlides={10}
            >
                {
                    movieItem.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="hero-slide__item" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)})` }}>
                                <div className="hero-slide__content">
                                    <h1 className="hero-slide__title">{item.title}</h1>
                                    <div className="hero-slide__overview text-clamp text-clamp--2">{item.overview}</div>
                                    <div className="hero-slide__btns">
                                        <Link to={`/movie/${item.id}`}>
                                            <Button className="watch-now">Watch</Button>
                                        </Link>
                                        <OutlineButton onClick={() => setModalActive(item)}>Trailer</OutlineButton>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItem.map((item, index) => <TrailerModal key={index} item={item} />)
            }
        </div>
    )
}

export default HeroSlide
