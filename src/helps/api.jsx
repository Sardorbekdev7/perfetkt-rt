import axios from "axios"

export const api = 'https://perfect-rt-back-end.vercel.app/api'


export const getData= async (url1, url2)=>{
    return(axios.get(`${api}/${url1}/${url2}`))
}


























