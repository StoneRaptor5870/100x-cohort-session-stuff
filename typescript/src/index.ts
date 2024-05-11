interface User {
  name: string,
  age: number
}

function sumOfAges(user1: User, user2: User) {
  return user1.age + user2.age;
}

const age = sumOfAges({name: "tara", age: 28}, {name: "anakin", age: 22});
console.log(age);

// pick api
interface UserEx {
  id: string,
  name: string,
  age: number,
  email: string,
  password: string
}

type UpdateProps = Pick<UserEx, "name" | "age" | "email">

// partial api
type UpdatedPropsOptional = Partial<UpdateProps>

function updatedUser(updatedProps: UpdatedPropsOptional) {
  // hit the database to update the user
  
  Object.keys(updatedProps).forEach((key) => {
    const value = updatedProps[key as keyof UpdatedPropsOptional];
    console.log(`${key}: ${value}`);
  });
}

updatedUser({name: "nischay", age: 24, email: "abc@gmail.com"});
updatedUser({name: "anuj", age: 22});

// readonly
interface Config {
  readonly endpoint: string;
  readonly apiKey: string;
}

const config: Readonly<Config> = {
  endpoint: 'https://api.example.com',
  apiKey: 'abcdef123456',
};

// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.