import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState("");
  const { isAuthenticated} = useContext(Context);

  if(!isAuthenticated) return <Navigate to='/login'/>

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((previous) => !previous);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((previous) => !previous);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //first thing is server link, second one is data and third one is headers
    try {
      setLoading1(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading1(false);
      setTitle("");
      setDescription("");
      setRefresh((previous) => !previous); //jo b pahly value h uska reverse
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
      setLoading1(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => toast.error(e.response.data.message));
  }, [refresh]);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              type="text"
              placeholder="Description"
              required
            />

            <button disabled={loading1} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            id={i._id}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          ></TodoItem>
        ))}
      </section>
    </div>
  );
};

export default Home;
