import React, {
  ChangeEvent, useState, useEffect,
} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import { UserActions } from '../store/user/actions';
import { iState } from '../store/index';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkWithoutHref: {
    cursor: 'pointer',
  },
}));

export default function SignIn({ changeMode }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { signInMessage } = useSelector<iState, iState['user']>((state) => state.user);
  useEffect(() => { }, [signInMessage]);

  const [entry, setEntry] = useState('');
  const [pass, setPass] = useState('');

  const handleOnChangeEntry = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntry(e.currentTarget.value);
  };
  const handleOnChangePass = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPass(e.currentTarget.value);
  };

  const handleOnClickSignIn = () => {
    dispatch(UserActions.signIn({ entry, pass }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12}>
            {signInMessage && signInMessage.type
              && <Alert severity={signInMessage.type}>{signInMessage.message}</Alert>}
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="entry"
            label="Username or Email"
            name="entry"
            autoFocus
            onChange={handleOnChangeEntry}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleOnChangePass}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnClickSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.linkWithoutHref} variant="body2" onClick={() => changeMode(loginMode.passRecovery)}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.linkWithoutHref} variant="body2" onClick={() => changeMode(loginMode.signUp)}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
