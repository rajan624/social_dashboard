import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddBlogForm from "../Form/AddBlogForm";
import { styled, alpha } from "@mui/material/styles";
import logo from "../../images/images/logo.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GetType } from "../../utilities/context/authContext";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Input, Modal, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "universal-cookie";
import { useCallback } from "react";
import classes from "./Header.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const settings = ["Profile", "Logout"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#000",
    },
  },
});
const Header = ({ darkMode, setDarkMode }) => {
  const cookies = new Cookies();
  const [searchText, setSearchText] = useState("");
  const [searchParams] = useSearchParams();
  const googleToken = searchParams.get("googleToken");

  useEffect(() => {
    if (googleToken) {
      cookies.set("token", googleToken);
      searchParams.delete("googleToken");
      const newUrl = `${window.location.pathname}`;
      window.history.replaceState(null, "", newUrl);
      window.location.reload();
    }
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const user = GetType();

  useEffect(() => {
    console.log(user.name);
  }, [user]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [image, setImage] = React.useState("");

  const handleOpenNavMenu = (event) => {
    console.log("we are testing three");
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    console.log("we are testing one");
    console.log(value);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const profileMenu = (value) => {
    console.log(value);
    if (value == "Logout") {
      logOut();
    } else if (value == "Add Article") {
      if (user?.email) {
        navigate("/Editor");
        // handleOpen()
      } else {
        navigate("/login");
      }
    } else if (value == "Messages") {
      navigate("/messages");
    } else if (value == "Profile") {
      navigate(`/profile/${user._id}`);
    }
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid black",
    marginTop: "1.5vw",
    marginBottom: "1.5vw",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "25vw",
    padding: "0.3vw",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "25vw",
      marginLeft: "1vw",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20vw",
        fontSize: "1.5rem",
        "&:focus": {
          width: "20vw",
        },
      },
    },
  }));

  const logOut = () => {
    const token = cookies.get("token");
    console.log("🚀 ~ file: Header.js:166 ~ logOut ~ token:", token);
    try {
      cookies.remove("token");
      window.location.reload();
    } catch (error) {}
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {" "}
        <AppBar
          sx={{ border: "1px solid", borderRadius: "0px 0px 16px 16px" }}
          position="static"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Link to="/" class="logo">
                  <img src={logo} width="129" height="40" alt="Blogy logo" />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
                {/* <Button
                  onClick={() => {
                    profileMenu("Add Article");
                  }}
                  sx={{
                    my: 2,
                    mr: 2,
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    display: "block",
                  }}
                >
                 
                </Button> */}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {user?.name ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          sx={{ backgroundColor: "#000" }}
                          alt={user.name}
                          src={user?.profileImage}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            profileMenu(setting);
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link
                    style={{ padding: "0.5vw 2vw" }}
                    to="/login"
                    class="btn1"
                  >
                    Join
                  </Link>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: "40px 0px 0px 40px",
            width: { xs: "95%", md: "80%" },
            overflow: "auto",
            height: "70%",
            border: "1px solid",
            borderRadius: "16px",
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <AddBlogForm />
        </Box>
      </Modal>
    </>
  );
};
export default Header;

// //   <div
// //     className={classes.herovideo}

// //   >
// <div className={classes.header}>
//   <i
//     onClick={() => setBurger(!burger)}
//     className="fa fa-bars fa-2x"
//     aria-hidden="true"
//   ></i>
//   <div className={classes.logo}>
//     <img className={classes.logo} src={logo} alt="logo-epo" />
//   </div>
//   <div>
//     <ul
//       style={{ transform: `${burger ? "translateX(-50px)" : ""}` }}
//       className={classes.nav}
//     >
//       <i
//         onClick={() => setBurger(!burger)}
//         style={{ left: "11em", top: ".5em" }}
//         className="fa fa-times"
//         aria-hidden="true"
//       ></i>
//       <li onClick={() => setBurger(false)}>
//         <Link to="/">Home</Link>
//       </li>
//       <li onClick={() => setBurger(false)}>
//         <Link to="/about">About</Link>
//       </li>
//       <li onClick={() => setBurger(false)}>
//         <Link to="/gallery">Gallery</Link>
//       </li>
//       <li onClick={() => setBurger(false)}>
//         <Link to="/blog">Blog</Link>
//       </li>
//       <li onClick={() => setBurger(false)}>
//         <Link to="/contact">Contact</Link>
//       </li>
//       <li onClick={() => setBurger(false)}>
//         {user ? (
//           user?.name ? (
//             user.name
//           ) : (
//             "User"
//           )
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </li>
//     </ul>
//   </div>
// </div>
// // </div>
