/* dependencies */
import { expect } from 'chai';

/* declaration */
import Priority from '../../src/priority.model';

describe('Priority', () => {
  describe('Statics', () => {
    it('should expose model name as constant', () => {
      expect(Priority.MODEL_NAME).to.exist;
      expect(Priority.MODEL_NAME).to.be.equal('Priority');
    });

    it('should expose autopulate as options', () => {
      expect(Priority.OPTION_AUTOPOPULATE).to.exist;
      expect(Priority.OPTION_AUTOPOPULATE).to.be.eql({
        select: { name: 1, color: 1 },
        maxDepth: 1,
      });
    });

    it('should expose default locale `en` when not set', () => {
      expect(Priority.DEFAULT_LOCALE).to.exist;
      expect(Priority.DEFAULT_LOCALE).to.equal('en');
    });
  });
});
