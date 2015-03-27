//var tinymce = require('tinymce'),
	var React = require('react'),
	Field = require('../Field'),
	_ = require('underscore'),
	TinyMCEField = require('../../components/TinyMCE'),
		Squire = require('../../components/Squire');

module.exports = Field.create({
	
	displayName: 'HtmlField',
	
	
	renderEditor: function(readOnly) {
		return <Squire {...this.props}></Squire>;
		//return <TinyMCEField readOnly={readOnly} shouldRenderField={this.shouldRenderField()} {...this.props}></TinyMCEField>
	},

	renderField: function() {
		return this.renderEditor();
	},
	
	renderValue: function() {
		return this.renderEditor(true);
	}
	
});
