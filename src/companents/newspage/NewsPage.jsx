import React, { useEffect, useState } from 'react'
import { api } from '../../helps/api'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from "react-pdf";
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { format } from 'date-fns';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const NewsPage = () => {
    const [news, setNews] = useState([])
    let { _id } = useParams();

    const getNews = () => {
        axios.get(`${api}/news/one/${_id}`).then((res)=> {
            setNews(res.data)
        })
    }

    useEffect(() => {
      getNews()
    }, [])

    


  return (
    <>
    <Navbar />
    <div className='book'>
        <h1 style={{marginBottom: '20px'}}>{news.title}</h1>
        <p style={{marginBottom: '20px'}}>{news.createdAt}</p>
        <div>
        <iframe src={news.body} style={{width: '100%', height: '70vh'}} />
        {/* <Document 
          file={news.body}
          onContextMenu={(e) => e.preventDefault()}
          className={"PDFDocument"} 
          >
            <Page className={"PDFPage PDFPageOne"} pageNumber={1} renderTextLayer={false} renderInteractiveForms={false}/>
        </Document> */}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default NewsPage