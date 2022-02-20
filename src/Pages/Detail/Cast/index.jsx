import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../../API/apiConfig'
import tmdbApi from '../../../API/tmdbApi'
import './Cast.scss'

const Cast = (props) => {

    const { category } = useParams()

    const [casts, setCasts] = useState([])

    useEffect(() => {
        const getCasts = async () => {
            const reponse = await tmdbApi.getCredits(category, props.id)
            setCasts(reponse.cast.slice(0, 5))
        }
        getCasts()
    }, [category, props.id])

    return (
        <div className="casts">
            {
                casts.map((c, i) => (
                    <div className="casts__item" key={i}>
                        <div className="casts__item__img" style={{ backgroundImage: `url(${apiConfig.w500Image(c.profile_path)})` }}></div>
                        <p className='casts__item__name'>{c.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Cast