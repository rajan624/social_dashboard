import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./MessageSender.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { GetType } from "../../utilities/context/authContext";
import { useNavigate } from "react-router-dom";

export default function MessageSender() {
    const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    };
    const user = GetType();
    const addPost = () => {
        if (user?.name) {
            navigate("/editor");
        } else {
            navigate("/login");
        }
    }
  return (
    <div className="messageSender">
      <div className="messageSender_top">
        <Avatar alt={user.name} src={user?.profileImage} />
        <form>
          <input
            placeholder="What's on your mind"
            value={imageUrl}
            onClick={addPost}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit hidden
          </button>
        </form>
      </div>
      <div className="messageSender_bottom">
        <div onClick={addPost} className="messageSender_option">
          <InsertEmoticonIcon style={{ color: "red" }} />
          <h3>Feeling/Activity</h3>
        </div>
        <div onClick={addPost} className="messageSender_option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Picture</h3>
        </div>
        <div onClick={addPost} className="messageSender_option">
          <PostAddIcon style={{ color: "orange" }} />
          <h3>Post</h3>
        </div>
      </div>
    </div>
  );
}
