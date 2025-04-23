import { module, test } from 'qunit';
import { setupTest } from 'digital-wallet/tests/helpers';

module('Unit | Controller | create-page', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:create-page');
    assert.ok(controller);
  });
});
