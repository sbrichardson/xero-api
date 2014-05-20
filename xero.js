xero = function(options) {
  this._url = "https://api.xero.com/api.xro";
  this._version = "2.0";
  if (options) _.extend(this, options);
};

xero.prototype._getUrl = function(url){
  return [this._url, this._version, url].join('/');
};

xero.prototype.get = function(url,params){
  return this.call('GET',url,params);
};

xero.prototype.post = function(url, params){
  return this.call('POST',url,params);
};

xero.prototype.call = function(method, url, params){
  //this.unblock();

  oauthBinding = this.getOauthBindingForCurrentUser();

  result = oauthBinding.call(method,
    this._getUrl(url),
    params
  );

  return result;
};

xero.prototype.getOauthBinding = function() {
  var config = Accounts.loginServiceConfiguration.findOne({service: 'xero'});
  var urls = Accounts.xero.urls;
  return new OAuth1Binding(config, urls);
};

xero.prototype.getOauthBindingForCurrentUser = function(){
  var oauthBinding = this.getOauthBinding();

  var user = Meteor.user();
  oauthBinding.accessToken = user.services.xero.accessToken;
  oauthBinding.accessTokenSecret = user.services.xero.accessTokenSecret;

  return oauthBinding;
};

xero.prototype.userProfile = function() {
  return this.get('user/-/profile.json');
};

xero.prototype.getSteps = function() {
 	return this.get('user/-/activities/steps/date/today/7d.json');
};

