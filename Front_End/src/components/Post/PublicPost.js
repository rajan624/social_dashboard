import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import axios from "axios";
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { GetType } from "../../utilities/context/authContext";
export default function PublicPost() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/blog/public/${id}`)
      .then((response) => {
        // Handle the response after successful upload
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        // Handle any errors during the upload
        toast.error("Something went wrong");
        console.error(error);
      });
  };
  const user = GetType();
  const likePost = () => {
    if (user?.name) {
      navigate("/editor");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="post">
      <div className="post_top">
        <Avatar src={data?.createdBy?.profileImage} className="post-avatar" />
        <div className="post_topInfo">
          <h3>{data?.createdBy?.name}</h3>
          {/* <p>{timestamp}</p> */}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: data?.htmlData }}
        className="post_bottom"
      ></div>
      <div className="post-options">
        <div onClick={likePost} className="post-option">
          <ThumbUpIcon />
          <p>Like {data?.like?.length > 0 ? data?.like?.length : ""}</p>
        </div>
        <div className="post-option">
          <ChatBubbleOutlineIcon />
          <p>Comment </p>
        </div>
        <div className="post-option">
          <NearMeIcon />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}
