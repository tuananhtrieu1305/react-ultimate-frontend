import LostImage from "../../assets/react.svg";
import { useState } from "react";
import "./todo.css";
import TodoList from "./TodoList";
import TodoNew from "./TodoNew";

const TodoApp = () => {
  const [data, setData] = useState([
    // { id: 1, task: "Watching YT" },
    // { id: 2, task: "Learning English" },
  ]);

  const randomNumb = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const AddNewData = (name) => {
    const newData = {
      id: randomNumb(3, 200),
      task: name,
    };
    setData([...data, newData]);
  };

  const handleDeleteData = (id) => {
    const todoList = data.filter((item) => item.id !== id);
    setData(todoList);
  };
  const handleClickDeleteAll = () => {
    setData([]);
  };
  return (
    <div className="wrapper">
      <h1 className="heading">Todo List</h1>
      <TodoNew AddNewData={AddNewData} />
      {data.length > 0 ? (
        <TodoList
          data={data}
          handleDeleteData={handleDeleteData}
          handleClickDeleteAll={handleClickDeleteAll}
        />
      ) : (
        <figure>
          <img src={LostImage} alt="" />
        </figure>
      )}
    </div>
  );
};

export default TodoApp;
