import {createStore} from 'redux'
import axios from 'axios'

let reducer = function (state={
    count:0,
    datas:{},
    auth:{
        username:'',
        auth_token:''
    },
    ui:false,
},action){
    switch(action.type){
        case 'ADD':
            state.datas[state.count] = {...action.payload,id:state.count}
            state.count += 1
            return state
        case 'DELETE':
            console.log(action.payload)
            delete state.datas[action.payload.id]
            return state
        case 'UPDATE':
            state.datas[action.payload.id] = action.payload
            return state
        case 'AUTH':
            state.auth.username = action.payload.username
            state.auth.auth_token = action.payload.id
            state.datas = {...action.payload.todos}
            state.count += action.payload.todos.length
            return state
        case 'AUTH-SIGNIN':
            state.auth.username = action.payload.username
            state.auth.auth_token = action.payload.id
            return state
        case 'AUTH-RESET':
            state.auth.username = ''
            state.auth.auth_token = ''
            return state
        default:
            return state
    }

}

let store = createStore(reducer)


export default store ;