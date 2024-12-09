// wiki 可编辑元素的 ID
const wikiTextareaIframeID = "wysiwygTextarea_ifr"

const flowikiCSS= `
.flowbox-btn:hover {
    background-color: rgba(239, 239, 239, 1);
    cursor: pointer;
}
.selected{
    background-color: rgba(239, 239, 239, 1);
    cursor: pointer;
}
.flowbox-btn{
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 4px 8px;
}
#flowbox{
    position: fixed;
    z-index: 9999;
    min-width: 150px;
    max-height: 300px;
    border: 1px solid #e7e5e4;
    overflow: auto;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: #ffffff;
}
.flowbox-btn-icon{
    width: 14px;
    padding:4px;
    box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px;
    border-radius: 2px;
}
#flowbar{
    position: fixed;
    z-index: 1;
    border: 1px solid #e7e5e4;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 4px;
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: #ffffff;
}
.flowbar-btn {
    display: inline-block;
    padding: 2px;
    width: 24px;
    height: 24px;
    margin: 2px;
}
.flowbar-btn:hover {
    background-color: rgba(239, 239, 239, 1);
    cursor: pointer;
}
.flowbar-btn-icon{
    width: 16px;
    padding:4px;
    border-radius: 2px;
}
`;

const changeURLAction = 'changeURL'
const hideToolbarAction = "hideToolbar"
const showToolbarAction = "showToolbar"

const flowboxID  = "flowbox"
const flowbarID = "flowbar"
const toolbarID = "rte-toolbar"

const flowboxBtnIconClassname = "flowbox-btn-icon"
const flowbarBtnIconClassname = "flowbar-btn-icon"

const codeBlockHtml = '<table class="wysiwyg-macro" data-macro-name="code" data-macro-schema-version="1" style="background-image: url(); background-repeat: no-repeat;" data-macro-body-type="PLAIN_TEXT" data-mce-selected="1"><tbody><tr><td class="wysiwyg-macro-body"><pre><br></pre></td></tr></tbody></table>'
const htmlBlockHtml = '<table class="wysiwyg-macro" data-macro-name="html" data-macro-schema-version="1" style="background-image: url(); background-repeat: no-repeat;" data-macro-body-type="PLAIN_TEXT"><tbody><tr><td class="wysiwyg-macro-body"><pre><br></pre></td></tr></tbody></table>'

const toolbarElementTypeButton = "button"
const toolbarElementTypeHtml = "html"
