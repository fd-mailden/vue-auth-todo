export default function checkingExistenceUser(users, { name, phone }) {
  const user = users.find((user) => {
    return user.username === name && user.phone === phone;
  });
  return user && { ...user };
}
