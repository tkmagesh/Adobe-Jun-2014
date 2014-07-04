var storage = window.localStorage;
var taskStorage = {
	add : function(taskName){
		var newTaskId = new Date().getTime().toString();
		var newTask = {id : newTaskId, name : taskName, isCompleted : false};
		storage.setItem(newTaskId,JSON.stringify(newTask));
		return newTask;
	},
	getAll : function(){
		var result = [];
		for(var i=0;i<storage.length;i++){
			var key = storage.key(i);
			var task = JSON.parse(storage.getItem(key));
			result.push(task);
		}
		return result;
	},
	toggle : function(taskId){
		var task = JSON.parse(storage.getItem(taskId));
		task.isCompleted = !task.isCompleted;
		storage.setItem(taskId, JSON.stringify(task));
	},
	remove : function(taskId){
		storage.removeItem(taskId);
	}
};
(function(){
		$(function (){
			$("#txtTaskName").blur(onValidateTaskName);
			$("#btnAddTask").click(onBtnAddTaskClick);
			$("#btnRemoveCompleted").click(onBtnRemoveCompletedClick);
			$("#ulTaskList").on("click","li", onTaskItemClick);
			//$("#ulTaskList").delegate("li", "click", onTaskItemClick);
			var existingTasks = taskStorage.getAll();
			for(var i=0;i<existingTasks.length;i++)
				addTaskToUi(existingTasks[i]);
		});

		function onBtnRemoveCompletedClick(){
			$("#ulTaskList > li.completed").slideUp('slow', function(){
				taskStorage.remove($(this).attr("task-id"));
				$(this).remove();
			});
			displayMessage("Zero or more completed tasks are removed...");
		}
		function onTaskItemClick(){
			taskStorage.toggle($(this).attr("task-id"));
			$(this).toggleClass("completed");
		}
		function onValidateTaskName(){
			var msg = this.value === "" ? "A task name is mandatory!!" : "";
			$("#divErrorMessage").html(msg);
		}
		function onBtnAddTaskClick(){
			var taskName = $("#txtTaskName").val();
			var newTask = taskStorage.add(taskName);
			addTaskToUi(newTask);
			displayMessage("A new task is added..");
		}
		function addTaskToUi(task){
			$("<li></li>")
				.text(task.name)
				.addClass("taskItem")
				.attr("taskId",task.id)
				.addClass(task.isCompleted ? "completed" : "")
				.hide()
				.appendTo("#ulTaskList")
				.slideDown();
			
		}
		function displayMessage(msg){
			$("<div class='message'></div>")
				.hide()
				.html(msg)
				.appendTo("div.messages")
				.slideDown('fast')
				.delay(3000)
				.fadeOut('fast', function(){
					$(this).remove();
				});
		}
	})();