import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tasks', function() {
    this.route('new');
    this.route('edit');
  });
  this.route('login');
  this.route('signup');
  this.route('users');
  this.route('reset');
});

export default Router;
