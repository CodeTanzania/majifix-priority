import { expect } from '@lykmapipo/mongoose-test-helpers';
import Priority from '../../src/priority.model';

describe('Priority', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const { jurisdiction } = Priority.schema.tree;
      const { instance } = Priority.schema.paths.jurisdiction;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.exist.and.be.an('object');
      expect(jurisdiction.autopopulate).to.exist.and.be.an('object');
    });

    describe('name', () => {
      it('should be an embedded sub-document', () => {
        const { name } = Priority.schema.tree;
        const { instance } = Priority.schema.paths.name;
        const { tree } = Priority.schema.tree.name;

        expect(instance).to.be.equal('Embedded');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have type `en` locale field', () => {
        const { instance } = Priority.schema.paths.name.schema.paths.en;
        const { en } = Priority.schema.tree.name.tree;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.required).to.be.true;
        expect(en.searchable).to.be.true;
      });
    });

    it('should have weight field', () => {
      const { weight } = Priority.schema.tree;
      const { instance } = Priority.schema.paths.weight;

      expect(instance).to.be.equal('Number');
      expect(weight).to.exist;
      expect(weight).to.be.a('object');
      expect(weight.type).to.be.a('function');
      expect(weight.type.name).to.be.equal('Number');
      expect(weight.index).to.be.true;
      expect(weight.default).to.equal(0);
    });

    it('should have color field', () => {
      const { color } = Priority.schema.tree;
      const { instance } = Priority.schema.paths.color;

      expect(instance).to.be.equal('String');
      expect(color).to.exist;
      expect(color).to.be.a('object');
      expect(color.type).to.be.a('function');
      expect(color.type.name).to.be.equal('String');
      expect(color.trim).to.be.true;
      expect(color.uppercase).to.be.true;
      expect(color.default).to.exist;
    });
  });
});
