import * as THREE from 'three';

export type VehicleConfig = {
  headlights: boolean;
  steering: 'reversed' | 'calibrated';
  dashboard: boolean;
  obstacleDetection: boolean;
  tyres: 'dry' | 'wet' | 'slicks';
};

/** Original procedural student race prototype. Forward is −Z; the tyres touch y=0. */
export function createVehicle(): {
  group: THREE.Group;
  setConfig(config: VehicleConfig): void;
  animate(time: number, steeringAngle?: number): void;
  dispose(): void;
} {
  const group = new THREE.Group();
  group.name = 'autocrew-race-prototype';
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const geometry = <T extends THREE.BufferGeometry>(item: T): T => {
    geometries.add(item);
    return item;
  };
  const material = <T extends THREE.Material>(item: T): T => {
    materials.add(item);
    return item;
  };
  const paint = (color: string, metalness = 0.35, roughness = 0.34) => material(new THREE.MeshStandardMaterial({ color, metalness, roughness }));
  const orange = paint('#ff6c21', 0.38, 0.27);
  const navy = paint('#152b46', 0.48, 0.3);
  const carbon = paint('#101923', 0.22, 0.48);
  const aluminium = paint('#adb7bd', 0.78, 0.29);
  const gunmetal = paint('#3d505c', 0.65, 0.36);
  const rubber = paint('#111719', 0.04, 0.9);
  const treadRubber = paint('#05090b', 0.02, 1);
  const seatMaterial = paint('#222a32', 0.04, 0.91);
  const strapMaterial = paint('#ff6125', 0.12, 0.72);
  const tyreBandMaterial = paint('#d5e0e8', 0.18, 0.48);
  const lightMaterial = material(new THREE.MeshStandardMaterial({ color: '#79909b', emissive: '#c8eeff', emissiveIntensity: 0, roughness: 0.15, metalness: 0.25 }));
  const dashboardMaterial = material(new THREE.MeshStandardMaterial({ color: '#172c36', emissive: '#63e9c6', emissiveIntensity: 0, metalness: 0.1, roughness: 0.28 }));
  const sensorMaterial = material(new THREE.MeshStandardMaterial({ color: '#173b44', emissive: '#50e8d1', emissiveIntensity: 0, metalness: 0.5, roughness: 0.3 }));
  const brakeLightMaterial = material(new THREE.MeshStandardMaterial({ color: '#d63129', emissive: '#ff331a', emissiveIntensity: 0.6, roughness: 0.3 }));
  const beamMaterial = material(new THREE.MeshBasicMaterial({ color: '#afe6ff', transparent: true, opacity: 0.08, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  const poolMaterial = material(new THREE.MeshBasicMaterial({ color: '#d1f1ff', transparent: true, opacity: 0.14, depthWrite: false, blending: THREE.AdditiveBlending }));
  const sensorBeamMaterial = material(new THREE.MeshBasicMaterial({ color: '#5dffe0', transparent: true, opacity: 0.15, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  const sensorLineMaterial = material(new THREE.LineBasicMaterial({ color: '#69f8d8', transparent: true, opacity: 0.55, depthWrite: false }));

  const box = geometry(new THREE.BoxGeometry(1, 1, 1));
  const cylinder = geometry(new THREE.CylinderGeometry(1, 1, 1, 18, 1));
  const thinCylinder = geometry(new THREE.CylinderGeometry(1, 1, 1, 10, 1));
  const tyreGeometry = geometry(new THREE.CylinderGeometry(0.42, 0.42, 0.36, 32, 1));
  const rimGeometry = geometry(new THREE.CylinderGeometry(0.28, 0.28, 0.325, 24, 1));
  const rimRingGeometry = geometry(new THREE.TorusGeometry(0.279, 0.016, 6, 24));
  const bandGeometry = geometry(new THREE.TorusGeometry(0.369, 0.009, 4, 32));
  const steeringRingGeometry = geometry(new THREE.TorusGeometry(0.152, 0.019, 7, 24, Math.PI * 1.72));
  const poolGeometry = geometry(new THREE.CircleGeometry(1, 32));

  const mesh = (name: string, geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D = group) => {
    const item = new THREE.Mesh(geo, mat);
    item.name = name;
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  };
  const block = (name: string, mat: THREE.Material, size: [number, number, number], position: [number, number, number], parent: THREE.Object3D = group) => {
    const item = mesh(name, box, mat, parent);
    item.scale.set(...size);
    item.position.set(...position);
    return item;
  };
  type Section = { z: number; width: number; bottom: number; top: number };
  // A section has a low floor, broad shoulders and a shallow crown, creating a
  // sculpted silhouette without textures or imported meshes.
  function loft(name: string, sections: Section[], mat: THREE.Material, parent: THREE.Object3D = group) {
    const positions: number[] = [];
    const indices: number[] = [];
    for (const section of sections) {
      const { z, width: w, bottom: b, top: t } = section;
      positions.push(-w * 0.8, b, z, w * 0.8, b, z, w, b + (t - b) * 0.68, z, w * 0.68, t, z, -w * 0.68, t, z, -w, b + (t - b) * 0.68, z);
    }
    for (let s = 0; s < sections.length - 1; s++) {
      for (let r = 0; r < 6; r++) {
        const a = s * 6 + r;
        const b = s * 6 + (r + 1) % 6;
        const c = a + 6;
        const d = b + 6;
        indices.push(a, b, c, b, d, c);
      }
    }
    for (let r = 1; r < 5; r++) {
      indices.push(0, r + 1, r);
      const end = (sections.length - 1) * 6;
      indices.push(end, end + r, end + r + 1);
    }
    const geo = geometry(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return mesh(name, geo, mat, parent);
  }

  // Monocoque, nose, floor and aerodynamic surfaces.
  block('carbon-floor', carbon, [1.22, 0.075, 3.54], [0, 0.265, -0.07]);
  loft('orange-sculpted-nose', [
    { z: -2.18, width: 0.12, bottom: 0.3, top: 0.39 },
    { z: -1.8, width: 0.23, bottom: 0.31, top: 0.46 },
    { z: -1.22, width: 0.34, bottom: 0.3, top: 0.58 },
    { z: -0.74, width: 0.42, bottom: 0.3, top: 0.79 },
    { z: -0.44, width: 0.47, bottom: 0.29, top: 0.81 },
  ], orange);
  loft('navy-nose-stripe', [
    { z: -2.19, width: 0.035, bottom: 0.387, top: 0.398 },
    { z: -1.8, width: 0.05, bottom: 0.459, top: 0.469 },
    { z: -1.22, width: 0.067, bottom: 0.58, top: 0.588 },
    { z: -0.74, width: 0.09, bottom: 0.79, top: 0.801 },
    { z: -0.45, width: 0.09, bottom: 0.81, top: 0.823 },
  ], navy);
  block('cockpit-well', carbon, [0.8, 0.15, 1.04], [0, 0.39, 0.15]);
  for (const side of [-1, 1]) {
    const sill = loft(`cockpit-sill-${side}`, [
      { z: -0.43, width: 0.08, bottom: 0.29, top: 0.79 },
      { z: 0.1, width: 0.08, bottom: 0.29, top: 0.66 },
      { z: 0.7, width: 0.1, bottom: 0.29, top: 0.86 },
    ], orange);
    sill.position.x = side * 0.41;
    const pod = loft(`navy-sidepod-${side}`, [
      { z: -0.33, width: 0.105, bottom: 0.3, top: 0.5 },
      { z: 0.03, width: 0.2, bottom: 0.3, top: 0.65 },
      { z: 0.77, width: 0.2, bottom: 0.3, top: 0.62 },
      { z: 1.12, width: 0.125, bottom: 0.3, top: 0.43 },
    ], navy);
    pod.position.x = side * 0.65;
    const intake = block(`sidepod-intake-${side}`, carbon, [0.21, 0.17, 0.042], [side * 0.64, 0.47, -0.29]);
    intake.rotation.y = side * 0.1;
    block(`sidepod-orange-pinstripe-${side}`, orange, [0.021, 0.035, 0.82], [side * 0.855, 0.54, 0.45]);
  }
  loft('rear-engine-cover', [
    { z: 0.55, width: 0.36, bottom: 0.31, top: 0.78 },
    { z: 0.93, width: 0.32, bottom: 0.31, top: 0.87 },
    { z: 1.37, width: 0.26, bottom: 0.31, top: 0.53 },
    { z: 1.6, width: 0.17, bottom: 0.31, top: 0.41 },
  ], orange);
  block('front-wing-main', carbon, [2.11, 0.05, 0.29], [0, 0.18, -2.14]);
  const frontWing = block('front-wing-upper-flap', navy, [1.9, 0.045, 0.17], [0, 0.28, -1.99]);
  frontWing.rotation.x = -0.18;
  for (const side of [-1, 1]) block(`front-wing-endplate-${side}`, orange, [0.035, 0.28, 0.38], [side * 1.055, 0.245, -2.11]);
  block('rear-wing-main', navy, [1.64, 0.065, 0.36], [0, 1.11, 1.84]);
  const rearFlap = block('rear-wing-upper-flap', orange, [1.62, 0.045, 0.17], [0, 1.24, 1.91]);
  rearFlap.rotation.x = -0.16;
  for (const side of [-1, 1]) {
    block(`rear-wing-pylon-${side}`, gunmetal, [0.034, 0.61, 0.14], [side * 0.3, 0.76, 1.72]);
    block(`rear-wing-endplate-${side}`, carbon, [0.038, 0.32, 0.47], [side * 0.84, 1.12, 1.84]);
  }
  block('rear-brake-light', brakeLightMaterial, [0.12, 0.07, 0.045], [0, 0.48, 1.625]);

  // Cockpit upholstery, harness, wheel and small illuminated instrument panel.
  block('seat-base', seatMaterial, [0.49, 0.085, 0.47], [0, 0.49, 0.18]);
  const backrest = block('seat-back', seatMaterial, [0.49, 0.56, 0.12], [0, 0.75, 0.47]);
  backrest.rotation.x = -0.18;
  const headrest = block('seat-headrest', carbon, [0.25, 0.17, 0.12], [0, 1.035, 0.54]);
  headrest.rotation.x = -0.18;
  for (const side of [-1, 1]) {
    const strap = block(`shoulder-harness-${side}`, strapMaterial, [0.052, 0.45, 0.016], [side * 0.12, 0.735, 0.389]);
    strap.rotation.x = -0.18;
  }
  block('harness-buckle', aluminium, [0.09, 0.055, 0.029], [0, 0.525, 0.315]);
  const steering = new THREE.Group();
  steering.name = 'steering-wheel';
  steering.position.set(0, 0.765, -0.19);
  steering.rotation.x = -0.31;
  group.add(steering);
  const ring = mesh('steering-rim', steeringRingGeometry, carbon, steering);
  ring.rotation.z = Math.PI * 0.14;
  block('steering-spoke', gunmetal, [0.24, 0.035, 0.028], [0, -0.012, 0], steering);
  block('steering-centre', orange, [0.07, 0.065, 0.034], [0, -0.023, 0.01], steering);
  const dash = block('dashboard-frame', carbon, [0.31, 0.16, 0.055], [0, 0.815, -0.34]);
  dash.rotation.x = -0.19;
  const dashScreen = block('dashboard-screen', dashboardMaterial, [0.25, 0.105, 0.012], [0, 0.82, -0.305]);
  dashScreen.rotation.x = -0.19;
  const dashBars = new THREE.InstancedMesh(box, material(new THREE.MeshBasicMaterial({ color: '#99ffe3' })), 5);
  dashBars.name = 'dashboard-readout';
  const instance = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    instance.position.set(-0.08 + i * 0.04, 0.82, -0.296);
    instance.rotation.set(-0.19, 0, 0);
    instance.scale.set(0.014, 0.02 + i * 0.009, 0.002);
    instance.updateMatrix();
    dashBars.setMatrixAt(i, instance.matrix);
  }
  dashBars.instanceMatrix.needsUpdate = true;
  group.add(dashBars);

  // Suspension and roll-hoop tubing are instanced: 27 rods share one draw call.
  const rods: { start: THREE.Vector3; end: THREE.Vector3; radius: number }[] = [];
  const rod = (start: [number, number, number], end: [number, number, number], radius = 0.017) => rods.push({ start: new THREE.Vector3(...start), end: new THREE.Vector3(...end), radius });
  for (const side of [-1, 1]) {
    for (const z of [-1.4, 1.25]) {
      rod([side * 0.28, 0.31, z - 0.24], [side * 0.93, 0.36, z]);
      rod([side * 0.28, 0.31, z + 0.24], [side * 0.93, 0.36, z]);
      rod([side * 0.31, 0.61, z - 0.18], [side * 0.93, 0.48, z]);
      rod([side * 0.31, 0.61, z + 0.18], [side * 0.93, 0.48, z]);
      rod([side * 0.33, 0.74, z + 0.1], [side * 0.87, 0.33, z], 0.025);
    }
    rod([side * 0.3, 0.68, 0.61], [side * 0.3, 1.37, 0.71], 0.036);
    rod([side * 0.3, 1.37, 0.71], [side * 0.18, 1.49, 0.71], 0.036);
    rod([side * 0.3, 1.2, 0.72], [side * 0.21, 0.52, 1.28], 0.025);
  }
  rod([-0.18, 1.49, 0.71], [0.18, 1.49, 0.71], 0.036);
  const tubing = new THREE.InstancedMesh(thinCylinder, aluminium, rods.length);
  tubing.name = 'suspension-and-roll-hoop';
  const up = new THREE.Vector3(0, 1, 0);
  const vector = new THREE.Vector3();
  rods.forEach(({ start, end, radius }, i) => {
    vector.subVectors(end, start);
    instance.position.copy(start).add(end).multiplyScalar(0.5);
    instance.quaternion.setFromUnitVectors(up, vector.clone().normalize());
    instance.scale.set(radius, vector.length(), radius);
    instance.updateMatrix();
    tubing.setMatrixAt(i, instance.matrix);
  });
  tubing.instanceMatrix.needsUpdate = true;
  tubing.castShadow = true;
  tubing.receiveShadow = true;
  group.add(tubing);

  // Four wheels: suspension steering owns the pivot; spin owns the axle.
  const wheelPivots: THREE.Group[] = [];
  const wheelSpins: THREE.Group[] = [];
  const wetTreads: THREE.InstancedMesh[] = [];
  for (const z of [-1.4, 1.25]) {
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.name = `${z < 0 ? 'front' : 'rear'}-${side < 0 ? 'left' : 'right'}-wheel`;
      pivot.position.set(side * 1.025, 0.42, z);
      group.add(pivot);
      const spin = new THREE.Group();
      spin.name = 'wheel-axle';
      pivot.add(spin);
      wheelPivots.push(pivot);
      wheelSpins.push(spin);
      const tyre = mesh('rubber-tyre', tyreGeometry, rubber, spin);
      tyre.rotation.z = Math.PI / 2;
      const rim = mesh('rim-barrel', rimGeometry, gunmetal, spin);
      rim.rotation.z = Math.PI / 2;
      const rimRing = mesh('rim-lip', rimRingGeometry, aluminium, spin);
      rimRing.rotation.y = Math.PI / 2;
      rimRing.position.x = side * 0.183;
      const band = mesh('tyre-compound-band', bandGeometry, tyreBandMaterial, spin);
      band.rotation.y = Math.PI / 2;
      band.position.x = side * 0.187;
      const hub = mesh('hub-nut', cylinder, orange, spin);
      hub.rotation.z = Math.PI / 2;
      hub.scale.set(0.06, 0.38, 0.06);
      const spokes = new THREE.InstancedMesh(box, aluminium, 7);
      spokes.name = 'wheel-spokes';
      for (let i = 0; i < 7; i++) {
        const angle = i / 7 * Math.PI * 2;
        instance.position.set(side * 0.177, Math.sin(angle) * 0.15, Math.cos(angle) * 0.15);
        instance.rotation.set(-angle, 0, 0);
        instance.scale.set(0.027, 0.032, 0.235);
        instance.updateMatrix();
        spokes.setMatrixAt(i, instance.matrix);
      }
      spokes.castShadow = true;
      spokes.instanceMatrix.needsUpdate = true;
      spin.add(spokes);
      const treads = new THREE.InstancedMesh(box, treadRubber, 32);
      treads.name = 'wet-tyre-grooves';
      for (let i = 0; i < 32; i++) {
        const angle = (i + 0.5) / 32 * Math.PI * 2;
        // Keep the groove on the tyre facet. Rotate about the local surface
        // normal for a chevron pattern, rather than tilting it through the floor.
        instance.position.set(0, Math.sin(angle) * 0.414, Math.cos(angle) * 0.414);
        instance.rotation.set(Math.PI / 2 - angle, i % 2 ? -0.13 : 0.13, 0);
        instance.scale.set(0.31, 0.009, 0.014);
        instance.updateMatrix();
        treads.setMatrixAt(i, instance.matrix);
      }
      treads.instanceMatrix.needsUpdate = true;
      spin.add(treads);
      wetTreads.push(treads);
    }
  }

  // Headlights have an emissive lens, translucent beam and floor pool. One
  // inexpensive shared spotlight gives actual floor illumination, without shadows.
  const headlightEffects = new THREE.Group();
  headlightEffects.name = 'headlight-beams';
  group.add(headlightEffects);
  const coneLength = 2.3;
  const coneGeometry = geometry(new THREE.ConeGeometry(0.56, coneLength, 24, 1, true));
  coneGeometry.translate(0, -coneLength / 2, 0);
  const negativeY = new THREE.Vector3(0, -1, 0);
  const lightDirection = new THREE.Vector3(0, -0.18, -1).normalize();
  for (const side of [-1, 1]) {
    block(`headlight-housing-${side}`, carbon, [0.14, 0.072, 0.08], [side * 0.4, 0.39, -1.72]);
    block(`headlight-lens-${side}`, lightMaterial, [0.112, 0.044, 0.013], [side * 0.4, 0.392, -1.766]);
    const cone = mesh(`headlight-beam-${side}`, coneGeometry, beamMaterial, headlightEffects);
    cone.position.set(side * 0.4, 0.39, -1.78);
    cone.quaternion.setFromUnitVectors(negativeY, lightDirection);
    cone.castShadow = false;
    cone.receiveShadow = false;
    const pool = mesh(`headlight-floor-pool-${side}`, poolGeometry, poolMaterial, headlightEffects);
    pool.position.set(side * 0.45, 0.012, -3.43);
    pool.rotation.x = -Math.PI / 2;
    pool.scale.set(0.48, 0.85, 1);
    pool.castShadow = false;
    pool.receiveShadow = false;
  }
  const light = new THREE.SpotLight('#d9f3ff', 5, 6, 0.49, 0.75, 1.5);
  light.name = 'headlight-floor-light';
  light.position.set(0, 0.42, -1.6);
  light.target.position.set(0, 0, -3.8);
  headlightEffects.add(light, light.target);

  // Sensor fan is illustrative, not an autonomous-driving physics simulation.
  const sensors = new THREE.Group();
  sensors.name = 'obstacle-detection-fan';
  group.add(sensors);
  const scanner = mesh('lidar-scanner', cylinder, sensorMaterial);
  scanner.position.set(0, 1.05, 0.73);
  scanner.scale.set(0.092, 0.085, 0.092);
  const sensorLens = block('front-sensor-lens', sensorMaterial, [0.095, 0.041, 0.022], [0, 0.37, -2.193]);
  sensorLens.castShadow = false;
  const fanPositions = [0, 0.045, -2.17, -1.15, 0.045, -4.48, 1.15, 0.045, -4.48];
  const fanGeometry = geometry(new THREE.BufferGeometry());
  fanGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fanPositions, 3));
  fanGeometry.computeVertexNormals();
  const fan = mesh('sensor-coverage', fanGeometry, sensorBeamMaterial, sensors);
  fan.castShadow = false;
  fan.receiveShadow = false;
  const linePoints: number[] = [];
  for (let i = 0; i < 7; i++) linePoints.push(0, 0.051, -2.17, -1.15 + i / 6 * 2.3, 0.051, -4.48);
  const lineGeometry = geometry(new THREE.BufferGeometry());
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
  const lines = new THREE.LineSegments(lineGeometry, sensorLineMaterial);
  lines.name = 'sensor-rays';
  sensors.add(lines);

  let config: VehicleConfig = { headlights: false, steering: 'reversed', dashboard: false, obstacleDetection: false, tyres: 'dry' };
  let disposed = false;
  function setConfig(next: VehicleConfig) {
    if (disposed) return;
    config = { ...next };
    headlightEffects.visible = config.headlights;
    lightMaterial.emissiveIntensity = config.headlights ? 2.8 : 0;
    lightMaterial.color.set(config.headlights ? '#e8faff' : '#536673');
    dashboardMaterial.emissiveIntensity = config.dashboard ? 1.7 : 0;
    dashboardMaterial.color.set(config.dashboard ? '#55d8b7' : '#172c36');
    dashBars.visible = config.dashboard;
    sensors.visible = config.obstacleDetection;
    sensorMaterial.emissiveIntensity = config.obstacleDetection ? 1.2 : 0;
    sensorMaterial.color.set(config.obstacleDetection ? '#53e9cf' : '#173b44');
    tyreBandMaterial.color.set(config.tyres === 'wet' ? '#63decf' : config.tyres === 'slicks' ? '#ffd45a' : '#d5e0e8');
    wetTreads.forEach(item => { item.visible = config.tyres === 'wet'; });
    group.userData.vehicleConfig = { ...config };
  }
  function animate(time: number, steeringAngle = 0) {
    if (disposed) return;
    const angle = THREE.MathUtils.clamp(steeringAngle, -0.52, 0.52) * (config.steering === 'reversed' ? -1 : 1);
    wheelPivots[0].rotation.y = angle;
    wheelPivots[1].rotation.y = angle;
    steering.rotation.z = angle * 1.65;
    // Callers own translation/speed. Setting userData.speed animates rolling;
    // stationary showroom previews retain their pose and do not spin needlessly.
    const speed = typeof group.userData.speed === 'number' ? group.userData.speed : 0;
    for (const wheel of wheelSpins) wheel.rotation.x = -time * speed / 0.42;
    scanner.rotation.y = config.obstacleDetection ? time * 1.3 : 0;
    if (config.obstacleDetection) sensorBeamMaterial.opacity = 0.11 + Math.sin(time * 2.1) * 0.035;
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    group.removeFromParent();
    group.traverse(item => {
      if (item instanceof THREE.InstancedMesh) item.dispose();
      if (item instanceof THREE.Light) item.dispose();
    });
    geometries.forEach(item => item.dispose());
    materials.forEach(item => item.dispose());
    group.clear();
  }
  setConfig(config);
  return { group, setConfig, animate, dispose };
}
