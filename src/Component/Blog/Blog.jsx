import { useEffect, useState } from 'react'
import Header from './Header'
import { Container } from '@material-ui/core'
import axios from 'axios'
import {Outlet } from 'react-router-dom'


export default function Blog(props){
    const [sections, setSections] = useState([])
    const [login, setLogin] = useState(false)

    useEffect(() => {
        axios.post('http://106.15.184.199:9090/verify',null,{
            headers:{
                'content-type': 'application/json',
                'Authorization':window.localStorage.getItem('Authorization')
            }
        })
        .then((response)=> response.data)
        .then((response)=> {
          if(response.success === true){
            return response.data
          }
          throw response.message
        }).then((user)=>{
            if(user !== null){
               setLogin(true)
            }
        }).catch((error)=>{
          console.log(error)
        })
        async function getTags(){
          await axios.get('http://106.15.184.199:9090/blog/tags/list')
          .then((response)=>{
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
            <Header title="Blog" sections={sections} login={login} handleKeyword={props.handleKeyword}/>
            <Outlet/>
            </Container>
        </div>
    )
}