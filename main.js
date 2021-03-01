import { calcMaxOrder } from "./calc.js";
import {
  genExamplePerm,
  numPerm,
  calcPermOrder,
  validatePerm,
  thPermOrder,
} from "./perm.js";

function orderCallBack() {
  let n = parseInt(document.getElementById("order").value);

  if (n >= 2) {
    let f = calcMaxOrder(parseInt(n));
    let np = numPerm(f.factors, n);
    let ep = genExamplePerm(f.factors, n);
    document.getElementById("orderres").value =
      "Maximum order of permutation : " +
      f.order +
      "\r\nNumber of such permutations : " +
      np +
      "\r\nExample permutation : " +
      ep;
  } else {
    document.getElementById("orderres").innerText =
      "Invalid number of elements";
  }
}

function calOrderCallBack() {
  let perm = document.getElementById("perm").value.match(/\d+/g);
  if (perm.length > 35) {
    document.getElementById("permres").value = "Permutation too long";
    return;
  }

  if (!validatePerm(perm)) {
    document.getElementById("permres").value = "Invalid permutation";
  } else {
    let comps = calcPermOrder(perm);
    document.getElementById("permres").value =
      "Order : " + comps.order + "\nFirst 1000 compositions : \n";
    for (let i in comps.perms)
      document.getElementById("permres").value +=
        i + " -> " + comps.perms[i] + "\n\n";
  }
}

function thcalOrderCallBack() {
  let perm = document.getElementById("thperm").value.match(/\d+/g);
  if (perm.length > 99) {
    document.getElementById("thpermres").value = "Permutation too long";
    return;
  }

  if (!validatePerm(perm)) {
    document.getElementById("thpermres").value = "Invalid permutation";
  } else
    document.getElementById("thpermres").value = "Order : " + thPermOrder(perm);
}
window.orderCallBack = orderCallBack;
window.calOrderCallBack = calOrderCallBack;
window.thcalOrderCallBack = thcalOrderCallBack;
