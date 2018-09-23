module.exports = function getZerosCount(number, base) {
  var multiplier = 0,
      c = 1,
      counts = {},
      temp = 0;
  var mult = get_simple_multipliers(base);
  if (mult.length === 1) {
    multiplier = mult[0];
  }
  else {
    multiplier = mult[mult.length - 1];
    for (let i = 0; i < mult.length - 1; i++) {
      if (counts[mult[i]] === undefined) {counts[mult[i]] = 1;}
      else {counts[mult[i]] += 1;}
      if (mult[i] === multiplier) {c += 1;}
    }
  }
  answer = Math.floor(count_number_of_occurrences(multiplier, number) / c);
  for (el in counts) {
    temp = count_number_of_occurrences(parseInt(el), number);
    if (Math.floor(temp / counts[el]) < answer) {answer = Math.floor(temp / counts[el]);}
  }
  return answer;
}

function count_number_of_occurrences(mult, number) {
  let answer = 0,
      num = mult;
  while (num < number && num !== 1) {
    answer += Math.floor(number/num);
    num *= mult;
  }
  return answer;
}

function get_simple_multipliers(n) {
  if (is_prime(n)) {return [n];}
  var multipliers = [],
      counts = [],
      i = 2;
  while (n > 1) {
    while (n % i === 0) {
      multipliers.push(i);
      n = Math.floor(n / i);
    }
    if (i === 2) {i += 1;}
    else {i += 2;}
  }
  return multipliers;
}

function is_prime(n) {
  if (n % 2 === 0) {return false;}
  for (let i = 3; i < (n ** (1/2)) + 1; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
    return true;
}
