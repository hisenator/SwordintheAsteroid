// Art 109 Three.js Demo Site
// client7.js
// A three.js scene which uses planes and texture loading to generate a scene with images which can be traversed with basic WASD and mouse controls, this scene is full screen with an overlay.

// Import required source code
// Import three.js core
import * as THREE from "../build/three.module.js";
import { GLTFLoader } from "../src/GLTFLoader.js";

// Import pointer lock controls
import {
  PointerLockControls
} from "../src/PointerLockControls.js";


import {
  FontLoader
} from "../src/FontLoader.js"
// Establish variables
let camera, scene, renderer, controls, material;

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {
  // Establish the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 10;

  // Define basic scene parameters
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000030);


  // CHANGE SCENE LIGHTING
  const light = new THREE.HemisphereLight(0x0000FF, 0x666688, 1.5);
  light.position.set(100, 1, 1.0);
  scene.add(light);

  // Define controls
  controls = new PointerLockControls(camera, document.body);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  // Listen
  instructions.addEventListener("click", function() {
    controls.lock();
  });
  // Remove overlays and begin controls on click
  controls.addEventListener("lock", function() {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  // Restore overlays and stop controls on esc
  controls.addEventListener("unlock", function() {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  // Add controls to scene
  scene.add(controls.getObject());

  // Define key controls for WASD controls
  const onKeyDown = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 550;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Add raycasting for mouse controls
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );



    // Generate the ground
    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);

    // Vertex displacement pattern for ground
    let position = floorGeometry.attributes.position;

    for (let i = 0, l = position.count; i < l; i++) {
      vertex.fromBufferAttribute(position, i);

      vertex.x += Math.random() * 50- 3;
      vertex.y += Math.random() *3;
      vertex.z += Math.random() *30 - 5;

      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for (let i = 0, l = position.count; i < l; i++) {
      color.setHSL(Math.random() * 0.2 + 0.9, 0.5, Math.random() * 0.2 + 0.1);
      colorsFloor.push(color.r, color.g, color.b);
    }

    floorGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsFloor, 3)
    );

    const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    // Insert completed floor into the scene
    scene.add(floor);


var mesh;
var mesh2;
var mesh3;
var mesh4;

  // Load GLTF model, add material, and add it to the scene
  const loader = new GLTFLoader().load(
    "../assets/crystalmoon.glb", // comment this line out and un comment the line below to swithc models
    //"./assets/gourd_web.glb", //<-- photogrammetery model
    function(gltf) {
      // Scan loaded model for mesh and apply defined material if mesh is present
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          //child.material = newMaterial;
        }
      });
        // set position and scale
        mesh = gltf.scene;
        mesh.position.set(450, 500, 300);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.set(12, 12, 12); // <-- change this to (1, 1, 1) for photogrammetery model
        // Add model to scene
        scene.add(mesh);
      },
      undefined,
      function(error) {
        console.error(error);
      }
    );



    // Load GLTF model, add material, and add it to the scene
    const loader2 = new GLTFLoader().load(
      "../assets/kaeairlock.glb", // comment this line out and un comment the line below to swithc models
      //"./assets/gourd_web.glb", //<-- photogrammetery model
      function(gltf) {
        // Scan loaded model for mesh and apply defined material if mesh is present
        gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            //child.material = newMaterial;
          }
        });
          // set position and scale
          mesh2 = gltf.scene;
          mesh2.position.set(0, 4, 0);
          mesh2.rotation.set(0, 20, 0);
          mesh2.scale.set(2, 2, 2); // <-- change this to (1, 1, 1) for photogrammetery model
          // Add model to scene
          scene.add(mesh2);
        },
        undefined,
        function(error) {
          console.error(error);
        }
      );

      // Load GLTF model, add material, and add it to the scene
      const loader3 = new GLTFLoader().load(
        "../assets/infinityship.glb", // comment this line out and un comment the line below to swithc models
        //"./assets/gourd_web.glb", //<-- photogrammetery model
        function(gltf) {
          // Scan loaded model for mesh and apply defined material if mesh is present
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              //child.material = newMaterial;
            }
          });
            // set position and scale
            mesh3 = gltf.scene;
            mesh3.position.set(-100, 15, -300);
            mesh3.rotation.set(0, 0, 0);
            mesh3.scale.set(10, 10, 10); // <-- change this to (1, 1, 1) for photogrammetery model
            // Add model to scene
            scene.add(mesh3);
          },
          undefined,
          function(error) {
            console.error(error);
          }
        );


        // Load GLTF model, add material, and add it to the scene
        const loader4 = new GLTFLoader().load(
          "../assets/sword.glb", // comment this line out and un comment the line below to swithc models
          //"./assets/gourd_web.glb", //<-- photogrammetery model
          function(gltf) {
            // Scan loaded model for mesh and apply defined material if mesh is present
            gltf.scene.traverse(function(child) {
              if (child.isMesh) {
                //child.material = newMaterial;
              }
            });
              // set position and scale
              mesh4 = gltf.scene;
              mesh4.position.set(0, 0, 100);
              mesh4.rotation.set(0, 0, 0);
              mesh4.scale.set(2, 2, 2); // <-- change this to (1, 1, 1) for photogrammetery model
              // Add model to scene
              scene.add(mesh4);
            },
            undefined,
            function(error) {
              console.error(error);
            }
          );





// highway sign 1
// Load image as texture
const texture = new THREE.TextureLoader().load( '../../assets/spaceyhighwaysign2.png' );
// immediately use the texture for material creation
const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
// Create plane geometry
const geometry = new THREE.PlaneGeometry( 200, 100 );
// Apply image texture to plane geometry
const plane = new THREE.Mesh( geometry, material );
// Position plane geometry
plane.position.set(-300 , 200 , -300);
// Place plane geometry
scene.add( plane );


  //highhway sign 2
  // Load image as texture
  const texture2 = new THREE.TextureLoader().load( '../../assets/spaceyhighwaysign1.png' );
  // immediately use the texture for material creation
  const material2 = new THREE.MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide } );
  // Create plane geometry
  const geometry2 = new THREE.PlaneGeometry( 200, 100 );
  // Apply image texture to plane geometry
  const plane2 = new THREE.Mesh( geometry2, material2 );
  // Position plane geometry
  plane2.position.set(300 , 100 , -200);
  // Place plane geometry
  scene.add( plane2 );







  // Define Rendered and html document placement
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Listen for window resizing
  window.addEventListener("resize", onWindowResize);
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation function
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 7.7 * 60.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 800.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 800.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }

  prevTime = time;

  renderer.render(scene, camera);
}
