import { expect } from '@lykmapipo/mongoose-test-helpers';
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

    it('should expose field select option', () => {
      expect(Priority.OPTION_SELECT).to.exist;
      expect(Priority.OPTION_SELECT).to.be.eql({ name: 1, color: 1 });
    });

    it('should expose autopulate as options', () => {
      expect(Priority.OPTION_AUTOPOPULATE).to.exist;
      expect(Priority.OPTION_AUTOPOPULATE).to.be.eql({
        select: { name: 1, color: 1 },
        maxDepth: 1,
      });
    });
  });
});
