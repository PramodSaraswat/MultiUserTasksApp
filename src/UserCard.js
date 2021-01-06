import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

import ModalView from "./ModalView";


const CardView = () => {

    const [modalShow, setModalShow] = useState(false);
    const [modalTaskShow, setModalTaskShow] = useState(false);
    const [warnShow, setWarnShow] = useState(false);
    const [editUserShow, setEditUserShow] = useState(false);
    const [editTaskShow, setEditTaskShow] = useState(false);
    const [editNum, setEditNum] = useState(0);
    const [editTaskNum, setEditTaskNum] = useState([0, 0]);
    //provided mock data just for testing
    const [userData, setUserData] = useState({
      data: [{
          name: "User1",
          tasks: ["task1", "task2", "task3"],
        },
        {
          name: "User2",
          tasks: ["task1", "task2", "task3"],
        },
        {
          name: "User3",
          tasks: ["task1", "task2", "task3"],
        }
      ]
    })

    const toggleModal = () => {
      setModalShow(!modalShow);
    }

    const toggleTaskModal = () => {
      setModalTaskShow(!modalTaskShow);
    }

    const toggleWarnModal = () => {
      setWarnShow(!warnShow);
    }

    const toggleUserShow = () => {
      setEditUserShow(!editUserShow);
    }

    const toggleEditTask = () => {
      setEditTaskShow(!editTaskShow);
    }

    const showAddTask = (id) => {
      setEditNum(id);
      toggleTaskModal();
    }

    const showDelUser = (id) => {
      setEditNum(id);
      toggleWarnModal();
    }

    const showUserEdit = (ind) => {
      setEditNum(ind);
      toggleUserShow();
    }

    const showTaskEdit = (ind, taskInd) => {
      setEditTaskNum([ind, taskInd]);
      toggleEditTask();
    }

    const addUser = (userName) => {
      console.log(userName)
      let temp = userData.data
      temp.push({
        name: userName,
        tasks: [],
      })
      setUserData({ data: temp });
    }


    const deleteUser = (id) => {
      setUserData({ data: userData.data.filter((dat, index) => { return (index !== id) }) });
      setEditNum(0);
      toggleWarnModal();
    }

    const editUserName = (userId, userName) => {
      let userDatas = userData.data;
      userDatas[userId].name = userName;
      setUserData({ data: userDatas });
    }

    const addTask = (userId, task) => {
      let userDatas = userData.data;
      userDatas[userId].tasks.push(task);
      setUserData({ data: userDatas });
    }

    const editTask = (userId, taskId, val) => {
      let userDatas = userData.data;
      userDatas[userId].tasks[taskId] = val;
      setUserData({ data: userDatas });
    }

    const deleteTask = (userId, taskId) => {
      let userDatas = userData.data;
      userDatas[userId].tasks = userDatas[userId].tasks.filter((taskDat, taskInd) => { return (taskInd !== taskId) });
      setUserData({ data: userDatas });
      setEditTaskNum([0,0])
    }

    return ( <>
	    <div style={{width:"100%",float:"right"}}>
	  		<Button className="btn btn-primary m-4" 
	  			style={{float:"right"}} 
	  			onClick={toggleModal}
	  		>
	  			Add User
	  		</Button>
  		</div> 
  		<div className = "row mr-0" > 
  			{userData.data.map(({ name, tasks }, indexUser) =>
          		<div className="m-4 mx-auto col-12 col-sm-6 col-lg-3" key={indexUser}>
		            <Card style={{ width: 'auto' }} >
		                <Card.Title  className="mb-2 mt-2 text-center" variant="top">
		                	<p className="d-inline" style={{cursor:"pointer"}} 
		                		onClick={()=>showUserEdit(indexUser)}
		                	>
		                		{name}
		                	</p> 
			                <Button className="btn btn-danger mr-2" 
			                	style={{position:"absolute",right:0}} 
			                	onClick={()=>showDelUser(indexUser)}
			                >
			                	X
			                </Button>
			                <ModalView modalShow={editUserShow} modalType={"editUser"} 
			                	val={userData.data[editNum].name} toggleModal={toggleUserShow} 
			                	namVal={"Edit user name"} indexUser={editNum} 
			                	setValInParent={editUserName} 
			                />
			                <ModalView modalShow={warnShow} warn={true} 
			                	toggleModal={toggleWarnModal} namVal={"Confirm delete user?"} 
			                	indexUser={editNum} deleteUser={deleteUser} 
			                />
		                </Card.Title>
		                <hr />
		  				<Card.Body>
		    				{tasks.map((taskDesc,indexTask)=>{
		    					return(
		    						<p key={indexTask}>
			    						<b className="mr-2 btn btn-danger" 
			    							style={{borderRadius:"50%",padding: "0rem 0.4rem"}} 
			    							onClick={()=>deleteTask(indexUser,indexTask)}
			    						>
			    							X
			    						</b>
			    						<b onClick={()=>showTaskEdit(indexUser,indexTask)} 
			    							style={{cursor:"pointer"}}
			    						>
			    							{taskDesc}
			    						</b>
		    						</p>
		    					);
		    				})}
		    				<div className="text-center">
		    					<Button variant="primary" onClick={()=>showAddTask(indexUser)}
		    					>
		    						+
		    					</Button>
			    				<ModalView modalShow={modalTaskShow} modalType={"addTask"} 
			    					toggleModal={toggleTaskModal} namVal={"Add Task"} labelName={"Enter Task"} 
			    					indexUser={editNum} setValInParent={addTask} 
			    				/>
			    				<ModalView modalShow={editTaskShow} modalType={"editTask"} 
			    					val={userData.data[editTaskNum[0]].tasks[editTaskNum[1]]} 
			    					toggleModal={toggleEditTask} namVal={"Edit Task"} labelName={"Enter Task"} 
			    					setValInParent={editTask} indexUser={editTaskNum} 
			    				/>
		    				</div>
		  				</Card.Body>
					</Card>
				</div>
			)} 
		</div> 
		<ModalView modalShow = { modalShow } modalType = { "addUser" } toggleModal = { toggleModal } 
			namVal = { "Add User" } labelName = { "Enter Username" } setValInParent = { addUser }
		/> 
	</>);
}

export default CardView;