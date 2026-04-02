let player = {
  hp: 5,
  maxHp: 5,
  gold: 500,
  atk: 1
};

let slime = {
  hp: 3,
  maxHp: 3,
  atk: 1
};

let hasSword = false;

function renderTop() {
  return `
    <div style="margin-bottom: 16px;">
      <p>💰 Gold: ${player.gold}</p>
      <p>🗡 공격력: ${player.atk}</p>
      <p>🛡 장비: ${hasSword ? "세라핌 검" : "없음"}</p>
    </div>
  `;
}

function makeHpBar(current, max) {
  let filled = "🟥".repeat(current);
  let empty = "⬜".repeat(max - current);
  return filled + empty;
}

function field() {
  document.getElementById("game").innerHTML = `
    <h2>🌍 필드</h2>
    ${renderTop()}

    <div style="margin-bottom: 20px;">
      <button onclick="shop()">🏪 상점</button>
      <button onclick="portal()">🌀 포탈</button>
    </div>

    <div style="font-size: 48px; margin: 20px 0;">
      👤
    </div>

    <div>
      <button onclick="startBattle()">🟢 슬라임과 전투</button>
    </div>
  `;
}

function shop() {
  document.getElementById("game").innerHTML = `
    <h2>🏪 상점</h2>
    ${renderTop()}

    <div style="border:1px solid #555; padding:12px; margin-bottom:12px;">
      <p><strong>심연의 세라핌 검</strong></p>
      <p>가격: 300G</p>
      <p>효과: 전투 연출용 장비 표시</p>
      <button onclick="buySword()">구매</button>
    </div>

    <button onclick="field()">뒤로</button>
  `;
}

function buySword() {
  if (hasSword) {
    alert("이미 구매했다.");
    return;
  }

  if (player.gold < 300) {
    alert("골드가 부족하다.");
    return;
  }

  player.gold -= 300;
  hasSword = true;
  alert("세라핌 검 구매 완료.");
  shop();
}

function portal() {
  alert("포탈은 다음 맵에서 열릴 예정.");
}

function startBattle() {
  player.hp = player.maxHp;
  slime.hp = slime.maxHp;
  renderBattle("슬라임이 나타났다. 가위, 바위, 보로 싸워라.");
}

function renderBattle(message = "") {
  document.getElementById("game").innerHTML = `
    <h2>⚔ 슬라임 전투</h2>
    ${renderTop()}

    <div style="display:flex; justify-content:space-around; align-items:flex-start; gap:16px; margin:20px 0; flex-wrap:wrap;">
      <div style="border:1px solid #555; padding:12px; width:150px;">
        <h3>👤 플레이어</h3>
        <p style="font-size: 24px;">${makeHpBar(player.hp, player.maxHp)}</p>
        <p>체력: ${player.hp} / ${player.maxHp}</p>
      </div>

      <div style="border:1px solid #555; padding:12px; width:150px;">
        <h3>🟢 슬라임</h3>
        <p style="font-size: 24px;">${makeHpBar(slime.hp, slime.maxHp)}</p>
        <p>체력: ${slime.hp} / ${slime.maxHp}</p>
      </div>
    </div>

    <p style="min-height: 24px;">${message}</p>

    <div style="margin-top: 16px;">
      <button onclick="playRPS('scissors')">✌ 가위</button>
      <button onclick="playRPS('rock')">✊ 바위</button>
      <button onclick="playRPS('paper')">✋ 보</button>
    </div>

    <div style="margin-top: 16px;">
      <button onclick="field()">도망</button>
    </div>
  `;
}

function getChoiceName(choice) {
  if (choice === "scissors") return "가위";
  if (choice === "rock") return "바위";
  return "보";
}

function getRandomChoice() {
  const choices = ["scissors", "rock", "paper"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRPS(playerChoice) {
  const slimeChoice = getRandomChoice();
  let message = `너: ${getChoiceName(playerChoice)} / 슬라임: ${getChoiceName(slimeChoice)}<br>`;

  if (playerChoice === slimeChoice) {
    message += "비겼다. 아무도 피해를 입지 않았다.";
    renderBattle(message);
    return;
  }

  const win =
    (playerChoice === "scissors" && slimeChoice === "paper") ||
    (playerChoice === "rock" && slimeChoice === "scissors") ||
    (playerChoice === "paper" && slimeChoice === "rock");

  if (win) {
    slime.hp -= 1;
    message += "승리. 슬라임을 공격했다. 슬라임 체력 1 감소.";
  } else {
    player.hp -= 1;
    message += "패배. 슬라임에게 공격당했다. 플레이어 체력 1 감소.";
  }

  if (slime.hp <= 0) {
    player.gold += 50;
    document.getElementById("game").innerHTML = `
      <h2>🏆 승리</h2>
      ${renderTop()}
      <p>${message}</p>
      <p>슬라임을 쓰러뜨렸다. 50G 획득.</p>
      <button onclick="field()">필드로 돌아가기</button>
    `;
    return;
  }

  if (player.hp <= 0) {
    document.getElementById("game").innerHTML = `
      <h2>💀 패배</h2>
      ${renderTop()}
      <p>${message}</p>
      <p>플레이어가 쓰러졌다. 다시 도전해야 한다.</p>
      <button onclick="startBattle()">다시 싸우기</button>
      <button onclick="field()">필드로 돌아가기</button>
    `;
    return;
  }

  renderBattle(message);
}

field();
