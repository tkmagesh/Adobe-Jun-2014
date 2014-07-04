function doWork(){
	for(var x=0;x<100;x++){
		for(var i=0;i<100;i++)
			for(var j=0;j<10000;j++)
				for(var k=0;k<100;k++){}
		self.postMessage(x+1);			
	}
}
self.addEventListener("message",function(msgEvt){
	if (msgEvt.data === "start"){
		doWork();
		self.postMessage("completed");
	}
})
