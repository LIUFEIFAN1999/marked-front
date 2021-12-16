import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  add: {
    margin: theme.spacing(1),
    position:"fixed",
    bottom:50,
    right:80,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(title !== "" && description!=="" && link!==""){
      props.add(title, description, link)
      setOpen(false);
    }
    else{
      setAlert(true)
    }
  };

  const handleCancel = ()=>{
    setOpen(false);
  }

  const handleErrorClose = ()=>{
    setAlert(false)
  }

  return (
    <div>
      <Fab variant="extended" color="primary"  className={classes.add} onClick={handleClickOpen}>
          <AddLocationIcon className={classes.extendedIcon} />
          Create Link
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">添加链接</DialogTitle>
        <DialogContent>
          <DialogContentText>
            新链接添加请填写标题、描述、网址信息
          </DialogContentText>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            onChange={(event)=>{
              setTitle(event.target.value)
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            onChange={(event)=>{
              setDescription(event.target.value)
            }}
          />
          <TextField
            margin="dense"
            label="Link"
            fullWidth
            onChange={(event)=>{
              setLink(event.target.value)
            }}
          />
          <Snackbar open={alert} autoHideDuration={3000} onClose={handleErrorClose}>
              <Alert onClose={handleErrorClose} severity="error">
                  请填写完整信息!
              </Alert>
          </Snackbar>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            取消
          </Button>
          <Button onClick={handleClose} color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}