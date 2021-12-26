import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import {NavLink, Link, useNavigate} from 'react-router-dom'
import Search from './Search'
import axios from 'axios'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    marginLeft:250,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    background: 'primary',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: 'inherit',
    fontSize: 14,
  },
  toolbarButton: {
    marginRight: 5,

  },
  link:{
    color:'inherit',
    textDecoration:'none',
    '&:active':{
      color:'inherit'
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title, login } = props
  const [active, setActive] = useState(0)
  const [error, setError] = useState(false)
  const [message, setMesaage] = useState('')
  let navigate = useNavigate()

  const handleLogout = ()=>{
    axios.post('http://localhost:8080/logout',null,{
      headers:{
        'content-type': 'application/json',
        'Authorization': window.localStorage.getItem('Authorization')
      }
    })
    .then((response)=> response.data)
    .then((response)=> {
      if(response.success === true){
        return response.data
      }
      throw response.message
    }).then(()=>{
        props.handleLogin(false)
        navigate('/blogs/list', {replace: true})
    }).catch((error)=>{
      setMesaage(error)
      setError(true)
    })
  }

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  }

  return (
    <React.Fragment>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
            {message}
        </Alert>
      </Snackbar>
      <Toolbar className={classes.toolbar}>
        <Link to='edit' style={{textDecoration:'none'}}><Button variant="contained" size="medium" color="primary" className={classes.toolbarButton} startIcon={<Icon>edit</Icon>}>Edit Blog</Button></Link>
        <Link to='favorite' style={{textDecoration:'none'}}><Button variant="contained" size="medium" color="primary" className={classes.toolbarButton} startIcon={<Icon>bookmark</Icon>}>Favorite</Button></Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
        <NavLink to='list' className={classes.link}>
          {title}
        </NavLink>
        </Typography>
        <Search handleKeyword={props.handleKeyword}/>
        {
          login ?
          <Button variant="outlined" size="small" color="inherit" startIcon={<ExitToAppIcon/>} onClick={handleLogout}>
          退 出
        </Button>
        :
        <Button variant="outlined" size="small" color="inherit" startIcon={<Icon>person</Icon>} component={Link} to='/login'>
          登 录
        </Button>}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections && sections.map((section) => (
            <NavLink to={`/blogs/list/${section.id}`} style={{textDecoration:'none'}} className={classes.toolbarLink}  key={section.id}>
              <Button
               color = {active === section.id ? 'primary':'inherit'}
               onClick={()=>{
                 setActive(section.id)
               }}
              >
                {section.name}
              </Button>
            </NavLink>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};