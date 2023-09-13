import axios from "axios"

export const api = 'http://192.168.43.104/api'


export const getData= async (url1, url2)=>{
    return(axios.get(`${api}/${url1}/${url2}`))
}


























