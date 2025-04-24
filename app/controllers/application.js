import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service subscriptions;

  constructor() {
    super(...arguments);

    const savedBalanceFromLocalStorage = localStorage.getItem('moneyBalance');
    if (savedBalanceFromLocalStorage) {
      this.moneyBalance = savedBalanceFromLocalStorage;
    }

    const savedAfterDeleteFromLocalStorage =
      localStorage.getItem('savedAfterDelete');
    if (savedAfterDeleteFromLocalStorage) {
      this.subscriptions.subscriptionList = JSON.parse(
        savedAfterDeleteFromLocalStorage,
      );
    }
  }

  @tracked moneyBalance = this.model.moneyBalance;

  @tracked isShowAddAmount = false;
  @tracked moneyInput = '';

  @action toggleAddAmount() {
    this.isShowAddAmount = !this.isShowAddAmount;
  }

  @action updateAmount(event) {
    this.moneyInput = event.target.value;
  }

  @action addAmount() {
    let money = Number(this.model.moneyBalance);
    money += Number(this.moneyInput);
    this.model.moneyBalance = money;
    localStorage.setItem('moneyBalance', this.model.moneyBalance);
    this.isShowAddAmount = false;
  }

  @action deleteSubscriber(subscriber) {
    if(subscriber.paymentMethod === "Wallet"){
      let money = Number(this.model.moneyBalance);
      money += Number(subscriber.amount);
      this.model.moneyBalance = money;
      localStorage.setItem('moneyBalance', this.model.moneyBalance);   
    }
    this.subscriptions.subscriptionList =
      this.subscriptions.subscriptionList.filter(
        (list) => list.id !== subscriber.id,
      );
    localStorage.setItem(
      'savedAfterDelete',
      JSON.stringify(this.subscriptions.subscriptionList),
    );
  }
}
