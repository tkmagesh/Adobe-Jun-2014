var taskCollection = {
		tasks : [],
		remove : function (taskId){
			for(var j=this.tasks.length-1;j>=0;j--)
				if (this.tasks[j].id === taskId)
					this.tasks.splice(j,1);
		},
		toggle : function (taskId){
			for(var i=0;i<this.tasks.length;i++){
				if (this.tasks[i].id === taskId)
					this.tasks[i].toggleCompletion();
			}
		},
		add : function (taskName){
			/*Create a task Object and add it to the collection*/
			var task = {
				id : new Date().getTime().toString(),
				name : taskName, 
				isCompleted : false,
				toggleCompletion : function(){
					this.isCompleted = !this.isCompleted;
				}
			};
			this.tasks.push(task);
			return task;
		}
	};