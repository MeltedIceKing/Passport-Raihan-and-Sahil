const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "admin"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
  {
    id: 69,
    name: "Rai",
    email: "rkheraj@hotmail.com",
    password: "pigs",
    role: "admin"
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    //user has all user attributes if found
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    // 
    return null
  },
  addToDB: (obj) => {
    database.push(obj)
  },
};

module.exports = { database, userModel };
