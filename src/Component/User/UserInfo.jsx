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
        marginLeft: 30
    },
}));


export default function UserInfo(props){
    const classes = useStyles();
    return (
        <>
        {
        props.user &&
        <React.Fragment>
            <Grid container direction="row" style={{paddingTop:20, paddingBottom:20, borderRadius:5,width:300, backgroundColor:'white'}}>
               
                <Grid item xs={4}>
                    <Avatar alt={props.user.username} src={props.user.avatar} className={classes.large}/>
                    {/* <Avatar alt={'unknown'} src={'https://source.unsplash.com/random'}  className={classes.large}/> */}
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5" color="primary" noWrap>
                        {props.user.username}
                        {/* {'Null'} */}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" noWrap>
                        {props.user.email}
                        {/* {'Null'} */}
                    </Typography>
                </Grid>
               
                
                <Grid item xs={4} style={{marginTop:10,textAlign:'center'}}>
                    <Typography variant="subtitle1" color="primary" noWrap>
                        文章
                    </Typography>
                    <Typography variant="subtitle1" color="primary" >
                        {props.user.blogCount}
                        {/* {'N'} */}
                    </Typography>
                </Grid>
                <Grid item xs={4} style={{marginTop:10,textAlign:'center'}}>
                    <Typography variant="subtitle1" color="primary" noWrap>
                        访问
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        {props.user.totalPageView}
                        {/* {'N'} */}
                    </Typography>
                </Grid>
                <Grid item xs={4} style={{marginTop:10, textAlign:'center'}}>
                    <Typography variant="subtitle1" color="primary" noWrap>
                        博龄
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        {props.user.blogAge+"天"}
                        {/* {'N'} */}
                    </Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" disableElevation style={{width:240, marginTop:10, marginLeft:30}}>查看</Button>
                </Grid>
                
            </Grid>
        </React.Fragment>}
        </>
    )
}