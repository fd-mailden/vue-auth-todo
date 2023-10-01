export const STATUSES = {
  ALL: {
    content: "All",
    key: "all",
  },
  COMPLETED: {
    content: "Completed",
    key: "completed",
  },
  UNCOMPLETED: {
    content: "Uncompleted",
    key: "uncompleted",
  },
  FAVORITES: {
    content: "Favorites",
    key: "favorite",
  },
};

export const DEFAULT_OPTION_USER_ID = {
  key: "all",
  content: "All",
};

export const STATUS_OPTIONS = Object.values(STATUSES);

export const filterByStatus = {
  [STATUSES.ALL.key]: (data) => data,
  [STATUSES.COMPLETED.key]: (data) => data.filter(({ completed }) => completed),
  [STATUSES.UNCOMPLETED.key]: (data) =>
    data.filter(({ completed }) => !completed),
  [STATUSES.FAVORITES.key]: (data) => data.filter(({ favorite }) => favorite),
};

export const getUserIdOptions = (data) => {
  const userIds = data.map(({ userId }) => userId);
  const uniqUserIds = new Set(userIds);
  const options = [...uniqUserIds].map((id) => ({
    content: String(id),
    key: id,
  }));

  return [DEFAULT_OPTION_USER_ID, ...options];
};

export const filterByUserId = (key, data) => {
  if (key === DEFAULT_OPTION_USER_ID.key) return data;

  return data.filter(({ userId }) => userId === key);
};

export const filterByTitle = (title, data) => {
  return data.filter((data) => data.title.includes(title));
};
