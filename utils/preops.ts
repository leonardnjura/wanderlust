export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function titleCasePlease(str: string) {
  return str.replace(/[^_]+/g, function (word) {
    return word.replace(/[^-]+/g, function (word) {
      return word.replace(/[^\s]+/g, function (word) {
        return word.replace(/^./, function (first) {
          return first.toUpperCase();
        });
      });
    });
  });
}

export function thousandsOfCommas(number: any) {
  return parseInt(number).toLocaleString();
}
