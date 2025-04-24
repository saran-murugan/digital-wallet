import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SubscriptionsService extends Service {

  @tracked moneyBalance = '1000';

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
  }
}
