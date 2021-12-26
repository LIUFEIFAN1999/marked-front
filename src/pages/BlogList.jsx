import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import FeaturedPost from '../Component/Blog/FeaturedPost'
import MainFeaturedPost from '../Component/Blog/MainFeaturedPost'
import { useParams } from 'react-router-dom'

export default function BlogList(props) {

    const [posts, setPosts] = useState([])
    const params = useParams()

    

    useEffect(() => {
        const path = params.tagId === undefined ? '':params.tagId
        async function getBlogs(){
            await axios.post('http://localhost:8080/blog/articles/list/'+path,{
              "page": 1,
              "pageSize": 10
            })
            .then((response)=> response.data)
            .then((response)=> {
              if(response.success === true){
                return response.data
              }
              throw response.message
            }).then((blogs)=>{
              const list = [...blogs]
              list.filter(post=>{
                post.avatar = "http://localhost:8080"+post.avatar
              })
              setPosts([...list])
            }).catch((error)=>{
            })
          }

          async function getKeyword(){
            await axios.post('http://localhost:8080/blog/articles/list/keyword/'+ props.keyword,{
              "page": 1,
              "pageSize": 10
            })
            .then((response)=> response.data)
            .then((response)=> {
              if(response.success === true){
                return response.data
              }
              throw response.message
            }).then((blogs)=>{
              const list = [...blogs]
              list.filter(post=>{
                post.avatar = "http://localhost:8080"+post.avatar
              })
              setPosts([...list])
            }).catch((error)=>{
              
            })
          }
          if(props.keyword === undefined){
            getBlogs()
          }
          else{
            getKeyword()
          }
    }, [params, props])

    return (
        <React.Fragment>
            {posts[0] && <MainFeaturedPost post={posts[0]} key={posts[0].id}/>}
            <Grid container spacing={4}>
                {posts.map((post) => (
                    <FeaturedPost key={post.id} post={post} />
                ))}
            </Grid>
        </React.Fragment>
    )
}
