import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TransactionsController extends Controller {
    @service router;
    @service subscriptions;

    @action goBack(){
        this.router.transitionTo("home");
    }

    /* Power select filtering wallet transaction types*/

    @action updateTransactionTypes(event){
        this.subscriptions.transactionTypeFilter = event;
    }

}
