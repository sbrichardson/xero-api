xeroApi = function(options) {
  this._url = "https://api.xero.com/api.xro";
  this._version = "2.0";
  if (options) _.extend(this, options);
};

xeroApi.prototype._getUrl = function(url){
  return [this._url, this._version, url].join('/');
};

xeroApi.prototype.get = function(url, params){
  return this.call('GET', url, params);
}; 

xeroApi.prototype.post = function(url, params){
  return this.call('POST', url, params);
};

xeroApi.prototype.call = function(method, url, params){
  //this.unblock();

  oauthBinding = this.getOauthBindingForCurrentUser();

  result = oauthBinding.call(method,
    this._getUrl(url),
    params
  );

  return result;
};

xeroApi.prototype.getOauthBinding = function() {
  var config = Accounts.loginServiceConfiguration.findOne({service: 'xero'});
  var urls = Accounts.xero.urls;
  return new OAuth1Binding(config, urls);
};

xeroApi.prototype.getOauthBindingForCurrentUser = function(){
  var oauthBinding = this.getOauthBinding();

  var user = Meteor.user();
  oauthBinding.accessToken = user.services.xero.accessToken;
  oauthBinding.accessTokenSecret = user.services.xero.accessTokenSecret;

  return oauthBinding;
};

xeroApi.prototype.organisation = function() {
  return this.get('organisation.json');
};

xeroApi.prototype.accounts = function() {
 	return this.get('accounts.json');
};

