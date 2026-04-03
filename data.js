function openShop() {
  document.getElementById("game").innerHTML = `
    <h2>상점</h2>
    <p>골드: ${player.gold}G</p>

    <button onclick="buyWeapon('강철검')">강철검 (300G / 공격력 2)</button>
    <button onclick="buyWeapon('다이아몬드 검')">다이아검 (600G / 공격력 3)</button>
    <button onclick="buyWeapon('세라핌 검')">세라핌검 (5000G / 공격력 6)</button>

    <button onclick="buyPotion()">포션 (50G / 풀회복)</button>

    <br><br>
    <button onclick="updateUI()">뒤로가기</button>
  `;
}

function buyWeapon(name) {
  const w = weapons[name];

  if (player.gold >= w.price) {
    player.gold -= w.price;
    player.weapon = name;
    player.atk = w.atk;
    alert(name + " 구매 완료!");
  } else {
    alert("돈 부족!");
  }

  openShop();
}

function buyPotion() {
  if (player.gold >= 50) {
    player.gold -= 50;
    player.hp = player.maxHp;
    alert("풀 회복!");
  } else {
    alert("돈 부족!");
  }

  openShop();
}
