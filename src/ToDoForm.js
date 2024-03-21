import React, { useEffect, useState } from 'react'

const getLocalItems = ()=>{
    let list = localStorage.getItem('lists')
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

function ToDoForm() {
    const [tasks, setTasks] = useState(getLocalItems())

    const [value, setValue] = useState("")

    const [index, setIndex] = useState(null);

    const handleClick = ()=>{
        if(!value){

        }
        else{
            setTasks([...tasks, value]);
            setValue("")
        };
    }

    const handleDelete = (ele)=>{
        setTasks((oldTask)=>{
            return oldTask.filter((arrElement, index)=>{
                return index !== ele;
            })
        })
    }

    const handleUpdate = (index) => {
    console.log(tasks[index]);
    setIndex(index);
    if (tasks[index].trim() !== '') {
        setValue(tasks[index]);
    }
    };

    const UpdateList = () => {
        tasks[index] = value;
        console.log(tasks, 'before');
        setIndex(null);
        setValue('');
    };

    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(tasks))
    }, [tasks,value])

    return (
    <div className='big-div'>
        <div className='todoform'>
            <div>
                <input type='text' id='text' value={value} placeholder='Type Here..' onChange={(e)=>{
                    setValue(e.target.value)
                }}/>
                <button className='add-task-btn' type='submit' onClick={handleClick}>Add Task</button>
            </div>
            
            {
                tasks.map((task, index) =>{
                    return (
                        <div className='list-items'>
                            <li key={index}>{task}</li>
                            <button onClick={()=>
                            handleDelete(index)}>Delete</button>
                            <button onClick={()=>handleUpdate(index)}>Edit</button>
                            <button onClick={UpdateList}>Update</button>
                        </div>
                    );
                })
            }
            
        </div>
    </div>
    
  )
}

export default ToDoForm
