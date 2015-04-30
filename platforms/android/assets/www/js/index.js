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
    receivedEvent: function() {
        document.cookie = 'isPhoneGap=true';
        var win = window.open('https://secure.tutorcruncher.com/', '_blank', 'hidden=yes,location=no');
        win.addEventListener('loadstop', function (event) {
            win.show();
        });
    }
};

app.initialize();
