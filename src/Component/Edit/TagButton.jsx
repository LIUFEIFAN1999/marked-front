import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default function Tag(props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.addTag(value)
    setValue('')
    setOpen(false);
  };

  const handleChange = event => {
      setValue(event.target.value)
  }

  return (
    <div>
      <Button variant="contained" color="primary" disableElevation onClick={handleClickOpen} startIcon={<LocalOfferIcon/>}>
         添加新标签
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >新标签</DialogTitle>
        <DialogContent>
          <DialogContentText>
            输入标签名即可添加标签!
          </DialogContentText>
          <TextField
            margin="dense"
            label="Tag"
            style={{width:400}}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}