import axios from "axios"

export const api = 'https://perfect-rt-back-end.vercel.app/api'

// export const api = 'http://192.168.43.104:8080/api'


export const getData= async (url1, url2)=>{
    return(axios.get(`${api}/${url1}/${url2}`))
}


























