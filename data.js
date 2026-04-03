let player = {
  hp: 5,
  maxHp: 5,
  atk: 1,
  gold: 0,
  weapon: "맨손",
  level: 1,
  killCount: 0
};

let weapons = {
  "맨손": { atk: 1, price: 0 },
  "강철검": { atk: 2, price: 300 },
  "다이아몬드 검": { atk: 3, price: 600 },
  "세라핌 검": { atk: 6, price: 5000 }
};

let monsters = {
  slime: {
    name: "슬라임",
    hp: 3,
    atk: 1,
    reward: 20
  },
  kingSlime: {
    name: "킹 슬라임",
    hp: 10,
    atk: 2,
    reward: 200,
    boss: true
  }
};
