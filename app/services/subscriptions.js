import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SubscriptionsService extends Service {
  @tracked subscriptionList = [
    {
      id: 1,
      name: 'Saran',
      plan: 'Standard',
      cycle: 'weekly',
      amount: '250',
      category: 'Music',
      paymentMethod: 'UPI',
    },
    {
      id: 2,
      name: 'harry',
      plan: 'Pro',
      cycle: 'Monthly',
      amount: '499',
      category: 'Entertainment',
      paymentMethod: 'Debit Card',
    },
  ];

  addSubscriber(newSubscription) {
    console.log(newSubscription);
    this.subscriptionList = [...this.subscriptionList, newSubscription];
  }
}
