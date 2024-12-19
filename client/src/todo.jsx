export default function Todo(props) {
    const { todo, setTodos } = props;

    const updateTodo = async (TodoId, TodoStatus) => {
        const res = await fetch(`/api/todos/${TodoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: TodoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === TodoId) {
                        return { ...currentTodo, status: !currentTodo.status }
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (TodoId) => {
        const res = await fetch(`/api/todos/${TodoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.filter((currentTodo) => currentTodo._id !== TodoId)
            })
        }
    }

    return (
        <div className="todo">
            <p>{todo.todo}</p>
            <div className="mutations">
                <button className="todo__status"
                    onClick={() => updateTodo(todo._id, todo.status)}>
                    {todo.status ? "☑" : "☐"}
                </button>
                <button className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}>
                    🗑️
                </button>
            </div>
        </div>
    )
};