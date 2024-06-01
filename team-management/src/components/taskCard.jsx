import { CardBody,ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const TaskCard = ({ task }) => {

  
  let taskDate = new Date(Date.parse(task.taskduedate))
  let formattedDate = taskDate.toLocaleDateString();
  let formattedTime = taskDate.toLocaleTimeString();
  let formattedDateTime = `${formattedDate} ${formattedTime}`
  


  return (
    <>
      <Card style={{ width: "15rem", padding: "1em"}}>
        <Card.Header>
          {task.taskname}
        </Card.Header>
        <Card.Body>

          <Card.Title>{formattedDateTime}</Card.Title>
          <Card.Text>{task.taskdescription}</Card.Text>
        </Card.Body>

        <Card.Body>
          <Card.Text>{task.tasklocation}</Card.Text>
          <ListGroup variant="flush">
          {task.assignedEmployees.map((employee, index) => (
              <ListGroup.Item key={index}>{employee.firstname+' '+employee.lastname}</ListGroup.Item>
              ))}



          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default TaskCard;



