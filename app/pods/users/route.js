import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  model () {
    const auth = this.get('firebaseApp').auth();
    var user = auth.currentUser;

    if(user){
      console.log("isAuthenticated");
      // return this.get('store').query('task', {
      //   orderBy: 'email',
      //   equalTo: email
      // });
      return this.store.findAll('task');
    }else {
      console.log('not login');
      this.transitionTo('login');
    }
  },
});
