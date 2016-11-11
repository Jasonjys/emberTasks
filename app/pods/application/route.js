import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel() {
    console.log('application beforeModel');
  	return this.get('session').fetch()
  		.catch(() => undefined); // ignore empty sessions
  }
});