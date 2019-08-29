import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Priority from '../../src/priority.model';

describe('Priority Schema', () => {
  it('should have jurisdiction field', () => {
    const jurisdiction = Priority.path('jurisdiction');

    expect(jurisdiction).to.exist;
    expect(jurisdiction).to.be.instanceof(SchemaTypes.ObjectID);
    expect(jurisdiction.options).to.exist;
    expect(jurisdiction.options).to.be.an('object');
    expect(jurisdiction.options.type).to.be.a('function');
    expect(jurisdiction.options.type.name).to.be.equal('ObjectId');
    expect(jurisdiction.options.ref).to.exist.and.be.equal('Jurisdiction');
    expect(jurisdiction.options.exists).to.exist.and.be.an('object');
    expect(jurisdiction.options.autopopulate).to.exist.and.an('object');
    expect(jurisdiction.options.index).to.be.true;
  });

  describe('name', () => {
    it('should be an embedded sub-document', () => {
      const name = Priority.path('name');
      const en = Priority.path('name.en');
      const sw = Priority.path('name.sw');

      expect(name).to.exist;
      expect(en).to.exist.and.be.instanceof(SchemaTypes.String);
      expect(sw).to.exist.and.be.instanceof(SchemaTypes.String);
    });

    it('should have type `en` locale field', () => {
      const name = Priority.path('name');
      const en = Priority.path('name.en');

      expect(name).to.exist;
      expect(en).to.exist;
      expect(en).to.be.instanceof(SchemaTypes.String);
      expect(en.options).to.exist;
      expect(en.options).to.be.an('object');
      expect(en.options.type).to.exist;
      expect(en.options.trim).to.be.true;
      expect(en.options.required).to.be.true;
      expect(en.options.index).to.be.true;
      expect(en.options.searchable).to.be.true;
      expect(en.options.taggable).to.be.true;
      expect(en.options.exportable).to.be.true;
      expect(en.options.fake).to.exist;
    });

    it('should have type `sw` locale field', () => {
      const name = Priority.path('name');
      const sw = Priority.path('name.sw');

      expect(name).to.exist;
      expect(sw).to.exist;
      expect(sw).to.be.instanceof(SchemaTypes.String);
      expect(sw.options).to.exist;
      expect(sw.options).to.be.an('object');
      expect(sw.options.type).to.exist;
      expect(sw.options.trim).to.be.true;
      expect(sw.options.required).to.be.false;
      expect(sw.options.index).to.be.true;
      expect(sw.options.searchable).to.be.true;
      expect(sw.options.taggable).to.be.true;
      expect(sw.options.exportable).to.be.true;
      expect(sw.options.fake).to.exist;
    });
  });

  it('should have weight field', () => {
    const weight = Priority.path('weight');

    expect(weight).to.exist;
    expect(weight).to.be.instanceof(SchemaTypes.Number);
    expect(weight.options).to.exist;
    expect(weight.options).to.be.an('object');
    expect(weight.options.type).to.exist;
    expect(weight.options.index).to.be.true;
    expect(weight.options.exportable).to.be.true;
    expect(weight.options.fake).to.exist;
  });

  it('should have color field', () => {
    const color = Priority.path('color');

    expect(color).to.exist;
    expect(color).to.be.instanceof(SchemaTypes.String);
    expect(color.options).to.exist;
    expect(color.options).to.be.an('object');
    expect(color.options.type).to.exist;
    expect(color.options.trim).to.be.true;
    expect(color.options.uppercase).to.be.true;
    expect(color.options.exportable).to.be.true;
    expect(color.options.fake).to.exist;
  });

  it('should have default field', () => {
    const isDefault = Priority.path('default');

    expect(isDefault).to.exist;
    expect(isDefault).to.be.instanceof(SchemaTypes.Boolean);
    expect(isDefault.options).to.exist;
    expect(isDefault.options).to.be.an('object');
    expect(isDefault.options.type).to.exist;
    expect(isDefault.options.index).to.be.true;
    expect(isDefault.options.exportable).to.be.true;
    expect(isDefault.options.default).to.be.false;
    expect(isDefault.options.fake).to.exist;
  });
});
