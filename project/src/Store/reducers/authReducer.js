const initialState= {
    msg:"",
    date:""
}

const reducer= (state = initialState, action) =>{
    return {state:action.payload}
}

export default reducer