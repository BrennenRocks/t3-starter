export const LocalStorageKeys = {
  PLAN: 'plan',
} as const;

export const resetLocalStorage = () => {
  localStorage.removeItem(LocalStorageKeys.PLAN);

  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('local-storage'));
};
