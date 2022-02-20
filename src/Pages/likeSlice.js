import { createSlice } from '@reduxjs/toolkit'

const like = createSlice({
    name: 'likes',
    initialState: [],
    reducers: {
        addLike: (state, action) => {
            state.push(action.payload)
        },
        removeLike: (state, action) => {
            const removeLikeId = action.payload
            state = state.filter(likeId => likeId.id !== removeLikeId.id)
            return state
        }
    }
})

const { reducer, actions } = like

export const { addLike, removeLike } = actions
export default reducer