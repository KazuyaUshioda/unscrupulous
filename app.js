// 回答の選択肢。value が大きいほど「許容できる」
const RATINGS = [
  { value: 4, emoji: "👌", label: "全然アリ" },
  { value: 3, emoji: "🙂", label: "まあアリ" },
  { value: 2, emoji: "😐", label: "どちらとも言えない" },
  { value: 1, emoji: "😬", label: "ちょっとナシ" },
  { value: 0, emoji: "🙅", label: "絶対ナシ" },
];

// 総合スコアに応じたタイプ（下限スコア順）
const TYPES = [
  { min: 80, name: "不謹慎の申し子", desc: "聖域なし。言う場所だけは選んでください。" },
  { min: 60, name: "ブラックユーモアの住人", desc: "毒のあるネタも大体いける。頼れる悪友タイプ。" },
  { min: 40, name: "バランス型", desc: "アリはアリ、ナシはナシ。一番健全かも。" },
  { min: 20, name: "良識派", desc: "許容より思いやりが先に立つ。優しい人です。" },
  { min: 0,  name: "聖人", desc: "不謹慎ネタはほぼNG。この世界は少し生きづらいかも。" },
];

const $ = (id) => document.getElementById(id);
let order = [];   // 出題順（QUESTIONS のインデックス）
let answers = []; // order と同じ順の回答（null = スキップ）
let pos = 0;
let chart = null;

function show(id) {
  for (const s of document.querySelectorAll(".screen")) s.hidden = s.id !== id;
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 1回のプレイで各ジャンルから出す問題数（8ジャンル × 2 = 16問）
const PER_GENRE = 2;

// 各ジャンルからランダムに PER_GENRE 問ずつ選び、全体をシャッフル
function pickQuestions() {
  const picked = GENRES.flatMap((g) => {
    const ids = QUESTIONS.map((q, i) => (q.genre === g.id ? i : -1)).filter((i) => i >= 0);
    return shuffle(ids).slice(0, PER_GENRE);
  });
  return shuffle(picked);
}

function start() {
  order = pickQuestions();
  answers = [];
  pos = 0;
  history.replaceState(null, "", location.pathname);
  show("quiz");
  render();
}

function render() {
  const q = QUESTIONS[order[pos]];
  $("bar").style.width = (pos / order.length) * 100 + "%";
  $("count").textContent = `${pos + 1} / ${order.length}`;
  $("genre").textContent = GENRES.find((g) => g.id === q.genre).label;
  $("question").textContent = q.text;
  $("backBtn").disabled = pos === 0;
}

function answer(value) {
  answers[pos] = value;
  pos++;
  if (pos < order.length) render();
  else showResult(calcScores());
}

// ジャンルごとに 0〜100 の許容度を計算（過激度で重み付け）
function calcScores() {
  return GENRES.map((g) => {
    let sum = 0, weight = 0;
    order.forEach((qi, i) => {
      const q = QUESTIONS[qi];
      if (q.genre !== g.id || answers[i] == null) return;
      sum += (answers[i] / 4) * q.severity;
      weight += q.severity;
    });
    return weight ? Math.round((sum / weight) * 100) : 0;
  });
}

function showResult(scores, shared = false) {
  const total = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const type = TYPES.find((t) => total >= t.min);
  $("total").textContent = total;
  $("typeName").textContent = type.name;
  $("typeDesc").textContent = type.desc;
  $("sharedNote").hidden = !shared;
  $("shareBtn").hidden = shared;
  $("retryBtn").textContent = shared ? "自分もやってみる" : "もう一度やる";
  $("copied").hidden = true;

  $("detail").innerHTML = "";
  GENRES.forEach((g, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${g.label}</span><b>${scores[i]}</b>`;
    $("detail").appendChild(li);
  });

  if (!shared) history.replaceState(null, "", "#r=" + scores.join("."));
  show("result");
  drawRadar(scores);
}

function drawRadar(scores) {
  const css = getComputedStyle(document.documentElement);
  const accent = css.getPropertyValue("--accent").trim();
  const text = css.getPropertyValue("--text").trim();
  const muted = css.getPropertyValue("--muted").trim();
  const line = css.getPropertyValue("--line").trim();

  if (chart) chart.destroy();
  chart = new Chart($("radar"), {
    type: "radar",
    data: {
      labels: GENRES.map((g) => g.label),
      datasets: [{
        data: scores,
        backgroundColor: accent + "33",
        borderColor: accent,
        pointBackgroundColor: accent,
        borderWidth: 2,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 20, display: false },
          grid: { color: line },
          angleLines: { color: line },
          pointLabels: { color: text, font: { size: 12 } },
        },
      },
    },
  });
}

async function share() {
  const url = location.href;
  try {
    await navigator.clipboard.writeText(url);
    $("copied").textContent = "コピーしました！友達に送ってみよう";
  } catch {
    $("copied").textContent = url;
  }
  $("copied").hidden = false;
}

// URL に #r=... があれば共有された結果を表示
function loadShared() {
  const m = location.hash.match(/^#r=([\d.]+)$/);
  if (!m) return false;
  const scores = m[1].split(".").map(Number);
  if (scores.length !== GENRES.length || scores.some((s) => !(s >= 0 && s <= 100))) return false;
  showResult(scores, true);
  return true;
}

// 選択肢ボタンを生成
for (const r of RATINGS) {
  const b = document.createElement("button");
  b.className = "choice";
  b.innerHTML = `<span class="emoji">${r.emoji}</span><span>${r.label}</span>`;
  b.onclick = () => answer(r.value);
  $("choices").appendChild(b);
}

$("startBtn").onclick = start;
$("retryBtn").onclick = start;
$("skipBtn").onclick = () => answer(null);
$("backBtn").onclick = () => { if (pos > 0) { pos--; render(); } };
$("shareBtn").onclick = share;

loadShared();
