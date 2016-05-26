(function(){
	var dorpdown = document.getElementsByClassName("dorpdown");
	for(var i=0 ; i<dorpdown.length ; i++){
		dorpdown[i].onmouseover = function(){
			this.classList.add("hover");
			this.getElementsByClassName("dd")[0].style.display = "block";
		}
		dorpdown[i].onmouseout = function(){
			this.classList.remove("hover");
			this.getElementsByClassName("dd")[0].style.display = "none";
		}
	}
})();