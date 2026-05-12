import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { deletetodoItem, getTodoItems, markItemCompleted } from "./services/itemService";

export let todoContext = createContext();

const todoitemsReducer = (todolist, action) => {
  let newtodoitems = todolist;
  if (action.type === "NEW_ITEM") {
    newtodoitems = [...todolist, action.payload];
    return newtodoitems;
  } else if (action.type === "CUT_ITEM") {
    newtodoitems = todolist.filter((i, j) => i._id !== action.payload);
    return newtodoitems;
  } else if (action.type === "LOAD_ITEMS") {
    return action.payload;
  } else if (action.type === "TOGGLE_COMPLETED") {
    newtodoitems = todolist.map((item) =>
      item._id === action.payload
        ? { ...item, completed: !item.completed }
        : item
    );
    return newtodoitems;
  }
};

const Todoitemprovider = ({ children }) => {
  let [todolist, dispatchtodolist] = useReducer(todoitemsReducer, []);

  useEffect(() => {
    const loaditems = getTodoItems().then((list) => {
      dispatchtodolist({ type: "LOAD_ITEMS", payload: list });
    });
  }, []);

  let addnewItem = (event) => {
    const newItem = {
      type: "NEW_ITEM",
      payload: event,
    };
    dispatchtodolist(newItem);
  };

  let deleteItem = async (todelete) => {
    const deletedId = await deletetodoItem(todelete);

    const removeitem = {
      type: "CUT_ITEM",
      payload: todelete,
    };
    dispatchtodolist(removeitem);
  };

  let toggleCompleted = async (itemId) => {
    await markItemCompleted(itemId);
    dispatchtodolist({
      type: "TOGGLE_COMPLETED",
      payload: itemId,
    });
  };

  return (
    <todoContext.Provider value={{ todolist, addnewItem, deleteItem, toggleCompleted }}>
      {children}
    </todoContext.Provider>
  );
};

export default Todoitemprovider;