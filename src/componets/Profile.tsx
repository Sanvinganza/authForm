import { FC } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

export interface IProfileData{
  name?: string;
  email?: string;
};

export const Profile: FC<IProfileData> = (props) => {
  const classes = useStyles();
  const [, , removeCookie] = useCookies(['data']);

  const exit = () => {
    removeCookie('data');
  }
  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h6" component="h4" align="left">
            Name: {props.name}
          </Typography>
          <Typography variant="h6" component="h4" align="left">
            Email: {props.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" type="submit" onClick={exit}>Exit</Button>
        </CardActions>
      </Card>
    </Container>
  );
};