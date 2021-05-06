import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { eventListeners } from 'ember-lifecycle-utils/modifier';
// import to from '@ember/component/template-only';
import { modifier } from 'ember-modifier';

const noop = () => {};

module('Modifier', function (hooks) {
  setupRenderingTest(hooks);

  module('eventListeners', function () {
    test('it works', async function (assert) {
      this.setProperties({
        showComponent: true,
        foo: modifier((element) => {
          element.addEventListener = (event: string) => assert.step(`add: ${event}`);
          element.removeEventListener = (event: string) => assert.step(`remove: ${event}`);

          return eventListeners(element, ['click', noop], ['mouseenter', noop]);
        }),
      });

      await render(hbs`
        {{#if this.showComponent}}
          <div {{this.foo}}></div>
        {{/if}}
      `);

      this.setProperties({ showComponent: false });
      await settled();

      assert.verifySteps(['add: click', 'add: mouseenter', 'remove: click', 'remove: mouseenter']);
    });

    test('it works with shorthand', async function (assert) {
      let events = eventListeners(['click', noop], ['mouseenter', noop]);

      this.setProperties({
        showComponent: true,
        foo: modifier((element) => {
          element.addEventListener = (event: string) => assert.step(`add: ${event}`);
          element.removeEventListener = (event: string) => assert.step(`remove: ${event}`);

          return events(element);
        }),
      });

      await render(hbs`
        {{#if this.showComponent}}
          <div {{this.foo}}></div>
        {{/if}}
      `);

      this.setProperties({ showComponent: false });
      await settled();

      assert.verifySteps(['add: click', 'add: mouseenter', 'remove: click', 'remove: mouseenter']);
    });
  });
});
