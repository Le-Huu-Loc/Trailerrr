import { configureStore } from "@reduxjs/toolkit";
import likeReducer from '../Pages/likeSlice'

const rootReducer = {
    likes: likeReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store