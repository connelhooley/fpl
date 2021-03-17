Array.prototype.pairwise = function () {
  return this.reduce((acc, curr, index) => {
    if ((index % 2) === 0) {
      return [...acc, [curr]];
    } else {
      const [rest, [prev]] = [acc.slice(0, -1), ...acc.slice(-1)];
      return [...rest, [prev, curr]];
    }
  }, []);
};

Array.prototype.average = function () {
  return this.reduce((prev, curr) => (prev + curr), 0) / this.length;
};

Array.prototype.toLookUp = function (getId, getVal) {
  return this.reduce((acc, curr) => ({
    ...acc,
    [getId(curr)]: getVal(curr),
  }), {})
};

String.prototype.stripAccents = function () {
  return this
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u00F8/g, "o") // ø
    .replace(/\u00D8/g, "O"); // Ø
}