import style from "./TodoItem.module.css";
import { MdOutlineRemoveCircle } from "react-icons/md";
function TodoItem({ todoitem, deletetodo }) {
  return (
    <div className="container text-center">
      <div className={`row ${style.items}`}>
        <div className="col-6 text-start">{todoitem.name}</div>
        <div className="col-4">{todoitem.date}</div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger jb-button"
            onClick={deletetodo}
          >
            <MdOutlineRemoveCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
