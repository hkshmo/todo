import type { Todo } from "../../types/td"
import TodoItem from "./TodoItem"
import { useState } from "react"

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  filter: 'all' | 'active' | 'completed'
}

export default function TodoList(props: TodoListProps) {
  const [removing, setRemoving] = useState<string | null>(null)

  function handleToggle(id: string) {
    if (props.filter === 'active' || props.filter === 'completed') {
      setRemoving(id)
      setTimeout(() => {
        setRemoving(null)
        props.onToggle(id)
      }, 300)
    } else {
      props.onToggle(id)
    }
  }

  return (
    <ul style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggle(todo.id)}
          removing={removing === todo.id}
          direction={props.filter === 'completed' ? 'left' : props.filter === 'active' ? 'right' : undefined}
        />
      ))}
    </ul>
  )
}