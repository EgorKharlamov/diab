import React, { ChangeEvent, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { loginMode } from '../types/auth';
import { iState } from '../store/index';
import { UserActions } from '../store/user/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkWithoutHref: {
    cursor: 'pointer',
  },
}));

export default function SignUp({ changeMode }: any) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { passRecoveryMessage } = useSelector<iState, iState['user']>((state) => state.user);
  useEffect(() => { console.log(passRecoveryMessage); }, [passRecoveryMessage]);

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleOnClickRecovery = () => {
    dispatch(UserActions.passRecovery({ email }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password recovery
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {passRecoveryMessage && passRecoveryMessage.type
                && <Alert severity={passRecoveryMessage.type}>{passRecoveryMessage.message}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={handleOnChangeEmail}
              />
            </Grid>

          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnClickRecovery}
          >
            Send
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.linkWithoutHref} variant="body2" onClick={() => changeMode(loginMode.signIn)}>
                Back to log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
