import { useEffect, useState } from 'react'
import Header from './Header'
import { Container } from '@material-ui/core'
import axios from 'axios'
import {Outlet } from 'react-router-dom'


export default function Blog(props){
    const [sections, setSections] = useState([])

    useEffect(() => {
        async function getTags(){
          await axios.get('http://localhost:8080/blog/tags/list')
          .then((response)=>{
          setSections(response.data.data)
          }).catch((error)=>{
          })
        }
        getTags();
    }, [])


    return(
        <div>
            <Container maxWidth="xl">
            <Header title="Blog" sections={sections} login={props.login} handleLogin={props.handleLogin} handleKeyword={props.handleKeyword}/>
            {/* <Routes>
              <Route>
                <Route path="/blogs/list" element={<BlogList/>}/>
                <Route path="/blogs/:tagId" element={<BlogList/>}/>
                <Route path="/blog/detail/:articleId" element={<Detail/>}/>
                <Route path="/blog/edit" element={<Edit/>}/>
                <Route path="/blog/favorite" element={<CardList/>}/>
                <Route path="/blogs/*" element={<Navigate to ="/blogs/list" />}/>
              </Route>
            </Routes> */}
            <Outlet/>
            
            </Container>
        </div>
    )
}