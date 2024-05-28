import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const TaskLargeView = ({ task }) => {


    return (
      <>
        <h1> hello </h1>
        <div>{task.taskName}</div>
        <div>{task.taskDescription}</div>
        
            
      </>
    );
  };
  
  export default TaskLargeView;