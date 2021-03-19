Array.prototype.pairwise = function() {
  return this.reduce((acc, curr, index) => {
    if ((index % 2) === 0) {
      return [...acc, [curr]];
    } else {
      const rest = acc.slice(0, -1);
      const prev = acc.slice(-1)[0][0];
      return [...rest, [prev, curr]];
    }
  }, []);
};

Array.prototype.average = function() {
  return this.reduce((prev, curr) => (prev + curr), 0) / this.length;
};

Array.prototype.count = function(predicate) {
  return this.reduce((acc, curr) => acc + predicate(curr), 0);
};

Array.prototype.splitAt = function(predicate) {
  return [
    0,
    ...this
      .filter(predicate)
      .map((val) => this.indexOf(val))
      .flatMap((i) => [i, i + 1]),
    this.length,
  ]
    .pairwise()
    .map(([start, stop]) => this.slice(start, stop));
};

String.prototype.stripAccents = function() {
  return this
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u00F8/g, "o") // ø
    .replace(/\u00D8/g, "O"); // Ø
}