import { useEffect, useState } from 'react'
import Header from './Header'
import { Grid, Container } from '@material-ui/core'
import ArticleList from '../Detail/ArticleList'
import AddLink from '../favorite/Add'
import MyEditor from '../Edit/MyEditor'
import axios from 'axios'
import { Route, Routes, Navigate } from 'react-router-dom'
import BlogList from '../../pages/BlogList'
import Detail from '../../pages/Detail'
import Edit from '../../pages/Edit'
import Card from '../favorite/Card'
import CardList from '../favorite/CardList'


  // const mainFeaturedPost = {
  //   title: 'Title of a longer featured blog post',
  //   description:
  //     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  //   image: 'https://source.unsplash.com/random',
  //   imgText: 'main image description',
  //   linkText: 'Continue reading…',
  // };

  // const featuredPosts = [
  //   {
  //     title: 'Featured post',
  //     date: 'Nov 12',
  //     description:
  //       'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //     image: 'https://source.unsplash.com/random',
  //     imageText: 'Image Text',
  //   },
  //   {
  //     title: 'Post title',
  //     date: 'Nov 11',
  //     description:
  //       'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //     image: 'https://source.unsplash.com/random',
  //     imageText: 'Image Text',
  //   },
  // ];


export default function Blog(){
    const [sections, setSections] = useState([])

    useEffect(() => {
        async function getTags(){
          await axios.get('http://localhost:8080/blog/tags/list')
          .then((response)=>{
          console.log(response.data.data)
          setSections(response.data.data)
          }).catch((error)=>{
          console.log(error)
          })
        }
        getTags();
    }, [])


    return(
        <div>
            <Container maxWidth="xl">
            <Header title="Blog" sections={sections} />
            <Routes>
              <Route path="/blogs" element={<BlogList/>}/>
              <Route path="/blogs/:tagId" element={<BlogList/>}/>
              <Route path="/blog/detail/:articleId" element={<Detail/>}/>
              <Route path="/blog/edit" element={<Edit/>}/>
              <Route path="/blog/favorite" element={<CardList/>}/>
              <Route path="*" element={<Navigate to ="/blogs" />}/>
            </Routes>
            
            </Container>
        </div>
    )
}