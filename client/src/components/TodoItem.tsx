import React from 'react';

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  toggleActiveTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, toggleActiveTodo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : '';
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(todo)}
          className={'Card--button__edit'}
        >
          Edit
        </button>
        <button
          onClick={() => toggleActiveTodo(todo)}
          className={'Card--button__done'}
        >
          Active
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
