function generate_maze(width, height)
{
	"use strict";
	var world = [];
	for(var x = 0; x < width; x++)
	{
		world[x] = [];
		for(var y = 0; y < height; y++)
		{
			world[x][y] = "#";
		}
	}
	
	var nodes = [{x: 1, y: 1}],
		curnode = 0;
	
	while(nodes.length > 0)
	{
		let curx = nodes[curnode].x,
			cury = nodes[curnode].y,
			directions = "";
		
		world[curx][cury] = " ";
		if(cury > 2 && world[curx][cury - 2] == "#")
			directions += "u";
		if(curx > 2 && world[curx - 2][cury] == "#")
			directions += "l";
		if(curx < width - 3 && world[curx + 2][cury] == "#")
			directions += "r";
		if(cury < height - 3 && world[curx][cury + 2] == "#")
			directions += "d";
		
		if(directions.length == 0)
		{
			nodes.splice(curnode, 1); // remove this node from the list
			if(nodes.length == 0)
				break; // no nodes left, we are done
			curnode = Math.floor(Math.random() * nodes.length); // pick a random new node to continue from
		}
		switch(directions[Math.floor(Math.random() * directions.length)])
		{
			case "u": // up
				world[curx][cury - 1] = " ";
				world[curx][cury - 2] = " ";
				nodes.push({x: curx, y: cury - 2});
				break;
			
			case "d": // down
				world[curx][cury + 1] = " ";
				world[curx][cury + 2] = " ";
				nodes.push({x: curx, y: cury + 2});
				break;
			
			case "l": // left
				world[curx - 1][cury] = " ";
				world[curx - 2][cury] = " ";
				nodes.push({x: curx - 2, y: cury});
				break;
			
			case "r": // right
				world[curx + 1][cury] = " ";
				world[curx + 2][cury] = " ";
				nodes.push({x: curx + 2, y: cury});
				break;
		}
		curnode = nodes.length - 1;
	}
	
	/*
	var maze = "";
	for(let x = 0; x < width; x++)
	{
		for(let y = 0; y < height; y++)
		{
			maze += world[x][y];
		}
		maze += "\n";
	}
	*/
	
	world[1][0] = " "; // make an entrance
	// clear the middle
	var centre = {
			x: Math.floor(width / 2),
			y: Math.floor(height / 2)
		},
		radius = 3;
	for(var cx = centre.x - radius; cx < centre.x + radius; cx++)
	{
		for(var cy = centre.y - radius; cy < centre.y + radius; cy++)
		{
			world[cx][cy] = " ";
		}
	}
	
	return world;
}