const dispatchUpdate = (CONTEXT_UPDATE: string): void => {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
};

export { dispatchUpdate };
