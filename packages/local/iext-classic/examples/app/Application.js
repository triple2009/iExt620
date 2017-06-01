/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('app.Application', {
<<<<<<< HEAD
    extend: 'Ext.app.Application',
=======
    extend: 'iExt.app.Application',
>>>>>>> 0c319e67d178a0175758faae42a0910839b8f5d0
    
    name: 'app',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
<<<<<<< HEAD
=======
        Ext.ariaWarn = Ext.emptyFn;
>>>>>>> 0c319e67d178a0175758faae42a0910839b8f5d0
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
