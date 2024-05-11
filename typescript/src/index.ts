interface User {
  name: string,
  age: number
}

function sumOfAges(user1: User, user2: User) {
  return user1.age + user2.age;
}

const age = sumOfAges({name: "tara", age: 28}, {name: "anakin", age: 22});
console.log(age);