
import { useState, useContext } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { todoContext } from "../storeContext";

 import { addItemToServer } from "../services/itemService";
function Addtodo() {
  let { todolist, addnewItem } = useContext(todoContext);
  let [name, setname] = useState("");
  let [date, setdate] = useState("");

  let buttonclick = async(event) => {
    event.preventDefault();

    let newOne = { name: name, date: date };
    const serverItem = await addItemToServer(name,date)
    console.log('serveritem:', serverItem);
    addnewItem(serverItem);

    setname("");
    setdate("");
  };

  // let storedata = () => {
  //   let newdata = JSON.stringify(todolist);
  //   localStorage.JSON("todolist", newdata);
  // };

  return (
    <form onSubmit={buttonclick} className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex gap-4 flex-col sm:flex-row items-center">
        <input
          value={name}
          type="text"
          placeholder="Enter todo here"
          onChange={(event) => setname(event.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <input
          value={date}
          type="date"
          onChange={(event) => setdate(event.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={name === "" || date === ""}
          className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RiAddCircleFill size={20} />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
}

export default Addtodo;
