import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel() {
    console.log('application beforeModel');
    // ignore empty sessions
  	return this.get('session').fetch().catch(() => {
  	});
  }
});