import React, { useRef, useState, useEffect } from 'react'
import tmdbApi from '../../../API/tmdbApi'
import { useParams } from 'react-router-dom'
import './VideoList.scss'

const VideoList = props => {

    const [videos, setVideos] = useState([])
    const [video, setVideo] = useState([])
    const [active, setActive] = useState(0)

    const { category } = useParams()

    useEffect(() => {
        const getVideo = async () => {
            const res = await tmdbApi.getVideos(category, props.id)
            setVideos(res.results)
            setVideo(res.results.slice(0, 1))
        }
        getVideo()

    }, [category, props.id])


    const Video = props => {
        const item = props.item

        const iframeRef = useRef(null)

        useEffect(() => {
            const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
            iframeRef.current.setAttribute('height', height)
        }, [])

        return (
            <div className="video-container">
                <div className="video-container__title">
                    <h2>{item.name}</h2>
                </div>
                <iframe src={`https://www.youtube.com/embed/${item.key}`} ref={iframeRef} width="100%" title={item.name} allowFullScreen={true}></iframe>
            </div>
        )

    }

    const countVideo = count => {
        setVideo(videos.slice(count, count + 1))
        setActive(count)
    }

    return (
        <>
            {
                videos.length > 0 ? (
                    <div className="video-container">
                        {
                            video.map((v, i) => (
                                <Video key={i} item={v} />
                            ))
                        }
                        {
                            <div className="video-container__ep">
                                {
                                    videos.map((v, i) => (
                                        <span className={`ep-element ${active === i ? 'active-ep' : ''}`} onClick={() => countVideo(i)} key={i}>Trailer {i + 1}</span>
                                    ))
                                }
                            </div>
                        }
                    </div>
                )
                    :
                    (
                        <div style={{ width: '100%', height: '50vh', display: 'flex', border: '1px solid #ccc', alignItems: 'center', justifyContent: 'center' }}>
                            <h1>Opps ! Not found -.-</h1>
                        </div>
                    )
            }
        </>
    )
}


export default VideoList
