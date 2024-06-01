import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const TaskLargeView = ({ task }) => {

    return (
      <>
        <h1> hello </h1>
        <div>{task.taskname}</div>
        <div>{task.taskdescription}</div>
        
            
      </>
    );
  };
  
  export default TaskLargeView;