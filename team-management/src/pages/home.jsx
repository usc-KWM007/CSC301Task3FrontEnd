//import SearchBar from "../components/SearchBar.jsx"
import tasksData from '../data/testData.json'
import TaskCard from '../components/taskCard';
import { useEffect } from 'react';
import { useState } from 'react';

const RenderCards = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    //where task data will be fetched
  
    //set the tasks
    setTasks(tasksData)
  }, [] /*add dependent variable that should cause this to run again*/)


  return (
    <div id = 'cardGrid'>
      {tasks.map((task, index) => {
        return <TaskCard task={task} key={index} />;
      })}
    </div>
  );
};


export default function Home() {

  return (
    <>
      <h1>This is a home page</h1>
      <p>I have some content on this page that goes here.</p>
      <button>Button press</button>
      <RenderCards />

    </>
  )
};


/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/