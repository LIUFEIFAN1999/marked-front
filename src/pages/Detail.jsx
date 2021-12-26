import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import UserInfo from '../Component/User/UserInfo';
import ArticleList from '../Component/BlogDetail/ArticleList';
import Article from '../Component/BlogDetail/Article'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TagPool from '../Component/BlogDetail/TagPool';
import BackTop from '../Component/Edit/BackTop'

export default function Detail() {

  const [md, handleMD] = useState('loading......');
  const [user, setUser] = useState({})
  const [article, setArticle] = useState({})
  const [hotArticles, setHotArticles] = useState([])
  const params = useParams()

  useEffect(() => {

      const request = (url)=>{
        return (
           axios.post(url)
          .then((response)=>response.data)
          .then((response)=>{
            if(response.success === true){
                return response.data
            }
            throw response.message
          }).catch((error)=>{
              console.log(error)
          })
        )
      }


      async function getHotArticles(authorId){
        const url = 'http://localhost:8080/blog/articles/hot/byAuthor/' + authorId
        const list = await request(url)
        list.filter(article=>{
          article.avatar = 'http://localhost:8080' + article.avatar
        })
        setHotArticles([...list])
      }

      async function getArticle(){
        const url = "http://localhost:8080/blog/articles/id/" + params.articleId
        const article = await request(url)
        article.content = 'http://localhost:8080' + article.content
        setArticle(article)
        console.log(article)
        getContent(article.content)
      }


      async function getAuthor(){
        const url = 'http://localhost:8080/blog/users/byArticle/'+ params.articleId
        console.log(params.articleId)
        const user = await request(url)
        if(user.avatar === null){
          user.avatar = 'https://source.unsplash.com/random'
        }
        console.log(user)
        setUser(user)
        getHotArticles(user.id)
      }

      async function getContent(url){
        const txt = await fetch(url).then((resp) => resp.text())
        console.log(txt)
        handleMD(txt)
      }
      getArticle()
      getAuthor()
  }, [md, params]);

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={10}>
      <BackTop/>
      <Grid container item xs={2}>
       <Grid item >
          <UserInfo user={user}/>
        </Grid>
        <Grid item >
            <ArticleList title="最热文章" list={hotArticles}/>
        </Grid>
        <Grid item xs={12}>
          <TagPool list={user.tags}/>
        </Grid>
      </Grid>
      <Grid item  xs={10}>
          <Article md={md} time={article.createTime} view={article.pageView} title={article.title} tags={article.tags}/>
      </Grid>
    </Grid>
  )
}
