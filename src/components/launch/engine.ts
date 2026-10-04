import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

/*
 * The launch journey: a small healthcare "city" that is specified, designed,
 * engineered, tested and deployed as the visitor scrolls (p = 0..1).
 *
 *   [0.00, 0.06)  landing        dim hologram on a neon grid, slow idle turn
 *   [0.06, 0.24)  requirements   wireframe rises; nodes, docs and data streams fly in and connect
 *   [0.24, 0.42)  design         glass materials fill the wireframe; UI panels orbit; camera orbits
 *   [0.42, 0.62)  development    modules lift apart; camera dives to a core of gears, circuits, packets
 *   [0.62, 0.80)  QA             modules reassemble; laser ring scans up; checks + ripples; shield
 *   [0.80, 1.00]  deployment     windows light up, launch beam, camera pulls back to a galaxy
 */

export const STEPS: [number, number][] = [
  [0.06, 0.24],
  [0.24, 0.42],
  [0.42, 0.62],
  [0.62, 0.8],
  [0.8, 1],
];

export const COLORS = {
  void: 0x04060b,
  holo: 0x8be9ff,
  amber: 0xffb547,
  qa: 0x3df5a6,
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const pop = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2));

/* ------------------------------------------------------------ textures -- */

function canvasTexture(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  draw(cv.getContext("2d")!);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const FONT = '"Geist", "Helvetica Neue", Arial, sans-serif';
const MONO = '"Geist Mono", ui-monospace, monospace';

function windowsTexture() {
  return canvasTexture(64, 256, (c) => {
    c.fillStyle = "#000";
    c.fillRect(0, 0, 64, 256);
    for (let y = 6; y < 256; y += 14)
      for (let x = 6; x < 64; x += 12) {
        const on = Math.random() > 0.35;
        c.fillStyle = on ? (Math.random() > 0.8 ? "#8BE9FF" : "#FFD9A0") : "#111";
        c.fillRect(x, y, 7, 8);
      }
  });
}

function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function docTexture() {
  return canvasTexture(140, 180, (c) => {
    roundRect(c, 4, 4, 132, 172, 12);
    c.fillStyle = "rgba(139,233,255,.10)";
    c.fill();
    c.strokeStyle = "rgba(139,233,255,.9)";
    c.lineWidth = 3;
    c.stroke();
    c.fillStyle = "rgba(139,233,255,.85)";
    for (let i = 0; i < 7; i++) c.fillRect(20, 30 + i * 19, i % 3 === 2 ? 60 : 100, 6);
  });
}

const PANELS: { title: string; rows: string[] }[] = [
  { title: "Schedule", rows: ["08:30  M. Rivera", "09:15  D. Chen", "10:00  A. Okafor", "10:45  S. Patel"] },
  { title: "SOAP note", rows: ["S  Knee pain, 2 weeks", "O  ROM 0–120°", "A  M17.11", "P  PT referral"] },
  { title: "Claims", rows: ["837P  submitted", "999   accepted", "277CA accepted", "835   paid"] },
  { title: "Patient portal", rows: ["Records", "Intake forms", "Telehealth", "Messages"] },
  { title: "AI Scribe", rows: ["Listening…", "Drafting SOAP", "Provider review", "Signed"] },
  { title: "Revenue", rows: ["Collections  +18%", "Denials      −32%", "Days in AR   24", "Clean claims 97%"] },
];

function panelTexture(title: string, rows: string[]) {
  return canvasTexture(520, 340, (c) => {
    roundRect(c, 6, 6, 508, 328, 26);
    const g = c.createLinearGradient(0, 0, 520, 340);
    g.addColorStop(0, "rgba(139,233,255,.20)");
    g.addColorStop(1, "rgba(139,233,255,.05)");
    c.fillStyle = g;
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = "rgba(190,240,255,.85)";
    c.stroke();
    c.fillStyle = "#EAF8FF";
    c.font = `600 40px ${FONT}`;
    c.fillText(title, 34, 70);
    c.fillStyle = "rgba(255,181,71,.95)";
    c.fillRect(34, 88, 56, 5);
    c.font = `400 26px ${MONO}`;
    rows.forEach((r, i) => {
      c.fillStyle = "rgba(234,248,255,.82)";
      c.fillText(r, 34, 146 + i * 46);
    });
  });
}

function codeTexture() {
  return canvasTexture(256, 128, (c) => {
    c.fillStyle = "#1a1206";
    c.fillRect(0, 0, 256, 128);
    c.font = `500 15px ${MONO}`;
    const lines = ["claim.submit(837P)", "await era.post(835)", "fhir.Patient.read()", "if (!eligible) hold()", "scribe.draft(soap)"];
    lines.forEach((l, i) => {
      c.fillStyle = i % 2 ? "rgba(255,181,71,.95)" : "rgba(255,226,180,.85)";
      c.fillText(l, 12, 24 + i * 22);
    });
  });
}

function checkTexture() {
  return canvasTexture(128, 128, (c) => {
    c.beginPath();
    c.arc(64, 64, 54, 0, Math.PI * 2);
    c.fillStyle = "rgba(61,245,166,.18)";
    c.fill();
    c.lineWidth = 7;
    c.strokeStyle = "#3DF5A6";
    c.stroke();
    c.beginPath();
    c.moveTo(38, 66);
    c.lineTo(56, 84);
    c.lineTo(92, 46);
    c.lineWidth = 10;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
  });
}

function shieldTexture() {
  return canvasTexture(160, 190, (c) => {
    c.beginPath();
    c.moveTo(80, 8);
    c.lineTo(150, 34);
    c.bezierCurveTo(150, 110, 120, 160, 80, 182);
    c.bezierCurveTo(40, 160, 10, 110, 10, 34);
    c.closePath();
    c.fillStyle = "rgba(61,245,166,.16)";
    c.fill();
    c.lineWidth = 7;
    c.strokeStyle = "#3DF5A6";
    c.stroke();
    c.beginPath();
    c.moveTo(48, 96);
    c.lineTo(72, 120);
    c.lineTo(114, 72);
    c.lineWidth = 11;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
  });
}

/* ------------------------------------------------------------ geometry -- */

function gearGeometry(r: number, teeth: number) {
  const s = new THREE.Shape();
  const inner = r * 0.82;
  const n = teeth * 4;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : inner;
    const x = Math.cos(a) * rr;
    const y = Math.sin(a) * rr;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, r * 0.32, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.22, bevelEnabled: false, curveSegments: 4 });
  g.rotateX(-Math.PI / 2);
  return g;
}

/* ------------------------------------------------------------- engine -- */

type Block = {
  group: THREE.Group;
  wire: THREE.LineBasicMaterial;
  solid: THREE.MeshPhysicalMaterial;
  x: number;
  z: number;
  h: number;
  order: number;
};

type Flyer = { obj: THREE.Object3D; from: THREE.Vector3; to: THREE.Vector3; delay: number };

export class LaunchScene {
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2000);
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private p = 0;
  private w = 1;
  private h = 1;
  private shift = 0; // horizontal framing offset (desktop copy sits on the left)

  private grid!: THREE.LineSegments;
  private blocks: Block[] = [];
  private nodes: Flyer[] = [];
  private docs: Flyer[] = [];
  private links!: THREE.LineSegments;
  private linkPairs: [number, number][] = [];
  private streams!: THREE.Points;
  private panels: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; angle: number; y: number; r: number }[] = [];
  private core = new THREE.Group();
  private gears: { mesh: THREE.Mesh; speed: number }[] = [];
  private traces: THREE.Vector3[][] = [];
  private traceLines!: THREE.LineSegments;
  private packets: { mesh: THREE.Mesh; trace: number; off: number }[] = [];
  private codeBlocks: { mesh: THREE.Mesh; to: THREE.Vector3; delay: number }[] = [];
  private coreLight = new THREE.PointLight(COLORS.amber, 0, 14, 1.6);
  private laser!: THREE.Mesh;
  private scanDisc!: THREE.Mesh;
  private checks: { sprite: THREE.Sprite; ripple: THREE.Mesh; at: number; y: number }[] = [];
  private shield!: THREE.Sprite;
  private beam!: THREE.Mesh;
  private galaxy!: THREE.Points;
  private fog = new THREE.FogExp2(COLORS.void, 0.028);

  constructor(private canvas: HTMLCanvasElement, opts: { lowPower: boolean }) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !opts.lowPower, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.lowPower ? 1.25 : 1.75));
    this.renderer.setClearColor(COLORS.void, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.scene.fog = this.fog;
    this.scene.add(new THREE.AmbientLight(0x6f8fb0, 0.55));
    const key = new THREE.DirectionalLight(0xbfefff, 1.4);
    key.position.set(8, 14, 6);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(COLORS.amber, 0.6);
    rim.position.set(-10, 6, -8);
    this.scene.add(rim);
    this.coreLight.position.set(0, 1.2, 0);
    this.scene.add(this.coreLight);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), opts.lowPower ? 0.7 : 0.95, 0.55, 0.12);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.buildGrid();
    this.buildCity();
    this.buildRequirements();
    this.buildPanels();
    this.buildEngine();
    this.buildQA();
    this.buildDeployment();
  }

  /* ---------------------------------------------------------- builders -- */

  private buildGrid() {
    const size = 260;
    const div = 130;
    const g = new THREE.GridHelper(size, div, COLORS.holo, COLORS.holo);
    const m = g.material as THREE.LineBasicMaterial;
    m.transparent = true;
    m.opacity = 0.22;
    this.grid = g;
    this.scene.add(g);
  }

  private buildCity() {
    const tex = windowsTexture();
    const S = 2.4;
    let k = 0;
    for (let i = -2; i <= 2; i++)
      for (let j = -2; j <= 2; j++) {
        const centre = i === 0 && j === 0;
        const h = centre ? 7.2 : 1.1 + (((i + 3) * 7 + (j + 3) * 13) % 5) * 0.85;
        const geo = new THREE.BoxGeometry(1.7, h, 1.7);
        geo.translate(0, h / 2, 0);
        const wire = new THREE.LineBasicMaterial({ color: COLORS.holo, transparent: true, opacity: 0 });
        const map = tex.clone();
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.repeat.set(1, h / 3);
        map.needsUpdate = true;
        const solid = new THREE.MeshPhysicalMaterial({
          color: 0x0c1830,
          metalness: 0.35,
          roughness: 0.18,
          clearcoat: 1,
          clearcoatRoughness: 0.2,
          transparent: true,
          opacity: 0,
          emissive: new THREE.Color(0xffd9a0),
          emissiveMap: map,
          emissiveIntensity: 0,
        });
        const group = new THREE.Group();
        group.position.set(i * S, 0, j * S);
        group.add(new THREE.Mesh(geo, solid));
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), wire));
        group.scale.y = 0.001;
        this.scene.add(group);
        this.blocks.push({ group, wire, solid, x: i * S, z: j * S, h, order: Math.abs(i) + Math.abs(j) + (k++ % 3) * 0.15 });
      }
    const max = Math.max(...this.blocks.map((b) => b.order));
    this.blocks.forEach((b) => (b.order /= max));
  }

  private buildRequirements() {
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const tops = this.blocks.map((b) => new THREE.Vector3(b.x, b.h, b.z));
    const nodeGeo = new THREE.SphereGeometry(0.09, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: COLORS.holo });
    for (let i = 0; i < 42; i++) {
      const t = tops[i % tops.length].clone().add(new THREE.Vector3(rnd(-0.85, 0.85), 0, rnd(-0.85, 0.85)));
      const a = rnd(0, Math.PI * 2);
      const from = new THREE.Vector3(Math.cos(a) * rnd(18, 30), rnd(4, 16), Math.sin(a) * rnd(18, 30));
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      m.position.copy(from);
      this.scene.add(m);
      this.nodes.push({ obj: m, from, to: t, delay: rnd(0, 0.45) });
    }
    // network: each node links to its two nearest targets
    this.nodes.forEach((n, i) => {
      const d = this.nodes.map((o, j) => [j, n.to.distanceTo(o.to)] as const).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]);
      this.linkPairs.push([i, d[0][0]], [i, d[1][0]]);
    });
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.linkPairs.length * 6), 3));
    this.links = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: COLORS.holo, transparent: true, opacity: 0 }));
    this.scene.add(this.links);

    const docMap = docTexture();
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.SpriteMaterial({ map: docMap, transparent: true, opacity: 0, depthWrite: false });
      const s = new THREE.Sprite(mat);
      s.scale.set(0.9, 1.15, 1);
      const a = (i / 10) * Math.PI * 2;
      const from = new THREE.Vector3(Math.cos(a) * 26, rnd(6, 14), Math.sin(a) * 26);
      const to = new THREE.Vector3(Math.cos(a) * 4.2, 9 + rnd(-0.6, 0.6), Math.sin(a) * 4.2);
      s.position.copy(from);
      this.scene.add(s);
      this.docs.push({ obj: s, from, to, delay: i * 0.035 });
    }

    // data streams: particles running from the docs into the tower
    const n = 160;
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.streams = new THREE.Points(sg, new THREE.PointsMaterial({ color: COLORS.holo, size: 0.09, transparent: true, opacity: 0, depthWrite: false }));
    this.scene.add(this.streams);
  }

  private buildPanels() {
    PANELS.forEach((p, i) => {
      const mat = new THREE.MeshBasicMaterial({ map: panelTexture(p.title, p.rows), transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.9), mat);
      this.scene.add(mesh);
      this.panels.push({ mesh, mat, angle: (i / PANELS.length) * Math.PI * 2, y: 3.2 + (i % 3) * 1.6, r: 8.4 + (i % 2) * 0.8 });
    });
  }

  private buildEngine() {
    const amber = new THREE.MeshStandardMaterial({ color: 0x3a2508, emissive: COLORS.amber, emissiveIntensity: 0.45, metalness: 0.7, roughness: 0.35 });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.14, 64), new THREE.MeshStandardMaterial({ color: 0x0b0f18, metalness: 0.8, roughness: 0.3 }));
    base.position.y = 0.07;
    this.core.add(base);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.035, 8, 96), new THREE.MeshBasicMaterial({ color: COLORS.amber }));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.15;
    this.core.add(rim);
    const specs: [number, number, number, number, number][] = [
      // r, teeth, x, z, speed
      [1.25, 14, 0, 0, 0.6],
      [0.82, 10, 1.98, 0.35, -0.9],
      [0.62, 8, -1.55, -1.1, -1.2],
    ];
    specs.forEach(([r, t, x, z, speed], i) => {
      const g = new THREE.Mesh(gearGeometry(r, t), amber);
      g.position.set(x, 0.3 + i * 0.02, z);
      this.core.add(g);
      this.gears.push({ mesh: g, speed });
    });
    this.core.scale.setScalar(0.001);
    this.scene.add(this.core);

    // circuit traces: manhattan paths from the core out under the city
    const pts: number[] = [];
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      const ex = Math.cos(a) * 7;
      const ez = Math.sin(a) * 7;
      const path = [new THREE.Vector3(Math.cos(a) * 3.5, 0.03, Math.sin(a) * 3.5), new THREE.Vector3(ex * 0.8, 0.03, Math.sin(a) * 3.5), new THREE.Vector3(ex, 0.03, ez)];
      this.traces.push(path);
      for (let s = 0; s < path.length - 1; s++) pts.push(...path[s].toArray(), ...path[s + 1].toArray());
    }
    const tg = new THREE.BufferGeometry();
    tg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    this.traceLines = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color: COLORS.amber, transparent: true, opacity: 0 }));
    this.scene.add(this.traceLines);

    const pm = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
    for (let i = 0; i < 32; i++) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), pm);
      m.visible = false;
      this.scene.add(m);
      this.packets.push({ mesh: m, trace: i % this.traces.length, off: Math.random() });
    }

    const cm = new THREE.MeshStandardMaterial({ map: codeTexture(), emissive: COLORS.amber, emissiveMap: codeTexture(), emissiveIntensity: 0.7, roughness: 0.4 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.2;
      const m = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.1, 0.6), cm);
      const to = new THREE.Vector3(Math.cos(a) * 2.55, 0.22, Math.sin(a) * 2.55);
      m.rotation.y = -a;
      m.position.set(to.x, 14, to.z);
      m.visible = false;
      this.scene.add(m);
      this.codeBlocks.push({ mesh: m, to, delay: i * 0.06 });
    }
  }

  private buildQA() {
    this.laser = new THREE.Mesh(new THREE.RingGeometry(7.1, 7.32, 128), new THREE.MeshBasicMaterial({ color: COLORS.qa, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.laser.rotation.x = -Math.PI / 2;
    this.scene.add(this.laser);
    this.scanDisc = new THREE.Mesh(new THREE.CircleGeometry(7.1, 96), new THREE.MeshBasicMaterial({ color: COLORS.qa, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.scanDisc.rotation.x = -Math.PI / 2;
    this.scene.add(this.scanDisc);

    const cmap = checkTexture();
    const picks = this.blocks.filter((_, i) => i % 2 === 0);
    picks.forEach((b) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: cmap, transparent: true, opacity: 0, depthWrite: false }));
      sprite.position.set(b.x, b.h + 0.75, b.z);
      sprite.scale.setScalar(0.001);
      this.scene.add(sprite);
      const ripple = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.58, 48), new THREE.MeshBasicMaterial({ color: COLORS.qa, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
      ripple.rotation.x = -Math.PI / 2;
      ripple.position.set(b.x, b.h + 0.02, b.z);
      this.scene.add(ripple);
      this.checks.push({ sprite, ripple, at: 0, y: b.h });
    });
    this.shield = new THREE.Sprite(new THREE.SpriteMaterial({ map: shieldTexture(), transparent: true, opacity: 0, depthWrite: false }));
    this.shield.position.set(0, 9.4, 0);
    this.shield.scale.set(0.001, 0.001, 1);
    this.scene.add(this.shield);
  }

  private buildDeployment() {
    this.beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.5, 80, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: COLORS.amber, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    );
    this.beam.position.y = 7.2 + 40;
    this.scene.add(this.beam);

    const n = 9000;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const c1 = new THREE.Color(COLORS.holo);
    const c2 = new THREE.Color(COLORS.amber);
    const c3 = new THREE.Color(0xffffff);
    for (let i = 0; i < n; i++) {
      const arm = i % 4;
      const r = 24 + Math.pow(Math.random(), 0.7) * 260;
      const a = arm * (Math.PI / 2) + r * 0.018 + (Math.random() - 0.5) * 0.5;
      pos[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (6 + r * 0.04);
      pos[i * 3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 8;
      const c = Math.random() < 0.55 ? c1 : Math.random() < 0.7 ? c2 : c3;
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    this.galaxy = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.55, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
    this.scene.add(this.galaxy);
  }

  /* ----------------------------------------------------------- control -- */

  setProgress(p: number) {
    this.p = p;
    if (!this.running) this.render(); // keep a correct still frame when paused
  }

  setSize(w: number, h: number, shift: number) {
    this.w = w;
    this.h = h;
    this.shift = shift;
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloom.resolution.set(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.render();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.stop();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
        Object.values(x).forEach((v) => v instanceof THREE.Texture && v.dispose());
        x.dispose();
      });
    });
    this.composer.dispose();
    this.renderer.dispose();
  }

  /* ------------------------------------------------------------ frame -- */

  private render() {
    const t = this.clock.getElapsedTime();
    const p = this.p;
    const [s1, s2, s3, s4, s5] = STEPS.map(([a, b]) => seg(p, a, b));

    /* camera ------------------------------------------------------------ */
    // keyframes: [radius, elevation°, azimuth°, targetY]
    const K = [
      [27, 28, 32, 2.6], // landing
      [23, 31, 62, 2.8], // requirements
      [18, 24, 150, 3.0], // design (orbit)
      [13, 34, 205, 0.6], // development (inside, looking down into the core)
      [22, 24, 250, 3.6], // QA (wide enough to see the ring sweep)
      [150, 58, 300, 2.0], // deployment (pull back)
    ];
    const at = (k: number) => K[k];
    const stepIndex = [s1, s2, s3, s4, s5];
    let cam = at(0).slice();
    for (let i = 0; i < 5; i++) {
      const e = ease(stepIndex[i]);
      cam = cam.map((v, j) => lerp(v, at(i + 1)[j], e));
    }
    const idle = (1 - s1) * Math.sin(t * 0.12) * 6; // slow idle turn on landing only
    const [r, el, az, ty] = [cam[0], (cam[1] * Math.PI) / 180, ((cam[2] + idle) * Math.PI) / 180, cam[3]];
    this.camera.position.set(Math.cos(az) * Math.cos(el) * r, ty + Math.sin(el) * r, Math.sin(az) * Math.cos(el) * r);
    this.camera.lookAt(0, ty, 0);
    // frame the city to the right of the copy, centred again for the launch CTA
    const off = this.shift * (1 - ease(s5));
    if (off) this.camera.setViewOffset(this.w, this.h, -off, 0, this.w, this.h);
    else this.camera.clearViewOffset();

    this.fog.density = lerp(0.03, 0.0016, ease(seg(s5, 0, 0.7)));
    (this.grid.material as THREE.LineBasicMaterial).opacity = 0.22 * (1 - seg(s5, 0.15, 0.6));

    /* requirements: wireframe rises, nodes/docs/streams fly in -------- */
    const exp = seg(s3, 0, 0.45) * (1 - seg(s4, 0, 0.4)); // development explode
    this.blocks.forEach((b) => {
      const grow = ease(seg(s1, b.order * 0.55, b.order * 0.55 + 0.4));
      const landingHint = 0.18 * (1 - s1);
      b.group.scale.y = Math.max(0.001, Math.max(grow, landingHint));
      b.wire.opacity = Math.max(0.55 * landingHint * 3, grow * 0.95) * (1 - 0.6 * seg(s2, 0.2, 0.9)) + 0.15 * s5;
      // design: glass fills in
      const fill = ease(seg(s2, b.order * 0.5, b.order * 0.5 + 0.5));
      b.solid.opacity = fill * (0.92 - exp * 0.55);
      // deployment: city lights up
      b.solid.emissiveIntensity = 1.5 * ease(seg(s5, 0, 0.5)); // dark until launch
      // development: modules lift and part
      const d = Math.hypot(b.x, b.z) || 1;
      const lift = exp * (3.2 + b.h * 0.35);
      const part = exp * 1.6;
      b.group.position.set(b.x + (b.x / d) * part, lift, b.z + (b.z / d) * part);
    });

    this.nodes.forEach((n) => {
      const k = ease(seg(s1, n.delay, n.delay + 0.45));
      n.obj.position.lerpVectors(n.from, n.to, k);
      n.obj.position.y += exp * 3.5;
      n.obj.visible = s1 > 0 && s3 < 0.6;
    });
    const lp = this.links.geometry.getAttribute("position") as THREE.BufferAttribute;
    this.linkPairs.forEach(([a, b], i) => {
      lp.setXYZ(i * 2, ...(this.nodes[a].obj.position.toArray() as [number, number, number]));
      lp.setXYZ(i * 2 + 1, ...(this.nodes[b].obj.position.toArray() as [number, number, number]));
    });
    lp.needsUpdate = true;
    (this.links.material as THREE.LineBasicMaterial).opacity = seg(s1, 0.5, 0.9) * 0.7 * (1 - seg(s2, 0.4, 1));

    this.docs.forEach((d) => {
      const k = ease(seg(s1, d.delay, d.delay + 0.5));
      const merge = ease(seg(s1, 0.75, 1));
      d.obj.position.lerpVectors(d.from, d.to, k).lerp(new THREE.Vector3(0, 7.4, 0), merge);
      const mat = (d.obj as THREE.Sprite).material;
      mat.opacity = seg(s1, d.delay, d.delay + 0.15) * (1 - merge);
      d.obj.visible = mat.opacity > 0.01;
    });

    const sp = this.streams.geometry.getAttribute("position") as THREE.BufferAttribute;
    const streamOn = seg(s1, 0.25, 0.45) * (1 - seg(s1, 0.85, 1));
    for (let i = 0; i < sp.count; i++) {
      const d = this.docs[i % this.docs.length];
      const u = (t * 0.35 + i / sp.count) % 1;
      sp.setXYZ(i, lerp(d.obj.position.x, 0, u), lerp(d.obj.position.y, 7.4, u), lerp(d.obj.position.z, 0, u));
    }
    sp.needsUpdate = true;
    (this.streams.material as THREE.PointsMaterial).opacity = streamOn;

    /* design: glass UI panels orbit -------------------------------------- */
    this.panels.forEach((pl, i) => {
      const k = ease(seg(s2, i * 0.08, i * 0.08 + 0.45));
      const a = pl.angle + s2 * 0.9 + s4 * 0.6 + t * 0.03;
      pl.mesh.position.set(Math.cos(a) * pl.r, pl.y + (1 - k) * -1.5 + exp * 2.5, Math.sin(a) * pl.r);
      pl.mesh.lookAt(this.camera.position.x, pl.mesh.position.y, this.camera.position.z);
      pl.mat.opacity = k * (1 - 0.85 * seg(s3, 0, 0.3)) * (1 - seg(s5, 0.2, 0.6)) + 0.0;
      pl.mat.opacity = Math.max(pl.mat.opacity, k * 0.15 * seg(s4, 0.5, 1) * (1 - seg(s5, 0.2, 0.6)));
      pl.mesh.visible = pl.mat.opacity > 0.01;
    });

    /* development: engine core ------------------------------------------ */
    const coreIn = ease(seg(s3, 0.15, 0.5));
    const coreOut = seg(s4, 0.3, 0.7);
    this.core.scale.setScalar(Math.max(0.001, coreIn * (1 - coreOut)));
    this.gears.forEach((g) => (g.mesh.rotation.y = g.speed * (t * 0.8 + p * 30)));
    this.coreLight.intensity = 9 * coreIn * (1 - coreOut);
    (this.traceLines.material as THREE.LineBasicMaterial).opacity = seg(s3, 0.25, 0.6) * (1 - coreOut) * 0.9;
    this.packets.forEach((pk) => {
      const tr = this.traces[pk.trace];
      const u = (t * 0.22 + pk.off) % 1;
      const seglen = u * (tr.length - 1);
      const si = Math.min(tr.length - 2, Math.floor(seglen));
      pk.mesh.position.lerpVectors(tr[si], tr[si + 1], seglen - si);
      pk.mesh.position.y = 0.1;
      pk.mesh.visible = s3 > 0.3 && coreOut < 1;
    });
    this.codeBlocks.forEach((cb) => {
      const k = seg(s3, 0.4 + cb.delay, 0.62 + cb.delay);
      cb.mesh.position.set(cb.to.x, lerp(14, cb.to.y, pop(k)), cb.to.z);
      cb.mesh.visible = k > 0 && coreOut < 1;
      cb.mesh.scale.setScalar(Math.max(0.001, 1 - coreOut));
    });

    /* QA: laser scan, checks, ripples, shield --------------------------- */
    const scan = seg(s4, 0.15, 0.85);
    const ringY = lerp(-0.2, 8.6, ease(scan));
    const qaOn = s4 > 0.1 && s4 < 0.95 ? 1 : 0;
    this.laser.position.y = ringY;
    this.scanDisc.position.y = ringY;
    (this.laser.material as THREE.MeshBasicMaterial).opacity = qaOn * 0.95;
    (this.scanDisc.material as THREE.MeshBasicMaterial).opacity = qaOn * 0.07;
    this.checks.forEach((c) => {
      const passed = ringY >= c.y ? seg(s4, 0.15 + (c.y / 8.6) * 0.7, 0.15 + (c.y / 8.6) * 0.7 + 0.1) : 0;
      const fade = 1 - seg(s5, 0.1, 0.4);
      c.sprite.scale.setScalar(Math.max(0.001, pop(passed) * 0.9));
      (c.sprite.material as THREE.SpriteMaterial).opacity = passed * fade;
      const rip = passed > 0 ? clamp(passed * 1.4) : 0;
      c.ripple.scale.setScalar(1 + rip * 2.4);
      (c.ripple.material as THREE.MeshBasicMaterial).opacity = (1 - rip) * (passed > 0 ? 0.9 : 0) * fade;
    });
    const sh = seg(s4, 0.85, 1);
    this.shield.scale.set(Math.max(0.001, pop(sh) * 1.6), Math.max(0.001, pop(sh) * 1.9), 1);
    (this.shield.material as THREE.SpriteMaterial).opacity = sh * (1 - seg(s5, 0.2, 0.5));

    /* deployment: launch beam + galaxy ---------------------------------- */
    const launch = seg(s5, 0.1, 0.45);
    (this.beam.material as THREE.MeshBasicMaterial).opacity = 0.55 * launch * (1 - 0.6 * seg(s5, 0.6, 1));
    this.beam.scale.set(1, Math.max(0.001, launch), 1);
    this.beam.position.y = 7.2 + 40 * launch;
    (this.galaxy.material as THREE.PointsMaterial).opacity = ease(seg(s5, 0.25, 0.85)) * 0.95;
    this.galaxy.rotation.y = t * 0.01 + s5 * 0.4;

    // calmer bloom inside the engine so the gears read; brighter at launch
    this.bloom.strength = 0.95 - 0.4 * coreIn * (1 - coreOut) + 0.3 * seg(s5, 0, 0.6);
    this.composer.render();
  }
}
