import React, { useState } from "react";
import RecentCard from "../../Card/RecentCard";
import { GetType } from "../../../utilities/context/authContext";
import CommanLoadingScreen from "../../LoadingScreen/CommanLoadingScreen";

function HomePage() {
  const user = GetType();
  const [loading, setLoading] = useState(true);
  return (
    <main>
            <CommanLoadingScreen open={loading} />
            <RecentCard  setLoading={setLoading} />
        </main>
  );
}

export default HomePage;
