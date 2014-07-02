(function(){
	var counter = 0;
	function onBtnTrackClick(){
		counter++;
		document.getElementById("divMessage").innerHTML = counter;
	}
	function init(){
		document.getElementById("btnTrack").addEventListener("click",onBtnTrackClick);
		document.getElementById("btnTrack").onclick = anotherClickHandler;
	}
	function anotherClickHandler(){
		console.log("Another click handler is invoked");
	}
	window.onload = init;
})()
