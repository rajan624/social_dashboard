import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import loginPageImage from "../../images/Background/ella-jardim-M0zs81FNm6s-unsplash.jpg";
import loginPageBackGround from "../../images/Background/viktor-forgacs-aPC8ygu3bWA-unsplash.jpg";
import loginPageBackGroundMobile from "../../images/Background/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./SignIn.module.css";
import Cookies from "universal-cookie";
const styles = (theme) => ({
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: "white",
  },
});
function SignIn({ props }) {
  const cookies = new Cookies();
  const theme = createTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user/login`, data)
        .then(function (response) {
          toast.success("Login Successfully");
          reset({});
          console.log(response);
           cookies.set("token", response.data.token);
          navigate("/", { replace: true });
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          toast.error(error.response.data.msg);
        });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginPageImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <Link
            style={{ marginTop: "4vw", marginLeft: "4vw" }}
            to="/"
            class="logo"
          >
            <img src={logo} width="129" height="40" alt="Blogy logo" />
          </Link> */}
        </Grid>
        <Grid
          sx={{
            backgroundImage: `url(${loginPageBackGround})`,
            "@media (max-width: 600px)": {
              backgroundImage: `url(${loginPageBackGroundMobile})`,
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 5,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "150px",
                height: "150px",
                m: 1,
                bgcolor: "secondary.main",
              }}
            >
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography sx={{ fontSize: "3rem" }} component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                mt: 1,
                fontSize: "1.5rem",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                sx={{
                  fontSize: "1.5rem",
                  mt: 1,
                }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                autoFocus
                InputLabelProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                InputLabelProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                sx={{
                  fontSize: "1.5rem",
                  mt: 2,
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    Remember me
                  </Typography>
                }
                sx={{
                  mt: 2,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: "1.5rem" }}
              >
                Sign In
              </Button>
              <div id="alternativeLogin">
                <label>Or sign in with:</label>
                <a href={`${process.env.REACT_APP_API_URL}/user/auth/google`}>
                  <button type="button" className={classes.google_button}>
                    <span className={classes.google_button__icon}>
                      <svg
                        viewBox="0 0 366 372"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                          id="Shape"
                          fill="#EA4335"
                        />
                        <path
                          d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                          id="Shape"
                          fill="#FBBC05"
                        />
                        <path
                          d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                          id="Shape"
                          fill="#4285F4"
                        />
                        <path
                          d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                          fill="#34A853"
                        />
                      </svg>
                    </span>
                    <span className={classes.google_button__text}>
                       Google
                    </span>
                  </button>
                </a>
              </div>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ fontSize: "1.5rem", color: "#1976d2" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/signup"
                    variant="body2"
                    style={{ fontSize: "1.5rem", color: "#1976d2" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={8} />
              <Typography variant="body2" color="textSecondary" align="center">
                {"By signing in you agree to our "}
                <Link color="inherit" href="#">
                  Terms and Conditions
                </Link>
                {" and "}
                <Link color="inherit" href="#">
                  Privacy Policy
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;