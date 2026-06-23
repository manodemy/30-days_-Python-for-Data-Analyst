/**
 * MANODEMY 3D "DOOR CORRIDOR" HERO SEQUENCE V7
 * Engineered in Vanilla Three.js for high performance and lightweight bundle size.
 * V7: Full visual overhaul — lighting, tone mapping, fog, floor reflections, camera sway.
 */

(function () {
  "use strict";

  const container = document.getElementById("heroCorridorContainer");
  const canvas = document.getElementById("corridorCanvas");
  const skipBtn = document.getElementById("skipCorridorBtn");
  
  if (!container || !canvas) return;

  // Configuration & Token Constants
  const PLATFORM = "web"; // 'web' | 'mobile'
  const INTRO_DURATION = 94; // seconds
  const LOOP_DURATION = 15; // seconds
  const XP_PER_CHALLENGE = 10; // XP per standard challenge
  const XP_GRADUATION = 100; // XP awarded upon graduation
  
  const TOKENS = {
    bgVoid: 0x060913,
    wallCharcoal: 0x0E1320,
    introWhite: 0xFFFFFF,
    sqlCyan: 0x3FD5FF,
    excelGreen: 0x3FD97A,
    pythonAmber: 0xFFD23F,
    interviewViolet: 0xA06CFF,
    xpGold: 0xF2C14E,
    border: 0x222B3E
  };

  // State Management
  let isMobile = window.innerWidth < 1024;
  let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hasPlayedIntro = sessionStorage.getItem("manodemy_intro_played") === "true";
  let scenePhase = hasPlayedIntro ? "R" : "A"; // 'A' = Intro, 'R' = Revisit flythrough, 'B' = Ambient Loop
  let phaseProgress = 0; // 0 to 1
  let introStartTime = 0;
  let ambientLoopStartTime = 0;
  const REVISIT_DURATION = 5; // seconds for condensed revisit flythrough

  // Three.js Globals
  let renderer, scene, camera, cameraGroup;
  let ambientParticles;
  let dynamicLights = [];
  let ceilingLights = [];
  let rooms = [];
  let doors = [];
  let detachedCard = null;
  let detachedCardOriginalPos = new THREE.Vector3();
  let detachedCardOriginalRot = new THREE.Euler();
  let textCanvasTextureCache = {};

  // Code Snippets Data
  const ROOM_CARDS_DATA = {
    intro: [
      { type: "intro", title: "Roadmap: Day 01", text: "How to Become a Data Analyst" },
      { type: "intro", title: "Core Skills", text: "SQL · Excel · Python · Analytics" }
    ],
    sql: [
      { type: "sql", title: "day01_sql.sql", code: "SELECT region, SUM(revenue)\nFROM sales\nGROUP BY region;", toast: `✓ Query Executed · +${XP_PER_CHALLENGE} XP` },
      { type: "sql", title: "day05_join.sql", code: "SELECT p.name, SUM(s.units)\nFROM sales s\nJOIN products p ON s.pid = p.id\nGROUP BY p.name;", toast: `✓ Join Successful · +${XP_PER_CHALLENGE} XP` },
      { type: "sql", title: "day08_window.sql", code: "SELECT employee_id, salary,\n       ROW_NUMBER() OVER (\n         ORDER BY salary DESC\n       ) as rank\nFROM employees;", toast: `✓ CTE & Rank Validated · +${XP_PER_CHALLENGE} XP` }
    ],
    excel: [
      { type: "excel", title: "day19_xlookup.xlsx", code: "=XLOOKUP(A2, Products!A:A, Products!D:D)", toast: `✓ Formula Checked · +${XP_PER_CHALLENGE} XP` },
      { type: "excel", title: "day24_if_logic.xlsx", code: "=IF(D2 > 1000, \"High\", \"Low\")", toast: `✓ Logical Test Passed · +${XP_PER_CHALLENGE} XP` },
      { type: "excel", title: "day28_averageif.xlsx", code: "=AVERAGEIF(Region, \"West\", Revenue)", toast: `✓ Table Seeded · +${XP_PER_CHALLENGE} XP` }
    ],
    python: [
      { type: "python", title: "day31_pandas.py", code: "sales = df.groupby(\"month\").sum()\nsales.head()", toast: `✓ DataFrame Executed · +${XP_PER_CHALLENGE} XP` },
      { type: "python", title: "day45_clean.py", code: "df.dropna(subset=['email'], inplace=True)\ndf['revenue'] = df['revenue'].fillna(0)", toast: `✓ Data Cleaned · +${XP_PER_CHALLENGE} XP` },
      { type: "python", title: "day60_graduation.py", code: "def verify_active_learning():\n    return \"Tutorial Hell Escaped! 🚀\"\n\nprint(verify_active_learning())", toast: `✓ Program Completed · +${XP_GRADUATION} XP` }
    ]
  };

  // Helper: Create High-Resolution Text Texture on Canvas 2D
  function createCardTexture(data) {
    const canvas2d = document.createElement("canvas");
    canvas2d.width = 1024;
    canvas2d.height = 512;
    const ctx = canvas2d.getContext("2d");

    // Background Gradient (Dark Frosted Glass look)
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "rgba(18, 24, 38, 0.95)");
    grad.addColorStop(1, "rgba(11, 15, 25, 0.95)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Card Header Bar
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.fillRect(0, 0, 1024, 80);

    // Window Dots
    ctx.fillStyle = "#FF5F56";
    ctx.beginPath(); ctx.arc(40, 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#FFBD2E";
    ctx.beginPath(); ctx.arc(70, 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#27C93F";
    ctx.beginPath(); ctx.arc(100, 40, 10, 0, Math.PI * 2); ctx.fill();

    // Title text
    ctx.fillStyle = "#9AA5B8";
    ctx.font = "bold 26px JetBrains Mono, monospace";
    ctx.fillText(data.title || "editor.code", 140, 48);

    // Accent Badge
    let accentColor = "#3FD5FF";
    let badgeText = "INTRO";
    if (data.type === "sql") { accentColor = "#3FD5FF"; badgeText = "SQL"; }
    else if (data.type === "excel") { accentColor = "#3FD97A"; badgeText = "EXCEL"; }
    else if (data.type === "python") { accentColor = "#FFD23F"; badgeText = "PYTHON"; }

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(840, 22, 140, 36);
    ctx.fillStyle = accentColor;
    ctx.font = "bold 18px JetBrains Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillText(badgeText, 910, 46);
    ctx.textAlign = "left";

    // Draw Snippet Code lines or text
    ctx.fillStyle = "#F4F6FB";
    ctx.font = "32px JetBrains Mono, monospace";
    
    if (data.code) {
      const lines = data.code.split("\n");
      lines.forEach((line, idx) => {
        // Simple syntax coloring mock
        let color = "#F4F6FB";
        if (line.startsWith("SELECT") || line.startsWith("FROM") || line.startsWith("GROUP BY") || line.startsWith("JOIN") || line.startsWith("WHERE")) {
          color = "#A06CFF";
        } else if (line.startsWith("def") || line.startsWith("return")) {
          color = "#FFD23F";
        }
        ctx.fillStyle = color;
        ctx.fillText(line, 50, 170 + idx * 55);
      });
    } else {
      ctx.font = "bold 38px Sora, sans-serif";
      ctx.fillStyle = "#F4F6FB";
      ctx.fillText(data.text || "", 50, 240);
    }

    // Toast checkmark badge (Gold/Green bottom corner)
    if (data.toast) {
      ctx.fillStyle = "rgba(242, 193, 78, 0.1)";
      ctx.fillRect(50, 420, 924, 60);
      ctx.strokeStyle = "rgba(242, 193, 78, 0.3)";
      ctx.strokeRect(50, 420, 924, 60);

      ctx.fillStyle = "#F2C14E";
      ctx.font = "bold 24px JetBrains Mono, monospace";
      ctx.fillText(data.toast, 70, 458);
    }

    const texture = new THREE.CanvasTexture(canvas2d);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.anisotropy = 4;
    return texture;
  }

  // 3D Scene Initialization
  function init() {
    // Renderer with cinematic tone mapping
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !isMobile, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isMobile;
    if (renderer.shadowMap.enabled) renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(TOKENS.bgVoid);
    scene.fog = new THREE.FogExp2(TOKENS.bgVoid, 0.012);

    // Camera Group for subtle handheld loop sway
    cameraGroup = new THREE.Group();
    scene.add(cameraGroup);

    // Camera — cinematic telephoto on desktop
    const fov = isMobile ? 58 : 42;
    camera = new THREE.PerspectiveCamera(fov, container.clientWidth / container.clientHeight, 0.1, 500);
    camera.position.set(0, 1.6, 0); // Walk height POV
    cameraGroup.add(camera);

    // V7: Boosted ambient lighting — visible base illumination
    const ambientLight = new THREE.AmbientLight(0x1a2540, 2.8);
    scene.add(ambientLight);

    // V7: Directional fill light from above-forward for overall corridor visibility
    const fillLight = new THREE.DirectionalLight(0x0a1830, 1.5);
    fillLight.position.set(0, 4, 5);
    scene.add(fillLight);

    // Create 3D Corridor Environment
    createCorridor();

    // Create particles
    createParticles();

    // Resize listener
    window.addEventListener("resize", onResize);

    // Skip Event Listener
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        skipIntro();
      });
    }

    // Start Loops
    introStartTime = performance.now();
    requestAnimationFrame(tick);
  }

  // Programmatic generation of Corridor Walls, Floor, Ceiling & Lights
  function createCorridor() {
    const corridorLength = 150; // meters total
    const wallWidth = 2.4; // width of corridor
    const wallHeight = 4.0;
    
    // V7: Mirror-reflective floor for neon door reflections
    const floorTexture = createFloorGridTexture();
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1a,
      roughness: 0.05,
      metalness: 0.95,
      map: floorTexture
    });
    
    const floorGeo = new THREE.PlaneGeometry(wallWidth * 2, corridorLength);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.z = -corridorLength / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Side Walls with slight metallic sheen
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x111828,
      roughness: 0.45,
      metalness: 0.4
    });

    const wallGeo = new THREE.PlaneGeometry(corridorLength, wallHeight);
    
    // Left Wall
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-wallWidth, wallHeight / 2, -corridorLength / 2);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(wallWidth, wallHeight / 2, -corridorLength / 2);
    scene.add(rightWall);

    // V7: Wall accent strips at waist height (1.2m) — subtle geometry indication
    const accentStripGeo = new THREE.BoxGeometry(corridorLength, 0.02, 0.01);
    const accentStripMat = new THREE.MeshBasicMaterial({ color: 0x0e1a2e });
    const leftAccent = new THREE.Mesh(accentStripGeo, accentStripMat);
    leftAccent.rotation.y = Math.PI / 2;
    leftAccent.position.set(-wallWidth + 0.01, 1.2, -corridorLength / 2);
    scene.add(leftAccent);
    const rightAccent = new THREE.Mesh(accentStripGeo, accentStripMat);
    rightAccent.rotation.y = -Math.PI / 2;
    rightAccent.position.set(wallWidth - 0.01, 1.2, -corridorLength / 2);
    scene.add(rightAccent);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(wallWidth * 2, corridorLength);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.5,
      metalness: 0.5
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, wallHeight, -corridorLength / 2);
    scene.add(ceiling);

    // V7: Ceiling light strips + REAL PointLight emitters that cast visible light
    const lightBarGeo = new THREE.BoxGeometry(0.15, 0.06, 3);
    const lightBarMat = new THREE.MeshBasicMaterial({ color: 0x2a4570 });
    const lightSpacing = 12;
    const maxLights = isMobile ? 6 : 12;
    let lightCount = 0;
    for (let z = -6; z > -corridorLength && lightCount < maxLights; z -= lightSpacing) {
      // Visual bar mesh
      const bar = new THREE.Mesh(lightBarGeo, lightBarMat);
      bar.position.set(0, wallHeight - 0.02, z);
      scene.add(bar);

      // V7: Real point light casting downward cyan-tinted illumination
      const ceilingPt = new THREE.PointLight(0x1a3555, isMobile ? 1.5 : 2.5, 10);
      ceilingPt.position.set(0, wallHeight - 0.1, z);
      scene.add(ceilingPt);
      ceilingLights.push(ceilingPt);
      dynamicLights.push(ceilingPt);
      lightCount++;
    }

    // Build the 5 Access Doors
    // Positions along Z corridor
    const doorZPositions = [ -12, -36, -60, -84, -108 ];
    const doorConfigs = [
      { id: 0, title: "00_INTRO", label: "00 // INTRO", color: TOKENS.introWhite, accentStr: "intro" },
      { id: 1, title: "01_SQL", label: "01 // SQL", color: TOKENS.sqlCyan, accentStr: "sql" },
      { id: 2, title: "02_EXCEL", label: "02 // EXCEL", color: TOKENS.excelGreen, accentStr: "excel" },
      { id: 3, title: "03_PYTHON", label: "03 // PYTHON", color: TOKENS.pythonAmber, accentStr: "python" },
      { id: 4, title: "04_CAREER", label: "04 // INTERVIEW", color: TOKENS.interviewViolet, accentStr: "interview" }
    ];

    doorConfigs.forEach(conf => {
      const zPos = doorZPositions[conf.id];
      const doorRig = createDoorMesh(conf);
      doorRig.position.set(0, 0, zPos);
      scene.add(doorRig);
      doors.push(doorRig);

      // V7: Add colored corridor PointLight at each door to illuminate the corridor
      const doorCorridorLight = new THREE.PointLight(conf.color, isMobile ? 2.0 : 3.5, 8);
      doorCorridorLight.position.set(0, 2.0, zPos + 1);
      scene.add(doorCorridorLight);

      // Create lazy rooms behind doors (shifted to left/right for volumetric spacing)
      const room = createRoomMesh(conf.id, conf);
      room.position.set(0, 0, zPos - 6);
      scene.add(room);
      rooms.push(room);
    });
  }

  // Create Floor grid drawing texture dynamically on canvas 2D
  function createFloorGridTexture() {
    const canvas2d = document.createElement("canvas");
    canvas2d.width = 512;
    canvas2d.height = 512;
    const ctx = canvas2d.getContext("2d");
    
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, 512, 512);

    // Grid lines
    ctx.strokeStyle = "rgba(0, 230, 246, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(512, i);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas2d);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 50);
    return texture;
  }

  // Build programmatic Door elements
  function createDoorMesh(config) {
    const group = new THREE.Group();

    // Door Frame (Brushed Dark Metal)
    const frameWidth = 1.8;
    const frameHeight = 2.8;
    const frameThickness = 0.15;
    
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x090c12,
      metalness: 0.9,
      roughness: 0.2
    });
    
    const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, frameHeight, frameThickness), frameMat);
    frameLeft.position.set(-frameWidth / 2, frameHeight / 2, 0);
    group.add(frameLeft);

    const frameRight = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, frameHeight, frameThickness), frameMat);
    frameRight.position.set(frameWidth / 2, frameHeight / 2, 0);
    group.add(frameRight);

    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(frameWidth + frameThickness, frameThickness, frameThickness), frameMat);
    frameTop.position.set(0, frameHeight + frameThickness / 2, 0);
    group.add(frameTop);

    // Frosted Glass Panels (swing pivots offset to the left hinge line)
    const doorPanelGroup = new THREE.Group();
    doorPanelGroup.position.set(-frameWidth / 2, 0, 0); // hinge pivot
    
    const panelGeo = new THREE.BoxGeometry(frameWidth - 0.05, frameHeight - 0.05, 0.05);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0c111c,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85
    });
    
    const panelMesh = new THREE.Mesh(panelGeo, panelMat);
    panelMesh.position.set(frameWidth / 2, frameHeight / 2, 0); // center of panel offset from pivot
    doorPanelGroup.add(panelMesh);

    // Neon Edge Glow Light
    const edgeGeo = new THREE.BoxGeometry(frameWidth - 0.02, 0.03, 0.06);
    const edgeMat = new THREE.MeshBasicMaterial({ color: config.color, transparent: true, opacity: 1.0 });
    const edgeLight = new THREE.Mesh(edgeGeo, edgeMat);
    edgeLight.position.set(frameWidth / 2, frameHeight - 0.03, 0.01);
    doorPanelGroup.add(edgeLight);

    // Door Handle Glow
    const handleGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x111622, metalness: 1 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(frameWidth - 0.15, frameHeight / 2, 0.06); // opposite edge from hinge
    doorPanelGroup.add(handle);

    // Tiny handle neon light
    const handleNeonMat = new THREE.MeshBasicMaterial({ color: config.color, transparent: true, opacity: 1.0 });
    const handleNeon = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.02), handleNeonMat);
    handleNeon.position.set(0, 0, 0.045);
    handle.add(handleNeon);

    group.add(doorPanelGroup);

    // Rim light spill on floor when door closed
    const rimLight = new THREE.PointLight(config.color, 0.8, 4);
    rimLight.position.set(0, 0.1, 0.2);
    group.add(rimLight);

    group.userData = {
      panel: doorPanelGroup,
      panelMesh: panelMesh,
      handle: handle,
      edgeMat: edgeMat,
      handleNeonMat: handleNeonMat,
      rimLight: rimLight,
      opened: false,
      config: config
    };

    // Monospace placard above the door frame
    const placardTexture = createPlacardTexture(config.label, config.color);
    const placardGeo = new THREE.PlaneGeometry(0.6, 0.2);
    const placardMat = new THREE.MeshBasicMaterial({ map: placardTexture, transparent: true });
    const placard = new THREE.Mesh(placardGeo, placardMat);
    placard.position.set(0, frameHeight + 0.3, 0.02);
    group.add(placard);

    return group;
  }

  // Create access panel labels text
  function createPlacardTexture(text, color) {
    const canvas2d = document.createElement("canvas");
    canvas2d.width = 256;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext("2d");

    ctx.fillStyle = "rgba(11, 15, 25, 0.9)";
    ctx.fillRect(0, 0, 256, 64);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 256, 64);

    ctx.fillStyle = "#" + color.toString(16).padStart(6, '0');
    ctx.font = "bold 16px JetBrains Mono, monospace";
    ctx.fillText(text, 20, 38);

    const texture = new THREE.CanvasTexture(canvas2d);
    return texture;
  }

  // Build Room contents
  function createRoomMesh(id, config) {
    const roomGroup = new THREE.Group();
    
    // Volumetric spotlight inside the room in that room's color
    const spot = new THREE.SpotLight(config.color, 5, 20, Math.PI / 4, 0.5, 1);
    spot.position.set(0, 3.8, -4);
    spot.target.position.set(0, 1.5, -6);
    spot.castShadow = true;
    roomGroup.add(spot);
    roomGroup.add(spot.target);

    // Emissive room color grid backdrop
    const backWallGeo = new THREE.PlaneGeometry(6, 4);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.8,
      metalness: 0.2
    });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 2, -8);
    roomGroup.add(backWall);

    // Place floating snippet cards inside the rooms
    const cardsData = ROOM_CARDS_DATA[config.accentStr] || [];
    const maxCards = isMobile ? 2 : cardsData.length;
    
    const spawnedCards = [];
    cardsData.forEach((cData, cIdx) => {
      if (cIdx >= maxCards) return;

      const texture = createCardTexture(cData);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.95
      });
      
      const cardGeo = new THREE.PlaneGeometry(1.6, 0.8);
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      
      // Arrange cards staggered in space
      const xOffset = (cIdx - (maxCards - 1) / 2) * 1.8;
      const yOffset = 1.3 + Math.sin(cIdx) * 0.25;
      const zOffset = -6 - (cIdx % 2) * 0.4;
      
      cardMesh.position.set(xOffset, yOffset, zOffset);
      cardMesh.rotation.y = (cIdx % 2 === 0 ? 1 : -1) * 0.08;
      
      roomGroup.add(cardMesh);
      spawnedCards.push({
        el: cardMesh,
        restingY: yOffset,
        phase: cIdx * 1.5,
        originalPos: cardMesh.position.clone(),
        originalRot: cardMesh.rotation.clone()
      });
    });

    roomGroup.userData = { cards: spawnedCards, spotlight: spot };

    // Special finale room adjustments (Interview panel + rotating Certificate)
    if (config.accentStr === "interview") {
      // 1. Desk silhouette
      const deskGeo = new THREE.BoxGeometry(3, 0.85, 0.8);
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x020306, roughness: 0.9 });
      const desk = new THREE.Mesh(deskGeo, deskMat);
      desk.position.set(0, 0.425, -6);
      roomGroup.add(desk);

      // 2. Silhouetted interviewers (Three simple plane textures or meshes)
      const interviewerMat = new THREE.MeshBasicMaterial({ color: 0x010204, transparent: true });
      for (let i = -1; i <= 1; i++) {
        const shape = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2), interviewerMat);
        shape.position.set(i * 1.0, 1.2, -6.4);
        roomGroup.add(shape);
      }

      // 3. Rotating Gold Certificate Seal
      const sealGroup = new THREE.Group();
      sealGroup.position.set(0, 1.8, -5);
      
      // Outer gold glow circle
      const outerSeal = new THREE.Mesh(
        new THREE.RingGeometry(0.65, 0.7, 32),
        new THREE.MeshBasicMaterial({ color: TOKENS.xpGold, side: THREE.DoubleSide })
      );
      sealGroup.add(outerSeal);

      // Inner certification star mesh representation
      const certCrest = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.4, 8),
        new THREE.MeshStandardMaterial({ color: TOKENS.xpGold, roughness: 0.2 })
      );
      certCrest.rotation.x = Math.PI / 2;
      certCrest.position.set(0, 0, 0.05);
      sealGroup.add(certCrest);

      // GET HIRED 3D typography helper using CanvasTexture
      const hireTex = createGetHiredTexture();
      const hirePlacard = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.4),
        new THREE.MeshBasicMaterial({ map: hireTex, transparent: true })
      );
      hirePlacard.position.set(0, -1.0, 0);
      sealGroup.add(hirePlacard);

      roomGroup.add(sealGroup);
      roomGroup.userData.sealGroup = sealGroup;
    }

    return roomGroup;
  }

  // Get Hired Text Texture
  function createGetHiredTexture() {
    const canvas2d = document.createElement("canvas");
    canvas2d.width = 512;
    canvas2d.height = 128;
    const ctx = canvas2d.getContext("2d");

    ctx.fillStyle = "rgba(6, 9, 19, 0)";
    ctx.fillRect(0, 0, 512, 128);

    ctx.fillStyle = "#F2C14E";
    ctx.shadowColor = "rgba(242, 193, 78, 0.6)";
    ctx.shadowBlur = 15;
    ctx.font = "bold 44px Sora, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GET HIRED", 256, 60);

    ctx.font = "bold 20px JetBrains Mono, monospace";
    ctx.fillStyle = "#9AA5B8";
    ctx.shadowBlur = 0;
    ctx.fillText("MASTERCLASS BUNDLE CERTIFIED", 256, 100);

    const texture = new THREE.CanvasTexture(canvas2d);
    return texture;
  }

  // Drift Particles System
  function createParticles() {
    const particleCount = isMobile ? 30 : 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4; // X
      positions[i + 1] = Math.random() * 4; // Y
      positions[i + 2] = -Math.random() * 140; // Z along corridor
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom particles canvas drawing texture (Drifting glow dots)
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, "rgba(0, 230, 246, 1)");
    pGrad.addColorStop(1, "rgba(0, 230, 246, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    ambientParticles = new THREE.Points(geometry, material);
    scene.add(ambientParticles);
  }

  let audioHooksLogged = {};

  function triggerAudioHook(doorTitle, eventType, localT) {
    const key = `${doorTitle}_${eventType}`;
    if (!audioHooksLogged[key]) {
      audioHooksLogged[key] = true;
      console.log(`[Audio Hook] [${doorTitle}] Event: ${eventType.toUpperCase()} at local progress: ${localT.toFixed(3)}`);
    }
  }

  function fadeDoorLights(door, factor) {
    if (door.userData.rimLight) {
      door.userData.rimLight.intensity = factor * 0.8;
    }
    if (door.userData.edgeMat) {
      door.userData.edgeMat.opacity = factor;
    }
    if (door.userData.handleNeonMat) {
      door.userData.handleNeonMat.opacity = factor;
    }
  }

  function animateDoorOpen(door, t) {
    const panelGroup = door.userData.panel;
    const handle = door.userData.handle;
    
    let handleZ = 0;
    let panelY = 0;
    
    if (t < 0.15) {
      // Anticipation + Latch give
      const localT = t / 0.15;
      handleZ = localT * 0.6; // rotate handle down (35 degrees)
      panelY = localT * (-0.03); // 2 degrees latch give
      
      triggerAudioHook(door.userData.config.title, "click", t);
    } else if (t < 0.85) {
      // Mechanical Swing
      const s = (t - 0.15) / 0.70;
      handleZ = (1 - s) * 0.6; // return handle to neutral
      
      // Ease with acceleration for first 60%, hard deceleration
      let ease;
      if (s < 0.6) {
        ease = 0.7 * Math.pow(s / 0.6, 2) * 0.6;
      } else {
        const k = (s - 0.6) / 0.4;
        ease = 0.42 + 0.58 * (1.0 - Math.pow(1.0 - k, 2));
      }
      panelY = -0.03 + ease * (-Math.PI * 0.65 - (-0.03));
      
      triggerAudioHook(door.userData.config.title, "swing", t);
    } else {
      // Settle with single spring overshoot
      const s = (t - 0.85) / 0.15;
      handleZ = 0;
      
      const overshoot = Math.sin(s * Math.PI) * Math.exp(-s * 4) * 0.1;
      panelY = -Math.PI * 0.65 - overshoot;
    }
    
    panelGroup.rotation.y = panelY;
    if (handle) handle.rotation.z = handleZ;
  }

  function animateDoorClose(door, t) {
    const panelGroup = door.userData.panel;
    const handle = door.userData.handle;
    const panelMesh = door.userData.panelMesh;
    
    let panelY = 0;
    let scale = 1.0;
    
    triggerAudioHook(door.userData.config.title, "close_start", t);
    
    if (t < 0.90) {
      // Swing shut with fast initiation, deceleration in last 20%
      const s = t / 0.90;
      const ease = 1.0 - Math.pow(1.0 - s, 3);
      panelY = -Math.PI * 0.65 * (1.0 - ease);
      
      fadeDoorLights(door, 1.0 - s);
    } else {
      // Latch thud scale punch
      const s = (t - 0.90) / 0.10;
      panelY = 0;
      scale = 1.0 + 0.015 * (1.0 - s);
      
      fadeDoorLights(door, 0.0);
      
      triggerAudioHook(door.userData.config.title, "latch_thud", t);
    }
    
    panelGroup.rotation.y = panelY;
    if (handle) handle.rotation.z = 0;
    if (panelMesh) panelMesh.scale.set(scale, scale, scale);
  }

  // Camera Dolly Progression Math
  // Tracks position and look-at target vector over the progress timeline (94s)
  function updateCameraTimeline(progress) {
    if (progress < 0.005) {
      audioHooksLogged = {};
    }

    if (prefersReducedMotion) {
      // Direct jump positions to key elements based on progress, transitions are handled as fade slideshows
      const steps = [
        { cPos: [0, 1.6, -2], lookZ: -12 },   // Intro Approach
        { cPos: [0, 1.6, -18], lookZ: -24 },  // SQL Room
        { cPos: [0, 1.6, -42], lookZ: -48 },  // Excel Room
        { cPos: [0, 1.6, -66], lookZ: -72 },  // Python Room
        { cPos: [0, 1.6, -92], lookZ: -108 }  // Interview Room
      ];
      const stepIdx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      const step = steps[stepIdx];
      camera.position.set(step.cPos[0], step.cPos[1], step.cPos[2]);
      camera.lookAt(0, 1.5, step.lookZ);
      return;
    }

    // Reset door swings, scales, and lights to default (closed, full light)
    doors.forEach(d => {
      d.userData.panel.rotation.y = 0;
      if (d.userData.handle) d.userData.handle.rotation.z = 0;
      if (d.userData.panelMesh) d.userData.panelMesh.scale.set(1, 1, 1);
      fadeDoorLights(d, 1.0);
      d.userData.opened = false;
    });
    
    // Reset room card scales/positions to original
    rooms.forEach(room => {
      if (room.userData.cards) {
        room.userData.cards.forEach(card => {
          card.el.position.copy(card.originalPos);
          card.el.rotation.copy(card.originalRot);
        });
      }
    });
    
    detachedCard = null;

    // Timeline normalized constants for 94s sequence
    const t1 = 5.0 / 94.0;
    const t2 = 9.0 / 94.0;
    const t3 = 16.0 / 94.0;
    const t4 = 19.2 / 94.0;
    const t5 = 24.2 / 94.0;
    const t6 = 28.2 / 94.0;
    const t7 = 37.2 / 94.0;
    const t8 = 40.4 / 94.0;
    const t9 = 45.4 / 94.0;
    const t10 = 49.4 / 94.0;
    const t11 = 58.4 / 94.0;
    const t12 = 61.6 / 94.0;
    const t13 = 66.6 / 94.0;
    const t14 = 70.6 / 94.0;
    const t15 = 79.6 / 94.0;
    const t16 = 82.8 / 94.0;
    const t17 = 86.8 / 94.0;
    const t18 = 90.8 / 94.0;

    // Turn off past door lights explicitly (declarative timeline state)
    if (progress >= t4) {
      doors[0].userData.panel.rotation.y = 0;
      fadeDoorLights(doors[0], 0.0);
    }
    if (progress >= t8) {
      doors[1].userData.panel.rotation.y = 0;
      fadeDoorLights(doors[1], 0.0);
    }
    if (progress >= t12) {
      doors[2].userData.panel.rotation.y = 0;
      fadeDoorLights(doors[2], 0.0);
    }
    if (progress >= t16) {
      doors[3].userData.panel.rotation.y = 0;
      fadeDoorLights(doors[3], 0.0);
    }

    let targetX = 0;
    let targetY = 1.6;
    let targetZ = 0;

    let lookX = 0;
    let lookY = 1.5;
    let lookZ = -10;

    // Segment mappings
    if (progress < t1) {
      // 0–5s: Cold open, float towards Door 1 (Intro)
      const t = progress / t1;
      targetZ = -t * 6; // starts at 0, pushes to -6
      lookZ = -12;
    } 
    else if (progress < t2) {
      // 5–9s: Door 1 opens, swing panel, push in
      const t = (progress - t1) / (t2 - t1);
      animateDoorOpen(doors[0], t);
      doors[0].userData.opened = true;
      targetZ = -6 - t * 4; // pushes to -10
      lookZ = -18;
    } 
    else if (progress < t3) {
      // 9–16s: Inside Room_Intro. Orbit slowly.
      const t = (progress - t2) / (t3 - t2);
      doors[0].userData.panel.rotation.y = -Math.PI * 0.65;
      targetZ = -10 - Math.sin(t * Math.PI * 0.5) * 3;
      targetX = Math.cos(t * Math.PI * 0.5) * 0.4;
      lookZ = -18;
      lookX = 0;
    } 
    else if (progress < t4) {
      // 16–19.2s: Exit Room 1, door closes.
      const t = (progress - t3) / (t4 - t3);
      animateDoorClose(doors[0], t);
      targetZ = -13 + t * 5; // pulls back to -8
      lookZ = -12;
    } 
    else if (progress < t5) {
      // 19.2–24.2s: Corridor pan to Door 2 (SQL)
      const t = (progress - t4) / (t5 - t4);
      targetZ = -8 - t * 22; // goes to -30
      lookZ = -36;
    } 
    else if (progress < t6) {
      // 24.2–28.2s: Door 2 opens, camera pushes in.
      const t = (progress - t5) / (t6 - t5);
      animateDoorOpen(doors[1], t);
      doors[1].userData.opened = true;
      targetZ = -30 - t * 4; // goes to -34
      lookZ = -42;
    } 
    else if (progress < t7) {
      // 28.2–37.2s: Inside SQL room. One card detaches.
      const t = (progress - t6) / (t7 - t6);
      doors[1].userData.panel.rotation.y = -Math.PI * 0.65;
      targetZ = -34;
      lookZ = -42;

      // SQL code card zoom trigger
      const room = rooms[1];
      if (room && room.userData.cards && room.userData.cards[0]) {
        const card = room.userData.cards[0].el;
        detachedCard = card;
        if (t < 0.3) {
          const easeT = t / 0.3;
          card.position.lerpVectors(room.userData.cards[0].originalPos, new THREE.Vector3(0, 1.5, -3.2), easeT);
          card.rotation.set(0, 0, 0);
        } else if (t < 0.8) {
          card.position.set(0, 1.5, -3.2);
          card.rotation.set(0, 0, 0);
        } else {
          const easeT = (t - 0.8) / 0.2;
          card.position.lerpVectors(new THREE.Vector3(0, 1.5, -3.2), room.userData.cards[0].originalPos, easeT);
          card.rotation.copy(room.userData.cards[0].originalRot);
        }
      }
    } 
    else if (progress < t8) {
      // 37.2–40.4s: Retreat, door closes.
      const t = (progress - t7) / (t8 - t7);
      animateDoorClose(doors[1], t);
      targetZ = -34 + t * 4; // pulls back to -30
      lookZ = -36;
    } 
    else if (progress < t9) {
      // 40.4–45.4s: Corridor pan to Door 3 (Excel)
      const t = (progress - t8) / (t9 - t8);
      targetZ = -30 - t * 24; // goes to -54
      lookZ = -60;
    } 
    else if (progress < t10) {
      // 45.4–49.4s: Door 3 opens, camera pushes in.
      const t = (progress - t9) / (t10 - t9);
      animateDoorOpen(doors[2], t);
      doors[2].userData.opened = true;
      targetZ = -54 - t * 4; // goes to -58
      lookZ = -66;
    } 
    else if (progress < t11) {
      // 49.4–58.4s: Inside Excel room. Card zoom.
      const t = (progress - t10) / (t11 - t10);
      doors[2].userData.panel.rotation.y = -Math.PI * 0.65;
      doors[2].userData.opened = true;
      targetZ = -58;
      lookZ = -66;

      // Excel card zoom
      const room = rooms[2];
      if (room && room.userData.cards && room.userData.cards[0]) {
        const card = room.userData.cards[0].el;
        detachedCard = card;
        if (t < 0.3) {
          const easeT = t / 0.3;
          card.position.lerpVectors(room.userData.cards[0].originalPos, new THREE.Vector3(0, 1.5, -3.2), easeT);
          card.rotation.set(0, 0, 0);
        } else if (t < 0.8) {
          card.position.set(0, 1.5, -3.2);
          card.rotation.set(0, 0, 0);
        } else {
          const easeT = (t - 0.8) / 0.2;
          card.position.lerpVectors(new THREE.Vector3(0, 1.5, -3.2), room.userData.cards[0].originalPos, easeT);
          card.rotation.copy(room.userData.cards[0].originalRot);
        }
      }
    } 
    else if (progress < t12) {
      // 58.4–61.6s: Exit Excel, door closes.
      const t = (progress - t11) / (t12 - t11);
      animateDoorClose(doors[2], t);
      targetZ = -58 + t * 4; // pulls back to -54
      lookZ = -60;
    } 
    else if (progress < t13) {
      // 61.6–66.6s: Corridor pan to Door 4 (Python)
      const t = (progress - t12) / (t13 - t12);
      targetZ = -54 - t * 24; // goes to -78
      lookZ = -84;
    } 
    else if (progress < t14) {
      // 66.6–70.6s: Door 4 opens, camera pushes in.
      const t = (progress - t13) / (t14 - t13);
      animateDoorOpen(doors[3], t);
      doors[3].userData.opened = true;
      targetZ = -78 - t * 4; // goes to -82
      lookZ = -90;
    } 
    else if (progress < t15) {
      // 70.6–79.6s: Inside Python room. Card zoom.
      const t = (progress - t14) / (t15 - t14);
      doors[3].userData.panel.rotation.y = -Math.PI * 0.65;
      doors[3].userData.opened = true;
      targetZ = -82;
      lookZ = -90;

      // Python card zoom
      const room = rooms[3];
      if (room && room.userData.cards && room.userData.cards[0]) {
        const card = room.userData.cards[0].el;
        detachedCard = card;
        if (t < 0.3) {
          const easeT = t / 0.3;
          card.position.lerpVectors(room.userData.cards[0].originalPos, new THREE.Vector3(0, 1.5, -3.2), easeT);
          card.rotation.set(0, 0, 0);
        } else if (t < 0.8) {
          card.position.set(0, 1.5, -3.2);
          card.rotation.set(0, 0, 0);
        } else {
          const easeT = (t - 0.8) / 0.2;
          card.position.lerpVectors(new THREE.Vector3(0, 1.5, -3.2), room.userData.cards[0].originalPos, easeT);
          card.rotation.copy(room.userData.cards[0].originalRot);
        }
      }
    } 
    else if (progress < t16) {
      // 79.6–82.8s: Exit Python, door closes.
      const t = (progress - t15) / (t16 - t15);
      animateDoorClose(doors[3], t);
      targetZ = -82 + t * 4; // pulls back to -78
      lookZ = -84;
    } 
    else if (progress < t17) {
      // 82.8–86.8s: Walk to Door 5 (Career)
      const t = (progress - t16) / (t17 - t16);
      targetZ = -78 - t * 24; // goes to -102
      lookZ = -108;
    } 
    else if (progress < t18) {
      // 86.8–90.8s: Door 5 opens, zoom in.
      const t = (progress - t17) / (t18 - t17);
      animateDoorOpen(doors[4], t);
      doors[4].userData.opened = true;
      targetZ = -102 - t * 5; // goes to -107
      lookZ = -114;
    } 
    else {
      // 90.8–94s (Gold certificate seal rotation and hold)
      targetZ = -107;
      lookZ = -114;
      doors[4].userData.panel.rotation.y = -Math.PI * 0.65;
    }

    camera.position.set(targetX, targetY, targetZ);
    camera.lookAt(lookX, lookY, lookZ);
  }

  // V7: Ambient loop with slow dolly sway (not static)
  function updateAmbientLoop(time) {
    // Gentle dolly sway — camera pans left/right over 8s cycle
    const swayX = Math.sin(time * 0.25 * Math.PI) * 0.3;
    const swayY = Math.cos(time * 0.4) * 0.04;
    const swayZ = Math.sin(time * 0.15 * Math.PI) * 0.5;
    cameraGroup.position.set(0, 0, 0);

    // Slow drift camera position
    camera.position.set(swayX, 1.6 + swayY, -2 + swayZ);
    camera.lookAt(swayX * 0.3, 1.5, -15);

    // Breathing rhythm door rim lights
    doors.forEach((door, idx) => {
      const breathe = 0.5 + Math.sin(time * 1.2 + idx * 1.8) * 0.4;
      
      // Ensure everything is reset closed and fully lit up
      door.userData.panel.rotation.y = 0; 
      if (door.userData.handle) door.userData.handle.rotation.z = 0;
      if (door.userData.panelMesh) door.userData.panelMesh.scale.set(1, 1, 1);
      if (door.userData.edgeMat) door.userData.edgeMat.opacity = 1.0;
      if (door.userData.handleNeonMat) door.userData.handleNeonMat.opacity = 1.0;

      if (door.userData.rimLight) {
        door.userData.rimLight.intensity = breathe * 1.5;
      }
    });
  }

  // V7: Condensed 5s revisit flythrough (not a static void)
  function updateRevisitFlythrough(progress) {
    // Quick sweep from z=0 to z=-20 and back to z=-2
    let targetZ, lookZ;
    const swayX = Math.sin(progress * Math.PI * 2) * 0.15;
    const swayY = Math.cos(progress * Math.PI * 3) * 0.02;
    
    if (progress < 0.6) {
      // Fly forward
      const t = progress / 0.6;
      const ease = 1.0 - Math.pow(1.0 - t, 3);
      targetZ = -ease * 20;
      lookZ = targetZ - 12;
    } else {
      // Pull back to rest position
      const t = (progress - 0.6) / 0.4;
      const ease = t * t * (3 - 2 * t); // smoothstep
      targetZ = -20 + ease * 18; // back to -2
      lookZ = targetZ - 13;
    }
    
    camera.position.set(swayX, 1.6 + swayY, targetZ);
    camera.lookAt(0, 1.5, lookZ);
  }

  // Animation Loop Tick
  function tick() {
    const now = performance.now();

    if (scenePhase === "A") {
      // Intro Phase
      const elapsed = (now - introStartTime) / 1000;
      phaseProgress = Math.min(1.0, elapsed / INTRO_DURATION);
      
      updateCameraTimeline(phaseProgress);

      // V7: Subtle camera sway during intro walkthrough
      const introSwayX = Math.sin(now * 0.001 * 1.3) * 0.03;
      const introSwayY = Math.cos(now * 0.001 * 0.9) * 0.015;
      cameraGroup.position.set(introSwayX, introSwayY, 0);

      // Rotate seal group in Room 5 if active
      const sealRoom = rooms[4];
      if (sealRoom && sealRoom.userData.sealGroup) {
        sealRoom.userData.sealGroup.rotation.y += 0.008;
      }

      if (phaseProgress >= 1.0) {
        // Complete Phase A -> Phase B transition
        completeIntro();
      }
    } else if (scenePhase === "R") {
      // V7: Revisit condensed flythrough phase
      const elapsed = (now - introStartTime) / 1000;
      const revisitProgress = Math.min(1.0, elapsed / REVISIT_DURATION);
      
      updateRevisitFlythrough(revisitProgress);
      
      // Camera sway during revisit
      const rSwayX = Math.sin(now * 0.0015) * 0.02;
      const rSwayY = Math.cos(now * 0.001) * 0.01;
      cameraGroup.position.set(rSwayX, rSwayY, 0);
      
      if (revisitProgress >= 1.0) {
        completeIntro();
      }
    } else {
      // Ambient Loop Phase
      const elapsed = (now - ambientLoopStartTime) / 1000;
      updateAmbientLoop(elapsed);
    }

    // Drift Particles Y and Z slightly
    if (ambientParticles) {
      const positions = ambientParticles.geometry.attributes.position.array;
      for (let i = 2; i < positions.length; i += 3) {
        positions[i] += 0.02; // drift forward
        if (positions[i] > 10) {
          positions[i] = -140; // recycle
        }
      }
      ambientParticles.geometry.attributes.position.needsUpdate = true;
    }

    // V7: Pulse ceiling lights with breathing rhythm
    const pulseIntensity = (isMobile ? 1.2 : 2.0) + Math.sin(now * 0.0015) * 0.5;
    ceilingLights.forEach((light, idx) => {
      light.intensity = pulseIntensity + Math.sin(now * 0.002 + idx * 0.8) * 0.4;
    });

    // Idle bob room floating cards
    rooms.forEach((room, rIdx) => {
      if (room.userData.cards) {
        room.userData.cards.forEach(card => {
          if (card.el !== detachedCard) {
            const floatY = Math.sin((now / 1000) * 1.5 + card.phase) * 0.04;
            card.el.position.y = card.restingY + floatY;
          }
        });
      }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  // Action: Skip Intro
  function skipIntro() {
    completeIntro();
  }

  // Handle phase transitions
  function completeIntro() {
    scenePhase = "B";
    sessionStorage.setItem("manodemy_intro_played", "true");
    ambientLoopStartTime = performance.now();
    
    // Hide Skip button
    if (skipBtn) skipBtn.style.display = "none";

    // Direct camera positioning for loop rest state
    cameraGroup.position.set(0, 0, 0);
    camera.position.set(0, 1.6, -2);
    camera.lookAt(0, 1.5, -15);
  }

  // Handle Resize
  function onResize() {
    isMobile = window.innerWidth < 1024;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.fov = isMobile ? 58 : 42;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  // Init on DOM Content Loaded
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
})();
