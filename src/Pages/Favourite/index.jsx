import React from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from '../../Components/MovieCard'

const Favourite = props => {

    const likes = useSelector(state => state.likes)

    return (
        <>
            {
                likes.length > 0 ? (
                    <div className="movie-list">
                        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                            {likes.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <MovieCard item={item} category={item.category} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
                    : (
                        <div style={{ textAlign: "center", fontSize: "25px" }}>No Items</div>
                    )
            }
        </>
    )
}

export default Favourite