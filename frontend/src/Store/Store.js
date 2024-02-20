import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './Slices/UserSlice'

const Store = configureStore({
    reducer:{
        user:UserSlice
    }
})

export default Store