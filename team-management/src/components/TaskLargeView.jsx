const TaskLargeView = ({ task }) => {
  let taskDate = new Date(Date.parse(task.taskduedate))
  let formattedDate = taskDate.toLocaleDateString();
  let formattedTime = taskDate.toLocaleTimeString();
  let formattedDateTime = `${formattedDate} ${formattedTime}`

  let assignedEmployees = "";
  assignedEmployees.concat("hello", " ")
  if (task.assignedEmployees.length > 0) {
    for (let i = 0; i < task.assignedEmployees.length; i++){
      console.log(task.assignedEmployees[i].firstname)
      assignedEmployees += "\n" + task.assignedEmployees[i].firstname+ " " +task.assignedEmployees[i].lastname;
    }
  }


  return (
    <>
      <h2> {task.taskname} </h2>
      {task.taskduedate && <div>Due date: {formattedDateTime}</div>}
      <div>Description: {task.taskdescription}</div>
      {task.tasklocation && <div>Location: {task.tasklocation}</div>}

      {task.assignedEmployees.length > 0 && <div style={{whiteSpace:"pre-wrap", textAlign:"center"}}>Assigned Employees: {assignedEmployees}</div>}



    </>
  );
};

export default TaskLargeView;