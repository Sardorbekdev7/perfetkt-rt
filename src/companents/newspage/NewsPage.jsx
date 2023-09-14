import React, { useEffect, useState } from 'react'
import { api } from '../../helps/api'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from "react-pdf";
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { format } from 'date-fns';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const NewsPage = () => {
    const [news, setNews] = useState([])
    let { _id } = useParams();
    console.log(_id);

    const getNews = () => {
        axios.get(`${api}/news/one/${_id}`).then((res)=> {
            setNews(res.data)
            console.log(res.data);
        })
    }

    useEffect(() => {
      getNews()
    }, [])
    


  return (
    <>
    <Navbar />
    <div className='book'>
        <h1>{news.title}</h1>
        {/* <p>{news.createdAt.splice(0, 10)}</p> */}
        <Document 
        file={news.body}
        onContextMenu={(e) => e.preventDefault()}
        >
            <Page pageNumber={1} />
        </Document>
    </div>
    <Footer />
    </>
  )
}

export default NewsPage