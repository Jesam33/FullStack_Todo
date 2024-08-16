
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, getTodoData } from "@/store/todosSlice";
import { useEffect } from "react";
import wrapper from "@/store/store";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";


 const Home = () => {
  const dispatch = useDispatch();
  const { Todos, status, error } = useSelector(getTodoData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div className="items-center w-100 justify-center bg-blue-400 h-screen">
      <div className="justify-center bg-red-600- m-auto">
      <h1>Todos</h1>
      {status === "loading" && <p>Loading.....</p>}
      {status === "failed" && <p> Error: {error}</p>}
      {status === "succeeded" && Todos.length > 0 && <TodoList Todos={Todos} />}
      {status === "succeeded" && Todos.length > 0 && <p>No Todos found</p>}
      </div>
     

      {/* <h1> Create Todos</h1> */}
      <TodoForm />
    </div>
  );
}

export  const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTodos());
    return { 
      props: {} 
    };
  }
);


export default Home;