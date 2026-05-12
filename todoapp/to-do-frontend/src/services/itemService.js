export const addItemToServer = async (name, date) => {
  const response = await fetch("http://localhost:2000/api/todo/item", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ name, date }),
  });

  return response.json();
};

export const getTodoItems = async () => {
  const response = await fetch("http://localhost:2000/api/todo/items");

  return response.json();
};

export const deletetodoItem = async (id) => {
  const response = await fetch(`http://localhost:2000/api/todo/${id}`, {
    method: "DELETE",
  });

  return response.json();
};

export const markItemCompleted = async (id) => {
  const response = await fetch(
    `http://localhost:2000/api/todo/${id}/completed`,
    {
      method: "PUT",
    },
  );
  return response.json();
};
