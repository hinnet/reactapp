import React from "react"
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function TodoTable(props) {
    return (
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Date</th>
            </tr>
            {props.todos.map((item, index) => (
              <tr key={index}>
                <td>{item.desc}</td>
                <td>{item.date}</td>
                <td><button onClick={() => props.handleDelete(index)}>Done</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )
}

export default TodoTable