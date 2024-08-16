import Link from "next/link";
import { list } from "postcss";
import { useDispatch } from "react-redux";


export default function TodoList({ Todos }) {
  console.log(Todos);

  return (
    <ul>
      {Todos.map((todo, index) => (
        <li key={todo.id || index}>
          <p>{todo.title}</p> {/* Assuming you want to display the title */}
          {/* Uncomment the below Link if you want to navigate to individual todo items */}
          {/* <Link href={`/todos/${todo.id}`} key={index}> {todo.title}</Link> */}
        </li>
      ))}
    </ul>
  );
}

{
  /* <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: index })}>Toggle</button>
                    <button onClick={() => dispatch({ type: "DELETE_TODO", payload: index })}>Delete</button> */
}
