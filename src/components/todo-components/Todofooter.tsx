type Filter = 'all' | 'active' | 'completed'

type TodofooterProps = {
  leftCount: number
  filter: Filter
  onFilterChange: (f: Filter) => void
  onClearCompleted: () => void
}

const filterBtnStyle = {
  border: '1px solid transparent',
  background: 'none',
  fontFamily: 'inherit',
  fontSize: 17,
  color: '#888',
  padding: '4px 16px',
  margin: '0 2px',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'color 0.2s, background 0.2s, border 0.2s',
}

export default function Todofooter(props: TodofooterProps) {
  return (
    <footer style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 200, fontSize: 18, borderTop: '1px solid #ededed', padding: '16px 32px', borderRadius: 15 }}>
      <span style={{ color: '#888', fontSize: 16 }}>{props.leftCount} items left</span>
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          style={{
            ...filterBtnStyle,
            border: props.filter === 'all' ? '1px solid #e6bfbf' : '1px solid transparent',
            background: props.filter === 'all' ? '#fafafa' : 'none',
            color: props.filter === 'all' ? '#b99' : '#888',
          }}
          onClick={() => props.onFilterChange('all')}
        >All</button>
        <button
          style={{
            ...filterBtnStyle,
            border: props.filter === 'active' ? '1px solid #e6bfbf' : '1px solid transparent',
            background: props.filter === 'active' ? '#fafafa' : 'none',
            color: props.filter === 'active' ? '#b99' : '#888',
          }}
          onClick={() => props.onFilterChange('active')}
        >Active</button>
        <button
          style={{
            ...filterBtnStyle,
            border: props.filter === 'completed' ? '1px solid #e6bfbf' : '1px solid transparent',
            background: props.filter === 'completed' ? '#fafafa' : 'none',
            color: props.filter === 'completed' ? '#b99' : '#888',
          }}
          onClick={() => props.onFilterChange('completed')}
        >Completed</button>
      </div>
      <button onClick={props.onClearCompleted} style={{ ...filterBtnStyle, color: '#b99', fontWeight: 200 }}>Clear completed</button>
    </footer>
  )
}
