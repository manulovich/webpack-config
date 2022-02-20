import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../styles/style.css';

const playground = document.querySelector('.board-description__three-playground');

const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight( '#fff' ));

const camera = new THREE.PerspectiveCamera(
    75,
    playground.clientWidth / playground.clientHeight,
    .1,
    1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(playground.clientWidth, playground.clientHeight);
playground.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();

const modelLoader = new GLTFLoader();
modelLoader.load(
    '../assets/model/lolinNode.glb',
    (gltf) => {
        
        scene.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const render = () => {
    requestAnimationFrame(render);

    scene.rotation.x += .005;
    scene.rotation.y += .005;

    renderer.render(scene, camera);
};

render();