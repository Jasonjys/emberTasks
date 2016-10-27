import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  provider: DS.attr(),
  uid: DS.attr(),
  tasks: DS.hasMany('task', { async: true })
});
