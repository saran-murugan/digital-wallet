import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service subscriptions;
  @service router;

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('currentRoute', this.router.currentRouteName);
    this.router.on('routeDidChange', () => {
      controller.set('currentRoute', this.router.currentRouteName);
    });
  }

  model() {
    return this.subscriptions;
  }
}
