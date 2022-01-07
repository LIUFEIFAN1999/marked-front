import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop:10, 
        marginLeft:1,
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5,
        width:300,
        backgroundColor:"white",
        color:'black'
    },
    navLink:{
        color:'inherit',
        textDecoration:'none',
        '&:active':{
            color:'inherit'
        },
        '&:hover':{
            color:'primary'
        }
    }
  }));

export default function ArticleList(props){
    const classes = useStyles();
    const {title, list} = props
    return (
        <React.Fragment>
            {list &&
            <Grid container spacing={2} direction="row" className={classes.root}>
                    <Grid item xs={4}>
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <AppsIcon color="primary" style={{fontSize:30}}/>
                    </Grid>
                    <Grid>
                        <List>
                            {list.map((article)=>(
                                <ListItem key={article.id} component={NavLink} to={`/blogs/detail/${article.id}`} className={classes.navLink}>
                                    <ListItemAvatar>
                                        <Avatar variant="square" alt={article.title} src={article.avatar}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={article.title}
                                        secondary={"浏览 "+article.pageView}
                                        className={classes.textItem}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
            </Grid>}
        </React.Fragment>
    )
}