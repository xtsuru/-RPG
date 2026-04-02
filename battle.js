function startBattle() {
  slime = defaultSlime();
  renderBattle("슬라임이 나타났다. 가위, 바위, 보로 싸운다.");
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
        <h3>🟢 슬라임</h3>
        <div class="hpbar">${makeHpBar(slime.hp, slime.maxHp)}</div>
        <div>체력: ${slime.hp}/${slime.maxHp}</div>
      </div>
    </div>

    <div class="message">${message}</div>

    <div>
      <button onclick="playRPS('scissors'); playSound('sfxClick')">✌ 가위</button>
      <button onclick="playRPS('rock'); playSound('sfxClick')">✊ 바위</button>
      <button onclick="playRPS('paper'); playSound('sfxClick')">✋ 보</button>
    </div>

    <div style="margin-top: 12px;">
      <button onclick="field(); playSound('sfxClick')">도망</button>
    </div>

    <div style="margin-top: 12px;">
      ${renderShopButton()}
    </div>
  `;
}

function getBiasedSlimeChoice(playerChoice) {
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
  const slimeChoice = getBiasedSlimeChoice(playerChoice);
  let message = `너: ${getChoiceName(playerChoice)} / 슬라임: ${getChoiceName(slimeChoice)}<br>`;

  if (playerChoice === slimeChoice) {
    message += "비겼다. 아무 일도 일어나지 않았다.";
    renderBattle(message);
    return;
  }

  const isWin =
    (playerChoice === "scissors" && slimeChoice === "paper") ||
    (playerChoice === "rock" && slimeChoice === "scissors") ||
    (playerChoice === "paper" && slimeChoice === "rock");

  if (isWin) {
    slime.hp -= player.atk;
    if (slime.hp < 0) slime.hp = 0;
    playSound("sfxHit");
    message += `승리. 슬라임에게 ${player.atk} 데미지.`;
  } else {
    player.hp -= 1;
    if (player.hp < 0) player.hp = 0;
    playSound("sfxHit");
    message += "패배. 플레이어가 1 데미지를 입었다.";
  }

  if (slime.hp <= 0) {
    player.gold += 50;
    playSound("sfxWin");
    getGame().innerHTML = `
      <h2>🏆 승리</h2>
      ${renderTop()}
      <div class="message">${message}</div>
      <p>슬라임을 쓰러뜨렸다. 50G 획득.</p>
      <button onclick="startBattle(); playSound('sfxClick')">다시 전투</button>
      ${renderBackToFieldButton()}
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
      <button onclick="field(); playSound('sfxClick')">처음부터 시작</button>
      <div style="margin-top: 12px;">${renderShopButton()}</div>
    `;
    return;
  }

  renderBattle(message);
}
