/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  if (key === './index.js') return;
  const m = files(key).default;
  m.namespaced = true;
  modules[key.replace(/(\.\/|\.js)/g, '')] = m;
});

export default modules;
