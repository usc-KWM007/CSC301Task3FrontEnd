import { Form } from "react-bootstrap";

const SortBar = ({theme, defaultValue, onChange}) => {
    return (
      <Form.Select data-bs-theme={theme} defaultValue={defaultValue} aria-label="Default select example" onChange={(e) => onChange(e.target.value)}>
      <option>Sort</option>
      <option value="taskNameAsc">Sort by Name ASC</option>
      <option value="taskNameDsc">Sort by Name DSC</option>
      <option value="taskDateAsc">Sort by Date ASC</option>
      <option value="taskDateDsc">Sort by Date DSC</option>
      <option value="taskOverDue">Sort by Task Over Due First</option>
    </Form.Select>

    );
  }
  
  export default SortBar;