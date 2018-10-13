module.exports = function getZerosCount(number, base) {
  let multiplier = 0;
  let count = 1;
  const counts = {}; //то, сколько простых множителей данного вида нам нужно в числе
  let temp = 0;
  let mult;
  let length = 0;
  let answer = 0;
  
  mult = get_simple_multipliers(base);  //получить простые множитнли числа
  length = mult.length;
  if (length === 1) {
    multiplier = mult[0];
  }
  else {
    multiplier = mult[length - 1];
    for (let i = 0; i < length - 1; i++) {  //подсчитаем количество простых множителей (т.е. сколько двоек, сколько троек и т.д.)
      if (counts[mult[i]] === undefined) counts[mult[i]] = 1;
      else counts[mult[i]] += 1;
      if (mult[i] === multiplier) count += 1;
    }
  }
  answer = Math.floor(count_number_of_occurrences(multiplier, number) / count);     // count учитывает, сколько множителей данного вида нам нужно
  for (el in counts) {
    temp = count_number_of_occurrences(parseInt(el), number);
    if (Math.floor(temp / counts[el]) < answer) answer = Math.floor(temp / counts[el]);  // наименьшее количесвто определённого множителя - ответ
  }
  return answer;
}

function count_number_of_occurrences(mult, number) { //сколько раз число number можно разделить на число mult, mult**2, mult**3 и т.д. (не важно с остатком или без)
  let answer = 0,
      num = mult;
  while (num < number && num !== 1) {
    answer += Math.floor(number/num);
    num *= mult;
  }
  return answer;
}

function get_simple_multipliers(n) {
  if (is_prime(n)) return [n];
  let multipliers = [],
      counts = [],
      i = 2;
  while (n > 1) {
    while (n % i === 0) {
      multipliers.push(i);
      n = Math.floor(n / i);
    }
    if (i === 2) i += 1;
    else i += 2;
  }
  return multipliers;
}

function is_prime(n) {
  if (n % 2 === 0) return false;
  for (let i = 3; i < (n ** (1/2)) + 1; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
    return true;
}
