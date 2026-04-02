function getGame() {
  return document.getElementById("game");
}

function playSound(id) {
  const audio = document.getElementById(id);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function startBgmOnce() {
  const bgm = document.getElementById("bgm");
  if (!bgm) return;
  bgm.volume = 0.4;
  bgm.play().catch(() => {});
}

document.addEventListener("click", startBgmOnce, { once: true });

function makeHpBar(current, max) {
  return "🟥".repeat(current) + "⬜".repeat(max - current);
}

function renderTop() {
  return `
    <div class="panel">
      <div>❤️ 체력: ${makeHpBar(player.hp, player.maxHp)} (${player.hp}/${player.maxHp})</div>
      <div>💰 골드: ${player.gold}G</div>
      <div>🗡 무기: ${player.weapon}</div>
      <div>💥 공격력: ${player.atk}</div>
    </div>
  `;
}

function renderShopButton() {
  return `<button onclick="shop(); playSound('sfxClick')">🏪 상점</button>`;
}

function renderBackToFieldButton() {
  return `<button onclick="field(); playSound('sfxClick')">🌍 필드로</button>`;
}

function getChoiceName(choice) {
  if (choice === "scissors") return "가위";
  if (choice === "rock") return "바위";
  return "보";
}
