import './App.css';
import React, {useState} from 'react'
import Blog from './Component/Blog/Blog';
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route, Navigate} from 'react-router-dom';
import BlogList from './pages/BlogList'
import Detail from './pages/Detail'
import Edit from './pages/Edit'
import CardList from './Component/Favorite/CardList'

function App() {
  const [keyword, setKeyword] = useState('')

  const handleKeyword = (str)=>{
    setKeyword(str)
  }

  return (
    <div className="App-header">
      <React.Fragment>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/blogs" element={<Blog handleKeyword={handleKeyword}/>}>
              <Route path="list/:tagId" element={<BlogList/>}/>
              <Route path="list" element={<BlogList />}/>
              <Route path="detail/:articleId" element={<Detail/>}/>
              <Route path="edit" element={<Edit/>}/>
              <Route path="favorite" element={<CardList/>}/>
              <Route path="search" element={<BlogList keyword={keyword}/>}/>
              <Route path="*" element={<BlogList />}/>
          </Route>
          <Route path="/*" element={<Navigate to='/blogs/list'/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
