// island
let flowboxBtns = [];

const pButtonInBox = {
    textContent: "文本",
    flowboxID: "box-button-p",
    flowboxClassName: "box-button-p",
    toolbarID: "",
    toolbarClassName: "format-p",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/字号大小_font-size.svg",
}

const h1ButtonInBox = {
    textContent: "一级标题",
    flowboxID: "box-button-h1",
    flowboxClassName: "box-button-h1",
    toolbarID: "",
    toolbarClassName: "format-h1",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/标题_h1.svg",
}

const h2ButtonInBox = {
    textContent: "二级标题",
    flowboxID: "box-button-h2",
    flowboxClassName: "box-button-h2",
    toolbarID: "",
    toolbarClassName: "format-h2",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/标题1_h2.svg",
}

const h3ButtonInBox = {
    textContent: "三级标题",
    flowboxID: "box-button-h3",
    flowboxClassName: "box-button-h3",
    toolbarID: "",
    toolbarClassName: "format-h3",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/标题2_h3.svg",
}

const boldButtonInBox = {
    textContent: "加粗",
    flowboxID: "box-button-bold",
    flowboxClassName: "box-button-bold",
    toolbarID: "rte-button-bold",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/文字加粗_text-bold.svg",
}

const bullistButtonInBox = {
    textContent: "无序列表",
    flowboxID: "box-button-bullist",
    flowboxClassName: "box-button-bullist",
    toolbarID: "rte-button-bullist",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/列表2_list-two.svg",
}

const numlistButtonInBox = {
    textContent: "有序列表",
    flowboxID: "box-button-numlist",
    flowboxClassName: "box-button-numlist",
    toolbarID: "rte-button-numlist",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/数字列表_list-numbers.svg",
}

const tasklistButtonInBox = {
    textContent: "任务列表",
    flowboxID: "box-button-tasklist",
    flowboxClassName: "box-button-tasklist",
    toolbarID: "rte-button-tasklist",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/对勾_check-correct.svg",
}

const drawioButtonInBox = {
    textContent: "Drawio",
    flowboxID: "box-button-drawio",
    flowboxClassName: "box-button-drawio",
    toolbarID: "",
    toolbarClassName: "macro-drawio",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/关系图_chart-graph.svg",
}

const codeBlockButtonInBox = {
    textContent: "代码块",
    flowboxID: "box-button-code-block",
    flowboxClassName: "box-button-code-block",
    toolbarID: "",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeHtml,
    toolbarHtml: codeBlockHtml,
    imgsrc: "images/大括号_code-brackets.svg",
}

const htmlBlockButtonInBox = {
    textContent: "HTML",
    flowboxID: "box-button-html-block",
    flowboxClassName: "box-button-html-block",
    toolbarID: "",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeHtml,
    toolbarHtml: htmlBlockHtml,
    imgsrc: "images/代码文件_file-code.svg",
}

flowboxBtns.push(pButtonInBox)
flowboxBtns.push(h1ButtonInBox)
flowboxBtns.push(h2ButtonInBox)
flowboxBtns.push(h3ButtonInBox)
flowboxBtns.push(boldButtonInBox)
flowboxBtns.push(bullistButtonInBox)
flowboxBtns.push(numlistButtonInBox)
flowboxBtns.push(tasklistButtonInBox)
flowboxBtns.push(codeBlockButtonInBox)
flowboxBtns.push(drawioButtonInBox)
flowboxBtns.push(htmlBlockButtonInBox)


