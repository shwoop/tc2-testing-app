var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        document.cookie = "isPhoneGap=true";
        window.location = 'http://secure.tutorcruncher.com/'
    }
};

app.initialize();
