const Todos = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Complete project", completed: true },
    { id: 3, title: "Learn React", completed: false }
];

export const getTodos = () => Todos

export const getTodoById = (id) => Todos.find((Todo) => Todo.id === parseInt(id, 10))

export const addTodo = (todo) => {
    const newTodo = {...todo, id: todo.length + 1}
 
    Todos.push(newTodo)
    // return newTodo;
}

export const updateTodoById = (id, data) => {
    const todoIndex = Todos.findIndex((todo) => todo.id === parseInt(id, 10))
    if(todoIndex!== -1){
        Todos[todoIndex] = {...Todos[todoIndex],...data}
        return Todos[todoIndex]
    }
    return null;
}

export const deleteTodoById = (id) => {
    const todoIndex = Todos.findIndex((todo) => todo.id === parseInt(id, 10))
    if(todoIndex!== -1){
        const deletedTodo = Todos.splice(todoIndex, 1)
        return deletedTodo [0]
    }
    return null;
}