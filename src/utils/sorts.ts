const numericalSort = (a: string, b: string): number => {
  const collator = new Intl.Collator([], { numeric: true });
  return collator.compare(a, b);
};

export { numericalSort };
