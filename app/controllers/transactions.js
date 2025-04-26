import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TransactionsController extends Controller {
    @service router;

    @action goBack(){
        this.router.transitionTo("home");
    }
}
