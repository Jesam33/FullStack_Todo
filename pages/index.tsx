import { Inter } from "next/font/google";
import { useState, FormEvent, ChangeEvent } from "react";
import Toastify from "toastify-js";
import { useDispatch } from "react-redux";
import { createTodo } from "@/lib/features/crudOperations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispach: any = useDispatch();
  const [todo, setTodo] = useState("");

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (todo == "") {
      showErrorToast("You can't have any empty todo");
      return;
    }
    dispach(createTodo(todo));
    showToast("Todo added successfully");
    setTodo("");
  }

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setTodo(e.target.value);
  }

  function showErrorToast(toastMessage: string): void {
    Toastify({
      text: toastMessage,
      className:
        "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white bg-red-500",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
    }).showToast();
  }

  function showToast(toastMessage: string): void {
    Toastify({
      text: toastMessage,
      className:
        "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white bg-green-500",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
    }).showToast();
  }

  return (
    <div className={`${inter.className} p-0 md:p-10 pt-16 lg:pt-36 bg-red-300 md:pt-10 min-[400px]:pt-20`}>
      {/* <h1 className="text-3xl mb-3">Add Todo</h1> */}
      <div className=" rounded-md flex items-center justify-center p-5">
        <form
          className="flex flex-col gap-8 w-full md:w-[600px] mt-0"
          onSubmit={handleSubmit}
        >
          <textarea
            name="todo"
            id="todo"
            className="bg-gray-200 w-full rounded-md h-[120px] text-black p-2"
            onChange={handleInputChange}
            value={todo}
          />
          <input
            type="submit"
            value="Create Todo"
            className="uppercase bg-slate-900 p-2 md:p-5 font-[500] text-[12px] rounded-md text-white cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}
