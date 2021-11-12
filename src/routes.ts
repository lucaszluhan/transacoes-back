import { Request, Response, Router } from 'express';
import { Transaction, User, users } from './user';

const routes = Router();

routes.post('/users', (req: Request, res: Response) => {
   let { name, cpf, email, age } = req.body;
   if (!name || !cpf || !email || !age) {
      return res.status(406).send({ message: 'Preencha todo os campos!' });
   }
   for (let user of users) {
      if (user.getCPF() == cpf) {
         return res.status(401).send({ message: 'CPF ja cadastrado' });
      }
   }
   let newUser: User = new User(name, cpf, email, age);
   users.push(newUser);
   res.status(201).send({ message: 'Usuario criado com sucesso.' });
});

routes.get('users/:id', (req: Request, res: Response) => {
   let { id } = req.params;
   let idUser = users.filter((user) => user.id == id)[0];
   res.status(200).send({ id: idUser.id, name: idUser.name, cpf: idUser.getCPF(), mail: idUser.email, age: idUser.age });
});

routes.get('/users', (_, res: Response) => {
   let noTranUsers = [];
   for (let user of users) {
      if (!user) {
         return res.status(204).send({ message: 'No content.' });
      }
      let noTranUser = { id: user.id, name: user.name, cpf: user.getCPF(), email: user.email, age: user.age };
      noTranUsers.push(noTranUser);
   }
   res.status(200).send(noTranUsers);
});

routes.put('users/:id', (req: Request, res: Response) => {
   let { id } = req.params;
   let { name, age, email } = req.body;
   if (!name || !age || !email) {
      return res.status(406).send({ message: 'Preencha todo os campos!' });
   }
   for (let user of users) {
      if (user.id == id) {
         user.name = name;
         user.age = age;
         user.email = email;
      }
   }
   res.status(200).send({ message: 'Usuario editado.' });
});

routes.delete('users/:id', (req: Request, res: Response) => {
   let { id } = req.params;
   let idUserIndex = users.findIndex((user) => user.id == id);
   users.splice(idUserIndex, 1);
   res.status(200).send({ message: 'Usuario deletado.' });
});

routes.post('user/:userId/transactions', (req: Request, res: Response) => {
   let { title, value, type } = req.body;
   let { userId } = req.params;
   if (!title || !value || !type) {
      return res.status(406).send({ message: 'Preencha todo os campos!' });
   }
   let transaction: Transaction = new Transaction(title, value, type);
   for (let user of users) {
      if (user.id == userId) {
         user.transactions.push(transaction);
      }
   }
   res.status(200).send({ message: 'Transacao cadastrada.' });
});

routes.get('user/:userId/transactions/:id', (req: Request, res: Response) => {
   let { userId, id } = req.params;
   for (let user of users) {
      if (user.id == userId) {
         for (let transaction of user.transactions) {
            if (transaction.id == id) {
               res.status(200).send(transaction);
            }
         }
      }
   }
});

routes.get('user/:userId/transactions', (req, res) => {
   let { userId } = req.params;
   for (let user of users) {
      if (user.id == userId) {
         let income = 0;
         let outcome = 0;
         let total = 0;
         let incomeArray = user.transactions.filter((transaction) => transaction.type == 'income');
         for (let transaction of incomeArray) {
            income += transaction.value;
         }
         let outcomeArray = user.transactions.filter((transaction) => transaction.type == 'outcome');
         for (let transaction of outcomeArray) {
            outcome += transaction.value;
         }
         total = income - outcome;
         res.status(200).send({ transactions: user.transactions, balance: { income: income, outcome: outcome, total: total } });
      }
   }
});

routes.put('users/:userId/transactions/:id', (req, res) => {
   let { userId, id } = req.params;
   let { title, value, type } = req.body;
   if (!title || !value || type) {
      return res.status(406).send({ message: 'Preencha todo os campos!' });
   }
   for (let user of users) {
      if (user.id == userId) {
         for (let transaction of user.transactions) {
            if (transaction.id == id) {
               transaction.title = title;
               transaction.type = type;
               transaction.value = value;
            }
         }
      }
   }
   res.status(200).send({ message: 'Transacao editada.' });
});

routes.delete('user/:userId/transactions/:id', (req, res) => {
   let { userId, id } = req.params;
   for (let user of users) {
      if ((user.id = userId)) {
         let index = user.transactions.findIndex((tran) => tran.id == id);
         user.transactions.splice(index, 1);
      }
   }
   res.status(200).send({ message: 'Transacao deletada' });
});

export default routes;
