import { useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-material.css' // Optional Theme applied to the Data Grid
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


function TodoList() {

    const [todos, setTodos] = useState([])
    const gridRef = useRef()
    const [task, setTask] = useState({
        desc: '',
        date: null,
        priority: ''
    })

    const changeDate = (date) => {
        setTask({...task, date: date})
    }
    
    const [colDefs] = useState([
        {field: "desc", sortable: true, filter: true, floatingFilter: true},
        {field: "priority", filter: true, floatingFilter: true,
            cellStyle: params => params.value.toLowerCase() === "high" ? {color: "red"} : {color: "black"}
        },
        {field: "date", filter: true, floatingFilter: true}
    ])
      
    // Remember to call preventDefault() if using form
    const addTodo = () => {
        if (task.desc === '') {
            alert('Description is empty')
            return // Lopetetaan funktion eteneminen
        }
        // Lisätään todos-listan perään uusi task
        setTodos([task, ...todos])
        // Tyhjennetään kentät
        setTask({
            desc: '',
            date: null,
            priority: ''
        })
    }

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
          setTodos(todos.filter((task, index) => 
            index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
          alert('Select a row first!');
        }
    }

    return(
        <>
            <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    onChange={event => setTask({...task, desc: event.target.value})}
                    value={task.desc}
                />
                <TextField
                    label="Priority"
                    onChange={event => setTask({...task, priority: event.target.value})}
                    value={task.priority}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date"
                        value={task.date}
                        onChange={date => changeDate(date)}
                    />
                </LocalizationProvider>
                <Button variant="contained" onClick={addTodo}>Add Todo</Button>
                <Button variant="contained" endIcon={<DeleteIcon />} color="error" onClick={handleDelete}>Delete</Button>
            </Stack>
            <div
                className="ag-theme-material"
                style={{height: 500}}
            >
                <AgGridReact 
                    ref={gridRef}
                    rowData={todos}
                    columnDefs={colDefs}
                    selection="singleRow"
                    onGridReady={params => gridRef.current = params.api}
                />
            </div>
        </>
    )
}

export default TodoList