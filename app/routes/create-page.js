import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CreatePageRoute extends Route {
  @service subscriptions;

  model() {
    return this.subscriptions;
  }
}
