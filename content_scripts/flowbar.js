// island
let flowbarBtns = [];

const pButtonInBar = {
    textContent: "文本",
    flowbarID: "bar-button-p",
    flowbarClassName: "bar-button-p",
    toolbarID: "",
    toolbarClassName: "format-p",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/字号大小_font-size.svg",
}

const h1ButtonInBar = {
    textContent: "一级标题",
    flowbarID: "bar-button-h1",
    flowbarClassName: "bar-button-h1",
    toolbarID: "",
    toolbarClassName: "format-h1",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/标题_h1.svg",
}

const h2ButtonInBar = {
    textContent: "二级标题",
    flowbarID: "bar-button-h2",
    flowbarClassName: "bar-button-h2",
    toolbarID: "",
    toolbarClassName: "format-h2",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/标题1_h2.svg",
}

const h3ButtonInBar = {
    textContent: "三级标题",
    flowbarID: "bar-button-h3",
    flowbarClassName: "bar-button-h3",
    toolbarID: "",
    toolbarClassName: "format-h3",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/标题2_h3.svg",
}

const boldButtonInBar = {
    textContent: "加粗",
    flowbarID: "bar-button-bold",
    flowbarClassName: "bar-button-bold",
    toolbarID: "rte-button-bold",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/文字加粗_text-bold.svg",
}

const italicButtonInBar = {
    textContent: "斜体",
    flowbarID: "bar-button-italic",
    flowbarClassName: "bar-button-italic",
    toolbarID: "rte-button-italic",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/文字斜体_text-italic.svg",
}

const underlineButtonInBar = {
    textContent: "下划线",
    flowbarID: "bar-button-underline",
    flowbarClassName: "bar-button-underline",
    toolbarID: "rte-button-underline",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/文字下划线_text-underline.svg",
}

const bullistButtonInBar = {
    type: toolbarElementTypeButton,
    textContent: "无序列表",
    flowbarID: "bar-button-bullist",
    flowbarClassName: "bar-button-bullist",
    toolbarID: "rte-button-bullist",
    toolbarClassName: "",
    imgsrc: "images/列表2_list-two.svg",
}

const numlistButtonInBar = {
    textContent: "有序列表",
    flowbarID: "bar-button-numlist",
    flowbarClassName: "bar-button-numlist",
    toolbarID: "rte-button-numlist",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/数字列表_list-numbers.svg",
}

const tasklistButtonInBar = {
    textContent: "任务列表",
    flowbarID: "bar-button-tasklist",
    flowbarClassName: "bar-button-tasklist",
    toolbarID: "rte-button-tasklist",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/对勾_check-correct.svg",
}

const linkButtonInBar = {
    textContent: "链接",
    flowbarID: "bar-button-link",
    flowbarClassName: "bar-button-link",
    toolbarID: "rte-button-link",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/链接_link-one.png",
}

const removeformatButtonInBar = {
    textContent: "清除",
    flowbarID: "bar-button-removeformat",
    flowbarClassName: "bar-button-removeformat",
    toolbarID: "rte-removeformat",
    toolbarClassName: "",
    toolbarType: toolbarElementTypeButton,
    imgsrc: "images/清除格式_clear-format.svg",
}

flowbarBtns.push(pButtonInBar)
flowbarBtns.push(h1ButtonInBar)
flowbarBtns.push(h2ButtonInBar)
flowbarBtns.push(h3ButtonInBar)
flowbarBtns.push(boldButtonInBar)
flowbarBtns.push(italicButtonInBar)
flowbarBtns.push(underlineButtonInBar)
flowbarBtns.push(bullistButtonInBar)
flowbarBtns.push(numlistButtonInBar)
flowbarBtns.push(tasklistButtonInBar)
flowbarBtns.push(linkButtonInBar)
flowbarBtns.push(removeformatButtonInBar)

