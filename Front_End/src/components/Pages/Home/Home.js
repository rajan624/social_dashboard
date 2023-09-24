import React, { useState } from "react";
import Header from "../../Header/Header";
import "./tempHome.css"
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const Home = () => {
  return (
    <>
      <Header />
      <Box className={"outLet"}>
        <Outlet />
      </Box>
    </>
  );
};

export default Home;




















{
        /* <Box
        sx={{
          paddingBottom: "15vw",
        }}
      >
        <Fade top>
          <Slider {...settings}>
            <div className={homeClasses.imageDiv}>
              <Intro heading={"Welcome to EPO"} />
              <img className={homeClasses.imgs} src={img1} alt="epo=intro" />
            </div>
            <div className={homeClasses.imageDiv}>
              <Intro heading={"Welcome to EPO"} />
              <img className={homeClasses.imgs} src={img2} alt="epo=intro" />
            </div>
            <div className={homeClasses.imageDiv}>
              <Intro heading={"Welcome to EPO"} />
              <img className={homeClasses.imgs} src={img3} alt="epo=intro" />
            </div>
            <div className={homeClasses.imageDiv}>
              <Intro heading={"Welcome to EPO"} />
              <img className={homeClasses.imgs} src={img4} alt="epo=intro" />
            </div>
          </Slider>
        </Fade>
      </Box>
      <Footer></Footer> */
      }