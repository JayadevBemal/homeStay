import style from "./Addtodo.module.css";
import { useState, useContext } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { todoContext } from "./storeContext";
function Addtodo() {

  let {todolist,addnewItem} = useContext(todoContext)
  let [name, setname] = useState("");
  let [date, setdate] = useState("");

  let buttonclick = (event) => {
    event.preventDefault();

    let newOne = { name: name, date: date };
    addnewItem(newOne);

    setname("");
    setdate("");
  };

  let storedata = () => {
    let newdata = JSON.stringify(todolist)
    localStorage.JSON('todolist',newdata)
  }

  return (
    <form className="container text-center " onSubmit={buttonclick}>
      <div className={`row align-items-center g-3 ${style.todoBox}`}>
        <div className="col-5">
          <input
            value={name}
            className={style.addTodo}
            type="text"
            placeholder="Enter todo here"
            onChange={(event) => setname(event.target.value)}
          />
        </div>
        <div className="col-5">
          <input
            value={date}
            className={style.addTodo}
            type="date"
            onChange={(event) => setdate(event.target.value)}
          />
        </div>
        <div className="col-2 jb-button">
          <button
            type="submit"
      
            className="btn btn-success jb-button w-100 "
            disabled={name === "" || date === ""}
          >
            <RiAddCircleFill />
          </button>
        </div>
      </div>
    </form>
  );
}

export default Addtodo;
