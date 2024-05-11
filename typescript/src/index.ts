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

// readonly api
interface Config {
  readonly endpoint: string;
  readonly apiKey: string;
}

const config: Readonly<Config> = {
  endpoint: 'https://api.example.com',
  apiKey: 'abcdef123456',
};

// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.

// record api
// interface User {
//   id: string;
//   name: string;
// }

// type Users = { [key: string]: User };

// const users: Users = {
//   'abc123': { id: 'abc123', name: 'John Doe' },
//   'xyz789': { id: 'xyz789', name: 'Jane Doe' },
// };

interface User2 {
  id: string;
  name: string;
}

type Users = Record<string, User2>;

const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']);

// map api

// Initialize an empty Map
const usersMap = new Map<string, User2>();

// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// Accessing a value using .get
console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }

// exclude api
type EventType = 'click' | 'scroll' | 'mousemove';

type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click');