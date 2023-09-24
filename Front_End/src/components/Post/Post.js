import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import { GetType } from "../../utilities/context/authContext";
import axios from "axios";
import Cookies from "universal-cookie";
import { RWebShare } from "react-web-share";
import TimeAgo from "timeago-react";
import { toast } from "react-toastify";
export default function Post({ data }) {
  const user = GetType();
  const cookies = new Cookies();
  const [like, setLike] = useState(false);
  const likePost = async () => {
    const likePost = {
      like: data.like?.includes(user._id),
    };
    const token = cookies.get("token");
    console.log(token);
    if (!token) {
      return;
    }
    const config = {
      headers: {
        Authorization: token,
      },
    };
    // Make the API request to upload the image
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/likeMyBlog/${data._id}`,
        likePost,
        config
      )
      .then((response) => {
        // Handle the response after successful upload
        console.log(response.data);
        setLike(!data.like?.includes(user._id));
      })
      .catch((error) => {
        // Handle any errors during the upload
        toast.error("Already liked");
        console.error(error);
      });
  };
  return (
    <div className="post">
      <div className="post_top">
        <Avatar src={data?.createdBy?.profileImage} className="post-avatar" />
        <div className="post_topInfo">
          <h3>{data?.createdBy?.name}</h3>
          <p>
            <TimeAgo datetime={data.created_date} locale="en" />
          </p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: data?.htmlData }}
        className="post_bottom"
      ></div>
      <div className="post-options">
        <div onClick={likePost} className="post-option">
          <ThumbUpIcon
            style={
              data.like?.includes(user._id) || like ? { color: "blue" } : {}
            }
          />
          <p>Like {data?.like?.length > 0 ? data?.like?.length : ""}</p>
        </div>
        <div className="post-option">
          <ChatBubbleOutlineIcon />
          <p>Comment </p>
        </div>
        <div className="post-option">
          <RWebShare
            data={{
              text: "SocialDashboard",
              url: `http://localhost:3000/post/${data._id}`,
              title: "Social",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <>
              <NearMeIcon />
              <button>Share</button>
            </>
          </RWebShare>
        </div>
      </div>
    </div>
  );
}
