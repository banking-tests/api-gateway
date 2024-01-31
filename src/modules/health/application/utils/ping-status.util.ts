export function pingStatuses(details) {
  return Object.keys(details).reduce(
    (acc, key) => ({
      ...acc,
      [key]: details[key].status,
    }),
    {},
  );
}
