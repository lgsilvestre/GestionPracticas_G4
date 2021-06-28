import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonLanding from '../Button/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader

        title="Nombre de La Practica"
        subheader="Abril 18, 2021"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Imagen Empresa"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Descripcion: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et tellus ut arcu iaculis iaculis ut quis lorem. Quisque lobortis eleifend lorem in consectetur. Maecenas ac erat dignissim, semper est at, rhoncus tellus. Curabitur consectetur justo nunc. In hac habitasse platea dictumst. Mauris quis congue arcu. Duis egestas lacus libero, quis pellentesque dui semper dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas in tincidunt arcu
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ButtonLanding carrera="Postular"/>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Requisitos:</Typography>
          <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et tellus ut arcu iaculis iaculis ut quis lorem. Quisque lobortis eleifend lorem in consectetur. Maecenas ac erat dignissim, semper est at, rhoncus tellus. Curabitur consectetur justo nunc. In hac habitasse platea dictumst. Mauris quis congue arcu. Duis egestas lacus libero, quis pellentesque dui semper dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas in tincidunt arcu
          </Typography>
          
         
         
        </CardContent>
      </Collapse>
    </Card>
  );
}