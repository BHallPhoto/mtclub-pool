const users = [
  {"name": "Larry", "paid": true},
  {"name": "Brian", "paid": false},
  {"name": "Andrew", "paid": true},
  {"name": "Sandy", "paid": true},
  {"name": "Kevin", "paid": true},
  {"name": "Tim", "paid": false},
  {"name": "Levi", "paid": true},
  {"name": "Dave", "paid": false},
  {"name": "Mark", "paid": true},
  {"name": "Andy", "paid": true},
  {"name": "Laura", "paid": true},
  {"name": "Amber", "paid": true},
  {"name": "Christine", "paid": true},
  // {"name": "Rob", "paid": true}
];
let roundOne = [
  {
    "game1": []
  }
];

console.log(users.length % 2 === 0 ? users.length / 2 : Math.floor(users.length / 2))

const objRdy = () => {
  let games = (users.length / 2) % 2 === 0 ? users.length / 2 : (users.length / 2) - 1;
  for (let i = 0; i < users.length; i++) {

  }
}

const getRoundReady = () => {
  for (let i = 0; i < 2; i++) {
    let x = Math.floor(Math.random() * users.length);
    let y = users.splice(x, 1)
    roundOne[0]["game1"].push(y[0])
  }
}
getRoundReady(users)
console.log(roundOne)
