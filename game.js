let player = {
  hp: 5,
  maxHp: 5,
  gold: 500,
  weapon: "없음",
  atk: 1
};

let slime = {
  hp: 3,
  maxHp: 3
};

const shopItems = {
  potion: {
    name: "체력 회복 포션",
    price: 50,
    type: "potion"
  },
  diamondSword: {
    name: "다이아몬드 검",
    price: 500,
    atk: 2,
    type: "weapon"
  },
  seraphimSword: {
    name: "심연의 세라핌 검",
    price: 5000,
    atk: 6,
    type: "weapon"
  }
};

function resetGame() {
  player = {
    hp: 5,
    maxHp: 5,
    gold: 500,
    weapon: "없음",
    atk: 1
  };
  slime = {
    hp: 3,
    maxHp: 3
  };
}

function renderTop() {
  return `
    <div style="margin-bottom:16px; padding:12px; border:1px solid #555; border-radius:8px; background:#222;">
      <div>❤️ 체력: ${makeHpBar(player.hp, player.maxHp)} (${player.hp}/${player.maxHp})</div>
      <div>💰 골드: ${player.gold}G</div>
      <div>🗡 무기: ${player.weapon}</div>
      <div>💥 공격력: ${player.atk}</div>
    </div>
  `;
}

function makeHpBar(current, max) {
  return "🟥".repeat(current) + "⬜".repeat(max - current);
}

function renderShopButton() {
  return `
    <div style="margin-top:16px;">
      <button onclick="shop()">🏪 상점</button>
    </div>
  `;
}

function field() {
  document.getElementById("game").innerHTML = `
    <h2>🌍 필드</h2>
    ${renderTop()}

    <div style="margin:20px 0;">
      <button onclick="startBattle()">🟢 슬라임과 전투</button>
      <button onclick="portal()">🌀 포탈</button>
    </div>

    <div style="font-size:56px; margin:24px 0;">👤</div>

    ${renderShopButton()}
  `;
}

function shop() {
  document.getElementById("game").innerHTML = `
    <h2>🏪 상점</h2>
    ${renderTop()}

    <div style="border:1px solid #555; padding:12px; margin-bottom:12px; border-radius:8px; background:#222;">
      <h3>${shopItems.potion.name}</h3>
      <p>가격: ${shopItems.potion.price}G</p>
      <p>효과: 체력 풀회복</p>
      <button onclick="buyItem('potion')">구매</button>
    </div>

    <div style="border:1px solid #555; padding:12px; margin-bottom:12px; border-radius:8px; background:#222;">
      <h3>${shopItems.diamondSword.name}</h3>
      <p>가격: ${shopItems.diamondSword.price}G</p>
      <p>효과: 공격력 ${shopItems.diamondSword.atk}</p>
      <button onclick="buyItem('diamondSword')">구매</button>
    </div>

    <div style="border:1px solid #555; padding:12px; margin-bottom:12px; border-radius:8px; background:#222;">
      <h3>${shopItems.seraphimSword.name}</h3>
      <p>가격: ${shopItems.seraphimSword.price}G</p>
      <p>효과: 공격력 ${shopItems.seraphimSword.atk}</p>
      <button onclick="buyItem('seraphimSword')">구매</button>
    </div>

    <button onclick="field()">필드로 돌아가기</button>
  `;
}

function buyItem(key) {
  const item = shopItems[key];

  if (player.gold < item.price) {
    alert("골드가 부족하다.");
    return;
  }

  player.gold -= item.price;

  if (item.type === "potion") {
    player.hp = player.maxHp;
    alert("포션을 사용했다. 체력이 전부 회복되었다.");
  }

  if (item.type === "weapon") {
    player.weapon = item.name;
    player.atk = item.atk;
    alert(item.name + " 장착 완료.");
  }

  shop();
}

function portal() {
  document.getElementById("game").innerHTML = `
    <h2>🌀 포탈</h2>
    ${renderTop()}
    <p>아직 다음 차원은 열리지 않았다.</p>
    <button onclick="field()">필드로 돌아가기</button>
    ${renderShopButton()}
  `;
}

function startBattle() {
  slime.hp = slime.maxHp;
  renderBattle("슬라임이 나타났다. 가위, 바위, 보로 싸운다.");
}

function renderBattle(message = "") {
  document.getElementById("game").innerHTML = `
    <h2>⚔ 전투</h2>
    ${renderTop()}

    <div style="display:flex; justify-content:space-around; gap:16px; flex-wrap:wrap; margin:20px 0;">
      <div style="width:180px; border:1px solid #555; border-radius:8px; padding:12px; background:#222;">
        <h3>👤 플레이어</h3>
        <div style="font-size:24px; margin:8px 0;">${makeHpBar(player.hp, player.maxHp)}</div>
        <div>체력: ${player.hp}/${player.maxHp}</div>
      </div>

      <div style="width:180px; border:1px solid #555; border-radius:8px; padding:12px; background:#222;">
        <h3>🟢 슬라임</h3>
        <div style="font-size:24px; margin:8px 0;">${makeHpBar(slime.hp, slime.maxHp)}</div>
        <div>체력: ${slime.hp}/${slime.maxHp}</div>
      </div>
    </div>

    <div style="min-height:48px; margin:16px 0;">${message}</div>

    <div>
      <button onclick="playRPS('scissors')">✌ 가위</button>
      <button onclick="playRPS('rock')">✊ 바위</button>
      <button onclick="playRPS('paper')">✋ 보</button>
    </div>

    <div style="margin-top:16px;">
      <button onclick="field()">도망</button>
    </div>

    ${renderShopButton()}
  `;
}

function getChoiceName(choice) {
  if (choice === "scissors") return "가위";
  if (choice === "rock") return "바위";
  return "보";
}

// 슬라임이 조금 더 자주 맞도록 플레이어 승리 확률을 약간 올린 판정
function getBiasedSlimeChoice(playerChoice) {
  const roll = Math.random();

  // 약 45%: 플레이어가 이기도록 슬라임 선택
  if (roll < 0.45) {
    if (playerChoice === "scissors") return "paper";
    if (playerChoice === "rock") return "scissors";
    return "rock";
  }

  // 약 25%: 무승부
  if (roll < 0.70) {
    return playerChoice;
  }

  // 약 30%: 플레이어 패배
  if (playerChoice === "scissors") return "rock";
  if (playerChoice === "rock") return "paper";
  return "scissors";
}

function playRPS(playerChoice) {
  const slimeChoice = getBiasedSlimeChoice(playerChoice);
  let message = `너: ${getChoiceName(playerChoice)} / 슬라임: ${getChoiceName(slimeChoice)}<br>`;

  if (playerChoice === slimeChoice) {
    message += "비겼다. 아무 일도 일어나지 않았다.";
    renderBattle(message);
    return;
  }

  const win =
    (playerChoice === "scissors" && slimeChoice === "paper") ||
    (playerChoice === "rock" && slimeChoice === "scissors") ||
    (playerChoice === "paper" && slimeChoice === "rock");

  if (win) {
    slime.hp -= player.atk;
    if (slime.hp < 0) slime.hp = 0;
    message += `승리. 슬라임에게 ${player.atk} 데미지.`;
  } else {
    player.hp -= 1;
    if (player.hp < 0) player.hp = 0;
    message += "패배. 플레이어가 1 데미지를 입었다.";
  }

  if (slime.hp <= 0) {
    player.gold += 50;
    document.getElementById("game").innerHTML = `
      <h2>🏆 승리</h2>
      ${renderTop()}
      <p>${message}</p>
      <p>슬라임을 쓰러뜨렸다. 50G 획득.</p>
      <button onclick="startBattle()">다시 전투</button>
      <button onclick="field()">필드로 돌아가기</button>
      ${renderShopButton()}
    `;
    return;
  }

  if (player.hp <= 0) {
    resetGame();
    document.getElementById("game").innerHTML = `
      <h2>💀 게임 오버</h2>
      ${renderTop()}
      <p>${message}</p>
      <p>죽어서 게임이 리셋되었다.</p>
      <button onclick="field()">처음부터 시작</button>
      ${renderShopButton()}
    `;
    return;
  }

  renderBattle(message);
}

field();
