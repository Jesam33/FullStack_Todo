import { Inter } from "next/font/google";
import Todo from "@/components/Todo";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import {
  deleteTodo,
  editTodo,
  getTodo,
  todos,
} from "@/lib/features/crudOperations";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import StartToastifyInstance from "toastify-js";

const inter = Inter({ subsets: ["latin"] });

interface TodoItem {
  todo: string;
  _id: string;
  // Add other properties as needed
}

export const getServerSideProps: GetServerSideProps<{ todoItems: TodoItem[] }> =
  wrapper.getServerSideProps((store: any) => async () => {
    try {
      // Dispatch action to fetch todos
      await store.dispatch(getTodo());

      // Access the Redux state directly
      const state: any = store.getState();
      const todoItems = state.crudTodo.todoItems;
      return { props: { todoItems: todoItems as TodoItem[] } };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { props: { todoItems: [] } }; // Or handle error differently
    }
  });

export default function Home({
  todoItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch: any = useDispatch();
  const { todoItems: clientTodoItems, status, error } = useSelector(todos);

  // Optionally use useEffect to update client-side state if needed
  useEffect(() => {
    if (status === "idle" && todoItems.length === 0) {
      dispatch(getTodo());
    }
  }, [status, dispatch, todoItems]);

  // Use server-side fetched items if client-side items are not available
  const itemsToDisplay =
    clientTodoItems.length > 0 ? clientTodoItems : todoItems;
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editId, setEditId] = useState("");

  function handleEdit(e: ChangeEvent<HTMLButtonElement>): void {
    const id = e.target.closest("li")?.id;
    if (id) {
      setEditId(id);
      setModalOpen(true);
    }
  }

  function handleEditValue(value: string) {
    setEditedValue(value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(editTodo({ editedValue, editId })).then((result: any) => {
      if (editTodo.fulfilled.match(result)) {
        showToast("Todo edited successfully");
      } else if (editTodo.rejected.match(result)) {
        showErrorToast(result.payload || "Failed to edit todo");
      }
      setModalOpen(false);
    });
  }

  function handleDelete(e: ChangeEvent<HTMLButtonElement>) {
    const id = e.target.closest("li")?.id;
    if (id) {
      dispatch(deleteTodo(id)).then((result: any) => {
        if (deleteTodo.fulfilled.match(result)) {
          showToast("Todo deleted successfully");
        } else if (deleteTodo.rejected.match(result)) {
          showErrorToast(result.payload || "Failed to delete todo");
        }
      });
    }
  }

  function showToast(toastMessage: string) {
    StartToastifyInstance({
      text: toastMessage,
      className:
        "fixed z-20 p-4 top-5 right-5 flex gap-3 text-white bg-green-500",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
    }).showToast();
  }

  function showErrorToast(toastMessage: string) {
    StartToastifyInstance({
      text: toastMessage,
      className:
        "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white bg-todo-red",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
    }).showToast();
  }

  return (
    <div className={`${inter.className} p-0 md:p-10 pt-10 lg:pt-36 md:pt-10 min-[400px]:pt-20`}>
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm   w-full h-screen z-50 flex items-center justify-center">
          <form
            className="flex flex-col gap-5 w-[600px] bg-white p-5 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div
              className="border border-secondary cursor-pointer rounded-full p-2 w-fit text-primary"
              onClick={() => setModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <input
              name="to-do"
              id="to-do"
              className="text-black bg-gray-300 px-3 py-2 focus:border focus:border-secondary focus:outline-none rounded-md"
              onInput={(e) => setEditedValue(e.currentTarget.value)}
              value={editedValue}
            />
            <button className="rounded-md bg-gray-500 text-white px-3 py-2 uppercase">
              Edit
            </button>
          </form>
        </div>
      )}
      <h1 className="text-3xl mb-3">Your Todos</h1>
      <div className=" rounded-md bg-slate-900 w-full p-5">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {itemsToDisplay
            ?.slice(0)
            .reverse()
            .map((todo: TodoItem) => (
              <Todo
                key={todo._id}
                todo={todo.todo}
                id={todo._id}
                handleEdit={(e: ChangeEvent<HTMLButtonElement>) => {
                  handleEdit(e);
                  handleEditValue(todo.todo);
                }}
                handleDelete={(e: ChangeEvent<HTMLButtonElement>) => {
                  handleDelete(e);
                }}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
