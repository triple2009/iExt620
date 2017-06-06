// @define iExt
var iExt = iExt || {}; // jshint ignore:line

(function () {

    Ext.apply(iExt, {

        messageTitle: 'iExt',

        unimplFn: function () {
            // <debug>
            Ext.log('unimplementedFn called... ');
            // </debug>
            Ext.raise('未实现该接口方法！');
        }

    });

}());