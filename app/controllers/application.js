import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked isMaximize = true;

  @action Minimize(){
    this.isMaximize = false;
  }
  @action maximize(){
    this.isMaximize = true;
  }
}