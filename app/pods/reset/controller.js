import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    resetPassword() {
      this.set('sentSuccess', false);
      const auth = this.get('firebaseApp').auth();
      const emailAddress = this.get('email');

      auth.sendPasswordResetEmail(emailAddress).then(() => {
        this.set('sentSuccess', true);
        this.set('message', 'Reset email sent successfully. Please check you email.');
      }, (error) => {
        this.set('message', 'oops reset email did not send successfully');
      });
    },

    hideMessage() {
      if(this.get('sentSuccess')){
        this.set('errorMessage', '');
      }
    }
  }
});
