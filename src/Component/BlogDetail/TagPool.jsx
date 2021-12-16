import { Grid, Paper, Typography } from '@material-ui/core'
import LabelIcon from '@material-ui/icons/Label';
import Tag from '../Edit/Tags'
import React from 'react'

export default function TagPool(props) {
    const {list} = props
    return (
        <Paper style={{width:300, paddingBottom:20}}>
            <Grid container direction='row' style={{marginTop:20, marginLeft:20,paddingBottom:10, paddingTop:20, width:300}} spacing={1}>
                <Grid item xs={3}>
                    <Typography variant="h6">
                        标签池
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <LabelIcon color="primary" style={{fontSize:30}}/>
                </Grid>
            </Grid>
            <Grid container direction='row' justifyContent="flex-start" alignItems="flex-start">
                {
                    list &&
                    list.map((tag)=>(
                        <Grid item xs={4} key={tag.id}>
                            <Tag tag={tag.name} flag={true}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Paper>
    )
}
