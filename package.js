Package.describe({
  summary: "Xero API wrapper using OAuth1Binding of Meteor Xero Service"
});

Package.on_use(function (api, where) {
	
	api.use('oauth1', ['client', 'server']);
 	api.add_files(['xero.js'], 'server');
 	api.export && api.export('xero', 'server');
});

Package.on_test(function (api) {
});