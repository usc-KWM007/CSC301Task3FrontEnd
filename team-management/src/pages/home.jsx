import TaskCard from '../components/taskCard';
import { useEffect, useState } from 'react';
import TaskLargeView from '../components/TaskLargeView'
import { Button, Modal, Alert } from 'react-bootstrap';
import { getTasks, deleteTask } from '../components/authentication';
import SearchBar from '../components/searchBar';
import SortBar from '../components/sortBar';
import { useNavigate } from "react-router-dom";
import { getTheme, getColorSchemeTheme } from '../components/themeManager';

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
  const [refreshVar, setRefreshVar] = useState(false);

  const [alertShow, setAlertShow] = useState(true);
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const [deleteErrorCode, setDeleteErrorCode] = useState("");
  const [submissionErrorCode, setSubmissionErrorCode] = useState("");
  

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const defaultSortingOrder = localStorage.getItem("defaultSortOrder");
  const [sortValue, setSortValue] = useState(defaultSortingOrder);

  async function getData() {
    const submission = await getTasks();

    if (submission.status != 200) {
      setSubmissionErrorCode(submission.response.data)
      setAlertShow(true)
      setLoading(false)
      return
    }
    setAlertShow(false)
    let data = submission.data
    data.sort(updateSortMethod(sortValue, data))
    setAllTasks(data);
    setTasks(data);
    setLoading(false)
  }

  useEffect(() => { getData(); }, [refreshVar])

  const updateSortMethod = (value, arr = tasks) => {
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
    navigate('/editTask', { state: { data: taskClickData } });
  }

  async function deleteTaskFunc() {
    const submission = await deleteTask(taskClickData.taskid);
    if (submission.status != 200) {
      setDeleteErrorCode(submission.response.data)
      setDeleteAlertShow(true)
      return
  }
    setTaskClickState(false);
    setLoading(true);
    setRefreshVar(oldVar => !oldVar);
  }


  const RenderCards = () => {

    return (
      <div id='cardGrid'>
        {tasks.map((task, index) => {
          return (
            <div key={index} onClick={() => [setTaskClickState(true), setTaskClickData(task)]}>
              <TaskCard theme = {color} task={task} />
            </div>
          )
        })}
      </div>
    );
  };

  getTheme()
  const color = getColorSchemeTheme()

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (alertShow) {
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>Error Getting Tasks</Alert.Heading>
          <p>
            {submissionErrorCode}
          </p>
        </Alert>
      </>
    )
  }

  return (
    <>
      <Modal data-bs-theme={color} show={taskClickState}>
        {
          <div id='taskLargeView'>
            <TaskLargeView task={taskClickData} />
            <>
              {deleteAlertShow && <Alert variant="danger" onClose={() => setDeleteAlertShow(false)} dismissible>
                <Alert.Heading>Error Deleting Task</Alert.Heading>
                <p>
                  {deleteErrorCode}
                </p>
              </Alert>}
            </>
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
        <div id="column50">
          <SearchBar keyword={searchWord} onChange={updateSearchWord} />
        </div>
        <div id="column20">
          <SortBar theme = {color} defaultValue={defaultSortingOrder} onChange={updateSortMethod} />
        </div>
      </div>
      <RenderCards />

    </>
  )
};
