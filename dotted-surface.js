(function () {
  var container = document.getElementById('dotted-surface');
  if (!container) return;

  var SEPARATION = 150;
  var AMOUNTX = 40;
  var AMOUNTY = 60;

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0a, 2000, 10000);

  var hero = container.parentElement;
  var width = hero.offsetWidth;
  var height = hero.offsetHeight;

  var camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set(0, 355, 1220);

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  container.appendChild(renderer.domElement);

  // Build particle positions and colors
  var positions = [];
  var colors = [];

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      var x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
      var y = 0;
      var z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      positions.push(x, y, z);
      colors.push(200, 200, 200);
    }
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  var material = new THREE.PointsMaterial({
    size: 8,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  var points = new THREE.Points(geometry, material);
  scene.add(points);

  var count = 0;

  function animate() {
    requestAnimationFrame(animate);

    var posAttr = geometry.attributes.position;
    var arr = posAttr.array;

    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        var idx = i * 3;
        arr[idx + 1] =
          Math.sin((ix + count) * 0.3) * 50 +
          Math.sin((iy + count) * 0.5) * 50;
        i++;
      }
    }

    posAttr.needsUpdate = true;
    renderer.render(scene, camera);
    count += 0.1;
  }

  function handleResize() {
    var w = hero.offsetWidth;
    var h = hero.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', handleResize);
  animate();
})();
