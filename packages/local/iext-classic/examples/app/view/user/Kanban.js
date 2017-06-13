Ext.define('app.view.user.Kanban', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-user-kanban',

    title: '用户看板',
    tbar: {
        xtype: 'toolbar',
        items: [{
            text: '新建'
        }, {
            text: '修改'
        }]
    },

    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    items: [{
        xtype: 'ixstagepanel',
        title: 'Stage1',
        items: [{
            xtype: 'box',
            height: 120,
            renderTpl: '<div style="background-color:#fff;">{name}</div>',
            renderData: {
                name: 'Something'
            }
        }, {
            xtype: 'box',
            height: 120,
            renderTpl: '<div style="background-color:#fff;">{name}</div>',
            renderData: {
                name: 'Something else'
            }
        }]
    }, {
        xtype: 'ixstagepanel',
        title: 'Stage2',
        ixAlt: true
    }, {
        xtype: 'ixstagepanel',
        title: 'Stage3'
    }, {
        xtype: 'ixstagepanel',
        title: 'Stage4',
        ixAlt: true
    }, {
        xtype: 'ixstagepanel',
        title: 'Stage5'
    }]

});