import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips(props) {
  const classes = useStyles();
  const colors = ["primary", "secondary"]
  const [select, setSelect] = useState("primary")

  const handleDelete = () => {
    props.removeTag(props.tag)
  };

  useEffect(() => {
    const index = Math.floor(Math.random()*2)
    console.log(index)
    setSelect(colors[index])
    console.log(select)
  }, [])

  return (
    <div className={classes.root}>
      {!props.flag && 
       <Chip
        icon={<LabelIcon />}
        label={props.tag}
        onDelete={handleDelete}
        color={select}
      />}
      {props.flag &&
        <Chip
        icon={<LabelIcon />}
        label={props.tag}
        clickable
        color={select}
        />
      }
    </div>
  );
}
