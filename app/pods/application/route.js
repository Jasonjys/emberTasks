import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        console.log(data.currentUser);
        console.log(data.currentUser.email);
        console.log(data.currentUser.displayName);
        //this.transitionTo('tasks');
        if(this.get('store').findRecord('user', data.uid) !== null){
          var newUser = this.store.createRecord('user', {
            userName: data.currentUser.email,
            provider: data.provider,
            uid: data.uid,
            tasks: null
          });
          newUser.save();
          this.setProperties({
            'user.userName': '',
            'user.provider': '',
            'user.uid': ''
          });
        }
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});