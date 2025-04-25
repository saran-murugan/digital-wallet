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
      this.moneyBalance = Number(savedMoneyBalance);
    }
  }

  @tracked moneyBalance = 1000;

  @tracked subscriptionList = [
    {
      id: 1,
      name: 'Saran',
      plan: 'Standard',
      cycle: 'Weekly',
      amount: '159',
      category: 'Music',
      paymentMethod: 'UPI',
    },
    {
      id: 2,
      name: 'Harry',
      plan: 'Pro',
      cycle: 'Monthly',
      amount: '289',
      category: 'Entertainment',
      paymentMethod: 'Debit Card',
    },
    {
      id: 3,
      name: 'Potter',
      plan: 'Pro+',
      cycle: 'Yearly',
      amount: '699',
      category: 'Entertainment',
      paymentMethod: 'Wallet',
    },
    {
      id: 4,
      name: 'Brian',
      plan: 'Pro+',
      cycle: 'Yearly',
      amount: '699',
      category: 'Jio Hotstar',
      paymentMethod: 'Net Banking',
    },
  ];

  addSubscriber(newSubscription) {
    console.log(newSubscription);
    this.subscriptionList = [...this.subscriptionList, newSubscription];
    localStorage.setItem(
      'subscriptionList',
      JSON.stringify(this.subscriptionList),
    );
  }
  deleteSubscriber(subscriberId) {
    this.subscriptionList = this.subscriptionList.filter(
      (list) => list.id !== subscriberId,
    );
    localStorage.setItem(
      'subscriptionList',
      JSON.stringify(this.subscriptionList),
    );
  }
  deductBalance(amount) {
    this.moneyBalance -= Number(amount);
    localStorage.setItem('moneyBalance', this.moneyBalance);
  }

  addAmount(moneyInput) {
    this.moneyBalance += Number(moneyInput);
    localStorage.setItem('moneyBalance', this.moneyBalance);
  }

  returnAmount(amount) {
    this.moneyBalance += Number(amount);
    localStorage.setItem('moneyBalance', this.moneyBalance);
  }

  balanceFromLocalStorage() {
    const savedMoneyBalance = localStorage.getItem('moneyBalance');
    if (savedMoneyBalance) {
      this.moneyBalance = Number(savedMoney);
    }
  }
}
