Mantis search plugin
====================

The default issue search in MantisBT changes the global state,
so one cannot keep 2 tabs up to date with different issue filters.
This plugin provides a simplified interface to search issues,
with no side effect.

Unfortunately, this is not possible without patching MantisBT.
The official REST API can only fetch issues through saved filters.
This [patch](https://github.com/silecs/mantisbt/commit/195c9ec3c19eed81e949ea83cab5b85d3b142d21)
enables on the fly filters in the API.

The plugin texts are French and not localized.


Install
-------

Install the code in Mantis,
and build the JavaScript code (no pre-built package is available).
```
git clone ... plugins/Search
cd plugins/Search
yarn install
yarn build
```

Then configure Mantis through its web interface to enable the plugin.
