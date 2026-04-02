let gold = 1000;

function town() {
  document.getElementById("game").innerHTML = `
    <h2>🏠 마을</h2>
    <p>💰 Gold: ${gold}</p>
    <button onclick="shop()">상점</button>
    <button onclick="battle()">슬라임</button>
  `;
}

function shop() {
  document.getElementById("game").innerHTML = `
    <h2>🛒 상점</h2>
    <p>💎 심연의 세라핌 슈퍼검 (999G)</p>
    <button onclick="buy()">구매</button>
    <button onclick="town()">뒤로</button>
  `;
}

function buy() {
  if (gold >= 999) {
    gold -= 999;
    alert("검 구매 완료!");
  } else {
    alert("돈 부족!");
  }
  shop();
}

function battle() {
  document.getElementById("game").innerHTML = `
    <h2>⚔ 슬라임 등장</h2>
    <button onclick="attack()">공격</button>
    <button onclick="town()">도망</button>
  `;
}

function attack() {
  alert("슬라임 처치! +100G");
  gold += 100;
  town();
}

town();
