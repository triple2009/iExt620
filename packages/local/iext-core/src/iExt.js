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
         * 输出日志信息
         */
        log: function () {
            if (arguments.length > 0) {
                var msg = '';
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    msg += arg + ' ... ';
                }
                Ext.log(msg);
            }
        }

    });

}());