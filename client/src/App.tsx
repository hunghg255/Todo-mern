import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
// import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

import { connect } from 'react-redux';
import {
  fetchAddTodo,
  fetchDeleteTodo,
  fetchUpdatedTodo,
  initTodos,
} from './store/todoActions';
import { ThunkDispatch } from 'redux-thunk';

// const App: React.FC = () => {
//   const [todos, setTodos] = useState<ITodo[]>([])

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   const fetchTodos = (): void => {
//     getTodos()
//     .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
//     .catch((err: Error) => console.log(err))
//   }

//   const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
//     e.preventDefault()
//     addTodo(formData)
//       .then(({ status, data }) => {
//         if (status !== 201) {
//           throw new Error("Error! Todo not saved")
//         }
//         setTodos(data.todos)
//       })
//       .catch(err => console.log(err))
//   }

//   const handleUpdateTodo = (todo: ITodo): void => {
//     updateTodo(todo)
//       .then(({ status, data }) => {
//         if (status !== 200) {
//           throw new Error("Error! Todo not updated")
//         }
//         setTodos(data.todos)
//       })
//       .catch(err => console.log(err))
//   }

//   const handleDeleteTodo = (_id: string): void => {
//     deleteTodo(_id)
//       .then(({ status, data }) => {
//         if (status !== 200) {
//           throw new Error("Error! Todo not deleted")
//         }
//         setTodos(data.todos)
//       })
//       .catch(err => console.log(err))
//   }

//   return (
//     <main className='App'>
//       <h1>My Todos</h1>
//       <AddTodo saveTodo={handleSaveTodo} />
//       {todos.map((todo: ITodo) => (
//         <TodoItem
//           key={todo._id}
//           updateTodo={handleUpdateTodo}
//           deleteTodo={handleDeleteTodo}
//           todo={todo}
//         />
//       ))}
//     </main>
//   )
// }

// export default App;

// redux

type TProps = {
  onInitGetTodos: () => void;
  onAddTodo: (formData: ITodo) => void;
  onDeleteTodo: (_id: string) => void;
  onUpdateTodo: (todo: ITodo) => void;
} & ApiDataType;

function App(props: TProps) {
  // init todos
  useEffect(() => {
    props.onInitGetTodos();
  }, []);

  // add todo
  const handleSaveTodo = (formData: ITodo): void => {
    props.onAddTodo(formData);
  };

  const handleToggleActiveTodo = (todo: ITodo): void => {
    props.onUpdateTodo(todo);
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    props.onUpdateTodo(todo);
  };

  const handleDeleteTodo = (_id: string): void => {
    props.onDeleteTodo(_id);
  };

  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {props.todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          toggleActiveTodo={handleToggleActiveTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
}

const mapStateToProps = (state: ApiDataType): ApiDataType => {
  return {
    todos: state.todos,
    message: '',
    status: '',
  };
};

interface LinkDispatchProps {
  onInitGetTodos: () => void;
  onAddTodo: (formData: ITodo) => void;
  onDeleteTodo: (_id: string) => void;
  onUpdateTodo: (todo: ITodo) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, TActions>
): LinkDispatchProps => {
  return {
    onInitGetTodos: () => dispatch(initTodos()),
    onAddTodo: (formData: ITodo) => dispatch(fetchAddTodo(formData)),
    onDeleteTodo: (_id: string) => dispatch(fetchDeleteTodo(_id)),
    onUpdateTodo: (todo: ITodo) => dispatch(fetchUpdatedTodo(todo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
