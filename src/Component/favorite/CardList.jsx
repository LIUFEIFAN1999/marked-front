import Card from './Card'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './Add'
import { Snackbar, Grid } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CardList() {
    const [cards, setCards] = useState([])
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        verify()
        getLinks()
    }, [])

    async function verify(){
       const user =  await request('http://106.15.184.199:9090/verify',null,{
            headers:{
                'content-type': 'application/json',
                'Authorization':window.localStorage.getItem('Authorization')
            }
        })
        if(user === null){
            navigate('/login', {replace: true})
        }
    }

    async function getLinks(){
        const links = await request('http://106.15.184.199:9090/blog/collection/list', null, null)
        setCards(links)
    }

    const request = (url, data, config)=>{
        return (
        axios.post(url, data, config)
        .then((response)=>response.data)
        .then((response)=>{
            if(response.success === true){
                return response.data
            }
            throw response.message
        }).catch((error)=>{
            setMessage(error)
            setError(true)
        }))
    }

    async function add(title, description, link){
        const url = 'http://106.15.184.199:9090/blog/collection/add'
        const data = {
            title:title,
            description:description,
            link:link
        }
        const msg = await request(url, data)
        setMessage(msg)
        setSuccess(true)
        getLinks()
    }

    const handleSuccessClose = ()=>{
        setSuccess(false)
    }

    const handleErrorClose = ()=>{
        setError(false)
    }

    return (
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccessClose}>
              <Alert onClose={handleSuccessClose} severity="success">
                  {message}
              </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={3000} onClose={handleErrorClose}>
              <Alert onClose={handleErrorClose} severity="error">
                  {message}
              </Alert>
          </Snackbar>
            <Add add={add}/>
            <React.Fragment>

            </React.Fragment>
            <Grid container direction='row' justifyContent="flex-start" alignItems="flex-start" spacing={3}>
            {
                cards !=[] &&
                cards.map((card)=>(
                    <Card key={card.id} title={card.title} description={card.description} link={card.link}/>
                ))
            }
            </Grid>
        </div>
    )
}
