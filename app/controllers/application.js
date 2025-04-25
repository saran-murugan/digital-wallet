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

  @action toggleAddAmount() {
    this.isShowAddAmount = !this.isShowAddAmount;
  }

  @action cancelAddAmount(){
    this.isShowAddAmount = false;
  }

  @action updateAmount(event) {
    this.moneyInput = event.target.value;
  }

  @action addAmount() {
    this.subscriptions.addAmount(this.moneyInput,`Own top up by admin`);
    this.isShowAddAmount = false;
  }

  @action deleteSubscriber(subscriber) {
    if (subscriber.paymentMethod === 'Wallet') {
      this.subscriptions.returnAmount(subscriber,`${subscriber.category} subscription cancelled, money refunded to the wallet`);
    }
    this.subscriptions.deleteSubscriber(subscriber.id);
  }
}
