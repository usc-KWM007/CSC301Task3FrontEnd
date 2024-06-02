//import SearchBar from "../components/SearchBar.jsx"
import TaskCard from '../components/taskCard';
import { useEffect } from 'react';
import { useState } from 'react';
import TaskCardView from '../components/TaskLargeView'
import { Button, Modal } from 'react-bootstrap';
import { getTasks } from '../components/authentication';
import SearchBar from '../components/searchBar';
import SortBar from '../components/sortBar';



export default function Home() {

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

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [sortValue, setSortValue] = useState('');
  
  async function getData() {
    let data = await getTasks();
   
    setAllTasks(data);
    setTasks(data);
    setLoading(false)
  }

  useEffect(() => { getData() },[])

  const updateSortMethod = (value) => {
    setSortValue(value)

    switch (value) {
      case "taskNameAsc":
        tasks.sort(sortingMethods.taskNameAsc)
        break;
      case "taskNameDsc":
        tasks.sort(sortingMethods.taskNameDsc)
        break;
      case "taskDateAsc":
        tasks.sort(sortingMethods.taskDateAsc)
        break;
      case "taskDateDsc":
        tasks.sort(sortingMethods.taskDateDsc)
        break;
      case "taskOverDue":
        tasks.sort(sortingMethods.taskOverDue)
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
            <TaskCardView task={taskClickData} />
            <div>
              <Button onClick={() => setTaskClickState(false)}>Close</Button>
              <Button onClick={() => setTaskClickState(false)}>Edit</Button>
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
          <SortBar onChange={updateSortMethod} />
        </div>
      </div>
      <RenderCards />

    </>
  )
};
