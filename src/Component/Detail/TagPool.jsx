import { Grid, Paper, Typography } from '@material-ui/core'
import LabelIcon from '@material-ui/icons/Label';
import Tag from '../Edit/Tags'
import React from 'react'

export default function TagPool(props) {
    const {list} = props
    return (
        <Grid container direction='row' spacing={1} alignItems="flex-start" style={{width:300, padding:20, backgroundColor:'white', color:'black', borderRadius:5, marginTop:20, marginLeft:1}}>
            <Grid item xs={4}>
                <Typography variant="h6">
                    标签池
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <LabelIcon color="primary" style={{fontSize:30}}/>
            </Grid>
            {
                list &&
                list.map((tag)=>(
                    <Tag tag={tag.name} flag={true} key={tag.id}/>
                ))
            }
        </Grid>
    )
}
