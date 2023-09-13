import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Admin from './admin/admin/Admin.jsx'
import Homepage from './companents/homepage/HomePage.jsx'
import Teacher from './companents/teacher/Teacher.jsx'
import TeacherDetail from './companents/teacher-detail/TeacherDetail.jsx'
import Books from './companents/books/Book.jsx'
import Book from './companents/book/Book.jsx'
import Articles from './companents/articles/Articles.jsx'
import ArticlesDetail from './companents/articles-detail/ArticlesDetail.jsx'
import Subjects from './companents/subjects/Subjects.jsx'
import Presentation from './companents/presentation/Presentation.jsx'
import PresentationDetail from './companents/presentation-detail/PresentationDetail.jsx'
import Login from './companents/login/Login.jsx'
import { QueryClientProvider } from 'react-query'
import TeacherAdmin from './teacher/admin/TeacherAdmin.jsx'


const RautePage = () => {
  return (
    <div>
        <>
            <Routes>
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/my/*' element={<TeacherAdmin />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/teachers' element={<Teacher />} />
            <Route path='/teachers/*' element={<TeacherDetail />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/*' element={<Book />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/articles/*' element={<ArticlesDetail />} />
            <Route path='/subjects' element={<Subjects />} />
            <Route path='/presentations' element={<Presentation />} />
            <Route path='/presentations/*' element={<PresentationDetail />} />
            <Route path='/login' element={<Login />} />
        </Routes>
        </>

    </div>
  )
}

export default RautePage