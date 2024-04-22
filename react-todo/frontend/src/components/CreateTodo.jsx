import { useState } from 'react';

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Todo added successfully!");
        setTitle("");
        setDescription("");
      } else {
        throw new Error(data.msg || "Failed to add todo");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        id="title"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      /><br />
      <input
        id="desc"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      /><br />
      <button
        style={{ padding: 10, margin: 10 }}
        onClick={handleSubmit}
      >
        Add a todo
      </button>
    </div>
  );
}
