import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const logoutHandler = async (e) => {
  
    //first thing is server link, second one is data and third one is headers
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${server}/users/logout`,
       
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false)
    } catch (err) {
      toast.error(err.response.data.message);
      setIsAuthenticated(true);
      setLoading(false)
    }
  };


  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
