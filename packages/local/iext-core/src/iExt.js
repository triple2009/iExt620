// @define iExt
var iExt = iExt || {}; // jshint ignore:line

(function () {

    Ext.apply(iExt, {

        messageTitle: 'iExt',

        /**
         * 接口虚方法
         */
        unimplFn: function () {
            var msgs = [],
                msg;
            msgs.push('调用了未实现的方法');
            if (arguments && arguments.callee) {
                msg = this.getMsgFrom(arguments.callee);
                msgs.push(msg);
            }
            msg = msgs.join(' ... ');
            Ext.log({
                level: 'warn'
            }, msg);
            // <debug>
            Ext.raise(msg);
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
            //var msg = this.getMsg.apply(this, arguments);
            var msgs = Array.prototype.slice.call(arguments) || [];
            if (arguments && arguments.callee) {
                var msg = this.getMsgFrom(arguments.callee);
                msgs.push(msg);
            }
            Ext.log(msgs.join(' ... '));
        },

        /**
         * 输出提示信息
         */
        info: function () {
            var msgs = Array.prototype.slice.call(arguments) || [];
            if (arguments && arguments.callee) {
                var msg = this.getMsgFrom(arguments.callee);
                msgs.push(msg);
            }
            Ext.log({
                level: 'info'
            }, msgs.join(' ... '));
        },

        /**
         * 输出警告信息
         */
        warn: function () {
            var msgs = Array.prototype.slice.call(arguments) || [];
            if (arguments && arguments.callee) {
                var msg = this.getMsgFrom(arguments.callee);
                msgs.push(msg);
            }
            Ext.log({
                level: 'warn'
            }, msgs.join(' ... '));
        },

        getMsgFrom: function (callee) {
            var msg = '';
            if (callee.caller) {
                callee = callee.caller;
            }
            if (callee && callee.$name) {
                msg = '@[' + callee.$owner.$className + '-' + callee.$name + ']';
            }
            return msg;
        },

        getMsg: function () {
            var msgs = Array.prototype.slice.call(arguments) || [];
            return msgs.join(' ... ');
        }

    });

}());