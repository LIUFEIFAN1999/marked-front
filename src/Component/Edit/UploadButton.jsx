import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));

export default function UploadButton(props) {
  const classes = useStyles();

  const fileChangeHandler = event =>{
      const file = event.target.files[0]
      if(file !== undefined){
        props.onUpdate(file)
      }
  }

  return (
      <label htmlFor="contained-button-file">
            <Grid container direction='row' spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    为博客选择一张照片
                </Button>
              </Grid>
              <Grid item>
                <Typography color="primary" style={{marginTop:12}}>
                    {props.filename}
                </Typography>
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
      </label>
  );
}