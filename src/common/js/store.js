// 存
export function saveTolocal(id, key, value) {
  let seller = window.localStorage.__seller__;
  // 没有的情况下
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  // 转成ｊｓｏｎ
  window.localStorage.__seller__ = JSON.stringify(seller);
};
//  读取  def  默认值
export function loadFormLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def
  }
  let ret = seller[key];
  return ret || def;
};
