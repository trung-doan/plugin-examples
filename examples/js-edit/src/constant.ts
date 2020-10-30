export const JS_PC = 'js_pc';
export const CSS_PC = 'css_pc';
export const JS_MB = 'js_mb';
export const CSS_MB = 'css_mb';
export const DEFAULT_SOURCE = {
  [JS_PC]: `(function() {
  'use strict';
  kintone.events.on('app.record.index.show', function(event) {
  });
})();
`,
  [JS_MB]: `(function() {
  'use strict';
  kintone.events.on('mobile.app.record.index.show', function(event) {
  });
'})();
`,
  [CSS_PC]: '@charset "UTF-8";',
  [CSS_MB]: '@charset "UTF-8";',
  '': ''
};