export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function noSpacesPlease(str: string) {
  return str.replace(/\s/g, '');
}

export function simpleErrorPlease(verbose: any) {
  let err = verbose.toString();
  if (err.toLowerCase().includes('ENOTFOUND'.toLowerCase())) {
    err = 'FetchError';
  }
  return err;
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
