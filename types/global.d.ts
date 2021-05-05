// Types for compiled templates
declare module 'ember-lifecycle-utils/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
