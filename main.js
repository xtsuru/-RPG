function startBattle(enemyKey) {
  currentEnemy = createEnemy(enemyKey);
  renderBattle(`${currentEnemy.name}이(가) 나타났다. 가위, 바위, 보로 싸운다.`);
}

function renderBattle(message = "") {
  getGame().innerHTML = `
    <h2>⚔ 전투</h2>
    ${renderTop()}

    <div class="row">
      <div class="panel">
        <h3>👤 플레이어</h3>
        <div class="hpbar">${makeHpBar(player.hp, player.maxHp)}</div>
        <div>체력: ${player.hp}/${player.maxHp}</div>
      </div>

      <div class="panel">
        <h3>${currentEnemy.type === "boss" ? "👑" : "🟢"} ${currentEnemy.name}</h3>
        <div class="hpbar">${makeHpBar(currentEnemy.hp, currentEnemy.maxHp)}</div>
        <div>체력: ${currentEnemy.hp}/${currentEnemy.maxHp}</div>
        <div>공격력: ${currentEnemy.damage}</div>
      </div>
    </div>

    <div class="message">${message}</div>

    <div>
      <button onclick="playRPS('scissors')">✌ 가위</button>
      <button onclick="playRPS('rock')">✊ 바위</button>
      <button onclick="playRPS('paper')">✋ 보</button>
    </div>

    <div style="margin-top: 12px;">
      <button onclick="field()">도망</button>
    </div>

    <div style="margin-top: 12px;">
      ${renderShopButton()}
    </div>
  `;
}

function getBiasedEnemyChoice(playerChoice) {
  const roll = Math.random();

  if (roll < 0.48) {
    if (playerChoice === "scissors") return "paper";
    if (playerChoice === "rock") return "scissors";
    return "rock";
  }

  if (roll < 0.73) {
    return playerChoice;
  }

  if (playerChoice === "scissors") return "rock";
  if (playerChoice === "rock") return "paper";
  return "scissors";
}

function playRPS(playerChoice) {
  const enemyChoice = getBiasedEnemyChoice(playerChoice);
  let message = `너: ${getChoiceName(playerChoice)} / ${currentEnemy.name}: ${getChoiceName(enemyChoice)}<br>`;

  if (playerChoice === enemyChoice) {
    message += "비겼다. 아무 일도 일어나지 않았다.";
    renderBattle(message);
    return;
  }

  const isWin =
    (playerChoice === "scissors" && enemyChoice === "paper") ||
    (playerChoice === "rock" && enemyChoice === "scissors") ||
    (playerChoice === "paper" && enemyChoice === "rock");

  if (isWin) {
    currentEnemy.hp -= player.atk;
    if (currentEnemy.hp < 0) currentEnemy.hp = 0;
    message += `승리. ${currentEnemy.name}에게 ${player.atk} 데미지.`;
  } else {
    player.hp -= currentEnemy.damage;
    if (player.hp < 0) player.hp = 0;
    message += `패배. 플레이어가 ${currentEnemy.damage} 데미지를 입었다.`;
  }

  if (currentEnemy.hp <= 0) {
    let levelMessage = "";

    player.gold += currentEnemy.rewardGold;

    if (currentEnemy.type === "normal") {
      player.normalKillCount += 1;

      if (player.normalKillCount >= 2) {
        player.normalKillCount = 0;
        levelUp();
        levelMessage = `<p>⬆ 레벨업! 현재 레벨 ${player.level}</p>
        <p>체력 최대치 +1 / 공격력 +1 / 체력 전부 회복</p>`;
      }
    }

    if (currentEnemy.type === "boss") {
      levelUp();
      levelMessage = `<p>👑 보스 처치 보상으로 즉시 레벨업!</p>
      <p>현재 레벨 ${player.level}</p>
      <p>체력 최대치 +1 / 공격력 +1 / 체력 전부 회복</p>`;
    }

    getGame().innerHTML = `
      <h2>🏆 승리</h2>
      ${renderTop()}
      <div class="message">${message}</div>
      <p>${currentEnemy.name}을(를) 쓰러뜨렸다. ${currentEnemy.rewardGold}G 획득.</p>
      ${levelMessage}
      <button onclick="field()">필드로 돌아가기</button>
      <div style="margin-top: 12px;">${renderShopButton()}</div>
    `;
    return;
  }

  if (player.hp <= 0) {
    resetGame();
    getGame().innerHTML = `
      <h2>💀 게임 오버</h2>
      ${renderTop()}
      <div class="message">${message}</div>
      <p>죽어서 게임이 리셋되었다.</p>
      <button onclick="field()">처음부터 시작</button>
      <div style="margin-top: 12px;">${renderShopButton()}</div>
    `;
    return;
  }

  renderBattle(message);
}
