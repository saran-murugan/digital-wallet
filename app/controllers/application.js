import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service subscriptions;

  /* get walletBalance() {
    return this.subscriptions.moneyBalance;
  } */

  @tracked isShowAddAmount = false;
  @tracked moneyInput = '';
  @tracked isNavActive = {
    home:false, subscriptions:false
  }

  @action toggleAddAmount() {
    this.isShowAddAmount = !this.isShowAddAmount;
  }

  @action navActive(navName) {
    this.isNavActive[navName] = true;
  }

  @action updateAmount(event) {
    this.moneyInput = event.target.value;
  }

  @action addAmount() {
    this.subscriptions.addAmount(this.moneyInput);
    this.isShowAddAmount = false;
  }

  @action deleteSubscriber(subscriber) {
    if (subscriber.paymentMethod === 'Wallet') {
      this.subscriptions.returnAmount(subscriber.amount);
    }
    this.subscriptions.deleteSubscriber(subscriber.id);
  }
}
