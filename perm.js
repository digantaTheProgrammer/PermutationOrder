export function genExamplePerm(factors, n) {
  let k = 0;
  for (let i in factors) k += factors[i];
  let randoms = randGen(n, k);
  let nums = [];
  for (let i = 0; i < n; i++) nums.push(i + 1);
  k = 0;
  for (let i in factors) {
    let cycledir = 1 - 2 * Math.floor(Math.random() * 2);
    genPermute(nums, cycledir, k, factors[i], randoms);
    k += factors[i];
  }
  return nums;
}

export function numPerm(factors, n) {
  let ret = Math.pow(2, factors.length);
  let k = 0;
  for (let i in factors) {
    ret *= C(n - k, factors[i]);
    k += factors[i];
  }
  return ret;
}

export function calcPermOrder(perm) {
  let nums = [],
    ref = [];
  let perms = [];
  for (let i in perm) {
    nums.push(perm[i]);
    ref.push(parseInt(i) + 1);
  }
  perms.push(ref);
  perms.push(perm);
  let k = 0;
  while (!equal(nums, ref)) {
    nums = permute(nums, perm);
    if (perms.length < 1000) perms.push(nums);
    k++;
  }
  return { perms: perms, order: k + 1 };
}

function equal(a, b) {
  if (a.length != b.length) return false;
  for (let i in a) if (a[i] != b[i]) return false;
  return true;
}
function permute(perm, indexes) {
  let ret = [];
  for (let i in perm) ret.push(perm[indexes[i] - 1]);
  return ret;
}

function C(n, r) {
  let c = 1,
    k = 0;
  while (k < r) c *= n - k++;
  while (r > 1) c /= r--;
  return c;
}
function genPermute(perm, cycledir, si, len, indexes) {
  let ei = si + (len - 1);
  if (cycledir == -1) {
    let t = ei;
    ei = si;
    si = t;
  }
  let tmp = perm[indexes[si]];
  while (si != ei) {
    perm[indexes[si]] = perm[indexes[si + cycledir]];
    si += cycledir;
  }
  perm[indexes[ei]] = tmp;
}

function randGen(n, k) {
  let nums = [];
  for (let i = 0; i < n; i++) nums.push(i);
  for (let i = 0; i < k; i++) {
    let ci = Math.floor(Math.random() * (n - i)) + i;
    let t = nums[ci];
    nums[ci] = nums[i];
    nums[i] = t;
  }
  let ret = [];
  for (let i = 0; i < k; i++) ret[i] = nums[i];
  return ret;
}

export function validatePerm(perm) {
  let num = [];
  for (let i in perm) num.push(0);
  for (let i in perm)
    if (perm[i] < 1 || perm[i] > perm.length) return false;
    else if (num[perm[i] - 1] != 0) return false;
    else num[perm[i] - 1] = 1;
  return true;
}
