import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import ReactStar from 'react-rating-stars-component';
import { TiHeartOutline } from 'react-icons/ti'

import apiConfig from '../../API/apiConfig';
import tmdbApi from '../../API/tmdbApi';

import MovieList from '../../Components/MovieList';
import Button, { OutlineButton } from '../../Components/Button';
import Modal, { ModalContent } from '../../Components/Modal';

import Cast from './Cast';
import VideoList from './VideoList';
import './Detail.scss';

import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../likeSlice'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Detail = () => {

    const { category, id } = useParams()

    const [item, setItem] = useState(null)

    useEffect(() => {
        const getDetail = async () => {
            const reponse = await tmdbApi.details(category, id, { params: {} })
            setItem(reponse)
            window.scrollTo(0, 0)
        }

        getDetail()
    }, [category, id])

    const TrailerModal = props => {
        const item = props.item

        const iframRef = useRef(null)

        const onClose = () => iframRef.current.setAttribute('src', '')

        return (
            <Modal active={false} id={`modal__${item.id}`}>
                <ModalContent onClose={onClose}>
                    <iframe ref={iframRef} width="100%" height="400px" title={item.name}></iframe>
                </ModalContent>
            </Modal>
        )
    }

    const setActiveModal = async (item) => {
        const modal = document.querySelector(`#modal__${item.id}`)
        const videos = await tmdbApi.getVideos(category, item.id)

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
        }
        else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer'
        }
        modal.classList.toggle('active')
    }

    const scrollVideo = () => {
        const heightVid = document.querySelector('.video-container').clientHeight

        window.scroll({
            top: heightVid,
            behavior: 'smooth'
        })
    }

    const likes = useSelector(state => state.likes)

    const dispatch = useDispatch()
    const onLike = (item) => {
        const items = {
            ...item,
            category: category
        }

        if (likes.find(x => x.id === item.id)) {
            const action = removeLike(items)
            dispatch(action)
            toast.error(`Removed from favorites !`)
        }
        else {
            const action = addLike(items)
            dispatch(action)
            toast.success("Added to favorites !")
        }
    }

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
                        <div className="container movie-content mb-3">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">{item.title || item.name}</h1>
                                <div className="rating">
                                    <ReactStar count={10} value={item.vote_average} edit={false} size={26} />
                                    <span>({item.vote_average}/10)</span>
                                    <TiHeartOutline size={25} className={`like ${likes.find(x => x.id === item.id) ? 'like-active' : ''}`} onClick={() => onLike(item)} />
                                </div>
                                <div className="btns">
                                    <Button className="btn-watch" onClick={scrollVideo}>Watch Now</Button>
                                    <OutlineButton onClick={() => setActiveModal(item)}>Watch Trailer</OutlineButton>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <div className="video-detail">
                                    <VideoList id={item.id} />
                                </div>
                            </div>
                            <div className="section mb-3">
                                <div className="genres-detail">
                                    <div className="section__header">
                                        <h2>Genres</h2>
                                    </div>
                                    <div className="genres-detail__list">
                                        {item.genres && item.genres.map((item, index) => (
                                            <span key={index} className="genres-detail__item">{item.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="overview-detail">
                                    <div className="section__header">
                                        <h2>Overview</h2>
                                    </div>
                                    <p>{item.overview}</p>
                                </div>
                                <div className="cast-detail">
                                    <div className="section__header">
                                        <h2>Cast</h2>
                                    </div>
                                    <Cast id={item.id} />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type='similar' id={item.id} />
                            </div>
                        </div>

                        {
                            <TrailerModal item={item} />
                        }
                    </>
                )
            }
        </>
    )
}


export default Detail
