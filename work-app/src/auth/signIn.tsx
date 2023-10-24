import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  facebookSignInInitiate,
  googleSignInInitiate,
} from "../redux/authActions";
import { TitleContext } from "../context/context";
import { validateEmail } from "./emailRegex";
import { useUserAuth } from "../context/authContext";
import { Alert } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Gold Estate Ltd © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const buttonStyles = {
  "&:hover": {
    backgroundColor: "orange",
  },
  mt: 3,
  mb: 2,
  backgroundColor: "#aa6c39",
};

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailAlert, setEmailAlert] = useState<any>(null);
  const { signIn } = useUserAuth();
  const { triggerResetEmail } = useUserAuth();
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [forgottenPassErr, setForgottenPassErr] = useState<any>(null);
  const [recoverPassSuccess, setRecoverPassSuccess] = useState<any>(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const { currentUser } = useSelector((state: any) => state.user);

  const value = useContext(TitleContext);
  useEffect(() => {
    value.setTitle("Sign In");
  }, [value]);

  useEffect(() => {
    if (currentUser) {
      navigate("/products");
    } else {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setForgottenPassErr(null);
    setRecoverPassSuccess(null);
  }, [email]);

  const forgottenPassword = async () => {
    try {
      await triggerResetEmail(email);
      if (forgottenPassErr === null) {
        return setRecoverPassSuccess(
          <Alert severity="success">Recover e-mail sent</Alert>
        );
      } else if (forgottenPassErr !== null) {
        setRecoverPassSuccess(null);
      }
    } catch (error: any) {
      setForgottenPassErr(error.message);
    }
  };

  const notif = () => {
    toast.info("Successful sign in !");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    if (validateEmail(email)?.input === undefined) {
      return setEmailAlert(<Alert severity="error">Bad Email Format!</Alert>);
    } else if (validateEmail(email)?.input !== undefined) {
      setEmailAlert(null);
    }
    try {
      await signIn(email, password);
      notif();
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  const handleGoogleSubmit = () => {
    dispatch(googleSignInInitiate());
  };
  const handleFacebookSubmit = () => {
    dispatch(facebookSignInInitiate());
  };
  const handleCredential = (event: any) => {
    let { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMsg !== null && emailAlert === null && (
          <>
            <br></br>
            <Alert severity="error">{errorMsg}</Alert>
          </>
        )}
        {emailAlert !== null && (
          <>
            <br></br>
            {emailAlert}
          </>
        )}
        {forgottenPassErr !== null && recoverPassSuccess === null && (
          <>
            <br></br>
            <Alert severity="error">{forgottenPassErr}</Alert>
          </>
        )}
        {recoverPassSuccess !== null && (
          <>
            <br></br>
            {recoverPassSuccess}
          </>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            type="email"
            onChange={handleCredential}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            sx={{ mb: 3 }}
            onChange={handleCredential}
          />

          <Grid container>
            <Grid item xs>
              <Button
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
                color="error"
                onClick={handleGoogleSubmit}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={handleFacebookSubmit}
                startIcon={<FontAwesomeIcon icon={faFacebookF} />}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={buttonStyles}
            disabled={email.length === 0 || password.length === 0}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={5.5}>
              <Link href="#" variant="body2" onClick={forgottenPassword}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
