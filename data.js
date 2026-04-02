const defaultPlayer = () => ({
  hp: 5,
  maxHp: 5,
  gold: 500,
  weapon: "없음",
  atk: 1
});

const defaultSlime = () => ({
  hp: 3,
  maxHp: 3
});

let player = defaultPlayer();
let slime = defaultSlime();

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
  slime = defaultSlime();
}
