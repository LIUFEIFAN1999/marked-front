import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position:"fixed",
    bottom:50,
    right:80,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const clickHandler = event =>{
    backTop()
}

const backTop = () =>{
    let scrollToTop = window.setInterval(function() {
        let pos = window.pageYOffset;
        if ( pos > 0 ) {
            window.scrollTo( 0, pos - 20 ); // how far to scroll on each step
        } else {
            window.clearInterval( scrollToTop );
        }
    }, 2);
}

export default function FloatingActionButtons() {
  const classes = useStyles()
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll' , ()=>{
        let position = window.scrollY;
        if(position > 500){
          setDisplay(true)
        }else{
          setDisplay(false)
        }
      })
  }, [])

  return (
    display && 
    <div className={classes.root} onClick={clickHandler}>
      <Fab variant="extended" color="primary">
        <NavigationIcon className={classes.extendedIcon}/>
        Navigate
      </Fab>
    </div>
  );
}
