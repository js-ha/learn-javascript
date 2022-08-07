// async & await
// clear style of using promise :)

// 1. async
async function fetchUser() { // 코드블록이 자동으로 프로미스로 바뀌는 것
  // do network reqeust in 10 secs....
  return 'ellie';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await ✨
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return '🍎';
}

async function getBanana() {
  await delay(1000);
  return '🍌';
}

async function pickFruits() { // 이렇게 작성하지 않아
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

// 3. useful APIs ✨
function pickAllFruits() { // 이렇게 작성하는게 좋아
  return Promise.all([getApple(), getBanana()])
  .then(fruits => fruits.join(' + ')
  );
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]); // 먼저 수행되는 아이 하나만 출력
}

pickOnlyOne().then(console.log);
