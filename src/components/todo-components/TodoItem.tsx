import type { Todo } from "../../types/td"

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  removing?: boolean
  direction?: 'left' | 'right'
}

export default function TodoItem(props: TodoItemProps) {
  const removeTransform = props.removing
    ? props.direction === 'left'
      ? 'translateX(-40px)'
      : 'translateX(40px)'
    : 'none';

  return (
    <li style={{
      display: 'flex', alignItems: 'center', padding: '0 32px', minHeight: 64, borderBottom: '1px solid #ededed', background: '#fff', fontSize: 32, fontWeight: 200, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', boxShadow: '0 1px 1px rgba(0,0,0,0.03)', transition: 'background 0.2s, opacity 0.3s, transform 0.3s', opacity: props.removing ? 0 : 1, transform: removeTransform,
    }}>
      <span
        onClick={() => props.onToggle(props.todo.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          border: '2px solid #ededed',
          borderRadius: '50%',
          marginRight: 24,
          cursor: 'pointer',
          background: props.todo.completed ? '#f8f8f8' : '#fff',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s, background 0.2s',
          position: 'relative',
        }}
      >
        {props.todo.completed && (
          <svg width="39" height="39" viewBox="0 0 40 40">
            <polyline points="12,22 20,30 30,12" fill="none" stroke="#6cc06c" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span
        style={{
          textDecoration: props.todo.completed ? 'line-through' : 'none',
          color: props.todo.completed ? '#b3b3b3' : '#222',
          opacity: props.todo.completed ? 0.4 : 1,
          fontWeight: 200,
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          transition: 'color 0.2s, opacity 0.2s',
        }}
      >
        {props.todo.text}
      </span>
    </li>
  )
}