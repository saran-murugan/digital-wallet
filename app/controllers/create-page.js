import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CreatePageController extends Controller {
  @service router;
  @service subscriptions;

  constructor() {
    super(...arguments);

    const savedSubscriptionListFromLocalStorage = localStorage.getItem(
      'savedSubscriptionList',
    );
    if (savedSubscriptionListFromLocalStorage) {
      this.subscriptions.subscriptionList = JSON.parse(
        savedSubscriptionListFromLocalStorage,
      );
    }

    /* const savedMoneyBalanceFromLocalStorage = localStorage.getItem("savedMoneyBalance");
    if(savedMoneyBalanceFromLocalStorage){
      this.model.moneyBalance = savedMoneyBalanceFromLocalStorage;
    } */
  }

  @tracked name = '';
  @tracked subscriptionPlan = '';
  @tracked billingCycle = '';
  @tracked amount = '';
  @tracked category = '';
  @tracked paymentMethod = '';

  @action updateName(event) {
    this.name = event.target.value;
  }
  @action updateSubscriptionPlan(plan) {
    this.subscriptionPlan = plan;
  }
  @action updateBillingCycle(cycle) {
    this.billingCycle = cycle;
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
      cycle: this.billingCycle,
      amount: this.amount,
      category: this.category,
      paymentMethod: this.paymentMethod,
    };
    if(newSubscription.paymentMethod === "Wallet"){
      let money = Number(this.model.moneyBalance);
      money -= Number(newSubscription.amount);
      this.model.moneyBalance = money;
      localStorage.setItem("savedMoneyBalance",this.model.moneyBalance);
    }
    this.subscriptions.addSubscriber(newSubscription);
    localStorage.setItem(
      'savedSubscriptionList',
      JSON.stringify(this.subscriptions.subscriptionList),
    );
    this.router.transitionTo('index');
  }

  @action goBack() {
    this.router.transitionTo('index');
    console.log('go Back');
  }
}
