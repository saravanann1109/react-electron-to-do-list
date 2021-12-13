import React from "react";
import '../activity-list.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const toastOptions = { type: 'success' };

const getItem = (todos, state) => {
    return todos.map((todo) => {
        return (<div className="item activity" key={todo.id}>
            <div className="right floated content">
                {todo.activityStatus !== 'done' ? <i className="clipboard check icon olive" onClick={() => { state.activityDone(todo); toast(`${todo.activity} has been changed to done.`,toastOptions) }}></i> : null}
                <i className="trash icon pink" onClick={() => { state.removeActivity(todo); toast(`${todo.activity} has been deleted.`, toastOptions) }}></i>
            </div>
            {/* <img className="ui avatar image" src="/images/avatar2/small/lena.png"> */}
            <div className="content">
                {todo.activityStatus === "done" ? <s>{todo.activity}</s> : todo.activity}
            </div>
        </div>);
    })
}

const ActivityList = (state) => {

    return (
        <div className="ui celled list activity-list-container">
            {state.activityList && state.activityList.length > 0 ? getItem(state.activityList, state) : 'No Activities'}
        </div>
    );
};

export default ActivityList;