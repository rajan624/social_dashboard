import { Route, Routes } from "react-router-dom";
import Home from "../../components/Pages/Home/Home"
import { Box } from "@material-ui/core";
import SignIn from "../../components/LoginSignUpComponent/SignIn";
import SignUp from "../../components/LoginSignUpComponent/SignUp";
import PageNotFound from "../../components/PageNotFound/PageNotFound";
import TextEditor from "../../EditorComponent/TextEditor";
import Profile from "../../components/Pages/Profile/Profile";
import Feed from "../../components/Feed/Feed";
import PublicPost from "../../components/Post/PublicPost";
const Router = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Feed />} />
          <Route path="/editor" element={<TextEditor />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:id" element={<PublicPost />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
};

export default Router;