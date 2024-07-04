var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var targetUrl = "https://yuresky.github.io/motivetime/teste.html"; // Substitua com a URL do seu site
        var bkpLink = document.createElement('a');
        bkpLink.href = targetUrl;
        window.open(targetUrl, '_system');
    }
};

app.initialize();