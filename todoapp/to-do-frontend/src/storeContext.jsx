import { createContext ,useReducer} from "react";
import { useEffect } from "react";

export let todoContext = createContext();


const todoitemsReducer = (todolist, action) => {
let newtodoitems = todolist;
if (action.type === "NEW_ITEM") {
  newtodoitems = [...todolist, action.payload];
  return newtodoitems;
} else if (action.type === "CUT_ITEM") {
  newtodoitems = todolist.filter((i, j) => j !== action.payload);
  return newtodoitems;
}
};
const Todoitemprovider = ({children}) => {
   let [todolist, dispatchtodolist] = useReducer(todoitemsReducer, JSON.parse(localStorage.getItem('todolist') ) ||[]); 


  useEffect(() => {
    localStorage.setItem('todolist',JSON.stringify(todolist) )
  },[todolist] )
  
  let addnewItem = (event) => {
    const newItem = {
      type: "NEW_ITEM",
      payload: event,
    };
    dispatchtodolist(newItem);

  };
  let deleteItem = (todelete) => {
    const removeitem = {
      type: "CUT_ITEM",
      payload: todelete,
    };
    dispatchtodolist(removeitem);
  }


    return (

 <todoContext.Provider value={{todolist,addnewItem,deleteItem}}>
 {children}
 </todoContext.Provider>
  );
 }
 export default Todoitemprovider       