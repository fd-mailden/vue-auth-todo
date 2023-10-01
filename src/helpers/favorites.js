export const getFavoriteIds = (data) => {
  const favoritesIds = [];
  data.forEach(({ id, favorite }) => {
    if (favorite) return favoritesIds.push(id);
  });
  return favoritesIds;
};

export const mergeFavorites = (data, ids) => {
  if (!ids || ids.length === 0) return data;
  return data.map((item) =>
    ids.includes(item.id) ? { ...item, favorite: true } : item
  );
};

export const toggleFavorite = (data, id) => {
  return data.map((item) => {
    if (item.id === id) {
      return { ...item, favorite: !item.favorite };
    } else {
      return item;
    }
  });
};
