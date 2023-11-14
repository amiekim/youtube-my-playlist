export const XSSCheck = (str) => {
  return str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, '');
};
