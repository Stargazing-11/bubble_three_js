import * as THREE from "three";
// const loader = new THREE.TextureLoader();
// import bg_img from "./img/bg_img.jpg";

// // const canvas = document.querySelector("#canvas");

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const particlesGeometry = new THREE.BufferGeometry();
// const count = 3000;

// const positions = new Float32Array(count * 3);

// for (let i = 0; i < count * 3; i++) {
//   positions[i] = (Math.random() - 0.5) * 10;
// }

// particlesGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3)
// );

// const particlesMaterial = new THREE.PointsMaterial({
//   size: 0.01,
//   sizeAttenuation: true,
// });

// const particles = new THREE.Points(particlesGeometry, particlesMaterial);

// scene.add(particles);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.PlaneGeometry(2, 2); // Adjust size to cover entire window
// const material = new THREE.MeshBasicMaterial({
//   // color: 0x00ff00,
//   map: loader.load(bg_img),
//   side: THREE.DoubleSide, // Ensure the texture is visible from both sides
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);

//   // Update renderer size on window resize
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.render(scene, camera);
// }

// animate();

// ページの読み込みを待つ
window.addEventListener("load", init);

// canvasのサイズを指定
const width = window.innerWidth; //ブラウザの横の長さ
const height = window.innerHeight; //ブラウザの縦の長さ

function init() {
  // シーンを作る
  const scene = new THREE.Scene();

  // カメラを作る
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 500, 1000); // x,y,z座標でカメラの場所を指定

  // レンダラーを作る
  const canvasElement = document.querySelector("#canvas"); //HTMLのcanvasのid
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true, //アンチエイリアス
    alpha: true,
  });
  renderer.setSize(width, height);

  // ライトを作る
  const light = new THREE.AmbientLight(0xffffff, 1.0); //環境光源（色、光の強さ）
  light.position.set(0, 0, 0);
  scene.add(light);

  // 3Dオブジェクトを作る
  const x_size = window.innerWidth;
  const y_size = window.innerHeight;
  const length = 300;
  const plane_scale = 4;
  const plane = [];

  for (let i = 0; i < length; i++) {
    let geometry = new THREE.SphereGeometry(
      plane_scale,
      plane_scale,
      plane_scale
    );
    var material = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      opacity: 0.5,
      transparent: true,
    });

    plane[i] = new THREE.Mesh(geometry, material);

    plane[i].position.x = x_size * (Math.random() - 0.5);
    plane[i].position.y = y_size * (Math.random() - 0.5);
    plane[i].position.z = x_size * (Math.random() - 0.5);
    scene.add(plane[i]);
  }

  function random(min, max) {
    let rand = Math.floor(min + (max - min + 1) * Math.random());
    return rand;
  }

  tick();

  function tick() {
    for (let i = 0; i < length; i++) {
      plane[i].position.x += random(-5, 5) * 0.1;
      plane[i].position.y += 2.5;
      plane[i].position.z += random(-5, 5) * 0.1;
      if (plane[i].position.y > height) {
        plane[i].position.x = x_size * (Math.random() - 0.5);
        plane[i].position.y = 0;
        plane[i].position.z = x_size * (Math.random() - 0.5);
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  onResize();
  // リサイズイベント発生時に実行
  window.addEventListener("resize", onResize);

  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  //アニメ―ション
  function start() {
    renderer.render(scene, camera);
  }
  start();
}
