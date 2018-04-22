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
  reminderMessage: 'Please provide your contact here.',

  actions: {

    confirmContact() {
      alert(`We got your email: ${this.get('emailAddress')} and your message: ${this.get('message')}`);
      this.set('responseMessage', `Thank you for providing your contact. We got your message and we’ll get in touch soon`);
      this.set('emailAddress', '');
      this.set('message', '');
    }
  }
});
