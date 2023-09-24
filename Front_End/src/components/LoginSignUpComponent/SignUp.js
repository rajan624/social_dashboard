import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
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

function SignUp() {
  const theme = createTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(process.env.REACT_APP_API_URL);
    console.log(data)
    try {
      
      await axios.post(`${process.env.REACT_APP_API_URL}/user/registerAuthor` ,data)
        .then(function (response) {
          toast.success("Sign Up Successfully")
          // reset({})
          console.log(response);
          localStorage.setItem("token", response.data.token);
          navigate("/",{ replace: true })
          window.location.reload();
         })
         .catch(function (error) {
           // handle error
            toast.error(error.response.data.msg);
           console.log(error.response.data.msg);
         })
         .finally(function () {
           // always executed
         });
    } catch (error) {
       toast.error(error.response.data.msg);
      console.log(error)      
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
        />
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
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                m: 0,
                bgcolor: "secondary.main",
              }}
            ></Avatar>
            <Typography sx={{ fontSize: "3rem" }} component="h1" variant="h5">
              Sign Up
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
                fullWidth
                sx={{
                  fontSize: "1.5rem",
                  mt: 1,
                }}
                id="name"
                label="Name"
                type="text"
                name="name"
                autoComplete="name"
                {...register("name", {
                  required: true,
                })}
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
                autoFocus
                InputLabelProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
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
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                sx={{
                  fontSize: "1.5rem",
                  mt: 1,
                }}
                id="phone"
                label="Phone No"
                {...register("phone", {
                  required: true,
                  maxLength: 12,
                  minLength: 10,
                })}
                error={!!errors?.phone}
                helperText={errors?.phone ? errors.phone.message : null}
                name="phone"
                type="tel"
                autoComplete="phone"
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
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                sx={{
                  fontSize: "1.5rem",
                  mt: 2,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors?.confirmPassword}
                helperText={
                  errors?.confirmPassword
                    ? errors.confirmPassword.message
                    : null
                }
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                InputLabelProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                sx={{
                  fontSize: "1.5rem",
                  mt: 2,
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    {...register("emailNotification")}
                    value={true}
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    I want to receive inspiration, marketing promotions and
                    updates via email.
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    to="/login"
                    variant="body2"
                    style={{ fontSize: "1.5rem", color: "#1976d2" }}
                  >
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;


// <div className="heropanel--video">
    //   <div className="container">
    //     <main className="signup_container">
    //       <h1 className="heading_primary">
    //         Sign Up<span className="span_blue">.</span>
    //       </h1>
    //       <Box
    //         sx={{ maxWidth: "45rem", width: "100%" }}
    //         component="form"
    //         noValidate
    //         onSubmit={handleSubmit(onSubmit)}
    //       >
    //         <Stack spacing={3}>
    //           <Box className="input">
    //             <label className="text_label">Name</label>
    //             <TextField
    //               {...register("name", {
    //                 required: true,
    //               })}
    //               error={!!errors?.name}
    //               helperText={errors?.name ? errors.name.message : null}
    //             />
    //           </Box>
    //           <Box className="input">
    //             <label className="text_label">Email</label>
    //             <TextField
    //               {...register("email", {
    //                 required: true,
    //                 pattern: {
    //                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    //                   message: "invalid email address",
    //                 },
    //               })}
    //               error={!!errors?.email}
    //               helperText={errors?.email ? errors.email.message : null}
    //             />
    //           </Box>
    //           <Box className="input">
    //             <label className="text_label">Password</label>
    //             <TextField
    //               {...register("password", {
    //                 required: true,
    //                 minLength: {
    //                   value: 6,
    //                   message: "Password must be at least 6 characters",
    //                 },
    //               })}
    //               error={!!errors?.password}
    //               helperText={errors?.password ? errors.password.message : null}
    //               type="password"
    //             />
    //           </Box>
    //           <Box className="input">
    //             <label className="text_label">Confirm Password</label>
    //             <TextField
    //               {...register("confirmPassword", {
    //                 required: true,
    //                 minLength: {
    //                   value: 6,
    //                   message: "Password must be at least 6 characters",
    //                 },
    //               })}
    //               error={!!errors?.confirmPassword}
    //               helperText={
    //                 errors?.confirmPassword
    //                   ? errors.confirmPassword.message
    //                   : null
    //               }
    //               type="password"
    //             />
    //           </Box>
    //           <Box
    //             sx={{
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //             }}
    //           >
    //             {/* sx={{ ...itemsCenter }} */}
    //             <Box>
               
    //             </Box>
              
    //           </Box>
    //           <Box>
    //             <LoadingButton
    //               // loading={loading}
    //               type="submit"
    //               sx={{
    //                 width: "100%",
    //                 textTransform: "none",
    //                 fontSize: "15px",
    //                 fontFamily: "",
    //                 backgroundColor: "#2196f3",
    //                 color: "#fff",
    //                 padding: "14px 24px",
    //                 borderRadius: "8px",
    //                 "&:hover": {
    //                   backgroundColor: "#2196f3",
    //                 },
    //               }}
    //             >
    //               Sign Up
    //             </LoadingButton>

    //             <Typography
    //               sx={{
    //                 fontFamily: "Sofia Pro",
    //                 fontSize: "20px",
    //                 textAlign: "center",
    //                 py: "15px",
    //                 fontWeight: 500,
    //                 fontSize: { md: "20px", xs: "12px" },
    //                 color: "#1a1a1a",
    //               }}
    //             >
    //               Already a member ?{" "}
    //               <span
    //                 onClick={() => navigate("/login")}
    //                 style={{
    //                   fontWeight: 500,
    //                   cursor: "pointer",
    //                   color: "#2196f3",
    //                 }}
    //               >
    //                 Login
    //               </span>
    //             </Typography>
    //           </Box>
             
    //         </Stack>
    //       </Box>
          
    //     </main>
    //     <div className="welcome_container">
    //       <h1 className="heading_secondary">
    //         Welcome to <span className="lg">Planner Buddy!</span>
    //       </h1>
    //       <img src={backgroundImage} alt="" />
    //     </div>
    //   </div>
    // </div>

   {
     /* <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          color: "#25C02780",
                          "&.Mui-checked": {
                            color: "#25C02780",
                          },
                        }}
                      />
                    }
                  />
                  <Typography
                    sx={{
                      fontSize: {
                        md: "20px",
                        xs: "12px",
                      },
                      fontFamily: "Sofia Pro",
                      fontWeight: 500,
                      color: "#B7B7B7",
                      position: "relative",
                      left: "-20px",
                    }}
                  >
                    Remember Me
                  </Typography> */
   }


  {
    /* <Typography
                  // onClick={() => handlePasswordReset()}
                  sx={{
                    fontFamily: "Sofia Pro",
                    fontWeight: 500,
                    fontSize: { md: "20px", xs: "12px" },
                    color: "#2196f3",
                    cursor: "pointer",
                  }}
                >
                  Forgot your password?
                </Typography> */
  }


 {
   /* <Box sx={{ display: "flex", alignItems: "center", gap: "" }}>
                <Box
                  sx={{
                    width: "45%",
                    height: "1px",
                    backgroundColor: "#ECEDF2",
                  }}
                ></Box>
                <Typography sx={{ width: "10%", textAlign: "center" }}>
                  or
                </Typography>
                <Box
                  sx={{
                    width: "45%",
                    height: "1px",
                    backgroundColor: "#ECEDF2",
                  }}
                ></Box>
              </Box> */
 }

 {
   /* <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: "20px",
                }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    width: { md: "50%", xs: "100%" },
                    fontSize: "14px",
                    fontFamily: "Sofia Pro",
                    backgroundColor: "#fff",
                    color: "#1967D2",
                    padding: "14px 24px",
                    borderRadius: "8px",
                    border: "1px solid #1967D2",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#1967D2",
                    },
                  }}
                >
                  <RegisterFacebookIcon />{" "}
                  <Typography sx={{ ml: "10px" }}>
                    Log In via Facebook
                  </Typography>
                </Button>

                <Button
                  sx={{
                    textTransform: "none",
                    width: { md: "50%", xs: "100%" },
                    fontSize: "14px",
                    fontFamily: "Sofia Pro",
                    backgroundColor: "#fff",
                    color: "#D93025",
                    padding: "14px 24px",
                    borderRadius: "8px",
                    border: "1px solid #D93025",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#D93025",
                    },
                  }}
                  onClick={() => googleLogin()}
                >
                  <RegisterGoogleIcon />{" "}
                  <Typography sx={{ ml: "10px" }}>
                    Log In via Google+
                  </Typography>
                </Button>
              </Box> */
 }

{
  /* <form
            onChange={handleChange}
            onSubmit={handleOnSubmit}
            className="signup_form"
          >
            <label className="inp">
              <input
                required
                name="name"
                type="text"
                className="input_text"
                placeholder="&nbsp;"
              />
              <span className="label">Name</span>
              <span className="input_icon">
                <i className="fa_solid, fa_envelope"></i>
              </span>
            </label>
            <label className="inp">
              <input
                required
                name="email"
                type="email"
                className="input_text"
                placeholder="&nbsp;"
              />
              <span className="label">Email</span>
              <span className="input_icon">
                <i className="fa_solid, fa_envelope"></i>
              </span>
            </label>
            <label className="inp">
              <input
                required
                name="password"
                type="password"
                className="input_text"
                placeholder="&nbsp;"
                id="password"
              />
              <span className="label">Password</span>
              <span className="input_icon input_icon_password" data-password>
                <i className="fa_solid fa_eye"></i>
              </span>
            </label>
            <label className="inp">
              <input
                required
                name="confirmPassword"
                type="password"
                className="input_text"
                placeholder="&nbsp;"
                id="confirmPassword"
              />
              <span className="label">Confirm Password</span>
              <span className="input_icon input_icon_password" data-password>
                <i className="fa_solid fa_eye"></i>
              </span>
            </label>
            <button className="btn btn_login">Sign Up</button>
          </form> */
}
{
  /* <p className="text_mute">
            Already a member ? <Link to="/login">Sign In</Link>
          </p> */
}
