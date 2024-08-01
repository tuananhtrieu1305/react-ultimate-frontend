import { useState } from "react";

const TodoNew = (props) => {
  const [inputValue, setInputValue] = useState("");

  const { AddNewData } = props;
  const handleOnChange = (name) => {
    setInputValue(name);
  };
  const handleClickAddBtn = () => {
    AddNewData(inputValue);
    setInputValue("");
  };
  return (
    <div className="search-bar">
      <input
        className="type-input"
        type="text"
        placeholder="Enter task"
        value={inputValue}
        onChange={(event) => handleOnChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleClickAddBtn();
          }
        }}
      />
      <button className="add-btn" onClick={handleClickAddBtn}>
        Add
      </button>
    </div>
  );
};

export default TodoNew;
