import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Grid, Avatar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  square: {
    color: 'transparent',
    backgroundColor: 'transparent',
    width:100,
    height:100
  },
  hidden:{
    display:'none'
  },
  show:{

  }
}));

export default function UploadButton(props) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState('')
  const [show, setShow] = useState(false)

  const fileChangeHandler = event =>{
      const file = event.target.files[0]
      if(file !== undefined){
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadstart = function () {
          props.onUpdate(file)
        }
        reader.onload = function(){
          setAvatar(reader.result)
          setShow(true)
        }
      }
  }

  return (
      <React.Fragment>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12} className= {show ? classes.show:classes.hidden} >
                <Avatar variant="square" src={avatar} className={classes.square} />
              </Grid>
              <Grid item>
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                      为博客选择一张照片
                  </Button>
                </label>
              </Grid>
              <Grid item>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={fileChangeHandler}
                 />
              </Grid>
          </Grid>
      </React.Fragment>
  );
}