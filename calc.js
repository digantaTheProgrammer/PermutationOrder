function calcMn(N) {
  let maxlcms = [];
  for (let i = 0; i < N; i++) {
    maxlcms[i] = 1;
  }
  for (let num = 2; num <= N; num++) {
    if (isPrime(num))
      for (let k = N; k >= num; k--) {
        let temppart = num;
        while (k - temppart >= 0) {
          let maxlcm = maxlcms[k - 1];
          if (k - temppart == 0) maxlcm = max(temppart, maxlcm);
          else maxlcm = max(temppart * maxlcms[k - temppart - 1], maxlcm);
          maxlcms[k - 1] = maxlcm;
          temppart *= num;
        }
      }
  }
  return maxlcms[N - 1];
}

function max(a, b) {
  return a > b ? a : b;
}

function isPrime(n) {
  if (n <= 3) return true;
  let lim = Math.ceil(Math.sqrt(n));
  for (let i = 2; i <= lim; i++) if (n % i == 0) return false;
  return true;
}

function factor(n) {
  let facts = [];
  for (let i = 2; i <= n; i++) {
    let factor = 1;
    while (n % i == 0) {
      n /= i;
      factor *= i;
    }
    if (factor != 1) facts.push(factor);
  }
  return facts;
}

export function calcMaxOrder(n) {
  let o = calcMn(n);
  let f = factor(o);
  return { order: o, factors: f };
}
