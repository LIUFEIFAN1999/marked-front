import React, { useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {NavLink, useNavigate} from 'react-router-dom'
import { Snackbar} from '@material-ui/core'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert'

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
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo:{
    width: theme.spacing(20),
    height: theme.spacing(10),
    position:"fixed",
    top:40,
    left:30,
  },
  link:{
    fontSize:14,
    '&:active':{
        color:theme.palette.primary.main,
    }
  },
}));

export default function SignInSide(props) {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [message, setMesaage] = useState('')
  let navigate = useNavigate()

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const handleChange = (event, name) =>{
    if(name==='username'){
        setUsername(event.target.value)
    }
    else if(name==='password'){
        setPassword(event.target.value)
    }
  }

  const login = (event)=>{
    if(username === '' || password===''){
        setMesaage('请填写完整信息')
        setError(true)
    }
    else{
        axios.post('http://localhost:8080/login',{
            username:username,
            password:password,
        })
        .then((response)=> response.data)
        .then((response)=> {
          if(response.success === true){
            return response.data
          }
          throw response.message
        }).then((token)=>{
            props.login(true)
            window.localStorage.setItem("Authorization", token)
            navigate('/blogs/list')
        }).catch((error)=>{
          setMesaage(error)
          setError(true)
        })
    }
  }

  return (
    <Grid container component="main" className={classes.root}> 
      <Snackbar open={error} autoHideDuration={5000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
            {message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Avatar variant="square" className={classes.logo} src='logoblack.png'/>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="logo.png">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登录
          </Typography>
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              登录
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码?
                </Link>
              </Grid> */}
              <Grid item>
                <NavLink to="/register" className={classes.link}>
                    没有账号?注册
                </NavLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
  );
}