export function isEmpty(value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === [] ||
    value === {}
  )
    return true;
  return false;
}
