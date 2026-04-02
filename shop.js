function shop() {
  getGame().innerHTML = `
    <h2>🏪 상점</h2>
    ${renderTop()}

    <div class="shop-item">
      <h3>${shopItems.potion.name}</h3>
      <p>가격: ${shopItems.potion.price}G</p>
      <p>${shopItems.potion.desc}</p>
      <button onclick="buyItem('potion'); playSound('sfxClick')">구매</button>
    </div>

    <div class="shop-item">
      <h3>${shopItems.diamondSword.name}</h3>
      <p>가격: ${shopItems.diamondSword.price}G</p>
      <p>${shopItems.diamondSword.desc}</p>
      <button onclick="buyItem('diamondSword'); playSound('sfxClick')">구매</button>
    </div>

    <div class="shop-item">
      <h3>${shopItems.seraphimSword.name}</h3>
      <p>가격: ${shopItems.seraphimSword.price}G</p>
      <p>${shopItems.seraphimSword.desc}</p>
      <button onclick="buyItem('seraphimSword'); playSound('sfxClick')">구매</button>
    </div>

    ${renderBackToFieldButton()}
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
    alert("포션 사용. 체력이 전부 회복되었다.");
  }

  if (item.type === "weapon") {
    player.weapon = item.name;
    player.atk = item.atk;
    alert(item.name + " 장착 완료.");
  }

  shop();
}
