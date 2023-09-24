import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import MessageSender from "../MessageSender/MessageSender";

import "./Feed.css";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const cookies = new Cookies();
  useEffect(() => {
   const token = cookies.get("token");
   console.log(token);
   if (!token) {
     return;
   }
   const fetchUserProfile = async () => {
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_API_URL}/blog/all`,
         {
           headers: { Authorization: `${token}` },
         }
       );
       setLoading(false);
       console.log(response.data);
       setFeaturedBlog(response.data.data);
     } catch (error) {
       console.log(error);
     }
   };

   fetchUserProfile();
 }, []);

  return (
    <div className="feed">
      <MessageSender />
      {featuredBlog.map((data, index) => {
        return (
          <Post
            key={index}
            data= {data}
          /> 
        )
      })}
    </div>
  );
}
