import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EditRoute extends Route {
  @service subscriptions;

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.plan = model.editSub.plan;
    controller.cycle = model.editSub.cycle;
    controller.category = model.editSub.category;
    controller.paymentMethod = model.editSub.paymentMethod;
  }

  model(params) {
    
    const listId = parseInt(params.id, 10);
    const listIndex = this.subscriptions.subscriptionList.findIndex(
      (list) => {
        return list.id === listId;
      },
    );
    let editList = this.subscriptions.subscriptionList[listIndex];
    
    return { editSub: { ...editList }, listIndex };
  }
}
