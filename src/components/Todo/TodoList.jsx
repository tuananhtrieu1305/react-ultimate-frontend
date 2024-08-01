const TodoList = (props) => {
  const { data, handleDeleteData, handleClickDeleteAll } = props;

  const handleClickDeleteBtn = (id) => {
    handleDeleteData(id);
  };

  return (
    <>
      <div className="task-list">
        {data.map((item) => {
          return (
            <div className="task-item" key={item.id}>
              <p className="task-name">{item.task}</p>
              <div className="icons">
                <div
                  className="delete-icon icon"
                  onClick={() => handleClickDeleteBtn(item.id)}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </div>
                <div className="update-icon icon">
                  <ion-icon name="clipboard-outline"></ion-icon>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="delete-btn" onClick={handleClickDeleteAll}>
        Delete all
      </button>
    </>
  );
};

export default TodoList;
