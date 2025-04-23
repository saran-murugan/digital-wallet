import EmberRouter from '@ember/routing/router';
import config from 'digital-wallet/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('create-page');
  this.route('edit', { path: 'edit/:id' });
});
