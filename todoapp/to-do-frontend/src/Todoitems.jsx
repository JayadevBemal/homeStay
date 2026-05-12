import { useContext } from "react";
import TodoItem from "./TodoItem";
import { todoContext } from "./storeContext";

const Todoitems = () => {
  const { todolist,deleteItem } = useContext(todoContext);  

  return (
    <div>
      {todolist.map((item, index) => (
        <TodoItem
          key={index}
          todoitem={item}
          deletetodo={() => deleteItem(index)}
        ></TodoItem>
      ))}
    </div>
  );
};

export default Todoitems;
