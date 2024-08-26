"use client"
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { groupBy, sortBy } from "lodash";
import dayjs from "dayjs";
import CreateTodo from './createTodo'

interface Todo {
  id?: string;
  title: string;
  date: Date;
  status: string
}

interface DataListProps {
  id: string;
  title: string;
  status: "High" | "Medium" | "Low";
}


const TodoPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showTodoForm, setShowTodoForm] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null)
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchTodos = async () => {
      const todosCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCollection);
      const todoList = todoSnapshot.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
      });
      setTodos(todoList);
    };

    fetchTodos();
  }, [user, loading]);

  const handleLogout = async () => {
    // const { user } = useAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out.");
        // Optionally redirect to the login page or show a message
        window.location.href = "/login";
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  }

  const handleAddTodo = async (newTodo: Todo) => {

    const { title, status, date } = newTodo
    if (title.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title,
        status,
        date
      });
      setTodos([...todos, { id: docRef.id, title, status, date }]);
      setNewTodo(newTodo);
      setShowTodoForm(!showTodoForm)
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (newTodo: Todo) => {
    const id = activeTodo?.id
    try {
      await updateDoc(doc(db, "todos", id), newTodo);
      setActiveTodo(null)
      setShowTodoForm(!showTodoForm)
      setIsUpdating(false)
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...newTodo } : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const renderTodoItems = (formattedList: Todo[]) => {
    return formattedList.map((todo: Todo) => {
      return <div>
        <div>
          <div className="p-4 rounded-xl shadow-sm mb-4 flex items-center justify-between box-styling">
            <div>
              <p className="mb-2 text-lg font-light">{todo.title}</p>
              <span className="text-xs text-pink-500 bg-pink-100 px-2 py-1 rounded-md">
                {todo.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {/* <button onClick={() => handleUpdateTodo(todo.id, '')} className="text-pink-500 hover:text-pink-700"> */}
              <button onClick={() => {
                setShowTodoForm(!showTodoForm)
                setIsUpdating(true)
                setActiveTodo(todo)
              }} className="text-pink-500 hover:text-pink-700">
                <img src="/edit_icon.svg" alt="Edit" className="w-5 h-5" />
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="text-pink-500 hover:text-pink-700">
                <img src="/delete_icon.svg" alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    })
  }
  const renderTodoList = () => {
    const formattedList = groupBy(todos, (todo: Todo) => todo.date);
    return Object.keys(formattedList).map((key) => {
      return (<>
        <h3 className="text-pink-500 font-medium mb-2">{dayjs(key).format('dddd, D MMMM')}</h3>
        {renderTodoItems(formattedList[key])}
      </>
      )
    })
  }


  return (
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-6 relative w-full mx-3 md:w-1/2 lg:w-1/3 my-10 rounded-3xl box-styling">
        <div>
          <h1 className="text-3xl font-semibold mb-8 mt-8">To Do List</h1>
          {showTodoForm ? <CreateTodo activeTodo={activeTodo} onSubmit={isUpdating ? handleUpdateTodo : handleAddTodo} /> : <div>
            <h2 className="text-lg font-semibold mb-4 mt-4">This Week</h2>
            <div className="my-6">
              {renderTodoList()}
            </div>
          </div>
          }
        </div>
        <button
          onClick={() => setShowTodoForm(!showTodoForm)}
          className="bg-pink-500 text-white rounded-full p-4 shadow-lg absolute bottom-6 right-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <div className="absolute bottom-6 left-7 font-black">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

    </div>
  );
};

export default TodoPage;

