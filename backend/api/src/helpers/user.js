const userInfoTemplate = (user) => {
  let type;

  if (user?.seller?.id) {
    type = "seller";
  }

  if (user?.admin?.id) {
    type = "admin";
  }

  return { ...user, type };
};

module.exports = {
  userInfoTemplate,
};
