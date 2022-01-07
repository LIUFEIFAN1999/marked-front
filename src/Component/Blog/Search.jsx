import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {Link, useNavigate} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height:30,
    marginRight:30,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));



export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const navigate = useNavigate()

  const handleChange = event =>{
    props.handleKeyword(event.target.value)
    navigate('/blogs/search')
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Blogs"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
        onBlur={handleChange}
      />
      {/* <IconButton type="submit" className={classes.iconButton} aria-label="search" 
        component={Link}
        to='search'>
        <SearchIcon />
      </IconButton> */}
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
