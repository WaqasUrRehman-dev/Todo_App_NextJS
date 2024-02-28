"use client";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export default function page() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")) || []);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input == "") return;
    setTodo((prev) => {
      let newTodos = [...prev, input];
      localStorage.setItem("todo", JSON.stringify(newTodos));
      return newTodos;
    });
    setInput("");
  };

  const deleteHandler = (index) => {
    setTodo((prev) => {
      let newTodos = prev.filter((_, i) => i !== index);
      localStorage.setItem("todo", JSON.stringify(newTodos));

      return newTodos;
    });
  };

  const editHandler = (index, newText) => {
    const newTodo = [...todo];
    newTodo[index] = newText;
    setTodo(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));

  };
  return (
    <main className="flex justify-center items-center flex-col gap-3">
      <div className="flex flex-col items-center justify-center mt-10">
        <label
          htmlFor="todo"
          className="text-center text-green-700 font-bold text-3xl"
        >
          {" "}
          Todo App
        </label>
        <div className="flex gap-1 justify-center items-center text-center mt-4">
          <input
            type="text"
            name="text"
            placeholder="enter your task here"
            className="w-2/3 p-2 border border-black rounded-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="border text-center px-5 p-2 text-lg rounded-md text-white bg-blue-500"
            onClick={handleSubmit}
          >
            +
          </button>
        </div>
      </div>
      <div className="flext flex-col justify-center items-center w-2/3">
        {todo.map((item, index) => (
          <Item
            key={item}
            txt={item}
            onDelete={() => deleteHandler(index)}
            onEdit={(newText) => editHandler(index, newText)}
          />
        ))}
      </div>
    </main>
  );
}
const Item = ({ txt, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(txt);
  

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(editText);
    setEditing(false);
  };
  return (
    <div className="border m-2 flex p-2 items-center justify-between">
      {editing ? (
        <>
          <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border border-gray-400 p-1 rounded-md"
        />
        <MdClose className="text-xl text-red-600" onClick={()=> setEditing(false)} />
        </>
      ) : (
        <p>{txt}</p>
      )}
      <div>
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 m-1 p-2 text-white rounded-md"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-yellow-500 m-1 p-2 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-600 m-1 p-2 text-white rounded-md"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
