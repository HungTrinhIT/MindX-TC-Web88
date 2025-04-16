// MODULE trong Javascript
// 1. Tái sử dụng (resuable)
// 2. Tính bảo trì (maintainable)
// 3. Dễ đọc (Readable)

// Hai loại module ở trong Javascript
// ESM: ES Module
// CommonJS

// Synchronous
const math = require('./mathCommonJS.js');

console.log(math.add(10, 20)); // 30
console.log(math.subtract(7, 15)); // -8
