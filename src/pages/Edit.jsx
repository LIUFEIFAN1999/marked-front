import React, {useState, useEffect} from 'react'
import MyEditor from '../Component/Edit/MyEditor'
import { Container, Button, Snackbar, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import UploadButton from '../Component/Edit/UploadButton'
import MuiAlert from '@material-ui/lab/Alert';
import Icon from '@material-ui/core/Icon';
import BackTop from '../Component/Edit/BackTop'
import axios from 'axios'
import TagButton from '../Component/Edit/TagButton';
import Tag from '../Component/Edit/Tags';
import {useNavigate} from 'react-router-dom'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    textField:{
        width: "100%",
    },
    container:{
        background:'white',
        marginTop: 20,
        borderRadius: 5,
    },
    grid:{
        alignItems:"center",
        paddingTop:20,
        paddingBottom:20,
    },
  });

export default function Edit() {
    const classes = useStyles()
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState({})
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [tagList, setTagList] = useState([])
    const [login, setLogin] = useState(false)
    const tags = []
    let navigate = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:9090/verify',null,{
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
            if(user === null){
                navigate('/login', {replace: true})
            }
            setLogin(true)
        }).catch((error)=>{
          setErrorMsg(error)
          setError(true)
        })
    }, [])


    const addTag = (tag) => {
        if(tagList.includes(tag)){
            setErrorMsg("标签添加重复!")
            setError(true)
        }
        else if(tagList.length >= 4){
            setErrorMsg("最多添加四个标签!")
            setError(true)
        }
        else if(tag !== ""){
            const list = [...tagList]
            list.push(tag)
            setTagList([...list])
        }
    }

    const removeTag = (tag) => {
        const index = tagList.indexOf(tag)
        const list = [...tagList]
        list.splice(index, 1)
        setTagList([...list])
    }

    const getContent = (data)=>{
        setContent(data)
      }

    const getTitle = event =>{
        const data = event.target.value
        setTitle(data)
    }

    const getDescription = event =>{
        const data = event.target.value
        setDescription(data)
    }

    const getFile = (data)=>{
        setFile(data)
    }

    const upLoadFile = ()=>{
        const fd = new FormData()
        fd.append('image', file, file.name)

        axios.post('http://localhost:9090/blog/articles/uploadImg',fd)
        .then((response)=> response.data)
        .then((response)=> {
          if(response.success === true){
            return response.data
          }
          throw response.message
        }).then((image)=>{
            submit(image)
        }).catch((error)=>{
          setErrorMsg("博客发送失败，请重试!")
          setError(true)
        })
    }

    const submit = (avatar)=>{
        axios.post('http://localhost:9090/blog/articles/add',{
            title: title,
            description:description,
            tags:tags,
            content:content,
            avatar:avatar
        },{
            headers:{
                'content-type': 'application/json',
                'Authorization':window.localStorage.getItem('Authorization')
            }
        }).then((response)=> response.data)
        .then((response)=> {
          if(response.success === true){
            return response.data
          }
          throw response.message
        }).then(()=>{
            setSuccess(true)
            setTimeout(goBack, 1000)
        }).catch((error)=>{
          setErrorMsg("博客发送失败，请重试!")
          setError(true)
        })
    }

    const goBack = ()=>{
        navigate('/blogs/list')
    }

    const handleSubmit = ()=>{
        if(title !== '' && description!== '' && tagList != [] && content !== '' && file!={}){
            tagList.forEach(element => {
                tags.push({name:element})
            });
            upLoadFile()
        }
        else{
            setErrorMsg('发布前请确保信息完整!')
            setError(true)
        }
    }

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccess(false);
      };


    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false);
    };

    return (
        <React.Fragment>
            <Container maxWidth="lg" className={classes.container}>
                <BackTop/>
                <Grid container direction='row' spacing={2} className={classes.grid}>
                    <Grid item xs={12}>
                        <TextField required id="standard-required" label="Title" onChange={getTitle} className={classes.textField} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="standard-required" label="Discription" onChange={getDescription} className={classes.textField} />
                    </Grid>
                    <Grid item xs={2}>
                        <TagButton addTag={addTag}/>
                    </Grid>
                    {
                        tagList.map((tag)=>(
                                <Grid container item xs={2} key={tag}>
                                    <Tag tag={tag} removeTag={removeTag}/>
                                </Grid>
                            ))
                    }
                    <Grid item xs={12}>
                        <UploadButton onUpdate={getFile} filename={file.name}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" disableElevation onClick={handleSubmit} endIcon={<Icon>send</Icon>}>
                            发表博客
                        </Button>  
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {login && <MyEditor onChange={getContent}/> }
                        </div>
                    </Grid>
                </Grid>
                <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose}>
                    <Alert onClose={handleSuccessClose} severity="success">
                        博客发表成功!
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error">
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </Container>
        </React.Fragment>
    )
}
