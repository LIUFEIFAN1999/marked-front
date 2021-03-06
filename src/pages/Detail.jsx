import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import UserInfo from '../Component/User/UserInfo';
import ArticleList from '../Component/Detail/ArticleList';
import Article from '../Component/Detail/Article'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TagPool from '../Component/Detail/TagPool';
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
        const url = 'http://106.15.184.199:9090/blog/articles/hot/byAuthor/' + authorId
        const list = await request(url)
        list.filter(article=>{
          article.avatar = 'http://106.15.184.199' + article.avatar
        })
        setHotArticles([...list])
      }

      async function getArticle(){
        const url = "http://106.15.184.199:9090/blog/articles/id/" + params.articleId
        const article = await request(url)
        article.content = 'http://106.15.184.199' + article.content
        setArticle(article)
        getContent(article.content)
      }


      async function getAuthor(){
        const url = 'http://106.15.184.199:9090/blog/users/byArticle/'+ params.articleId
        const user = await request(url)
        if(user.avatar === null){
          user.avatar = 'https://source.unsplash.com/random'
        }
        else{
          user.avatar = 'http://106.15.184.199' + user.avatar
        }
        setUser(user)
        getHotArticles(user.id)
      }

      async function getContent(url){
        const txt = await fetch(url).then((resp) => resp.text())
        handleMD(txt)
      }
      getArticle()
      getAuthor()
  }, [md, params]);

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={5}>
      <BackTop/>
      <Grid container item xs={2}>
       <Grid item >
          <UserInfo user={user}/>
        </Grid>
        <Grid item >
            <ArticleList title="????????????" list={hotArticles}/>
        </Grid>
        <Grid item>
          <TagPool list={user.tags}/>
        </Grid>
      </Grid>
      <Grid item  xs={10}>
          <Article md={md} time={article.createTime} view={article.pageView} title={article.title} tags={article.tags}/>
      </Grid>
    </Grid>
  )
}
