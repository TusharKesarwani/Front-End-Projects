window.addEventListener("DOMContentLoaded",app);

function app() {
	var header = document.querySelector("header"),
		difSelect = document.querySelector(".difficulty-select"),
		difButtons = difSelect.querySelectorAll("button"),
		tutorialBox = document.querySelector(".tutorial"),
		replayButton = document.querySelector(".replay"),

		scene,
		camera,
		renderer,
		hemiLight,
		pointLight,
		touch = {hold: false, x: 0},

		difSelectActive = false,
		scoreCounterActive = false,
		replayBtnActive = false,

		game = null,
		randomInt = (min,max) => Math.round(Math.random() * (max - min)) + min,
		skyColor = 0x69c6d0,
		pointLightZ = -60,
		cameraY = 45,
		cameraYMin = 7,
		renderDistance = 8,
		roadChunks = [];

	class Game {
		constructor(args) {
			// 0: easy, 1: medium (default), 2: hard, 3: brutal
			let d = args.difficulty;
			this.difficulty = d >= 0 && d <= 3 ? d : 1;

			this.tutorial = args.tutorial === true;
			this.over = false;
			this.preparingNew = false;
			this.score = 0;
			this.noScoreXZone = 15;
			this.vehicles = [
				new Vehicle({
					color: 0xff1717,
					x: 0,
					z: 0,
					modelID: 0,
					speed: 1,
					acceleration: 0.001 * 2**d,
					name: "Vehicle 0"
				})
			];
			this.vehicleSpawns = this.vehicles.length;
			this.vehicleLimit = 9;
			this.vehicleIDCtrld = 0;
			this.spark = null;
		}
	}
	class RoadChunk {
		constructor(zSpaces) {
			let chunkSize = 40,
				lineWidth = 1,
				lineHeight = 4,
				dotLines = 3;

			this.chunkSize = chunkSize;
			// surface
			this.surfaceGeo = new THREE.PlaneBufferGeometry(chunkSize,chunkSize);
			this.surfaceMat = new THREE.MeshLambertMaterial({
				color: 0x575757
			});
			this.surface = new THREE.Mesh(this.surfaceGeo,this.surfaceMat);
			this.surface.name = "Road Chunk";
			this.surface.rotation.x = -Math.PI/2;
			this.surface.position.set(0,0,zSpaces*chunkSize);
			this.surface.receiveShadow = true;
			scene.add(this.surface);

			// shoulder lines
			let lineGeo = new THREE.PlaneBufferGeometry(lineWidth,chunkSize),
				lineMat = new THREE.MeshLambertMaterial({
					color: 0xffffff
				}),
				line = new THREE.Mesh(lineGeo,lineMat);
			line.receiveShadow = true;

			let leftShoulder = line.clone();
			leftShoulder.position.set(-chunkSize*0.375,0,0.01);
			this.surface.add(leftShoulder);

			let rightShoulder = line.clone();
			rightShoulder.position.set(chunkSize*0.375,0,0.01);
			this.surface.add(rightShoulder);

			// dotted lines
			let dotLineGeo = new THREE.PlaneBufferGeometry(lineWidth,lineHeight),
				dotLineMat = new THREE.MeshLambertMaterial({
					color: 0xffffff
				}),
				dotLine = new THREE.Mesh(dotLineGeo,dotLineMat);

			for (let l = 0; l < dotLines; ++l) {
				let y = chunkSize/2 - (chunkSize / dotLines) * l - lineHeight/2;

				let leftLine = dotLine.clone();
				leftLine.position.set(-chunkSize*0.125,y,0.01);
				this.surface.add(leftLine);

				let rightLine = dotLine.clone();
				rightLine.position.set(chunkSize*0.125,y,0.01);
				this.surface.add(rightLine);
			}
		}
	}
	class Vehicle {
		constructor(args) {
			this.color = args.color || randomInt(0x171717,0xcccccc);
			this.x = args.x || 0;
			this.z = args.z || 0;
			this.width = 1;
			this.height = 1;
			this.depth = 1;
			this.speed = args.speed || 1;
			this.acceleration = args.acceleration || 0;
			this.model = null;
			this.name = args.name || "";

			this.maxSpeed = 4;
			this.isSteering = false;
			this.steerAngle = 0;
			this.maxSteerAngle = 30;
			this.steerSpeed = 0.15;
			this.steerDir = "";
			this.xLimit = 20;
			this.crashed = false;
			this.deceleration = 0.01;

			// 0: car, 1: truck, 2: tractor trailer
			let modelID = args.modelID;

			if (modelID === undefined)
				modelID = Math.round(Math.random() * 2)

			// dimensions refer to hitbox
			switch (modelID) {
				case 1:
					this.width = 5;
					this.height = 5;
					this.depth = 10;
					this.model = new Truck(this.color,this.x,this.z,this.name); 
					break;
				case 2:
					this.width = 5;
					this.height = 8;
					this.depth = 18;
					this.model = new TractorTrailer(this.color,this.x,this.z,this.name);
					break;
				default:
					this.width = 5;
					this.height = 4;
					this.depth = 10;
					this.model = new Car(this.color,this.x,this.z,this.name);
					break;
			}
		}
		accelerate() {
			if (this.speed < this.maxSpeed) {
				this.speed += this.acceleration;
				this.speed = +(this.speed).toFixed(3);
			}
		}
		decelerate() {
			if (this.speed > 0) {
				this.speed -= this.deceleration;
				this.speed = +(this.speed).toFixed(3);

				if (this.speed < 0)
					this.speed = 0;
			}
		}
		move() {
			let mesh = this.model.mesh;

			// normal forward direction
			this.z -= this.speed;
			mesh.position.z = this.z;

			// handle steering
			if (this.isSteering && !this.crashed) {
				if (this.steerDir == "left") {
					this.x -= this.steerSpeed;

					if (this.steerAngle < this.maxSteerAngle)
						++this.steerAngle;
				}
				else if (this.steerDir == "right") {
					this.x += this.steerSpeed;

					if (this.steerAngle > -this.maxSteerAngle)
						--this.steerAngle;
				}

			// undo steering
			} else if (!this.crashed) {
				if (this.steerAngle > 0) {
					--this.steerAngle;
					this.x -= this.steerSpeed;

				} else if (this.steerAngle < 0) {
					++this.steerAngle;
					this.x += this.steerSpeed;
				}
			}

			// auto crash if out of bounds
			if (this.x < -this.xLimit || this.x > this.xLimit) {
				this.crashed = true;
				game.over = true;
			}

			mesh.position.x = this.x;
			mesh.rotation.y = this.steerAngle * Math.PI/180;

			if (!this.crashed) {
				mesh.getObjectByName("FL").rotation.y = mesh.rotation.y;
				mesh.getObjectByName("FR").rotation.y = mesh.rotation.y;
			}
		}
		steer(dir) {
			this.isSteering = true;
			this.steerDir = dir;
		}
		straighten() {
			this.isSteering = false;
			this.steerDir = "";
		}
	}
	class Car {
		constructor(color,x,z,name) {
			// I. Group
			this.mass = 3;
			this.mesh = new THREE.Object3D();
			this.mesh.name = name;
			this.mesh.position.set(x,2,z);
			scene.add(this.mesh);

			// II. Body
			var carBodyBase = new THREE.Mesh(new THREE.BoxBufferGeometry(5,3,10)),
				cutFront = new THREE.Mesh(new THREE.BoxBufferGeometry(5,1,3)),
				cutBack = new THREE.Mesh(new THREE.BoxBufferGeometry(5,1,2)),
				frontTireHoles = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.2,1.2,5,16,16,false)),
				backTireHoles = frontTireHoles.clone();

			cutFront.position.set(0,1,-3.5);
			cutBack.position.set(0,1,4);

			frontTireHoles.position.set(0,-1.5,-3);
			frontTireHoles.rotation.z = 90 * Math.PI/180;

			backTireHoles.position.set(0,-1.5,3);
			backTireHoles.rotation.z = frontTireHoles.rotation.z;

			carBodyBase.updateMatrix();
			cutFront.updateMatrix();
			cutBack.updateMatrix();
			frontTireHoles.updateMatrix();
			backTireHoles.updateMatrix();

			var carBodyBase_BSP = CSG.fromMesh(carBodyBase),
				cutFront_BSP = CSG.fromMesh(cutFront),
				cutBack_BSP = CSG.fromMesh(cutBack),
				frontTireHoles_BSP = CSG.fromMesh(frontTireHoles),
				backTireHoles_BSP = CSG.fromMesh(backTireHoles),
				carBody_BSP = carBodyBase_BSP
					.subtract(cutFront_BSP)
					.subtract(cutBack_BSP)
					.subtract(frontTireHoles_BSP)
					.subtract(backTireHoles_BSP),
				carBody = CSG.toMesh(carBody_BSP, carBodyBase.matrix);

			carBody.material = new THREE.MeshLambertMaterial({
				color: color
			});
			carBody.position.set(0,0.5,0);
			carBody.castShadow = true;
			this.mesh.add(carBody);

			// III. Wheels
			var wheelGeo = new THREE.CylinderBufferGeometry(1,1,0.5,24,24,false),
				wheelMat = new THREE.MeshLambertMaterial({
					color: 0x171717
				}),
				wheel = new THREE.Mesh(wheelGeo,wheelMat);
			wheel.castShadow = true;
			wheel.rotation.z = -0.5 * Math.PI;

			var wheelPos = [
				{x: -2.25, y: -1, z: 3, name: "BL"},
				{x: 2.25, y: -1, z: 3, name: "BR"},
				{x: -2.25, y: -1, z: -3, name: "FL"},
				{x: 2.25, y: -1, z: -3, name: "FR"}
			];
			for (let p of wheelPos) {
				var w = wheel.clone();
				w.name = p.name;
				w.position.set(p.x,p.y,p.z);
				this.mesh.add(w);
			}

			// IV. Windows
			var windowMat = new THREE.MeshLambertMaterial({
					color: 0x171717
				}),

				horzWindowGeo = new THREE.PlaneBufferGeometry(4.4,0.8),
				horzWindowMat = windowMat,
				horzWindow = new THREE.Mesh(horzWindowGeo,horzWindowMat),

				midFrontWindowGeo = new THREE.PlaneBufferGeometry(2.3,0.8),
				midFrontWindowMat = windowMat,
				midFrontWindow = new THREE.Mesh(midFrontWindowGeo,midFrontWindowMat),

				midBackWindowGeo = new THREE.PlaneBufferGeometry(1.5,0.8),
				midBackWindowMat = windowMat,
				midBackWindow = new THREE.Mesh(midBackWindowGeo,midBackWindowMat);

			horzWindow.receiveShadow = true;
			midFrontWindow.receiveShadow = true;
			midBackWindow.receiveShadow = true;

			var leftMFWindow = midFrontWindow.clone();
			leftMFWindow.position.set(-2.51,1.4,-0.4);
			leftMFWindow.rotation.y = -0.5 * Math.PI;
			this.mesh.add(leftMFWindow);

			var rightMFWindow = midFrontWindow.clone();
			rightMFWindow.position.set(2.51,1.4,-0.4);
			rightMFWindow.rotation.y = 0.5 * Math.PI;
			this.mesh.add(rightMFWindow);

			var leftMBWindow = midBackWindow.clone();
			leftMBWindow.position.set(-2.51,1.4,1.9);
			leftMBWindow.rotation.y = -0.5 * Math.PI;
			this.mesh.add(leftMBWindow);

			var rightMBWindow = midBackWindow.clone();
			rightMBWindow.position.set(2.51,1.4,1.9);
			rightMBWindow.rotation.y = 0.5 * Math.PI;
			this.mesh.add(rightMBWindow);

			var frontWindow = horzWindow.clone();
			frontWindow.position.set(0,1.4,-2.01);
			frontWindow.rotation.y = Math.PI;
			this.mesh.add(frontWindow);

			var backWindow = horzWindow.clone();
			backWindow.position.set(0,1.4,3.01);
			this.mesh.add(backWindow);

			// V. Lights
			var lightGeo = new THREE.PlaneBufferGeometry(1,0.5),
				frontLightMat = new THREE.MeshLambertMaterial({
					color: 0xf1f1f1
				}),
				frontLight = new THREE.Mesh(lightGeo,frontLightMat),
				backLightMat = new THREE.MeshLambertMaterial({
					color: 0xf65555
				}),
				backLight = new THREE.Mesh(lightGeo,backLightMat);

			frontLight.rotation.y = Math.PI;

			var frontLeftLight = frontLight.clone();
			frontLeftLight.position.set(-2,0.25,-5.01);
			this.mesh.add(frontLeftLight);

			var frontRightLight = frontLight.clone();
			frontRightLight.position.set(2,0.25,-5.01);
			this.mesh.add(frontRightLight);

			var backLeftLight = backLight.clone();
			backLeftLight.position.set(-2,0.25,5.01);
			this.mesh.add(backLeftLight);

			var backRightLight = backLight.clone();
			backRightLight.position.set(2,0.25,5.01);
			this.mesh.add(backRightLight);
		}
	}
	class Truck {
		constructor(color,x,z,name) {
			// I. Group
			this.mass = 4;
			this.mesh = new THREE.Object3D();
			this.mesh.name = name;
			this.mesh.position.set(x,2.5,z);
			scene.add(this.mesh);

			// II. Body
			var truckBodyBase = new THREE.Mesh(new THREE.BoxBufferGeometry(5,4,10)),
				cutFront = new THREE.Mesh(new THREE.BoxBufferGeometry(5,1.5,2.5)),
				cutBack = new THREE.Mesh(new THREE.BoxBufferGeometry(5,1.5,4.5)),
				frontTireHoles = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.2,1.2,5,16,16,false)),
				backTireHoles = frontTireHoles.clone(),
				trunk = new THREE.Mesh(new THREE.BoxBufferGeometry(4.4,1.5,4));

			cutFront.position.set(0,1.25,-3.75);
			cutBack.position.set(0,1.25,3);

			frontTireHoles.position.set(0,-2,-3);
			frontTireHoles.rotation.z = 90 * Math.PI/180;

			backTireHoles.position.set(0,-2,3);
			backTireHoles.rotation.z = frontTireHoles.rotation.z;

			trunk.position.set(0,0.1,2.75);

			truckBodyBase.updateMatrix();
			cutFront.updateMatrix();
			cutBack.updateMatrix();
			frontTireHoles.updateMatrix();
			backTireHoles.updateMatrix();
			trunk.updateMatrix();

			var truckBodyBase_BSP = CSG.fromMesh(truckBodyBase),
				cutFront_BSP = CSG.fromMesh(cutFront),
				cutBack_BSP = CSG.fromMesh(cutBack),
				frontTireHoles_BSP = CSG.fromMesh(frontTireHoles),
				backTireHoles_BSP = CSG.fromMesh(backTireHoles),
				trunk_BSP = CSG.fromMesh(trunk),
				truckBody_BSP = truckBodyBase_BSP
					.subtract(cutFront_BSP)
					.subtract(cutBack_BSP)
					.subtract(frontTireHoles_BSP)
					.subtract(backTireHoles_BSP)
					.subtract(trunk_BSP),
				truckBody = CSG.toMesh(truckBody_BSP, truckBodyBase.matrix);

			truckBody.material = new THREE.MeshLambertMaterial({
				color: color
			});
			truckBody.position.set(0,0.5,0);
			truckBody.castShadow = true;
			this.mesh.add(truckBody);

			// III. Wheels
			var wheelGeo = new THREE.CylinderBufferGeometry(1,1,0.5,24,24,false),
				wheelMat = new THREE.MeshLambertMaterial({
					color: 0x171717
				}),
				wheel = new THREE.Mesh(wheelGeo,wheelMat);
			wheel.castShadow = true;
			wheel.rotation.z = -0.5 * Math.PI;

			var wheelPos = [
				{x: -2.25, y: -1.5, z: 3, name: "BL"},
				{x: 2.25, y: -1.5, z: 3, name: "BR"},
				{x: -2.25, y: -1.5, z: -3, name: "FL"},
				{x: 2.25, y: -1.5, z: -3, name: "FR"}
			];
			for (let p of wheelPos) {
				var w = wheel.clone();
				w.name = p.name;
				w.position.set(p.x,p.y,p.z);
				this.mesh.add(w);
			}

			// IV. Windows
			var windowMat = new THREE.MeshLambertMaterial({
					color: 0x171717
				}),

				horzWindowGeo = new THREE.PlaneBufferGeometry(4.4,1.2),
				horzWindowMat = windowMat,
				horzWindow = new THREE.Mesh(horzWindowGeo,horzWindowMat),

				midFrontWindowGeo = new THREE.PlaneBufferGeometry(1.4,1.2),
				midFrontWindowMat = windowMat,
				midFrontWindow = new THREE.Mesh(midFrontWindowGeo,midFrontWindowMat),

				midBackWindowGeo = new THREE.PlaneBufferGeometry(1,1.2),
				midBackWindowMat = windowMat,
				midBackWindow = new THREE.Mesh(midBackWindowGeo,midBackWindowMat);

			horzWindow.receiveShadow = true;
			midFrontWindow.receiveShadow = true;
			midBackWindow.receiveShadow = true;

			var leftMFWindow = midFrontWindow.clone();
			leftMFWindow.position.set(-2.51,1.55,-1.55);
			leftMFWindow.rotation.y = -0.5 * Math.PI;
			this.mesh.add(leftMFWindow);

			var rightMFWindow = midFrontWindow.clone();
			rightMFWindow.position.set(2.51,1.55,-1.55);
			rightMFWindow.rotation.y = 0.5 * Math.PI;
			this.mesh.add(rightMFWindow);

			var leftMBWindow = midBackWindow.clone();
			leftMBWindow.position.set(-2.51,1.55,-0.05);
			leftMBWindow.rotation.y = -0.5 * Math.PI;
			this.mesh.add(leftMBWindow);

			var rightMBWindow = midBackWindow.clone();
			rightMBWindow.position.set(2.51,1.55,-0.05);
			rightMBWindow.rotation.y = 0.5 * Math.PI;
			this.mesh.add(rightMBWindow);

			var frontWindow = horzWindow.clone();
			frontWindow.position.set(0,1.55,-2.51);
			frontWindow.rotation.y = Math.PI;
			this.mesh.add(frontWindow);

			var backWindow = horzWindow.clone();
			backWindow.position.set(0,1.55,0.76);
			this.mesh.add(backWindow);

			/// V. Lights
			var lightGeo = new THREE.PlaneBufferGeometry(0.75,1),
				frontLightMat = new THREE.MeshLambertMaterial({
					color: 0xf1f1f1
				}),
				frontLight = new THREE.Mesh(lightGeo,frontLightMat),
				backLightMat = new THREE.MeshLambertMaterial({
					color: 0xf65555
				}),
				backLight = new THREE.Mesh(lightGeo,backLightMat);

			frontLight.rotation.y = Math.PI;

			var frontLeftLight = frontLight.clone();
			frontLeftLight.position.set(-2.125,0.25,-5.01);
			this.mesh.add(frontLeftLight);

			var frontRightLight = frontLight.clone();
			frontRightLight.position.set(2.125,0.25,-5.01);
			this.mesh.add(frontRightLight);

			var backLeftLight = backLight.clone();
			backLeftLight.position.set(-2.125,0.25,5.01);
			this.mesh.add(backLeftLight);

			var backRightLight = backLight.clone();
			backRightLight.position.set(2.125,0.25,5.01);
			this.mesh.add(backRightLight);
		}
	}
	class TractorTrailer {
		constructor(color,x,z,name) {
			// I. Group
			this.mass = 12;
			this.mesh = new THREE.Object3D();
			this.mesh.name = name;
			this.mesh.position.set(x,4,z);
			scene.add(this.mesh);

			// II. Cab
			var cabPt1Geo = new THREE.BoxBufferGeometry(5,4,5),
				cabPt1Mat = new THREE.MeshLambertMaterial({
					color: color
				}),
				cabPt1 = new THREE.Mesh(cabPt1Geo,cabPt1Mat);
			cabPt1.position.set(0,1,-6.5);
			cabPt1.castShadow = true;
			this.mesh.add(cabPt1);

			var cabPt2Geo = new THREE.BoxBufferGeometry(5,2,0.5),
				cabPt2Mat = cabPt1Mat,
				cabPt2 = new THREE.Mesh(cabPt2Geo,cabPt2Mat);
			cabPt2.position.set(0,-2,-8.75);
			cabPt2.castShadow = true;
			this.mesh.add(cabPt2);

			var cabPt3Geo = new THREE.BoxBufferGeometry(3,2,8.25),
				cabPt3Mat = new THREE.MeshLambertMaterial({
					color: 0x3f3f3f
				}),
				cabPt3 = new THREE.Mesh(cabPt3Geo,cabPt3Mat);
			cabPt3.position.set(0,-2,-4.375);
			cabPt3.castShadow = true;
			this.mesh.add(cabPt3);

			var cabLeftWindowGeo = new THREE.PlaneBufferGeometry(2.5,2),
				cabLeftWindowMat = new THREE.MeshLambertMaterial({
					color: 0x171717
				}),
	        	cabLeftWindow = new THREE.Mesh(cabLeftWindowGeo,cabLeftWindowMat);
			cabLeftWindow.position.set(-2.51,1,-7.75);
			cabLeftWindow.rotation.y = -0.5 * Math.PI;
			cabLeftWindow.receiveShadow = true;
			this.mesh.add(cabLeftWindow);

			var cabRightWindow = cabLeftWindow.clone();
			cabRightWindow.position.x = -cabLeftWindow.position.x;
			cabRightWindow.rotation.y = -cabLeftWindow.rotation.y;
			this.mesh.add(cabRightWindow);

			var cabFrontWindowGeo = new THREE.PlaneBufferGeometry(5,2),
				cabFrontWindowMat = cabLeftWindowMat,
	        	cabFrontWindow = new THREE.Mesh(cabFrontWindowGeo,cabFrontWindowMat);
			cabFrontWindow.position.set(0,1,-9.01);
			cabFrontWindow.rotation.y = Math.PI;
			cabFrontWindow.receiveShadow = true;
			this.mesh.add(cabFrontWindow);

			var lightGeo = new THREE.PlaneBufferGeometry(1,1),
				lightMat = new THREE.MeshLambertMaterial({
					color: 0xf1f1f1
				}),
				light = new THREE.Mesh(lightGeo,lightMat);

			light.rotation.y = Math.PI;

			var leftLight = light.clone();
			leftLight.position.set(-1.5,-1.5,-9.01);
			this.mesh.add(leftLight);

			var rightLight = light.clone();
			rightLight.position.set(1.5,-1.5,-9.01);
			this.mesh.add(rightLight);

			// III. Metal Cylinders
			var cabLeftCylinderGeo = new THREE.CylinderBufferGeometry(0.75,0.75,2.25,16,16,false),
				cabLeftCylinderMat = new THREE.MeshLambertMaterial({
					color: 0x7f7f7f
				}),
				cabLeftCylinder = new THREE.Mesh(cabLeftCylinderGeo,cabLeftCylinderMat);
			cabLeftCylinder.position.set(-2.25,-1.875,-3.875);
			cabLeftCylinder.rotation.x = -0.5 * Math.PI;
			cabLeftCylinder.castShadow = true;
			this.mesh.add(cabLeftCylinder);

			var cabRightCylinder = cabLeftCylinder.clone();
			cabRightCylinder.position.x = -cabLeftCylinder.position.x;
			this.mesh.add(cabRightCylinder);

			// IV. Trailer
			var trailerGeo = new THREE.BoxBufferGeometry(5,5,12),
				trailerMat = new THREE.MeshLambertMaterial({
					color: 0xffffff
				}),
				trailer = new THREE.Mesh(trailerGeo,trailerMat);
			trailer.position.set(0,1.5,3);
			trailer.castShadow = true;
			this.mesh.add(trailer);

			var trailerBottomGeo = new THREE.BoxBufferGeometry(3,2,2),
				trailerBottomMat = cabPt3Mat,
				trailerBottom = new THREE.Mesh(trailerBottomGeo,trailerBottomMat);
			trailerBottom.position.set(0,-2,7);
			trailerBottom.castShadow = true;
			this.mesh.add(trailerBottom);

			// V. Wheels
			var wheelGeo = new THREE.CylinderBufferGeometry(1.5,1.5,1,24,24,false),
				wheelMat = new THREE.MeshLambertMaterial({
					color: 0x242424
				}),
				wheel = new THREE.Mesh(wheelGeo,wheelMat);
			wheel.castShadow = true;
			wheel.rotation.z = -0.5 * Math.PI;

			var wheelPos = [
				{x: -2, y: -2.5, z: 7, name: "BL"},
				{x: 2, y: -2.5, z: 7, name: "BR"},
				{x: -2, y: -2.5, z: -1, name: "ML"},
				{x: 2, y: -2.5, z: -1, name: "MR"},
				{x: -2, y: -2.5, z: -6.75, name: "FL"},
				{x: 2, y: -2.5, z: -6.75, name: "FR"}
			];
			for (let p of wheelPos) {
				var w = wheel.clone();
				w.name = p.name;
				w.position.set(p.x,p.y,p.z);
				this.mesh.add(w);
			}
		}
	}
	class Spark {
		constructor(x,y,z,isHorz = false) {
			this.center = new THREE.Object3D();
			this.center.name = "Spark";
			this.center.position.set(x,y,z);
			scene.add(this.center);

			this.isHorz = isHorz;
			this.particles = [];

			// populate particles
			let particleGeo = new THREE.SphereBufferGeometry(1,16,16),
				particleMat = new THREE.MeshBasicMaterial({
					color: 0xffff00
				}),
				particleMesh = new THREE.Mesh(particleGeo,particleMat);

			for (var m = 0; m < randomInt(6,8); ++m) {
				this.particles.push({
					x: 0,
					y: 0,
					z: 0,
					size: 1,
					speed: 0.2,
					decay: 0.04,
					angle: randomInt(0,359),
					mesh: particleMesh.clone()
				});
				this.center.add(this.particles[m].mesh);
			}
		}
		moveParticles() {
			// shrink particles as they move
			for (let p of this.particles) {
				if (p.size > 0) {
					p.size -= p.decay;

					if (this.isHorz === true) {
						p.x += p.speed * Math.sin(p.angle * Math.PI/180);
						p.mesh.position.x = p.x;
					}
					else {
						p.z += p.speed * Math.sin(p.angle * Math.PI/180);
						p.mesh.position.z = p.z;
					}

					p.y += p.speed * Math.cos(p.angle * Math.PI/180);
					p.mesh.position.y = p.y;

					p.mesh.scale.x = p.size;
					p.mesh.scale.y = p.size;
					p.mesh.scale.z = p.size;
				}
			}
		}
	}

	var init = () => {
			// I. Setting Up Scene
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,2000);
			renderer = new THREE.WebGLRenderer({
				logarithmicDepthBuffer: true
			});
			renderer.setClearColor(new THREE.Color(skyColor));
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.shadowMap.enabled = true;

			// II. Lighting
			// A. Ambient
			var ambientLight = new THREE.AmbientLight(0xffffff);
			ambientLight.name = "Ambient Light";
			scene.add(ambientLight);

			// B. Hemisphere
			hemiLight = new THREE.HemisphereLight(0x0044ff, 0xffffff, 0.5);
			hemiLight.name = "Hemisphere Light";
			hemiLight.position.set(0,5,0);
			scene.add(hemiLight);
			
			// C. Point
			pointLight = new THREE.PointLight(0xffffff,0.5);
			pointLight.name = "Point Light";
			pointLight.position.set(0,60,pointLightZ);
			pointLight.castShadow = true;
			pointLight.shadow.mapSize = new THREE.Vector2(1024,1024);
			scene.add(pointLight);

			// III. Scenery
			// A. Road
			for (let r = 1; r > -renderDistance; --r)
				roadChunks.push(new RoadChunk(r));

			// B. Grass
			var firstChunkSize = roadChunks[0].chunkSize,
				grassDepth = firstChunkSize * (renderDistance + 1),
				grassGeo = new THREE.PlaneBufferGeometry(400,grassDepth),
				grassMat = new THREE.MeshLambertMaterial({
					color: 0xbbe868
				}),
				grass = new THREE.Mesh(grassGeo,grassMat);

			grass.name = "Grass";
			grass.rotation.x = -Math.PI/2;
			grass.position.set(0,-0.05,-grassDepth/2 + firstChunkSize*1.5);
			grass.receiveShadow = true;
			scene.add(grass);

			// C. Fog
			scene.fog = new THREE.Fog(skyColor, 0.01, grassDepth - firstChunkSize*2);

			// IV. Camera
			camera.position.set(0,cameraYMin,30);
			camera.lookAt(scene.position);
			
			// V. Rendering
			document.body.appendChild(renderer.domElement);
		},
		checkCollision = (a,b) => {
			if (!a.crashed && !b.crashed && (a.name != b.name)) {
				let A_left = a.x - a.width/2,
					A_right = a.x + a.width/2,
					A_front = a.z - a.depth/2,
					A_back = a.z + a.depth/2,
					B_left = b.x - b.width/2,
					B_right = b.x + b.width/2,
					B_front = b.z - b.depth/2,
					B_back = b.z + b.depth/2;

				// right hits left, left hits right
				let touchedX_RL = (A_left <= B_right && A_left >= B_left),
					touchedX_LR = (A_right >= B_left && A_right <= B_right),
				// front hits back, back hits front
					touchedZ_FB = (A_front <= B_back && A_front >= B_front),
					touchedZ_BF = (A_back >= B_front && A_back <= B_back);
				
				if ((touchedX_RL || touchedX_LR) && (touchedZ_FB || touchedZ_BF)) {
					var newMomentum = (a.model.mass * a.speed + b.model.mass * b.speed)/(a.model.mass + b.model.mass);

					a.speed = newMomentum;
					b.speed = newMomentum;
					
					let sx = 0,
						sz = 0;

					// x-center the spark between crashing ends
					if (A_left <= B_right)
						sx = (A_left + B_right)/2;
					else if (A_right >= B_left)
						sx = (A_right + B_left)/2;

					// then z-center it
					if (A_front <= B_back)
						sz = (A_front + B_back)/2;
					else if (A_back >= B_front)
						sz = (A_back + B_front)/2;

					// trigger spark for player vehicle
					if (a.name == "Vehicle 0") {
						a.crashed = true;
						game.over = true;
						game.spark = new Spark(sx,a.height/2,sz,A_front - B_back < 1);
					}
				}
			}
		},
		toggleDifBtnStates = () => {
			for (let b of difButtons)
				b.disabled = !b.disabled;
		},
		toggleDifMenu = () => {
			difSelectActive = !difSelectActive;

			let activeClass = "menu-active",
				inactiveClass = "menu-inactive";

			if (difSelectActive) {
				difSelect.classList.remove(inactiveClass);
				void difSelect.offsetWidth;
				difSelect.classList.add(activeClass);
				setTimeout(toggleDifBtnStates,1500);

			} else {
				difSelect.classList.remove(activeClass);
				void difSelect.offsetWidth;
				difSelect.classList.add(inactiveClass);
				toggleDifBtnStates();
			}
		},
		toggleScoreCounter = () => {
			scoreCounterActive = !scoreCounterActive;

			let activeClass = "score-active";

			if (scoreCounterActive)
				header.classList.add(activeClass);
			else
				header.classList.remove(activeClass);
		},
		toggleReplayBtn = () => {
			replayBtnActive = !replayBtnActive;
			replayButton.disabled = !replayBtnActive;

			let activeClass = "replay-active";

			if (replayBtnActive)
				replayButton.classList.add(activeClass);
			else
				replayButton.classList.remove(activeClass);
		},
		showTutorial = () => {
			if (game.tutorial)
				tutorialBox.classList.add("tutorial-active");
		},
		hideTutorial = () => {
			if (game.tutorial) {
				game.tutorial = false;
				tutorialBox.classList.remove("tutorial-active");
			}
		},
		startGame = difficulty => {
			if (game != null && game.over) {
				// remove spark
				if (game.spark != null) {
					let sparkName = scene.getObjectByName(game.spark.name);
					scene.remove(sparkName);
				}
				// remove all vehicles
				for (let v of game.vehicles) {
					let vehicleName = scene.getObjectByName(v.name);
					scene.remove(vehicleName);
				}
			}

			// first time or starting anew
			if (game == null || game.over) {
				game = new Game({
					difficulty: difficulty,
					tutorial: game == null
				});
				header.innerHTML = game.score;
				toggleScoreCounter();
				showTutorial();
			}
		},
		update = () => {
			// intro sequence
			if (cameraY > cameraYMin) {
				cameraY -= 0.5;
				if (cameraY == cameraYMin)
					toggleDifMenu();
			}

			// normal game function
			if (game != null && cameraY == cameraYMin) {
				let firstChunkSize = roadChunks[0].chunkSize,
					vehicleCtrld = game.vehicles[game.vehicleIDCtrld];

				// push all vehicles forward one chunk when player reaches that distance
				if (vehicleCtrld.z <= -firstChunkSize) {
					let vehiclesBehind = [];
					game.vehicles.forEach((e,i) => {
						e.z += firstChunkSize;

						// mark for removal if no longer seen
						if (e.z - e.depth/2 > vehicleCtrld.z + firstChunkSize/2) {
							vehiclesBehind.push({
								index: i,
								name: e.name
							});
						}
					});
					// remove vehicles way behind, score
					vehiclesBehind.sort((a,b) => b.index - a.index);
					for (let v of vehiclesBehind) {
						let objectName = scene.getObjectByName(v.name);
						scene.remove(objectName);
						game.vehicles.splice(v.index,1);

						// score points for passing without using shoulder
						if (Math.abs(vehicleCtrld.x) < game.noScoreXZone) {
							++game.score;
							header.innerHTML = game.score;
						}
					}

					// and then spawn 0–3 new ones
					if (game.vehicles.length < game.vehicleLimit && !game.tutorial) {
						let spawnTries = 3;
						while (spawnTries--) {
							if (Math.random() < 0.05 + game.difficulty * 0.025) {
								game.vehicles.push(new Vehicle({
									x: (-1 + spawnTries) * 10,
									z: -renderDistance * firstChunkSize - spawnTries * 15,
									name: "Vehicle " + game.vehicleSpawns
								}));
								++game.vehicleSpawns;
							}
						}
					}
				}

				// move vehicles
				let vehiclesAhead = [];
				game.vehicles.forEach((e,i) => {
					e.move();

					for (let v of game.vehicles)
						checkCollision(e,v);

					if (!game.tutorial) {
						if (!e.crashed)
							e.accelerate();
						else {
							e.decelerate();

							// spinout if steering
							if (e.steerAngle > 0)
								e.steerAngle += e.speed * e.steerSpeed;
							else if (e.steerAngle < 0)
								e.steerAngle -= e.speed * e.steerSpeed;
						}
					}
					
					// mark for removal if no longer seen
					if (e.z < (-renderDistance - 1.5) * firstChunkSize) {
						vehiclesAhead.push({
							index: i,
							name: e.name
						});
					}
				});
				// remove vehicles way ahead
				vehiclesAhead.sort((a,b) => b.index - a.index);
				for (let v of vehiclesAhead) {
					let objectName = scene.getObjectByName(v.name);
					scene.remove(objectName);
					game.vehicles.splice(v.index,1);
				}

				// spark from crash
				if (game.spark != null) {
					game.spark.moveParticles();
					game.spark.center.position.z = vehicleCtrld.z - (game.spark.isHorz ? vehicleCtrld.depth/2 : 0);
				}

				// show difficulty menu on game over
				if (vehicleCtrld.speed <= 0 && game.over && !game.preparingNew && !replayBtnActive)
					toggleReplayBtn();

				// center spotlight and camera on player vehicle
				pointLight.position.z = vehicleCtrld.z + pointLightZ;
				camera.position.set(0,cameraY,vehicleCtrld.z + 30);

			} else {
				pointLight.position.z = pointLightZ;
				camera.position.set(0,cameraY,30);
			}

			renderer.render(scene,camera);
			requestAnimationFrame(update);
		},
		adjustWindow = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth,window.innerHeight)
		},
		steerVehicle = e => {
			if (game != null && !game.over && game.vehicles.length) {
				let playerVehicle = game.vehicles[game.vehicleIDCtrld];

				// left arrow, A, or drag left
				if ((e.keyCode && (e.keyCode == 37 || e.keyCode == 65)) || 
					(touch.hold && e.pageX < touch.x)) {
					playerVehicle.steer("left");
					hideTutorial();

				// right arrow, D, or drag right
				} else if ((e.keyCode && (e.keyCode == 39 || e.keyCode == 68)) || 
					(touch.hold && e.pageX > touch.x)) {
					playerVehicle.steer("right");
					hideTutorial();
				}
			}
		},
		straightenVehicle = () => {
			if (game != null && !game.over && game.vehicles.length) {
				game.vehicles[game.vehicleIDCtrld].straighten();
			}
			touch.hold = false;
		},
		getTouchHold = e => {
			touch.hold = true;
			touch.x = e.pageX;
		};

	init();
	update();
	
	window.addEventListener("resize",adjustWindow);

	// steering
	var downEvent = "ontouchstart" in document.documentElement ? "touchstart" : "mousedown",
		moveEvent = "ontouchmove" in document.documentElement ? "touchmove" : "mousemove",
		upEvent = "ontouchend" in document.documentElement ? "touchend" : "mouseup";

	document.addEventListener("keydown",steerVehicle);
	document.addEventListener("keyup",straightenVehicle);
	document.addEventListener(downEvent,getTouchHold);
	document.addEventListener(moveEvent,steerVehicle);
	document.addEventListener(upEvent,straightenVehicle);

	// difficulty buttons
	for (let b of difButtons) {
		b.addEventListener("click",function(){
			toggleDifMenu();

			let t = this;
			setTimeout(() => {
				startGame(t.getAttribute("data-difficulty"));
			},1600);
		});
	}

	// replay button
	replayButton.addEventListener("click",function(){
		game.preparingNew = true;
		toggleScoreCounter();
		toggleReplayBtn();
		setTimeout(toggleDifMenu,250);
	});
}