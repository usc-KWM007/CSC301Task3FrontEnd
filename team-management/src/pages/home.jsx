import TaskCard from '../components/taskCard';
import { useEffect } from 'react';
import { useState } from 'react';
import TaskLargeView from '../components/TaskLargeView'
import { Button, Modal } from 'react-bootstrap';
import { getTasks, deleteTask, loggedIn } from '../components/authentication';
import SearchBar from '../components/searchBar';
import SortBar from '../components/sortBar';
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const sortingMethods = {
    taskNameAsc: (a, b) => {
      //convert to lower casing
      const nameA = a.taskname.toLowerCase();
      const nameB = b.taskname.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; //equal
    },

    taskNameDsc: (a, b) => {
      //convert to lower casing
      const nameA = a.taskname.toLowerCase();
      const nameB = b.taskname.toLowerCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0; //equal
    },

    taskDateAsc: (a, b) => {
      //convert to lower casing
      const dateA = a.taskduedate;
      const dateB = b.taskduedate;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0; //equal
    },
    taskDateDsc: (a, b) => {
      //convert to lower casing
      const dateA = a.taskduedate;
      const dateB = b.taskduedate;
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 0; //equal
    },
    taskOverDue: (a) => {
      //convert to lower casing
      const dateA = a.taskduedate;
      const dateB = new Date().toISOString();

      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 0; //equal
    },

  }

  

  const [isLoading, setLoading] = useState(true);
  const [taskClickState, setTaskClickState] = useState(false);
  const [taskClickData, setTaskClickData] = useState(null);
  const [refreshVar, setRefreshVar] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const defaultSortingOrder=localStorage.getItem("defaultSortOrder"); 
  const [sortValue, setSortValue] = useState(defaultSortingOrder); 
  
  async function getData() {
    let data = await getTasks();
    data.sort(updateSortMethod(sortValue, data))
    setAllTasks(data);
    setTasks(data);
    setLoading(false)
  }

  useEffect(() => { getData(); },[refreshVar])

  const updateSortMethod = (value, arr=tasks) => {
    setSortValue(value)

    switch (arr, value) {
      case "taskNameAsc":
        arr.sort(sortingMethods.taskNameAsc)
        break;
      case "taskNameDsc":
        arr.sort(sortingMethods.taskNameDsc)
        break;
      case "taskDateAsc":
        arr.sort(sortingMethods.taskDateAsc)
        break;
      case "taskDateDsc":
        arr.sort(sortingMethods.taskDateDsc)
        break;
      case "taskOverDue":
        arr.sort(sortingMethods.taskOverDue)
        break;
      default:
        break;

    }

  }

  const updateSearchWord = (word) => {
    let filteredTasks = allTasks.filter((task) =>
      task.taskname.toLowerCase().includes(word.toLowerCase())
      || task.taskdescription.toLowerCase().includes(word.toLowerCase())
      || task.tasklocation.toLowerCase().includes(word.toLowerCase())
      || task.assignedEmployees.some((employee) =>
        employee.firstname.toLowerCase().includes(word.toLowerCase())
        || employee.lastname.toLowerCase().includes(word.toLowerCase())))
    setSearchWord(word);
    setTasks(filteredTasks);
  }

  const editTask = () => {
    navigate('/editTask',{state:{data:taskClickData}});
  }

  async function deleteTaskFunc() {
    setTaskClickState(false);
    setLoading(true);
    await deleteTask(taskClickData.taskid);
    setRefreshVar(oldVar => oldVar +1);
  }
  

  const RenderCards = () => {

    return (
      <div id='cardGrid'>
        {tasks.map((task, index) => {
          return (
            <div key={index} onClick={() => [setTaskClickState(true), setTaskClickData(task)]}>
              <TaskCard task={task} />
            </div>
          )
        })}
      </div>
    );
  };


    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

  return (
    <>
      <Modal show={taskClickState}>
        {
          <div id='taskLargeView'>
            <TaskLargeView task={taskClickData} />
            <div id="twoRowButtons">
              <Button onClick={() => setTaskClickState(false)}>Close</Button>
              <Button onClick={() => editTask()}>Edit</Button>
              <Button onClick={() => deleteTaskFunc()}>Delete</Button>
            </div>
          </div>

        }
      </Modal>


      <h1>Dashboard</h1>
      <div id="twoRow">
        <div id = "column50">
          <SearchBar keyword={searchWord} onChange={updateSearchWord} />
        </div>
        <div id = "column20">
          <SortBar defaultValue = {defaultSortingOrder} onChange={updateSortMethod} />
        </div>
      </div>
      <RenderCards />

    </>
  )
};
