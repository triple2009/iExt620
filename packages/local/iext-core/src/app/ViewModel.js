/**
 * @class iExt.app.ViewModel
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 应用ViewModel。
 */
Ext.define('iExt.app.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixapp',

    data: {
        ixa: {
            user: {
                code: 'Administrator',
                name: '管理员'
            }
        }
    }

});
