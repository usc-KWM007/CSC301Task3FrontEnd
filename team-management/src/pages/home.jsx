//import SearchBar from "../components/SearchBar.jsx"
import tasksData from '../data/testData.json'
import TaskCard from '../components/taskCard';
import { useEffect } from 'react';
import { useState } from 'react';
import TaskCardView from '../components/TaskLargeView'
import { Modal } from 'react-bootstrap';



export default function Home() {

  const [taskClickState, setTaskClickState] = useState(false);
  const [taskClickData, setTaskClickData] = useState(null);

  const [tasks, setTasks] = useState([])

  const RenderCards = () => {

    useEffect(() => {
      //where task data will be fetched

      //set the tasks
      setTasks(tasksData)
    }, [] /*add dependent variable that should cause this to run again*/)


    return (
      <div id='cardGrid'>
        {tasks.map((task, index) => {
          return (
            <div key={index} onClick={() => [setTaskClickState(true), setTaskClickData(index)]}>
              <TaskCard task={task} />
            </div>
          )
        })}
      </div>
    );
  };


  return (
    <>
      <Modal show={taskClickState}>
        {
          <div id='taskLargeView'>
            <TaskCardView task={tasks[taskClickData]} />
            <div>
              <button onClick={() => setTaskClickState(false)}>Close</button>
              <button onClick={() => setTaskClickState(false)}>Edit</button>
            </div>
          </div>

        }
      </Modal>


      <h1>This is a home page</h1>
      <p>I have some content on this page that goes here.</p>
      <RenderCards />

    </>
  )
};
