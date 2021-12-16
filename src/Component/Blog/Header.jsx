import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {NavLink, Link} from 'react-router-dom'
import Search from './Search';

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

  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const [active, setActive] = useState(0)


  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link to={`/blog/edit`} style={{textDecoration:'none'}}><Button variant="contained" size="medium" color="primary" className={classes.toolbarButton} startIcon={<Icon>edit</Icon>}>Edit Blog</Button></Link>
        <Link to={`/blog/favorite`} style={{textDecoration:'none'}}><Button variant="contained" size="medium" color="primary" className={classes.toolbarButton} startIcon={<Icon>bookmark</Icon>}>Favorite</Button></Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Search />
        <Button variant="outlined" size="small" color="inherit" startIcon={<Icon>person</Icon>}>
          Sign up
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
            <NavLink to={`blogs/${section.id}`} style={{textDecoration:'none'}} className={classes.toolbarLink}  key={section.id}>
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