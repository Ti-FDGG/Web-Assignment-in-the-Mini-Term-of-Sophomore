document.addEventListener('DOMContentLoaded', function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particle-container').appendChild(renderer.domElement);

    camera.position.z = 200;

    const particleCount = 10000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3); // Adding velocities for movement

    const starColors = [
        new THREE.Color(1, 0.9, 0.9),  // Slightly red
        new THREE.Color(1, 1, 1),      // White
        new THREE.Color(0.9, 0.9, 1),  // Slightly blue
        new THREE.Color(1, 0.8, 0.6),  // Yellowish
        new THREE.Color(0.8, 0.8, 1)   // Pale blue
    ];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 500;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 500;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 500;

        const starColor = starColors[Math.floor(Math.random() * starColors.length)];
        colors[i * 3] = starColor.r;
        colors[i * 3 + 1] = starColor.g;
        colors[i * 3 + 2] = starColor.b;

        opacities[i] = Math.random();
        sizes[i] = Math.random() * 3 + 1;

        velocities[i * 3] = (Math.random() - 0.5) * 0.1;  // Random X velocity
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1; // Random Y velocity
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // Random Z velocity
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            pointTexture: { value: sprite }
        },
        vertexShader: `
            attribute float size;
            attribute float opacity;
            attribute vec3 velocity;
            varying float vOpacity;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vOpacity = opacity;
                vec3 newPosition = position + velocity;
                vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D pointTexture;
            varying float vOpacity;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, vOpacity);
                gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    function animate() {
        requestAnimationFrame(animate);

        const positions = particleSystem.geometry.attributes.position.array;
        const velocities = particleSystem.geometry.attributes.velocity.array;
        const opacities = particleSystem.geometry.attributes.opacity.array;

        for (let i = 0; i < opacities.length; i++) {
            positions[i * 3] += velocities[i * 3];
            positions[i * 3 + 1] += velocities[i * 3 + 1];
            positions[i * 3 + 2] += velocities[i * 3 + 2];

            // Simple boundary check and bounce back
            if (positions[i * 3] > 500 || positions[i * 3] < -500) velocities[i * 3] *= -1;
            if (positions[i * 3 + 1] > 500 || positions[i * 3 + 1] < -500) velocities[i * 3 + 1] *= -1;
            if (positions[i * 3 + 2] > 500 || positions[i * 3 + 2] < -500) velocities[i * 3 + 2] *= -1;

            opacities[i] = Math.abs(Math.sin(Date.now() * 0.002 + i));
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.geometry.attributes.opacity.needsUpdate = true;

        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
