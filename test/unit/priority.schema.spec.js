'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const Priority =
  require(path.join(__dirname, '..', '..', 'lib', 'priority.model'));


describe('Priority', function () {

  describe('Schema', function () {

    it('should have jurisdiction field', function () {

      const jurisdiction = Priority.schema.tree.jurisdiction;
      const instance = Priority.schema.paths.jurisdiction.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.autoset).to.be.true;
      expect(jurisdiction.autopopulate).to.be.exist;
    });

    describe('name', function () {

      it('should be an embedded sub-document', function () {
        const name = Priority.schema.tree.name;
        const instance = Priority.schema.paths.name.instance;
        const tree = Priority.schema.tree.name.tree;

        expect(instance).to.be.equal('Embedded');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have type `en` locale field', function () {
        const instance =
          Priority.schema.paths.name.schema.paths.en.instance;
        const en = Priority.schema.tree.name.tree.en;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;

      });
    });


    it('should have weight field', function () {

      const weight = Priority.schema.tree.weight;
      const instance = Priority.schema.paths.weight.instance;

      expect(instance).to.be.equal('Number');
      expect(weight).to.exist;
      expect(weight).to.be.a('object');
      expect(weight.type).to.be.a('function');
      expect(weight.type.name).to.be.equal('Number');
      expect(weight.index).to.be.true;
      expect(weight.default).to.equal(0);
    });

    it('should have color field', function () {

      const color = Priority.schema.tree.color;
      const instance = Priority.schema.paths.color.instance;

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
