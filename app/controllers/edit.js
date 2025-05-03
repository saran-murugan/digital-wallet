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

  @action updateField(fieldName, event) {
    this.model.editSub[fieldName] = event.target.value;
  }

  @action updateBillingCycle(event) {
    let [cycle, unit] = event.target.value.split('-');
    cycle = Number(cycle);
    this.model.editSub['cycle'] = cycle;
    this.model.editSub['timeUnit'] = unit;
    console.log(
      'before edit:',
      this.cycle,
      this.timeUnit,
      'after edit:',
      this.model.editSub['cycle'],
      this.model.editSub['timeUnit'],
    );
  }

  @action saveEdit() {
    let { editSub, listIndex } = this.model;
    /*     console.log("paymentMethod:",this.paymentMethod,"editSub PaymentMethod:",editSub.paymentMethod);
     */ if (
      this.paymentMethod !== 'Wallet' &&
      editSub.paymentMethod === 'Wallet' &&
      this.subscriptions.moneyBalance >= Number(editSub.amount)
    ) {
      this.subscriptions.deductBalance(
        editSub,
        `${editSub.category} subscription, payment method changed to wallet`,
      );
      this.subscriptions.autoPay(editSub);
    }
    if (editSub.paymentMethod !== 'Wallet') {
      this.subscriptions.clearTimeInterval();
    }
    this.subscriptions.editSubscriber(listIndex, editSub);
    this.router.transitionTo('home');
  }

  @action goBack() {
    this.router.transitionTo('home');
  }
}
