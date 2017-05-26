/**
 * @mixin iExt.app.view.Workspace
 * @classdesc 工作区 MIXIN。
 */
Ext.define('iExt.app.view.Workspace', {
    extend: 'iExt.app.view.View',

    mixinConfig: {
        id: 'iext-view-ws'
    },

    ixIsWorkspace: true,

    // 打开视图
    ixOpenView: iExt.unimplFn,

    // 打开页面
    ixOpenPage: iExt.unimplFn

});