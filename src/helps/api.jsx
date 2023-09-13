import axios from "axios"

export const api = 'http://localhost:8080/api'


export const getData= async (url1, url2)=>{
    return(axios.get(`${api}/${url1}/${url2}`))
}


























