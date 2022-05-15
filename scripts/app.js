import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/MTLLoader.js';

const canvas = document.querySelector('.game');
const renderer = new THREE.WebGLRenderer({canvas});
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0x404040, .5);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
const directionalLight = new THREE.DirectionalLight(0xffffff,100);

const directionalHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);


directionalLight.position.set(0,0,0);
directionalHelper.castShadow = true;

let w = canvas.width = scene.width = innerWidth;
let h = canvas.height = scene.height = innerHeight;

renderer.setSize(w, h);
camera.position.set(10, 0, 30);

scene.add(ambientLight, directionalLight, cameraHelper, directionalHelper)


window.onresize = function(){
	w = canvas.width = innerWidth,
	h = canvas.height = innerHeight;        
};


// objLoader.load('./models/Knife.obj', (model) => {
// 	scene.add(model);
// });

mtlLoader.load('./models/Knife.mtl', (mesh) => {
	mesh.preload();

	objLoader.setMaterials(mesh)
	objLoader.load('./models/Knife.obj', (model) => {
		scene.add(model);
	});
});



function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
};

animate();