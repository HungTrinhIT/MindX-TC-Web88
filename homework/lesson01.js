// Bai 1
function printFrom1To100() {
  for (let i = 1; i <= 100; i++) {
    console.log(i);
  }
}

// printFrom1To100();

// Bai 2
function printFrom100To1() {
  for (let i = 100; i >= 1; i--) {
    console.log(i);
  }
}
// printFrom100To1();

// Bai 3
function bai3() {
  for (let i = 6; i <= 70; i++) {
    if (i % 5 === 0) {
      console.log(i);
    }
  }
}
// bai3();

// Bai 4
// n = 6
// 1 2 3 4 5 6
function countDivisor(n) {
  let count = 2;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      count++;
    }
  }

  return count;
}

// console.log(countDivisor(6)); // 1,2,3,6
// console.log(countDivisor(10)); // 1,2,5,10
// console.log(countDivisor(2)); // 1,2

// Bai 5 check perfect number
// n=6, 1 2 3 4 5 6
function isPerfectNumber(n) {
  let sum = 0;

  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }

  return sum === n;
}

// console.log(isPerfectNumber(10)); //false
// console.log(isPerfectNumber(12)); // false
// console.log(isPerfectNumber(6)); // true

// Bai 6
// function rightAngledTriangle(n) {
//   for (let i = 1; i <= n; i++) {
//     let row = '';
//     for (let j = 1; j <= i; j++) {
//       row += '#';
//     }
//     console.log(row);
//     row = '';
//   }
// }

function rightAngledTriangle(n) {
  for (let i = 1; i <= n; i++) {
    let row = '#'.repeat(i);
    console.log(row);
  }
}
rightAngledTriangle(4);
