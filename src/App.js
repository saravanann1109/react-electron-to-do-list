import './App.css';
import ActivityList from './components/activity-list';
import AddActivity from './components/add-activity';
import { useReducer } from 'react';

const initialState = {
  todos: [],
};

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      {
        if (state.todos.findIndex(x => x.activity === action.text) > -1) {
          return {
            todos: state.todos
          }
        }
        const newTodo = {
          id: uuidv4(),
          activity: action.text,
          activityStatus: 'new'
        };
        return {
          todos: [...state.todos, newTodo],
        };
      }
    case "edit":
      {
        const idx = state.todos.findIndex(t => t.id === action.id);
        const todo = Object.assign({}, state.todos[idx]);
        todo.text = action.text;
        const todos = Object.assign([], state.todos);
        todos.splice(idx, 1, todo);
        return {
          todos: todos,
        };
      }
    case "remove":
      {
        const idx = state.todos.findIndex(t => t.id === action.id);
        const todos = Object.assign([], state.todos);
        todos.splice(idx, 1);
        return {
          todos: todos,
        };
      }
    case "done":
      {
        const idx = state.todos.findIndex(t => t.id === action.activity.id);
        const todo = Object.assign({}, state.todos[idx]);
        todo.activityStatus = "done";
        const todos = Object.assign([], state.todos);
        todos.splice(idx, 1, todo);
        return {
          todos: todos,
        };
      }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="ui raised very padded text container segment activity-container">
      <h2 className="ui header">What's your today plan?.</h2>
      <div className="ui container">
        <div className="row add-activity">
          <AddActivity add={text => dispatch({ type: "add", text: text })} />
        </div>
        <div className="row activity-list">
          <ActivityList activityList={state.todos} activityDone={activity => dispatch({ type: 'done', activity })} removeActivity={activity => dispatch({ type: 'remove', activity })} />
        </div>
      </div>
    </div>
  );
}

export default App;
