import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SubscriptionsService extends Service {
  constructor() {
    super(...arguments);
    const savedSubscriptionList = localStorage.getItem('subscriptionList');
    if (savedSubscriptionList) {
      this.subscriptionList = JSON.parse(savedSubscriptionList);
    }

    const savedMoneyBalance = localStorage.getItem('moneyBalance');
    if (savedMoneyBalance) {
      console.log(savedMoneyBalance);
      this.moneyBalance = Number(savedMoneyBalance);
    }

    const savedTransactionHistory = localStorage.getItem('transactionHistory');
    if (savedTransactionHistory) {
      this.transactionsHistory = JSON.parse(savedTransactionHistory);
    }
  }

  @tracked moneyBalance = 10000;

  @tracked subscriptionList = [
    {
      id: 1,
      name: 'Saran',
      plan: 'Standard',
      cycle: 10,
      timeUnit: 'seconds',
      amount: '159',
      category: 'Music',
      paymentMethod: 'UPI',
    },
    {
      id: 2,
      name: 'Harry',
      plan: 'Pro',
      cycle: 5,
      timeUnit: 'seconds',
      amount: '289',
      category: 'Entertainment',
      paymentMethod: 'Debit Card',
    },
    {
      id: 3,
      name: 'Potter',
      plan: 'Pro+',
      cycle: 2,
      timeUnit: 'minutes',
      amount: '699',
      category: 'Entertainment',
      paymentMethod: 'UPI',
    },
    {
      id: 4,
      name: 'Brian',
      plan: 'Pro+',
      cycle: 10,
      timeUnit: 'seconds',
      amount: '699',
      category: 'Jio Hotstar',
      paymentMethod: 'Net Banking',
    },
  ];

  @tracked transactionsHistory = [];

  addTransactionsHistory(type, amount, description, name) {
    let date = new Date().toLocaleString();
    const transactions = {
      name: name,
      type: type,
      description: description,
      date: date,
      amount: amount,
    };
    this.transactionsHistory = [...this.transactionsHistory, transactions];
    localStorage.setItem(
      'transactionHistory',
      JSON.stringify(this.transactionsHistory),
    );
  }

  /* Wallet Transaction Filter */
  @tracked transactionTypes = ['All', 'Top up', 'Refund', 'Deduct'];
  @tracked transactionTypeFilter = 'All';

  get filteredList() {
    let filtered = this.transactionsHistory;
    if (this.transactionTypeFilter == 'All') {
      return filtered;
    }

    filtered = filtered.filter((transaction) => {
      return transaction.type.includes(this.transactionTypeFilter);
    });
    return filtered;
  }
  /*---------------------------*/
  @tracked interval = null;

  /* Auto pay functionality */
  autoPay(subscriber) {
    console.log('autopay triggered');
    if (subscriber.paymentMethod != 'Wallet') return;

    let timeInterval = 0;
    if (subscriber.timeUnit == 'seconds') {
      timeInterval = subscriber.cycle * 1000;
      console.log(timeInterval);
    } else {
      timeInterval = subscriber.cycle * 60 * 1000;
      console.log(timeInterval);
    }

    this.interval = setInterval(() => {
      if (this.moneyBalance >= Number(subscriber.amount)) {
        this.deductBalance(
          subscriber,
          `Autopay option paid the ${subscriber.category} subscription`,
        );
      } else {
        clearInterval(this.interval);
        alert('Insufficient Wallet balance for the autopay');
      }
    }, timeInterval);
  }

  clearTimeInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  /* ------------------------ */

  addSubscriber(newSubscription) {
    console.log(newSubscription);
    this.subscriptionList = [...this.subscriptionList, newSubscription];
    localStorage.setItem(
      'subscriptionList',
      JSON.stringify(this.subscriptionList),
    );
  }

  editSubscriber(listIndex, editSub) {
    this.subscriptionList[listIndex] = { ...editSub };
    localStorage.setItem(
      'subscriptionList',
      JSON.stringify(this.subscriptionList),
    );
  }

  deleteSubscriber(subscriberId) {
    this.subscriptionList = this.subscriptionList.filter(
      (list) => list.id !== subscriberId,
    );
    clearInterval(this.interval);
    localStorage.setItem(
      'subscriptionList',
      JSON.stringify(this.subscriptionList),
    );
    localStorage.setItem('moneyBalance', this.moneyBalance);
  }
  deductBalance(newSubscription, description) {
    this.moneyBalance -= Number(newSubscription.amount);
    localStorage.setItem('moneyBalance', this.moneyBalance);
    this.addTransactionsHistory(
      'Deduct',
      newSubscription.amount,
      description,
      newSubscription.name,
    );
  }

  addAmount(moneyInput, description) {
    this.moneyBalance += Number(moneyInput);
    localStorage.setItem('moneyBalance', this.moneyBalance);
    this.addTransactionsHistory('Top up', moneyInput, description, 'Admin');
  }

  returnAmount(subscriber, description) {
    this.moneyBalance += Number(subscriber.amount);
    localStorage.setItem('moneyBalance', this.moneyBalance);
    this.addTransactionsHistory(
      'Refund',
      subscriber.amount,
      description,
      subscriber.name,
    );
  }

  /* balanceFromLocalStorage() {
    const savedMoneyBalance = localStorage.getItem('moneyBalance');
    if (savedMoneyBalance) {
      this.moneyBalance = Number(savedMoney);
    }
  } */
}
