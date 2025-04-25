import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default class EditController extends Controller {
  @service subscriptions;
  @service router;

  constructor() {
    super(...arguments);
    const savedEditListFromLocalStorage = localStorage.getItem('savedEditList');
    if (savedEditListFromLocalStorage) {
      next(this, () => {
        this.subscriptions.subscriptionList = JSON.parse(
          savedEditListFromLocalStorage,
        );
      });
    }
  }

  @tracked subscriptionList = [...this.subscriptions.subscriptionList];

  @tracked editedName = '';
  @tracked editedAmount = '';

  @tracked plan = '';
  @tracked cycle = '';
  @tracked category = '';
  @tracked paymentMethod = '';

  @action updateField(fieldName, event) {
    this.model.editSub[fieldName] = event.target.value;
  }

  @action saveEdit() {
    let { editSub, listIndex } = this.model;
    if (editSub.paymentMethod === 'Wallet') {
      this.subscriptions.deductBalance(editSub.amount);
    }
    this.subscriptions.subscriptionList[listIndex] = { ...editSub };
    localStorage.setItem(
      'savedEditList',
      JSON.stringify(this.subscriptions.subscriptionList),
    );
    this.router.transitionTo('index');
  }

  @action goBack() {
    this.router.transitionTo('index');
  }
}
