import { useContext } from "react";
import TodoItem from "../components/TodoItem";
import { todoContext } from "../storeContext";

const Todoitems = () => {
  const { todolist, deleteItem, toggleCompleted } = useContext(todoContext);

  const activeTodos = todolist.filter((item) => !item.completed);
  const completedTodos = todolist.filter((item) => item.completed);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Active Todos Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📋 Active Tasks
          {activeTodos.length > 0 && (
            <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
              {activeTodos.length}
            </span>
          )}
        </h2>
        {activeTodos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              ✨ All tasks completed! Great job!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeTodos.map((item, index) => (
              <TodoItem
                key={index}
                todoitem={item}
                deletetodo={() => deleteItem(item._id)}
                toggleCompleted={toggleCompleted}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed Todos Section */}
      {completedTodos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            ✅ Completed
            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
              {completedTodos.length}
            </span>
          </h2>
          <div className="space-y-3">
            {completedTodos.map((item, index) => (
              <TodoItem
                key={index}
                todoitem={item}
                deletetodo={() => deleteItem(item._id)}
                toggleCompleted={toggleCompleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todoitems;
