const getState = (open: boolean): string => {
  return open ? "open" : "closed";
};

export { getState };
