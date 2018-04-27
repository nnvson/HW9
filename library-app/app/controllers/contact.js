import Controller from '@ember/controller';
import { match, not } from '@ember/object/computed';
import { gte } from '@ember/object/computed';
import { and } from '@ember/object/computed';

export default Controller.extend({
  responseMessage: '',
  emailAddress: '',

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isLongEnough: gte("message.length", 5),
  isBothValid: and('isValid', 'isLongEnough'),
  isDisabled: not('isBothValid'),
  reminderMessage: 'Please provide your email and leave a message here',

  actions: {

    confirmContact() {
      alert(`We got your email: ${this.get('emailAddress')} and your message: ${this.get('message')}`);

      // save the contact and message into the db
      const email = this.get('emailAddress');
      const message = this.get('message');
      const newContact = this.store.createRecord('contact', { email, message });
      newContact.save();

      this.set('responseMessage', `Thank you for your contact. We got your message and we’ll get in touch soon`);
      this.set('emailAddress', '');
      this.set('message', '');
    }
  }
});
