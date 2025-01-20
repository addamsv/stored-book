export const getQueryParams = (params: Record<string, string | undefined>) => {
  const winParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      winParams.set(name, value);
    }
  });

  return winParams.toString();
};

/**
 * Добавить параметры в строку запроса
 * @param params
 */
export const addQueryParams = (params: Record<string, string | undefined>) => {
  window.history.pushState(null, "", `?${getQueryParams(params)}`);
};
