var Colorizer = {
  colors: ['red', 'green', 'blue', 'yellow', 'black', 'white'],
  bindEvents: function() {
    // what's the value of this
    var self = this;
    $('a.broken').on('click', this.colorize);
    $('a.working').on('click', function() {
      // what's the value of <this>? why do we use self?
      self.colorize();
    });
    $('a.ajax-broken').on('click', this.ajaxStuffneedThis);
    $('a.ajax-working').on('click', function() { self.ajaxStuffneedThis() });
    $('a.ajax-also-working').on('click', this.ajaxStuffdontNeedthis);
  },

  colorize: function() {
    // what's the value of <this> when you click a.broken vs a.working?
    console.log(this);
    var color = this.colors[Math.floor(Math.random()*this.colors.length)];
    $('body').css('background', color);
  },

  ajaxStuffneedThis: function() {
    // what's the value of this line 11 vs line 12?
    var self = this;
    $.ajax({
      url: 'https://api.github.com/users/edshadi',
      type: 'GET'
    }).done(function(data) {
      self.appendUser(data);
    })
  },

  ajaxStuffdontNeedthis: function() {
    // don't need a reference to Colorizer object, so this works fine.
    // what's the value of this?
    var self = this;
    $.ajax({
      url: 'https://api.github.com/users/edshadi',
      type: 'GET'
    }).done(function(data) {
      $(this).siblings('.data').append(data.url); // will not work
      $(self).siblings('.data').append(data.url); // will work
    })
  },

  appendUser: function(data) {
    $('.data').append(data.url)
  }


}

$(document).ready(function() {
  Colorizer.bindEvents();
});
