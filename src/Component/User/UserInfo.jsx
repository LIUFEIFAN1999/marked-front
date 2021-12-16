import { Grid, Avatar, Typography, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


export default function UserInfo(props){
    const classes = useStyles();
    return (
        <>
            {props.user &&
        <React.Fragment>
            <Grid container direction="row"  style={{paddingLeft:40, paddingTop:20, paddingBottom:20, borderRadius:5,width:300, backgroundColor:"white"}}>
                <Grid container item direction="column">
                        <Grid container item xs={4}>
                            <Avatar alt={props.user.username} src={props.user.avatar} style={{marginTop:15}} className={classes.large}/>
                        </Grid>
                        <Grid container item direction="row" xs={8}>
                            <Grid item>
                                <Typography variant="h5" color="primary" noWrap style={{marginTop:5}}>
                                    {props.user.username}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="primary" noWrap style={{marginTop:5}}>
                                    {props.user.email}
                                </Typography>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid container item  spacing={7} >
                    <Grid item>
                        <Typography variant="subtitle1" color="primary" noWrap>
                            文章
                        </Typography>
                        <Typography variant="subtitle1" color="primary" style={{textAlign:"center"}}>
                            {props.user.blogCount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="primary" noWrap>
                            访问
                        </Typography>
                        <Typography variant="subtitle1" color="primary" style={{textAlign:"center"}}>
                            {props.user.totalPageView}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="primary" noWrap >
                            博龄
                        </Typography>
                        <Typography variant="subtitle1" color="primary" style={{textAlign:"center"}}>
                            {props.user.blogAge+"天"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                        <Grid item>
                            <Button variant="contained" color="primary" disableElevation style={{width:220}}>查看</Button>
                        </Grid>
                </Grid>
            </Grid>
        </React.Fragment>}
        </>
    )
}