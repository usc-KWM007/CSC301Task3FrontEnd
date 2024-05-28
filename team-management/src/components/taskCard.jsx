import Card from "react-bootstrap/Card";

const TaskCard = ({ task }) => {


  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Header>
          {task.taskName}
        </Card.Header>
        <Card.Body>
          <Card.Title>{task.taskName}</Card.Title>
          <Card.Text>{task.taskDescription}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default TaskCard;



