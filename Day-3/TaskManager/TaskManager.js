(function(){
		window.addEventListener("DOMContentLoaded",init);
		function init(){
			document.getElementById("txtTaskName").addEventListener("blur",onValidateTaskName);
			document.getElementById("btnAddTask").addEventListener("click",onBtnAddTaskClick);
			document.getElementById("btnRemoveCompleted").addEventListener("click",onBtnRemoveCompletedClick);
			var taskNodes = document.getElementById("ulTaskList").children;
			for(var i=0;i<taskNodes.length;i++){
				taskNodes[i].addEventListener("click", onTaskItemClick);
			}
		}
		function onBtnRemoveCompletedClick(){
			var taskNodes = document.getElementById("ulTaskList").children;
			for(var i=taskNodes.length-1;i>=0;i--){
				if (taskNodes[i].classList.contains("completed")){
					var taskId = taskNodes[i].getAttribute('task-id');
					taskNodes[i].remove();
					taskCollection.remove(taskId);
				}
			}
		}
		
		function onTaskItemClick(){
			this.classList.toggle("completed");
			var taskId = this.getAttribute("task-id");
			taskCollection.toggle(taskId);
		}
		
		function onValidateTaskName(){

			var taskName = this.value,
				divErrorMessage = document.getElementById("divErrorMessage");

			if (taskName === ""){
				divErrorMessage.innerHTML = "A task name is mandatory!!";
			} else {
				divErrorMessage.innerHTML = "";
			}
		}
		function onBtnAddTaskClick(){
			var taskName = document.getElementById("txtTaskName").value;

			/*Show the newly created task in the UI*/
			
			var task = taskCollection.add(taskName);
			var newTaskItem = document.createElement("li");
			newTaskItem.setAttribute("task-id",task.id);
			newTaskItem.innerText = taskName;
			newTaskItem.classList.add("taskItem");
			newTaskItem.addEventListener("click",onTaskItemClick);

			document.getElementById("ulTaskList").appendChild(newTaskItem);
		}

		
	})();