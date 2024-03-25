import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, isAuthenticated, loading } = useContext(Context);

  console.log(user);

  return (
    loading? <Loader/>: <div>
     
    {/* agr user h to user name or email */}
     <h1>{user?.name}</h1>   
     <p>{user?.email}</p>
   </div> 
   
  );
};

export default Profile;
