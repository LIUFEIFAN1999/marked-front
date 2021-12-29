import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {NavLink, useNavigate} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Icon, Snackbar} from '@material-ui/core';
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          MarkedBlog{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:50
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    marginTop: 50,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
  },
  link:{
    fontSize:14,
    '&:active':{
        color:theme.palette.primary.main,
    }
  },
  div:{
    background:'white',
    width:'100%',
    height:'100%'
  }
}));


export default function SignUp(props) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState('')
  const [path, setPath] = useState('')
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMesaage] = useState('')
  let navigate = useNavigate()

  const fileChangeHandler = event =>{
    const file = event.target.files[0]
    if(file !== undefined){
      const reader=new FileReader()
      reader.readAsDataURL(file)
      reader.onloadstart = function () {
        upLoadFile(file)
        console.log('正在上传头像.....')
      }
      reader.onload = function(e){
        setAvatar(reader.result)
      }
    }
  }

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const upLoadFile = (file)=>{
    const fd = new FormData()
    fd.append('image', file, file.name)

    axios.post('http://106.15.184.199:9090/blog/articles/uploadImg',fd)
    .then((response)=> response.data)
    .then((response)=> {
      if(response.success === true){
        console.log(response.data)
        return response.data
      }
      throw response.message
    }).then((image)=>{
        setPath(image)
    }).catch((error)=>{
      console.log(error)
      setError(true)
    })
  } 

  const register = (event)=>{
    if(username === '' || email==='' || password===''){
        setMesaage('注册信息不完整')
        setError(true)
    }
    else if(!verifyEmail(email)){
        setMesaage('邮箱格式不正确')
        setError(true)
    }
    else{
        axios.post('http://106.15.184.199:9090/register',{
            username:username,
            password:password,
            email:email,
            avatar:path,
        })
        .then((response)=> response.data)
        .then((response)=> {
          if(response.success === true){
            console.log(response.data)
            return response.data
          }
          throw response.message
        }).then((token)=>{
            props.login(true)
            window.localStorage.setItem("Authorization", token)
            navigate('/blogs/list')
            console.log(token)
        }).catch((error)=>{
          console.log(error)
          setMesaage(error)
          setError(true)
        })
    }
  }

  function verifyEmail(str){
    var string = str.replace(/\s|&nbsp;/g, '')
    var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (reg.test(string)) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (event, name) =>{
    if(name==='username'){
        setUsername(event.target.value)
    }
    else if(name==='password'){
        setPassword(event.target.value)
    }
    else if(name==='email'){
        setEmail(event.target.value)
    }
  }

  return (
    <div className={classes.div}>
      <Container component="main" maxWidth="xs" className={classes.root}>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
            {message}
        </Alert>
      </Snackbar>
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={avatar}/>
        <label htmlFor="contained-button-file">
            <Button 
                style={{marginTop:15, marginBottom:15}}
                variant="contained" 
                size="medium" 
                color="primary" 
                component="span"
                startIcon={<Icon>upload</Icon>}>
                上传头像
            </Button>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={fileChangeHandler}
            />
        </label>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                label="用户名"
                onChange={(event)=>{
                    handleChange(event, 'username')
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type='password'
                margin="dense"
                label="密码"
                onChange={(event)=>{
                    handleChange(event, 'password')
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type='email'
                margin="dense"
                label="邮箱"
                onChange={(event)=>{
                    handleChange(event, 'email')
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            注册
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" className={classes.link}>
                已有帐号?登录
              </NavLink>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}