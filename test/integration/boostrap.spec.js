import { connect, clear, drop } from '@lykmapipo/mongoose-test-helpers';

process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';

/* setup database */
before(done => connect(done));

/* clear database */
before(done => clear(done));

/* drop database */
after(done => drop(done));
