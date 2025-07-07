import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput(props: TodoInputProps) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      props.onAdd(value.trim());
      setValue('');
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '0 31px', minHeight: 64, background: '#ff11ff08', border: '1px solid #ededed', borderRadius: 8, boxShadow: '0 1px 1px rgba(0,0,0,0.03)', marginBottom: 0,
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        border: '2px solid #ededed',
        borderRadius: '50%',
        marginRight: 24,
        boxSizing: 'border-box',
        flexShrink: 0,
        background: '#fff',
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="16" y1="9" x2="16" y2="23" stroke="#ededed" strokeWidth="3" strokeLinecap="round" />
          <line x1="9" y1="16" x2="23" y2="16" stroke="#ededed" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Добавить задачу"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 32,
          fontWeight: 200,
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          color: '#e6bfbf',
          padding: 0,
        }}
        className="todo-input-custom-placeholder"
      />
      <style>{`
        .todo-input-custom-placeholder::placeholder {
          color: rgb(230, 191, 191);
          opacity: 1;
          font-size: 32px;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: 200;
        }
      `}</style>
    </div>
  );
}