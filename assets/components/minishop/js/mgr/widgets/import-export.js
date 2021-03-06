function startImport(e) {
	this.windows.Import = MODx.load({
		xtype: 'minishop-window-import'
		,listeners: {
			'success': {fn:function() { this.refresh(); },scope:this}
			,'hide': {fn:function() { this.destroy(); }}
		}
	});
	this.windows.Import.fp.getForm().reset();
	//this.windows.Import.fp.getForm().setValues(record);
	this.windows.Import.show(e.target);
}

function startExport(e) {
	this.windows.Export = MODx.load({
		xtype: 'minishop-window-export'
		,listeners: {
			'success': {fn:function() { this.refresh(); },scope:this}
			,'hide': {fn:function() { this.destroy(); }}
		}
	});
	this.windows.Export.fp.getForm().reset();
	//this.windows.Import.fp.getForm().setValues(record);
	this.windows.Export.show(e.target);
}


miniShop.window.Import = function(config) {
	config = config || {};
	this.ident = config.ident || 'mecitem'+Ext.id();

	Ext.applyIf(config,{
		title: _('ms.gallery.add')
		,id: this.ident
		,title: _('ms.import')
		,width: 600
		,url: miniShop.config.connector_url
		,action: 'mgr/goods/import-export/import'
		,labelAlign: 'left'
		,labelWidth: 150
		,fileUpload: true
		,height: 150
		,autoHeight: true
		,fields: [
			{xtype: 'textfield',inputType:'file',fieldLabel: _('ms.file'),name: 'file',id: 'minishop-'+this.ident+'-file',anchor: '95%'}
		]
		,keys: [{key: Ext.EventObject.ENTER,shift: true,fn: this.submit,scope: this}]
		,buttons: [{text: _('close'),scope: this,handler: function() { this.hide();}},{text: _('save_and_close'),scope: this,handler: function() { this.submit();}}]
	});
	miniShop.window.Import.superclass.constructor.call(this,config);
};
Ext.extend(miniShop.window.Import,MODx.Window);
Ext.reg('minishop-window-import',miniShop.window.Import);


miniShop.window.Export = function(config) {
	config = config || {};
	this.ident = config.ident || 'mecitem'+Ext.id();

	Ext.applyIf(config,{
		title: _('ms.gallery.add')
		,id: this.ident
		,title: _('ms.export')
		,width: 600
		,url: miniShop.config.connector_url
		,action: 'mgr/goods/import-export/export'
		,labelAlign: 'left'
		,labelWidth: 150
		,height: 150
		,autoHeight: true
		,fields: [
			{xtype: 'hidden',name: 'id',id: 'minishop-'+this.ident+'-id'}
		]
		,keys: [{key: Ext.EventObject.ENTER,shift: true,fn: this.submit,scope: this}]
		,buttons: [{text: _('close'),scope: this,handler: function() { this.hide();}},{text: _('save_and_close'),scope: this,handler: function() { this.submit();}}]
	});
	miniShop.window.Export.superclass.constructor.call(this,config);
};
Ext.extend(miniShop.window.Export,MODx.Window);
Ext.reg('minishop-window-export',miniShop.window.Export);
