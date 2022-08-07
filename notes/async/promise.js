'use strict';

// Promise is a JavaScript object for asynchronous operation. // 비동기적인 것을 수행할 때 콜백함수 대신 유용하게 사용 가능
// State: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically. => 중요!
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files) // 시간이 걸리는 것들은 프로미스를 만들어서 비동기적으로 처리하는 것이 좋음
  console.log('doing something...');
  setTimeout(() => {
    resolve('ellie');
    // reject(new Error('no network')); => 어떤 에러가 발생했는지 이유를 잘 명시해서 작성해야 함
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => { // 성공 실패와 상관없이 무조건 마지막에 호출됨
    console.log('finally');
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then(getEgg)
  .catch(error => {
    return '🥖';   // 계란을 받아오는 것에 문제가 생겨도 빵구 처리해서 전체적인 프로미스 체인이 실패하지 않도록!
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
  
