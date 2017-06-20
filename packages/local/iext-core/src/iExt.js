// @define iExt
var iExt = iExt || {}; // jshint ignore:line

(function () {

    Ext.apply(iExt, {

        messageTitle: 'iExt',

        /**
         * 接口虚方法
         */
        unimplFn: function () {
            Ext.log('调用了未实现的方法... ');
            // <debug>
            Ext.raise('未实现该接口方法！');
            // </debug>
        },

        /**
         * 输出日志信息 Ext.log
         * options :  String / Object (optional)
         *      msg: The message to log (required).
         *      level: One of: "error", "warn", "info" or "log" (the default is "log").
         *      dump: An object to dump to the log as part of the message.
         *      stack: True to include a stack trace in the log.
         *      indent: Cause subsequent log statements to be indented one step.
         *      outdent: Cause this and following statements to be one step less indented.
         * message :  String... (optional)
         *      The message to log (required unless specified in options object).
         */
        log: function () {
            var msg = this.getMsg.apply(this, arguments);
            Ext.log(msg);
        },

        /**
         * 输出提示信息
         */
        info: function () {
            var msg = this.getMsg.apply(this, arguments);
            Ext.log({
                level: 'info'
            }, msg);
        },

        /**
         * 输出警告信息
         */
        warn: function () {
            var msg = this.getMsg.apply(this, arguments);
            Ext.log({
                level: 'warn'
            }, msg);
        },

        getMsg: function () {
            var msg = '';
            if (arguments.length > 0) {
                var msg = '';
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    msg += arg + ' ... ';
                }
            }
            return msg;
        }

    });

}());