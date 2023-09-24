import React, { useEffect } from "react";
import classes from "./Profile.module.css";
import { Avatar, Box, Button, Checkbox, Chip, FormControlLabel, Grid, Link, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { GetType } from "../../../utilities/context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius:"16px",
  boxShadow: 24,
  p: 4,
};
function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [followButtonText, setFollowButtonText] = useState("");
  const cookies = new Cookies();
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
      reset,
      getValues,
    } = useForm();
  const user = GetType();
  const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [messageArray, setMessageArray] = useState([]);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const onSubmit = async (data) => {
    const token = cookies.get("token");
     try {
       await axios
         .patch(`${process.env.REACT_APP_API_URL}/user/profile`,data,  {
            headers: { Authorization: `${token}` },
          })
         .then(function (response) {
           toast.success("Profile Updated Successfully");
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
       console.log(error);
     }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = cookies.get("token");
      console.log(token);
      if (!token) {
        return;
      }
      console.log("testing we are token is not working");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/profile/${id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setUserProfile(response.data.profile);
        setFollowButtonText(user.following.includes(response.data.profile._id) ? "Following": "Follow")
        console.log(
          "🚀 ~ file: Profile.js:88 ~ fetchUserProfile ~ profile:",
          response.data.profile
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (user._id) {
  
      fetchUserProfile();
}
  }, [user]);
   const follow = async () => {
     const token = cookies.get("token");
     console.log(token);
     if (!token) {
       return;
     }
     try {
       await axios
         .get(`${process.env.REACT_APP_API_URL}/user/followUser/${id}`, {
           headers: { Authorization: `${token}` },
         })
         .then((data) => {
           console.log("🚀 ~ file: ViewBlog.js:75 ~ ).then ~ data:", data);
           toast.success(data.data.data);
           window.location.reload();
           setFollowButtonText("Following");
         })
         .catch((error) => {
           console.log("🚀 ~ file: Profile.js:120 ~ follow ~ error:", error)
           toast.error(error?.response?.data?.data);
         });
     } catch (error) {
       console.log(error);
     }
   };
   const startChat = async () => {
     const token = cookies.get("token");
     console.log(token);
     if (!token) {
       return;
     }
     try {
       await axios
         .get(`${process.env.REACT_APP_API_URL}/user/startChart/${id}`, {
           headers: { Authorization: `${token}` },
         })
         .then((data) => {
           console.log("🚀 ~ file: ViewBlog.js:75 ~ ).then ~ data:", data);
          navigate("/messages")
         })
         .catch((error) => {
           toast.error("Something went Wrong");
         });
     } catch (error) {
       console.log(error);
     }
  };
   useEffect(() => {
     const getAllChat = async () => {
       const token = cookies.get("token");
       console.log(token);
       if (!token) {
         return;
       }
       try {
         await axios
           .get(`${process.env.REACT_APP_API_URL}/user/fetchChats`, {
             headers: { Authorization: `${token}` },
           })
           .then((data) => {
             setMessageArray(data.data);
           })
           .catch((error) => {
             toast.error("Something went Wrong");
           });
       } catch (error) {
         console.log(error);
       }
     };
     getAllChat();
   }, []);
   useEffect(() => {
     const getAllChat = async () => {
       const token = cookies.get("token");
       console.log(token);
       if (!token) {
         return;
       }
       try {
         await axios
           .get(`${process.env.REACT_APP_API_URL}/user/getFollowerSuggestion`, {
             headers: { Authorization: `${token}` },
           })
           .then((data) => {
             setSuggestionArray(data.data.data);
           })
           .catch((error) => {
             toast.error("Something went Wrong");
           });
       } catch (error) {
         console.log(error);
       }
     };
     getAllChat();
   }, []);
  return (
    <div className={classes.mainProfileDiv}>
      <div className={classes.profileDiv}>
        <div className={classes.imageNameDiv}>
          <div className={classes.imageDiv}>
            <Avatar
              className={classes.image}
              alt={userProfile?.name}
              src={userProfile?.profileImage}
              variant="rounded"
            />
          </div>
          <div className={classes.nameDiv}>
            <h2>{userProfile?.name}</h2>
            <h4 className={classes.userTags}>{userProfile?.tags}</h4>
            <p className={classes.userDescription}>
              {userProfile?.description}
            </p>
            <div className={classes.followLikeDiv}>
              <div className={classes.centerText}>
                {" "}
                <h4>Post</h4>
                <p>{userProfile?.post}</p>{" "}
              </div>
              <div className={classes.centerText}>
                <h4>Follower</h4>
                <p>{userProfile?.follower}</p>
              </div>
              <div className={classes.centerText}>
                <h4>Following</h4>
                <p>{userProfile?.following}</p>
              </div>
            </div>
            {id == user._id ? (
              <button
                onClick={() => {
                  handleOpen();
                  reset({ ...user });
                }}
                className="Black-button"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button onClick={follow} className="Black-button">
                   {followButtonText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 1,
              fontSize: "1.5rem",
            }}
          >
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                m: "auto",
                bgcolor: "secondary.main",
              }}
            ></Avatar>
            <TextField
              margin="normal"
              fullWidth
              sx={{
                fontSize: "1.5rem",
                mt: 1,
              }}
              id="name"
              placeholder="Name"
              type="text"
              required
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
              fullWidth
              sx={{
                fontSize: "1.5rem",
                mt: 1,
              }}
              required
              id="Tags"
              placeholder="Tags"
              {...register("tags")}
              error={!!errors?.tags}
              helperText={errors?.tags ? errors.tags.message : null}
              name="tags"
              type="text"
              autoComplete="tags"
              autoFocus
              InputLabelProps={{
                sx: { fontSize: "1.5rem" },
              }}
            />
            <TextField
              margin="normal"
              multiline
              rows="5"
              required
              fullWidth
              sx={{
                fontSize: "1.5rem",
                mt: 1,
              }}
              id="description"
              placeholder="Description"
              {...register("description")}
              error={!!errors?.description}
              helperText={
                errors?.description ? errors.description.message : null
              }
              name="description"
              type="text"
              autoComplete="description"
              autoFocus
              InputLabelProps={{
                sx: { fontSize: "1.5rem" },
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
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
export default Profile;
