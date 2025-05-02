import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditController extends Controller {
  @service subscriptions;
  @service router;

  @tracked editedName = '';
  @tracked editedAmount = '';

  @tracked plan = '';
  @tracked cycle = 0;
  @tracked timeUnit = '';
  @tracked category = '';
  @tracked paymentMethod = '';

  @action updateField(fieldName,event) {
    if(fieldName == "cycle"){
      this.model.editSub[fieldName] = Number(event.target.value);
    }
    else{
    this.model.editSub[fieldName] = event.target.value;
    }
  }

  @action saveEdit() {
    let { editSub, listIndex } = this.model;
    if (editSub.paymentMethod === 'Wallet') {
      this.subscriptions.deductBalance(editSub,`${editSub.category} subscription, payment method changed to wallet`);
      this.subscriptions.autoPay(editSub);
    }
    /* this.subscriptions.clearTimeInterval(); */
    this.subscriptions.editSubscriber(listIndex,editSub);
    this.router.transitionTo('home');
  }

  @action goBack() {
    this.router.transitionTo('home');
  }
}
