import './App.css'
import TodoMainComponent from './components/TodoMainComponent'

export default function App() {

  return (
    <>
      <h1 style={{
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 200,
        fontSize: '5rem',
        color: '#e6bfbf',
        textAlign: 'center',
        margin: '32px 0 16px 0',
        letterSpacing: 2,
        opacity: 0.3,
      }}>todos</h1>
      <TodoMainComponent />
    </>
  )
}
