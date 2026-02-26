'use client';

import { useState } from 'react';
import { type Todo, type Priority } from '@/lib/utils';

const PRIORITY_LABELS: Record<Priority, { label: string; emoji: string }> = {
  high:   { label: 'High',   emoji: '🔴' },
  medium: { label: 'Medium', emoji: '🟡' },
  low:    { label: 'Low',    emoji: '🟢' },
};

const INIT_TODOS: Todo[] = [
  { id: 1, text: 'Review project documentation', priority: 'high',   done: false },
  { id: 2, text: 'Complete UI design sprint',     priority: 'medium', done: true  },
  { id: 3, text: 'Fix homepage animation bug',    priority: 'low',    done: false },
];

export default function TodoPage() {
  const [todos, setTodos]     = useState<Todo[]>(INIT_TODOS);
  const [text, setText]       = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [filter, setFilter]   = useState<Priority | 'all'>('all');

  const add = () => {
    if (!text.trim()) return;
    setTodos(prev => [{ id: Date.now(), text: text.trim(), priority, done: false }, ...prev]);
    setText('');
  };

  const toggle = (id: number) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const del = (id: number) =>
    setTodos(prev => prev.filter(t => t.id !== id));

  const filtered = filter === 'all' ? todos : todos.filter(t => t.priority === filter);

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'rgba(168,85,247,.05)',
    border: '1px solid var(--glass-b)',
    borderRadius: 'var(--radius)',
    padding: '12px 16px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '.95rem',
    outline: 'none',
  };

  return (
    <div className="page-wrapper">
      <span className="label-tag">Task Manager</span>
      <h1 className="page-heading">
        Your <span className="gradient-text">ToDo List</span>
      </h1>

      <div style={{ maxWidth: 680 }}>
        {/* Input row */}
        <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input
            style={inputStyle}
            placeholder="Add a new task..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as Priority)}
            style={{
              background: 'rgba(20,8,50,.8)',
              border: '1px solid var(--glass-b)',
              borderRadius: 'var(--radius)',
              padding: '12px 14px',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '.85rem', outline: 'none',
            }}
          >
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v.emoji} {v.label}</option>
            ))}
          </select>
          <button
            onClick={add}
            style={{
              padding: '12px 22px',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#fff', border: 'none', borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.9rem',
              boxShadow: '0 0 18px rgba(168,85,247,.3)',
              transition: 'all .2s',
            }}
          >
            + Add
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['all', 'high', 'medium', 'low'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '5px 14px', borderRadius: 50,
                background: filter === f ? 'rgba(168,85,247,.2)' : 'var(--glass)',
                border: `1px solid ${filter === f ? 'rgba(168,85,247,.45)' : 'var(--glass-b)'}`,
                color: filter === f ? 'var(--purple-l)' : 'var(--text-muted)',
                fontSize: '.78rem', fontFamily: 'var(--font-display)',
                textTransform: 'capitalize',
              }}
            >
              {f === 'all' ? '📋 All' : `${PRIORITY_LABELS[f].emoji} ${PRIORITY_LABELS[f].label}`}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '.8rem', color: 'var(--text-dim)', alignSelf: 'center', fontFamily: 'var(--font-display)' }}>
            {todos.filter(t => !t.done).length} remaining
          </span>
        </div>

        {/* Todo items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
          {filtered.map(todo => (
            <div
              key={todo.id}
              style={{
                background: 'var(--card-bg)',
                border: `1px solid ${todo.done ? 'rgba(140,80,255,.1)' : 'var(--glass-b)'}`,
                borderRadius: 14,
                padding: '1rem 1.2rem',
                display: 'flex', alignItems: 'center', gap: '.9rem',
                animation: 'slideIn .3s ease',
                backdropFilter: 'blur(14px)',
                transition: 'all .2s',
                opacity: todo.done ? .5 : 1,
              }}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggle(todo.id)}
                style={{
                  width: 22, height: 22,
                  borderRadius: 6,
                  border: `1.5px solid ${todo.done ? '#7c3aed' : 'rgba(168,85,247,.4)'}`,
                  background: todo.done ? '#7c3aed' : 'transparent',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '.7rem',
                  transition: 'all .2s',
                }}
              >
                {todo.done && '✓'}
              </button>

              {/* Text */}
              <span
                style={{
                  flex: 1, fontSize: '.92rem',
                  color: todo.done ? 'var(--text-muted)' : 'rgba(255,255,255,.88)',
                  textDecoration: todo.done ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>

              {/* Badge */}
              <span className={`badge badge-${todo.priority}`}>
                {PRIORITY_LABELS[todo.priority].label}
              </span>

              {/* Delete */}
              <button
                onClick={() => del(todo.id)}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,.28)', fontSize: '.85rem',
                  padding: '3px 6px', transition: 'color .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.28)')}
              >
                ✕
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)', fontFamily: 'var(--font-display)', fontSize: '.9rem' }}>
              ✨ All clear! Add a task above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}