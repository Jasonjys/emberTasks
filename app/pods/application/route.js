import Ember from 'ember';
export default Ember.Route.extend({

  beforeModel () {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        const username = data.currentUser.email;
        const uid = data.uid
        // console.log(data.currentUser);
        // console.log(data.currentUser.email);
        // console.log(data.currentUser.displayName);
        //username = username.replace(/[^a-zA-Z0-9 -]/g, '');
        // const store = this.get('store');
        // return store.find('user', username).then(function(user) {
        //   debugger;
        //   return;
        // }, function() {
        //   debugger;
        //   // HACK: `find()` creates an entry in store.typeMapFor().idToRecord which prevents `createRecord()` from working
        //   delete store.typeMapFor(store.modelFor('user')).idToRecord[username];
        //   // A user couldn't be found, so create a new user
        //   var user = store.createRecord('user', {
        //     username: username,
        //     provider: provider,
        //     uid: uid,
        //     tasks: null
        //   });
        //   // Save the user
        //   user.save();
        // });
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});