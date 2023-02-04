// Instantiate a loader
const loader = new THREE.GLTFLoader();
main = {
	settings: {
		container: document.getElementById("two"),

		width: window.innerWidth,
		height: window.innerHeight,

		camera: {
			field_of_view: 45,

			near: 0.1,
			far: 100000
		}
	},

	scene_settings: {
		camera_movement: {
			speed: 230,
			rot_speed: Math.PI / 2,

			up: false,
			down: false,
			left: 0,
			right: 0,


			jumping: false,

			jump_max_speed_reached: false,
			jump_max_speed: 6,

			jump_speed_current: 2,
			jump_speed_delta: 0.5,

			jump_current_height: 0,
		},

		tilesize: 80,

		hedgeheight: 85,

		textRotationSpeed: Math.PI / 8,
	},

	maze: generate_maze(31, 31),

	renderer: new THREE.WebGLRenderer({ antialias: true }),
	camera: null, // created by main.start()
	scene: new THREE.Scene(),

	clock: new THREE.Clock(),

	objects: {
		hedges: [],
	},

	start: function (event) {
		// setup stats.js
		main.stats = new Stats();
		main.stats.domElement.style.position = "absolute";
		main.stats.domElement.style.top = "0";
		main.stats.domElement.style.left = "0";
		document.body.appendChild(main.stats.domElement);

		console.log("Setting up 3D world...");

		//// Renderer Setup ////
		main.resize();
		main.settings.container.appendChild(main.renderer.domElement); // add the view to the web page
		////////////////////////

		//// Camera Setup ////
		main.camera = new THREE.PerspectiveCamera(
			main.settings.camera.field_of_view,
			main.settings.width / main.settings.height, // aspect ratio
			main.settings.camera.near,
			main.settings.camera.far
		);

		main.camera.position.set(
			main.scene_settings.tilesize,
			60,
			-main.scene_settings.tilesize);
		main.camera.rotation.y = Math.PI;
		main.scene.add(main.camera); // add the camera to the scene
		//////////////////////

		/// Light ///
		main.light = new THREE.PointLight(0xffffff);

		main.light.position.set(0, 60, 100);
		main.scene.add(main.light);

		main.amlight = new THREE.AmbientLight(0x666666);
		main.scene.add(main.amlight);
		/////////////

		//------------------------------------------

		/// Skybox ///
		var skymats = [
			new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("textures/skybox/left.jpg") }),	// posx
			new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("textures/skybox/right.jpg") }),	// negx
			new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("textures/skybox/up.jpg") }),	// posy
			new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("textures/skybox/down.jpg") }),	// negy
			new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("textures/skybox/front.jpg") }),	// posz
			new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture("textures/skybox/back.jpg") }) // negz
		];

		main.skybox = new THREE.Mesh(
			new THREE.BoxGeometry(
				100000,
				100000,
				100000
			),
			new THREE.MeshFaceMaterial(skymats) // doesn't need lighting
		);

		main.scene.add(main.skybox);
		//////////////

		/// Floor ///
		var grassTexture = THREE.ImageUtils.loadTexture("textures/grass.jpg");
		grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
		grassTexture.repeat.set(300, 300);
		main.floor = new THREE.Mesh(
			new THREE.PlaneGeometry(100000, 100000),
			new THREE.MeshPhongMaterial({
				//				color: 0x36b832,
				map: grassTexture,
				side: THREE.DoubleSide
			})
		);

		main.floor.rotation.x = Math.PI / 2;
		main.scene.add(main.floor);
		/////////////

		main.prepare_objects();
		main.setup_input();

		//main.camera.lookAt(main.objects.cube.position); // look at the cube

		main.nextframe(); // render stuff
		console.log("done.");
	},

	prepare_objects: function () {
		/// Cube ///
		//		main.objects.cube = new THREE.Mesh(
		//			new THREE.BoxGeometry(50, 50, 50),
		//			new THREE.MeshLambertMaterial({ color: 0x9f91ed })
		//		);
		//		
		//		main.objects.cube.position.set(0, 25, 0);
		//		main.scene.add(main.objects.cube);
		////////////
		var hedgematerial = new THREE.MeshPhongMaterial({
			//				color: 0x266120,
			shininess: 10,
			map: THREE.ImageUtils.loadTexture("textures/hedge.jpg")
		}),
			tilesize = main.scene_settings.tilesize,
			hedgeheight = main.scene_settings.hedgeheight;


		for (var x = 0; x < main.maze.length; x++) {
			for (var y = 0; y < main.maze[x].length; y++) {
				if (main.maze[x][y] == "#") {
					var curhedge = new THREE.Mesh(
						new THREE.BoxGeometry(tilesize, hedgeheight, tilesize),
						hedgematerial
					);
					curhedge.position.y = hedgeheight / 2;

					curhedge.position.x = x * tilesize;
					curhedge.position.z = y * tilesize;
					main.objects.hedges.push(curhedge);
					main.scene.add(curhedge);
				}
			}
		}

		// Load a glTF resource
		loader.load(
			// resource URL
			'qrca.glb',
			// called when the resource is loaded
			function (gltf) {
				gltf.scene.traverse( function ( child ) {
					if ( child.isMesh ) {
						child.geometry.center(); // center here
					}
				});
				main.objects.model = gltf.scene;
				main.objects.model.scale.set(10,10,10);
				console.log(main.objects.model);

				main.objects.model.position.set(
					((main.maze.length * main.scene_settings.tilesize) / 2) - tilesize,
					60,
					((main.maze[0].length * main.scene_settings.tilesize) / 2) - tilesize
				);
				main.scene.add(main.objects.model);

			},
			// called while loading is progressing
			function (xhr) {

				console.log((xhr.loaded / xhr.total * 100) + '% loaded');

			},
			// called when loading has errors
			function (error) {

				console.log('An error happened');

			}
		);
	},

	setup_input: function () {
		main.kibo = new Kibo();

		main.kibo.down("up", function () { main.scene_settings.camera_movement.up = true; });
		main.kibo.up("up", function () { main.scene_settings.camera_movement.up = false; });

		main.kibo.down("down", function () { main.scene_settings.camera_movement.down = true; });
		main.kibo.up("down", function () { main.scene_settings.camera_movement.down = false; });

		main.kibo.down("left", function () {
			main.scene_settings.camera_movement.left = main.scene_settings.camera_movement.rot_speed;
		});
		main.kibo.up("left", function () { main.scene_settings.camera_movement.left = 0; });

		main.kibo.down("right", function () {
			main.scene_settings.camera_movement.right = main.scene_settings.camera_movement.rot_speed;
		});
		main.kibo.up("right", function () { main.scene_settings.camera_movement.right = 0; });
		main.kibo.up("space", function () {
			console.log("starting jump");
			main.scene_settings.camera_movement.jumping = true;
		});
	},

	update: function () {
		var dt = main.clock.getDelta();

		if (main.scene_settings.camera_movement.up || main.scene_settings.camera_movement.down) {
			var speed = -main.scene_settings.camera_movement.speed; // assume forwards motion

			if (main.scene_settings.camera_movement.down)
				speed = -speed; // we want to go backwards, not forwards!

			var theta = main.camera.rotation.y,
				dx = speed * Math.sin(theta) * dt,
				dz = speed * Math.cos(theta) * dt;

			var xtile = Math.floor(((main.camera.position.x + dx) / main.scene_settings.tilesize) + 0.5),
				ztile = Math.floor(((main.camera.position.z + dz) / main.scene_settings.tilesize) + 0.5);

			//document.getElementById("position").innerHTML = "(" + xtile + ", " + ztile + ")";


			if (typeof main.maze[xtile] == "undefined" ||
				typeof main.maze[xtile][ztile] == "undefined" ||
				main.maze[xtile][ztile] == " ") {
				main.camera.position.z += dz;
				main.camera.position.x += dx;
			}
			else {
				console.log("collision at (" + xtile + ", " + ztile + ")");
			}

			main.light.position.x = main.camera.position.x;
			main.light.position.y = main.camera.position.y;
			main.light.position.z = main.camera.position.z;
		}
		if (main.scene_settings.camera_movement.jumping) {
			var cm = main.scene_settings.camera_movement;
			//			console.log(cm);
			// speed adjustments
			if (!cm.jump_max_speed_reached)
				cm.jump_speed_current += cm.jump_speed_delta;
			else
				cm.jump_speed_current -= cm.jump_speed_delta;

			// speed clamping
			if (cm.jump_speed_current > cm.jump_max_speed)
				cm.jump_max_speed_reached = true;
			if (cm.jump_speed_current < -cm.jump_max_speed)
				cm.jump_speed_current = -cm.jump_max_speed;

			if (cm.jump_current_height < 0) // the jump has ended, reset everything ready for the next one
			{
				cm.jumping = false;
				cm.jump_max_speed_reached = false;
				cm.jump_speed_current = 2;
				cm.jump_current_height = 0;
				main.camera.position.y = 60;
			}
			else {
				cm.jump_current_height += cm.jump_speed_current;

				main.camera.position.y = 60 + cm.jump_current_height;
			}
		}

		// main.camera.rotation.x = 0;
		main.camera.rotation.y += main.scene_settings.camera_movement.left * dt;
		main.camera.rotation.y -= main.scene_settings.camera_movement.right * dt;
		//main.camera.rotation.x = THREE.Math.degToRad(-10);
	},

	resize: function () {
		main.settings.width = window.innerWidth;
		main.settings.height = window.innerHeight;
		main.renderer.setSize(main.settings.width, main.settings.height);
	},

	render: function () {
		main.renderer.render(main.scene, main.camera);
	},

	nextframe: function () {
		requestAnimationFrame(main.nextframe);

		main.stats.begin();

		main.update();
		main.render();

		main.stats.end();
	}
};

window.addEventListener("load", main.start);
window.addEventListener("resize", main.resize);
var result = "";
for (var x = 0; x < main.maze.length; x++) {
	for (var y = 0; y < main.maze[x].length; y++) {
		result += main.maze[x][y];
	}
	result += "\n";
}