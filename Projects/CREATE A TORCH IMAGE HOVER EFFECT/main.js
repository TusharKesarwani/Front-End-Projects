const container = document.querySelector(".container");
	
container.addEventListener("mousemove",(e)=>{
		const torch = document.querySelector(".torch");
		torch.style.clipPath = `circle(60px at ${e.offsetX}px ${e.offsetY}px)`;
})