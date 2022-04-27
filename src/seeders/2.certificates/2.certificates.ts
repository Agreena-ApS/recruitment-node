import users from "../1.users/users";
const certificates = [];
(() => {
  for (let index = 0; index < 100; index++) {
    let owner;
    let status = "available";
    if (index % 20 == 0) {
      const random = Math.floor(Math.random() * users.length);
      owner = users[random]._id;
      status = "owned";
    }
    certificates.push({ country: "Turkey", status, owner });
  }
})();
export = certificates;
