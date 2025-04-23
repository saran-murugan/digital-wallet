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

  @tracked isShowAddAmount = false;
  @tracked moneyInput = '';
  @tracked moneyBalance = '0';

  @action toggleAddAmount() {
    this.isShowAddAmount = !this.isShowAddAmount;
  }

  @action updateAmount(event) {
    this.moneyInput = event.target.value;
  }

  @action addAmount() {
    let money = Number(this.moneyBalance);
    money += Number(this.moneyInput);
    this.moneyBalance = money;
    localStorage.setItem('moneyBalance', this.moneyBalance);
    this.isShowAddAmount = false;
  }

  @action deleteSubscriber(subscriber) {
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
