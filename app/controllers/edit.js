import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default class EditController extends Controller {
  @service subscriptions;
  @service router;

  constructor(){
    super(...arguments);
    const savedEditListFromLocalStorage = localStorage.getItem("savedEditList");
    if(savedEditListFromLocalStorage){
        next(this, () => {
            this.subscriptions.subscriptionList = JSON.parse(savedEditListFromLocalStorage);
          });
    }
  }

  @tracked editedName = '';
  @tracked editedAmount = '';

  @tracked plan = '';
  @tracked cycle = '';
  @tracked category = '';
  @tracked paymentMethod = '';

  @action updateField(fieldName,event) {
    this.model.editSub[fieldName] = event.target.value;
    if (fieldName === 'plan') this.plan = event.target.value;
    if (fieldName === 'cycle') this.cycle = event.target.value;
    if (fieldName === 'category') this.category = event.target.value;
    if (fieldName === 'paymentMethod') this.paymentMethod = event.target.value;  
}

  @action saveEdit(){
    let {editSub,listIndex} = this.model;
    this.subscriptions.subscriptionList[listIndex] = { ...editSub };
    localStorage.setItem("savedEditList",JSON.stringify(this.subscriptions.subscriptionList));
    this.router.transitionTo("index")
  }

  @action goBack() {
    this.router.transitionTo('index');
  }
}
