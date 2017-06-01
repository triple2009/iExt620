/**
 * @class iExt.model.Util
 * @classdesc 实体帮助类。
 */
Ext.define('iExt.model.Util', {
    alternateClassName: 'iExt.Model',
    singleton: true,

    // 
    ixGetModel: function (model) {
        if (model) {
            var modelClass = Ext.ClassManager.get(model);
            if (!modelClass) {
                Ext.raise('未找到指定的实体类 [' + model + '] !');
            }
            model = modelClass;
        }
        return model;
    },

    ixGetService: function (model) {
        var names = model.$className.split('.');
        var service = names[names.length - 1].toLowerCase();
        return service;
    }

});