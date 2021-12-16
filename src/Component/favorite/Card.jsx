import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid , Link, Hidden} from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Url2Icon from '../../utils/Url2Icon'

const useStyles = makeStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
      whiteSpace:"nowrap",
      textOverflow:"ellipsis",
      overflow:"hidden",
    },
    cardMedia: {
      width: 160,
    },
  });

export default function ImgMediaCard(props) {
  const classes = useStyles()
  const [img, setImg] = useState("")


  useEffect(() => {
      const uri = Url2Icon(props.link)
      setImg(uri)
      console.log(img)
  }, [props.link])


  return (
    <Grid item xs={12} md={6}>
    <CardActionArea component="a" href={props.link}>
      <Card className={classes.card}>
        {
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
                {props.title}
            </Typography>
            <Typography variant="subtitle1" paragraph style={{marginTop:10}}>
                {props.description}
            </Typography>
            <Grid container direction='row'>
                <Grid item >
                    <ArrowRightAltIcon color='primary' style={{fontSize:45}}/>
                </Grid>
                <Grid item>
                    <Link component={'span'} style={{fontSize:20, textDecoration:"none", marginLeft:20}}>
                        Continue reading...
                    </Link>
                </Grid>
            </Grid>
          </CardContent>
        </div>
        }
        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={img} />
        </Hidden>
      </Card>
    </CardActionArea>
  </Grid>
  );
}