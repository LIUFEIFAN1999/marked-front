import React from 'react'
import TitleIcon from '@material-ui/icons/Title';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Grid, Typography } from '@material-ui/core';
import Tag from '../Edit/Tags';

export default function Summary(props) {
    return (
        <div>
            <Grid container direction='row'>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <TitleIcon style={{fontSize:80}}/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h3" color="textPrimary" paragraph style={{marginTop:20}}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item>
                        <AccessAlarmIcon/>
                    </Grid>
                    <Grid item>
                        <Typography color="textPrimary" paragraph style={{marginTop:8}}>
                            {props.time}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <EmojiPeopleIcon/>
                    </Grid>
                    <Grid item>
                        <Typography color="textPrimary" paragraph style={{marginTop:8}}>
                            {props.view}
                        </Typography>
                    </Grid>
                    {
                        props.tags &&
                        props.tags.map((tag)=>(
                            <Grid item key={tag.id}>
                                <Tag tag={tag.name} flag={true}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}
