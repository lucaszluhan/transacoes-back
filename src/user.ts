import { randomUUID } from 'crypto';

class Transaction {
   id: string;
   constructor(public title: string, public value: number, public type: string) {
      this.title = title;
      this.value = value;
      this.type = type;
      this.id = randomUUID();
   }
}

class User {
   transactions: Transaction[];
   id: string;
   constructor(public name: string, private cpf: string, public email: string, public age: number) {
      this.name = name;
      this.cpf = cpf;
      this.email = email;
      this.age = age;
      this.transactions = [];
      this.id = randomUUID();
   }
   getCPF() {
      return this.cpf;
   }
}

let users: User[] = [];

export { users, User, Transaction };
