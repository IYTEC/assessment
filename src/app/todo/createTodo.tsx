import React, { useEffect, useState } from 'react';

interface Todo {
  id?: string;
  title: string;
  date: string;
  status: 'High' | 'Medium' | 'Low';
}

interface TodoFormProps {
  onSubmit: (data: Todo) => void
  activeTodo: Todo
}


const TodoForm: React.FC<TodoFormProps> = ({ activeTodo = null, onSubmit = () => { } }) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [status, setStatus] = useState<'High' | 'Medium' | 'Low'>('High');

  useEffect(() => {
    if (activeTodo) {
      setTitle(activeTodo.title)
      setDate(activeTodo.date)
      setStatus(activeTodo.status)
    }
  }, [activeTodo])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = { title, date, status };
    await onSubmit(newTodo)
  };

  return (
    <div className="">
      <div className="bg-white w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">{activeTodo ? 'Update To-do' : 'Add To-Do Item'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'High' | 'Medium' | 'Low')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              // type="submit"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              {activeTodo ? 'Updating  Todo' : 'Add To-Do'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
