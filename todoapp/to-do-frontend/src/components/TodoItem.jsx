import { MdOutlineRemoveCircle } from "react-icons/md";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

function TodoItem({ todoitem, deletetodo, toggleCompleted }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div
        className={`flex gap-4 items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 ${
          todoitem.completed
            ? "bg-gray-100 border-gray-400"
            : "bg-white border-blue-500"
        }`}
      >
        <button
          onClick={() => toggleCompleted(todoitem._id)}
          className="flex-shrink-0 text-2xl transition-colors"
          style={{
            color: todoitem.completed ? "#10b981" : "#d1d5db",
          }}
        >
          {todoitem.completed ? <FaCheckCircle /> : <FaCircle />}
        </button>

        <div className="flex-1 text-left">
          <p
            className={`text-lg font-medium ${
              todoitem.completed
                ? "text-gray-500 line-through"
                : "text-gray-800"
            }`}
          >
            {todoitem.name}
          </p>
        </div>

        <div
          className={`font-medium ${
            todoitem.completed ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {new Date(todoitem.date).toLocaleDateString()}
        </div>

        <button
          type="button"
          onClick={deletetodo}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1"
        >
          <MdOutlineRemoveCircle size={20} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
