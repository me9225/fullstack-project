import { createSlice } from "@reduxjs/toolkit"

const initVal = {
    msg:""
}

const msgSlice = createSlice({
    name:"msg",
    initialState:initVal,
    reducers:{
        update:(state,action)=>{
            state.msg = action.payload.msg
        },
    }
})

export const {update} =  msgSlice.actions
export default msgSlice.reducer