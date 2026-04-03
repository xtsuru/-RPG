const defaultPlayer = () => ({
  hp: 5,
  maxHp: 5,
  gold: 0,
  weapon: "없음",
  atk: 1,
  level: 1,
  normalKillCount: 0
});

let player = defaultPlayer();

const enemies = {
  slime: {
    key: "slime",
    name: "슬라임",
    hp: 3,
    maxHp: 3,
    damage: 1,
    rewardGold: 50,
    type: "normal"
  },
  kingSlime: {
    key: "kingSlime",
    name: "킹 슬라임",
    hp: 10,
    maxHp: 10,
    damage: 2,
    rewardGold: 300,
    type: "boss"
  }
};

let currentEnemy = null;

const shopItems = {
  potion: {
    key: "potion",
    name: "체력 회복 포션",
    price: 50,
    type: "potion",
    desc: "체력을 전부 회복"
  },
  diamondSword: {
    key: "diamondSword",
    name: "다이아몬드 검",
    price: 500,
    atk: 2,
    type: "weapon",
    desc: "공격력 2"
  },
  seraphimSword: {
    key: "seraphimSword",
    name: "심연의 세라핌 검",
    price: 5000,
    atk: 6,
    type: "weapon",
    desc: "공격력 6"
  }
};

function resetGame() {
  player = defaultPlayer();
  currentEnemy = null;
}

function createEnemy(enemyKey) {
  const base = enemies[enemyKey];
  return {
    key: base.key,
    name: base.name,
    hp: base.hp,
    maxHp: base.maxHp,
    damage: base.damage,
    rewardGold: base.rewardGold,
    type: base.type
  };
}

function levelUp() {
  player.level += 1;
  player.maxHp += 1;
  player.hp = player.maxHp;
  player.atk += 1;
}
