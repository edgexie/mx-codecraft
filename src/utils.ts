// 生成6位随机数
export function generateRandomNumber() {
  // 生成一个介于100000到999999之间的随机整数
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
}
