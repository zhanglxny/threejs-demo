<script setup lang="ts">
import * as Three from 'three'
import GeoJson from '@/assets/dongguashan_map.json'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//创建场景
const scene = new Three.Scene()

//创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//设置相机位置
camera.position.set(0, 0, 100)
scene.add(camera)

//GeoJson数据过滤
const nodeData = GeoJson.features.filter((item: any) => {
  return item.properties.type === 'node'
})

// //创建点材质
const pointMaterial = new Three.PointsMaterial({
  color: 0x00ff00,
  size: 0.1
})
// 创建点的几何体
const pointGeometry = new Three.BufferGeometry()
const positions = new Float32Array(nodeData.length * 3); // 3 for X, Y, Z per point

//使用点数据循环绘制点材质
for (let i = 0; i < nodeData.length; i++) {
  const { local_x: x, local_y: y, ele: z } = nodeData[i].properties.tags
  positions[i * 3] = x  // 随机X坐标
  positions[i * 3 + 1] = y  // 随机Y坐标
  positions[i * 3 + 2] = z  // 随机Z坐标
}

pointGeometry.setAttribute('position', new Three.BufferAttribute(positions, 3));

// 创建点云对象
const pointCloud = new Three.Points(pointGeometry, pointMaterial)

// 将点云添加到场景中
scene.add(pointCloud)

//创建渲染器
const renderer = new Three.WebGLRenderer()
//设置渲染的容器
renderer.setSize(window.innerWidth, window.innerHeight)
//将渲染器添加到页面中
document.body.appendChild(renderer.domElement)

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
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  render()
}
</script>
