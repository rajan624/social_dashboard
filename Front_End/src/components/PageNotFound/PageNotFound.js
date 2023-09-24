import React from "react";
import "./PageNotFound.css"
const PageNotFound = () => {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
                      <div style={{
                              textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "26px",
                          textAlign: "center",}} className="col - sm - 10 col- sm - offset - 1  text-center">
                <h1 style={{fontSize:"5.5rem"}} class="text-center1">404</h1>
              <div class="four_zero_four_bg">
              </div>

              <div class="contant_box_404">
                <h3 style={{fontSize: "4.5rem"}} class="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <a href="/" class="link_404">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
