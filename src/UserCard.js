import React, {useState} from "react";
import { Card, Button } from "react-bootstrap";

import ModalView from "./ModalView";


const CardView = () => {

	const [modalShow, setModalShow] = useState(false);
	const [modalTaskShow, setModalTaskShow] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [userData, setUserData] = useState({
    data: [{
        name: "aniket1",
        tasks: ["task1", "task2" , "task3" ],
      },
      {
        name: "aniket2",
        tasks: ["task1", "task2" , "task3" ],
      },
      {
        name: "aniket3",
        tasks: ["task1", "task2" , "task3" ],
      }
    ]
  })

	

	const toggleModal = () => {
		setModalShow(!modalShow);
	}

	const toggleTaskModal = () => {
		setModalTaskShow(!modalTaskShow);
	}

	const addUser = (userName) => {
		console.log(userName)
		let temp = userData.data
		temp.push({
					name: userName,
					tasks: [],
				})
		setUserData({data: temp});
		console.log(userData1);
	}

	
  const userData1 = {
    data: [{
        name: "aniket1",
        tasks: ["task1", "task2" , "task3" ],
      },
      {
        name: "aniket2",
        tasks: ["task1", "task2" , "task3" ],
      },
      {
        name: "aniket3",
        tasks: ["task1", "task2" , "task3" ],
      }
    ]
  }

  const deleteUser = (id) => {
		setUserData({data:userData.data.filter((dat,index)=>{return(index !== id)})});
		console.log(userData);	
	}

	const deleteTask = (userId,taskId) => {
		let userDatas = userData.data;
		let sUserData = userDatas[userId];
		sUserData.tasks = sUserData.tasks.filter((taskDat,taskInd)=>{return(taskInd !== taskId)});
		userDatas[userId] = sUserData;
		console.log(userDatas);
		setUserData({data:userDatas});
	}

  return (<>
  	<div style={{width:"100%",float:"right"}}>
  		<Button className="btn btn-primary m-4" style={{float:"right"}} onClick={toggleModal}>
  			Add User
  		</Button>
  	</div>
    <div className="row">
		{userData.data.map(({ name, tasks },indexUser) =>
		          	<div className="m-4 mx-auto col-12 col-sm-6 col-lg-3" key={indexUser}>
		            <Card style={{ width: 'auto' }} >
		                <Card.Title  className="mb-2 mt-2 text-center" variant="top">{name} 
		                <Button className="btn btn-danger mr-2" style={{position:"absolute",right:0}} onClick={()=>deleteUser(indexUser)}>X</Button>
		                </Card.Title>
		                <hr />
		  <Card.Body>
		    {tasks.map((taskDesc,indexTask)=>{
		    	return(<p key={indexTask}><b className="mr-2 btn btn-danger" style={{borderRadius:"50%",padding: "0rem 0.4rem"}} onClick={()=>deleteTask(indexUser,indexTask)}>X</b>{taskDesc}</p>);
		    })}
		    <div className="text-center">
		    	<Button variant="primary" onClick={toggleTaskModal}>+</Button>
		    </div>
		  </Card.Body>
		</Card></div>)}
	</div>
	<ModalView modalShow={modalShow} toggleModal={toggleModal} namVal={"Add User"} labelName={"Enter Username"} setValInParent={addUser} />
	<ModalView modalShow={modalTaskShow} toggleModal={toggleTaskModal} namVal={"Add Task"} labelName={"Enter Task"} />
	</>);

}

export default CardView;