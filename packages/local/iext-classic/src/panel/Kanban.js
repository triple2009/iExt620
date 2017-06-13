/**
 * @class iExt.panel.Kanban
 * @extends {Ext.panel.Panel} 
 * @classdesc 应用程序列表。
 */
Ext.define('iExt.panel.Kanban', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixkanbanpanel',

    cls: 'ix-kaban-panel',
    width: 750,
    trackOver: true,
    itemSelector: 'div.ix-kanban-item',
    overItemCls: 'ix-kanban-item-over',
    selectedItemCls: 'ix-kanban-item-selected',

    tpl: [
        '<tpl for=".">',
        '<div class="ix-kanban-item">',
        '<img class="ix-kanban-thumb" src="{thumb}" />',
        '<h3>{name}</h3>',
        '</div>',
        '</tpl>'
    ]

});