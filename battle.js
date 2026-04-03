let currentMonster = null;

function goHunt() {
  // 확률로 보스 등장
  if (Math.random() < 0.2) {
    startBattle("kingSlime");
  } else {
    startBattle("slime");
  }
}

function startBattle(type) {
  const m = monsters[type];

  currentMonster = {
    name: m.name,
    hp: m.hp,
    atk: m.atk,
    reward: m.reward,
    boss: m.boss || false
  };

  renderBattle();
}

function renderBattle() {
  document.getElementById("game").innerHTML = `
    <h2>${currentMonster.name}</h2>
    <p>몬스터 체력: ${"🟥".repeat(currentMonster.hp)}</p>
    <p>내 체력: ${"🟩".repeat(player.hp)}</p>

    <button onclick="fight()">공격 (가위바위보)</button>
    <button onclick="openShop()">상점</button>
  `;
}

function fight() {
  const choices = ["가위", "바위", "보"];
  const playerChoice = choices[Math.floor(Math.random() * 3)];
  const enemyChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";

  if (
    (playerChoice === "가위" && enemyChoice === "보") ||
    (playerChoice === "바위" && enemyChoice === "가위") ||
    (playerChoice === "보" && enemyChoice === "바위")
  ) {
    // 승리 → 공격 성공
    currentMonster.hp -= player.atk;
    result = "공격 성공!";
  } else {
    // 패배 → 맞음
    player.hp -= currentMonster.atk;
    result = "공격 실패! 맞았다!";
  }

  // 죽었을 때
  if (player.hp <= 0) {
    alert("죽었다! 게임 리셋");
    location.reload();
    return;
  }

  if (currentMonster.hp <= 0) {
    player.gold += currentMonster.reward;

    if (currentMonster.boss) {
      levelUp(); // 보스는 즉시 레벨업
    } else {
      player.killCount++;
      if (player.killCount >= 2) {
        levelUp();
        player.killCount = 0;
      }
    }

    alert(`${currentMonster.name} 처치! +${currentMonster.reward}G`);
    updateUI();
    return;
  }

  renderBattle();
}

function levelUp() {
  player.level++;
  player.maxHp++;
  player.hp = player.maxHp;
  alert("레벨 업!");
}
