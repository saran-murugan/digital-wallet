import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CreatePageController extends Controller {
  @service router;
  @service subscriptions;

  @tracked name = '';
  @tracked subscriptionPlan = '';
  @tracked billingCycle = '';
  @tracked timeUnit = '';
  @tracked amount = '';
  @tracked category = '';
  @tracked paymentMethod = '';

  @action updateName(event) {
    this.name = event.target.value;
  }
  @action updateSubscriptionPlan(plan) {
    this.subscriptionPlan = plan;
  }
  @action updateBillingCycle(event) {
    let [cycle, unit] = event.target.value.split('-');
    this.billingCycle = cycle;
    this.timeUnit = unit;
  }
  @action updateAmount(event) {
    this.amount = event.target.value;
  }
  @action updateCategory(category) {
    this.category = category;
  }
  @action updatePaymentMethod(method) {
    this.paymentMethod = method;
  }
  @action addSubscription() {
    if (
      !this.name ||
      !this.subscriptionPlan ||
      !this.billingCycle ||
      !this.category ||
      !this.amount ||
      !this.paymentMethod
    ) {
      alert('Please fill in all the fields');
      return;
    }
    console.log('clicked add');
    const newSubscription = {
      id: this.subscriptions.subscriptionList.length + 1,
      name: this.name,
      plan: this.subscriptionPlan,
      cycle: Number(this.billingCycle),
      timeUnit: this.timeUnit,
      amount: this.amount,
      category: this.category,
      paymentMethod: this.paymentMethod,
    };
    if (newSubscription.paymentMethod === 'Wallet') {
      if (this.subscriptions.moneyBalance >= Number(newSubscription.amount)) {
        this.subscriptions.deductBalance(
          newSubscription,
          `${newSubscription.category} subscription added, paid from the wallet`,
        );
      } else {
        alert('Insufficient Wallet balance');
        return;
      }
    }
    this.subscriptions.addSubscriber(newSubscription);
    this.subscriptions.autoPay(newSubscription);
    this.router.transitionTo('home');
  }

  @action goBack() {
    this.router.transitionTo('home');
    console.log('go Back');
  }
}
