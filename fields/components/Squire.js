var React = require('react');


module.exports = React.createClass({

	displayName: 'Squire',


	initWysiwyg: function (editor) {
		this.editor = editor;
		
		this._currentValue = this.props.value;
		editor.setHTML(this.props.value);
		
		editor.addEventListener('input', function(e){
			this.valueChanged()
		}.bind(this))
	},

	doAction: function (action, showPrompt) {
		var value;
		if(showPrompt){
			value = prompt('Value: ');
		}
		this.editor[action](value);
	},
	
	valueChanged: function(){
		var content;
		
		if(this.editor){
			content = this.editor.getHTML();
		}
		
		this._currentValue = content;
		
		this.props.onChange({
			path: this.props.path,
			value: content
		});
	},

	componentDidMount: function () {
		var self = this;
		this.refs.editorIframe.getDOMNode().onload = function () {
			self.initWysiwyg(this.contentWindow.editor);
		};

	},

	render: function () {
		var doAction = function (action, showPrompt) {
			return function () {
				this.doAction(action, showPrompt);
			}.bind(this);
		}.bind(this);

		return (
			<div>
				<header>
					<p>
						<span onClick={doAction('bold')}>Bold</span>
						<span onClick={doAction("removeBold")}>Unbold</span>
						<span onClick={doAction("italic")}>Italic</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span onClick={doAction("removeItalic")}>Unitalic</span>
						<span onClick={doAction("underline")}>Underline</span>
						<span onClick={doAction("removeUnderline")}>Deunderline</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span onClick={doAction("setFontSize", true)}>Font size</span>
						<span onClick={doAction("setFontFace", true)}>Font face</span>
					</p>
					<p>
						<span onClick={doAction("setTextColour", true)}>Text colour</span>
						<span onClick={doAction("setHighlightColour", true)}>Text highlight</span>
						<span onClick={doAction("makeLink", true)}>Link</span>
					</p>
					<p>
						<span onClick={doAction("increaseQuoteLevel")}>Quote</span>
						<span onClick={doAction("decreaseQuoteLevel")}>Dequote</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span onClick={doAction("makeUnorderedList")}>List</span>
						<span onClick={doAction("removeList")}>Unlist</span>
						<span onClick={doAction("increaseListLevel")}>Increase list level</span>
						<span onClick={doAction("decreaseListLevel")}>Decrease list level</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span onClick={doAction("insertImage", true)}>Insert image</span>
						<span onClick={doAction("setHTML", true)}>Set HTML</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span onClick={doAction("undo")}>Undo</span>
						<span onClick={doAction("redo")}>Redo</span>
					</p>
				</header>
				<iframe ref="editorIframe" src="/keystone/js/lib/squire/document.html" width="500" height="500"></iframe>
				<input type="hidden" value={this._currentValue} name={this.props.path}/>
			</div>
		)

	}
});
