import { getTodos } from "@/data/Todos";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const todos = getTodos();
      res.status(200).json(todos);
      break;

    case "POST":
      try {
        const newTodo = JSON.parse(req.body);
        const todos = getTodos();

        if (!newTodo || !newTodo.text) {
          // Check if newTodo is valid
          res.status(400).json({ error: "Invalid data" });
          return;
        }

        const updatedTodos = todos.concat(newTodo);
        updatedTodos(updatedTodos);

        res.status(201).json(newTodo);
      } catch (error) {
        // Handle JSON parsing errors or other issues
        res.status(400).json({ error: "Invalid data" });
      }
      break;
      default: 
      res.setHeader('Allow',[ 'GET', 'POST' ]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
