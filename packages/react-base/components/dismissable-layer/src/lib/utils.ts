const dispatchUpdate = (CONTEXT_UPDATE: string) => {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
};

export { dispatchUpdate };
