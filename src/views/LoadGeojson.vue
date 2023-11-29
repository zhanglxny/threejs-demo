<script setup lang="ts">
import * as Three from 'three'
import GeoJson from '@/assets/dongguashan_map.json'
import mapJson from '@/assets/mapJson.json'
import mapPoint from '@/assets/mapPoint.json'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import PNG_1 from '@/assets/1.png'
import PNG_2 from '@/assets/2.png'

//创建场景
const scene = new Three.Scene()

//创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//设置相机位置
camera.position.set(0, 0, 100)
scene.add(camera)

//创建点材质
const pointMaterialRoad = new Three.PointsMaterial({
  color: 0x00ff00,
  size: 0.1
})

const drawPointMap = (nodeData: any[]) => {
  // 创建点的几何体
  const pointGeometry = new Three.BufferGeometry()
  const positions = new Float32Array(nodeData.length * 3); // 3 for X, Y, Z per point

  //使用点数据循环绘制点材质
  for (let i = 0; i < nodeData.length; i++) {
    const { x, y, z } = nodeData[i]
    positions[i * 3] = x  // 随机X坐标
    positions[i * 3 + 1] = y  // 随机Y坐标
    positions[i * 3 + 2] = z  // 随机Z坐标
  }

  pointGeometry.setAttribute('position', new Three.BufferAttribute(positions, 3));

  // 创建点云对象
  const pointCloud = new Three.Points(pointGeometry, pointMaterialRoad)

  // 将点云添加到场景中
  scene.add(pointCloud)
}

mapJson.data.map(val => {
  for (let i in val) {
    drawPointMap(val[i])
  }
})


//创建点材质
const pointGeometry = new Three.BufferGeometry();
const textureA = new Three.TextureLoader().load(PNG_1);
const textureB = new Three.TextureLoader().load(PNG_2);
const pointMaterial = new Three.PointsMaterial({ map: textureA });
let { x, y, z } = mapPoint.data.nobind[0];
x = 0;
y = 0;
z = 0;
const vertices = new Float32Array([x, y, z]);
pointGeometry.setAttribute('position', new Three.BufferAttribute(vertices, 3));

const point = new Three.Points(pointGeometry, pointMaterial);
scene.add(point);

const raycaster = new Three.Raycaster();
const mouse = new Three.Vector2();
document.addEventListener('click', onClick, false);

function onClick(event) {
    // 将点击位置转换为Three.js坐标系下的位置
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // 检测点击的物体
    var intersects = raycaster.intersectObjects([point]);

    console.log(intersects);

    if (intersects.length > 0) {
        // 切换材质
        pointMaterial.map = (pointMaterial.map === textureA) ? textureB : textureA;
        pointMaterial.needsUpdate = true;
    }
}

//创建渲染器
const renderer = new Three.WebGLRenderer()
//设置渲染的容器
renderer.setSize(window.innerWidth, window.innerHeight)
//将渲染器添加到页面中
document.querySelector('#app').appendChild(renderer.domElement)

//创建OrbitControls控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

//监听画面变化，更新渲染画面
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  const app = document.querySelector('#app')
  camera.aspect = app.clientWidth / app.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(app.clientWidth, app.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  render()
}
</script>
