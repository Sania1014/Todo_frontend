import React from "react";

const TodoItem = ({ title, description, isCompleted, id, updateHandler, deleteHandler }) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div>
        <input onChange={()=>{updateHandler(id)}}checked={isCompleted} type="checkbox" name="" id="" />
        <button onClick={()=>{deleteHandler(id)}}className="btn" type="">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
