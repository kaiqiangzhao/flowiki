try {
  var textareaIframe = document.getElementById(wikiTextareaIframeID)
  var textareaIframeDocument = textareaIframe.contentWindow.document
  var textareaIframeBody = textareaIframeDocument.getElementById("tinymce")
  var isDisplayFlowbox = false // flowbox 是否正在展示
  var isDisplayFlowbar = false // flowbar 是否正在展示
  var selectedFlowboxBtnIndex = 0; // flowbox 被选中的 button index
  var flowboxButtonMap = initFlowboxButtonMap()
  var flowbarButtonMap = initFlowbarButtonMap()
  var flowbox = initFlowbox()
  var flowbar = initFlowbar()
  loadFlowikiCSS()
  initListener()
  updateSelectedButton()
} catch (error) {
  console.log(error)
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // 标签页 url 发生变更时，更新变量
  if (message.action === changeURLAction && !textareaIframe) {
    textareaIframe = document.getElementById(wikiTextareaIframeID)
    textareaIframeDocument = textareaIframe.contentWindow.document
    textareaIframeBody = textareaIframeDocument.getElementById("tinymce")
    isDisplayFlowbox = false;
    isDisplayFlowbar = false;
    selectedFlowboxBtnIndex = 0;
    flowboxButtonMap = initFlowboxButtonMap()
    flowbarButtonMap = initFlowbarButtonMap()
    flowbox = initFlowbox()
    flowbar = initFlowbar()
    loadFlowikiCSS()
    initListener()
    updateSelectedButton()
  }
});

function initFlowboxButtonMap() {
  const buttonMap = {};
  flowboxBtns.forEach(b => {
      buttonMap[b.flowboxID] = b;
  });
  return buttonMap
}

function initFlowbarButtonMap() {
  const buttonMap = {};
  flowbarBtns.forEach(b => {
      buttonMap[b.flowbarID] = b;
  });
  return buttonMap
}


// 加载新工具栏的 CSS
function loadFlowikiCSS() {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = flowikiCSS
  document.head.appendChild(styleElement);
}

function initFlowbox() {
  const flowbox = document.createElement('div');
  flowbox.id = flowboxID;

  // 创建按钮列表容器
  const buttonContainer = document.createElement('div');
  buttonContainer.id = "flowbox-button-container";

  flowboxBtns.forEach((b, index) => {
    const flowboxBtn = document.createElement('div');
    flowboxBtn.id = b.flowboxID;
    flowboxBtn.classList.add(b.flowboxClassName, "flowbox-btn");
    flowboxBtn.style.borderRadius = "4px";
    flowboxBtn.index = index

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL(b.imgsrc)
    img.classList.add(flowboxBtnIconClassname)

    const text = document.createElement('div');
    text.textContent = b.textContent;
    text.style.padding = "4px 8px";

    flowboxBtn.appendChild(img);
    flowboxBtn.appendChild(text);
    buttonContainer.appendChild(flowboxBtn);
  });
  // 将按钮列表容器添加到弹框中
  flowbox.appendChild(buttonContainer);

  // 监听 flowbox 上按钮的点击事件
  flowbox.addEventListener('click', function (event) {
    if (flowboxButtonMap.hasOwnProperty(event.target.id)) {
      selectedFlowboxBtnIndex = event.target.index
    } else if (flowboxButtonMap.hasOwnProperty(event.target.parentNode.id)) {
      selectedFlowboxBtnIndex = event.target.parentNode.index
    }
    selectedButton(event)
  });

  return flowbox
}

function initFlowbar() {
  const flowbar = document.createElement('div');
  flowbar.id = flowbarID;

  // 创建按钮列表容器
  const buttonContainer = document.createElement('div');
  buttonContainer.id = "flowbar-button-container";

  flowbarBtns.forEach((b, index) => {
    const flowbarBtn = document.createElement('div');
    flowbarBtn.id = b.flowbarID;
    flowbarBtn.classList.add(b.flowbarClassName, "flowbar-btn");
    flowbarBtn.style.borderRadius = "4px";
    flowbarBtn.index = index

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL(b.imgsrc)
    img.classList.add(flowbarBtnIconClassname)

    flowbarBtn.appendChild(img);
    buttonContainer.appendChild(flowbarBtn);
  });
  // 将按钮列表容器添加到弹框中
  flowbar.appendChild(buttonContainer);

  // 监听 flowbox 上按钮的点击事件
  flowbar.addEventListener('click', function (event) {
    var b = null
    if (flowbarButtonMap.hasOwnProperty(event.target.id)) {
      b = flowbarButtonMap[event.target.id]
    } else if (flowbarButtonMap.hasOwnProperty(event.target.parentNode.id)) {
      b = flowbarButtonMap[event.target.parentNode.id]      
    }
    if(b){
      var btn = null;
      if (b.toolbarID !== "") {
         btn = document.getElementById(b.toolbarID);
      } else if (b.toolbarClassName !== "") {
        const toolbarButtons = document.getElementsByClassName(b.toolbarClassName);
        if (toolbarButtons.length > 0) {
           btn = toolbarButtons[0]
        }
      }
      if(btn){
        btn.click()
      }
    }
    // hiddenFlowbar()
  });

  return flowbar
}


function initListener() {
  textareaIframeDocument.addEventListener('keydown', function (event) {
    if (event.key === '/') {
      selectedFlowboxBtnIndex = 0
      updateSelectedButton()
      const selection = textareaIframeDocument.getSelection();
      const range = selection.getRangeAt(0);
      const cursorElement = range.startContainer;
      if (cursorElement.parentNode.textContent[range.startOffset - 1] === '/') {
        hiddenFlowbox()
        return
      }
      let rects = range.getClientRects();
      if (rects.length === 0) {
        rects = cursorElement.getClientRects()
      }
      // 计算 flowbox 展示位置
      const rect = rects[0];
      // const iframeTop = textareaIframe.getClientRects()[0].top
      // flowbox.style.top = rect.top + window.scrollY + 20 + iframeTop + 'px';
      // flowbox.style.left = rect.left + window.scrollX + 10 + 'px';
      setFlowboxLocation(rect.top, rect.left)
      showFlowbox()
    } else if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && isDisplayFlowbox) {
      if (isDisplayFlowbox) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      const buttons = Array.from(flowbox.getElementsByClassName('flowbox-btn'));
      if (event.key === 'ArrowUp') {
        selectedFlowboxBtnIndex = selectedFlowboxBtnIndex - 1
        if(selectedFlowboxBtnIndex < 0){
          selectedFlowboxBtnIndex = buttons.length - 1
        }
      } else if (event.key === 'ArrowDown') {
        selectedFlowboxBtnIndex = selectedFlowboxBtnIndex + 1
        if(selectedFlowboxBtnIndex >= buttons.length){
          selectedFlowboxBtnIndex = 0
        }
      }
      updateSelectedButton();
    } else if (event.key === "Enter" && isDisplayFlowbox) {
      selectedButton(event)
    } else {
      hiddenFlowbox();
    }
  }, true);

  // 监听外部点击事件，在点击时判断是否删除 flowbox 并恢复页面滚动
  textareaIframeDocument.addEventListener('click', function (event) {
    const target = event.target;
    const isFlowboxClick = target === flowbox || flowbox.contains(target);
    if (!isFlowboxClick && flowbox.parentNode && isDisplayFlowbox) {
      hiddenFlowbox();
    }
    const isFlowbarClick = target === flowbar || flowbar.contains(target);
    if (!isFlowbarClick && flowbar.parentNode && isDisplayFlowbar) {
      // 实时判断时，range 的 endOffset 和 startOffset 不相等
      setTimeout(function(){ 
        const selection = textareaIframeDocument.getSelection();
        const range = selection.getRangeAt(0);
        if(range.endOffset === range.startOffset){
          hiddenFlowbar();
      }
       }, 50);
    }
  });

  textareaIframeDocument.addEventListener('click', function (event) {
      const selection = textareaIframeDocument.getSelection();
      const range = selection.getRangeAt(0);
      if(range.endOffset === range.startOffset){
          return
      }
      if(isDisplayFlowbar){
        return
      }
      if ((range.startContainer && range.startContainer.tagName && range.startContainer.tagName.toLowerCase() === "img") || 
      (range.startContainer && range.startContainer.firstChild && range.startContainer.firstChild.tagName && range.startContainer.firstChild.tagName.toLowerCase() === "img")){
        return
      }
      event.preventDefault(); // 取消默认行为
      event.stopPropagation(); // 阻止事件冒泡
      event.stopImmediatePropagation();
      rect = range.getBoundingClientRect()
      const iframeTop = textareaIframe.getClientRects()[0].top
      flowbar.style.left = rect.left + "px"
      flowbar.style.top = rect.top + iframeTop - 50 + "px"
      showFlowbar()
  }, true)

  // 监听滚动事件
  textareaIframeDocument.addEventListener('scroll', function(event) {
    // 获取滚动的垂直位置
    var scrollPosition = textareaIframe.contentWindow.scrollY;
    // 更新元素的位置
    if(isDisplayFlowbar){
      const selection = textareaIframeDocument.getSelection();
      const range = selection.getRangeAt(0);
      rect = range.getBoundingClientRect()
      const iframeTop = textareaIframe.getClientRects()[0].top
      flowbar.style.top = rect.top + iframeTop - 50 + "px"
    }
  });
}

function updateSelectedButton() {
  const buttons = Array.from(flowbox.getElementsByClassName('flowbox-btn'));
  buttons.forEach((button, index) => {
    if (index === selectedFlowboxBtnIndex) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
  });
  const button = buttons[selectedFlowboxBtnIndex]
  const containerHeight = flowbox.offsetHeight;
  const itemHeight = button.offsetHeight;
  const itemOffsetTop = button.offsetTop;
  if (itemOffsetTop < flowbox.scrollTop) {
    // 选中项在可视区域上方，向上滚动
    flowbox.scrollTop = itemOffsetTop - 8;
  } else if (itemOffsetTop + itemHeight > flowbox.scrollTop + containerHeight) {
    // 选中项在可视区域下方，向下滚动
    flowbox.scrollTop = itemOffsetTop + itemHeight - containerHeight + 8;
  }
}

function showFlowbox() {
  document.body.appendChild(flowbox);
  textareaIframeDocument.body.style.overflow = 'hidden';
  isDisplayFlowbox = true;
}

function showFlowbar() {
  document.body.appendChild(flowbar);
  // textareaIframeDocument.body.style.overflow = 'hidden';
  isDisplayFlowbar = true;
}

function hiddenFlowbox() {
  if (flowbox == null || flowbox.parentNode == null) {
    isDisplayFlowbox = false;
    return
  }
  flowbox.parentNode.removeChild(flowbox);
  textareaIframeDocument.body.style.overflow = 'auto';
  isDisplayFlowbox = false;
}

function hiddenFlowbar() {
  if (flowbar == null || flowbar.parentNode == null) {
    isDisplayFlowbar = false;
    return
  }
  flowbar.parentNode.removeChild(flowbar);
  // textareaIframeDocument.body.style.overflow = 'auto';
  isDisplayFlowbar = false;
}

function selectedButton(event) {
  if (isDisplayFlowbox) {
    event.preventDefault();
    event.stopPropagation();
  }
  const buttons = Array.from(flowbox.getElementsByClassName('flowbox-btn'));
  const selectedButton = buttons[selectedFlowboxBtnIndex];
  if (selectedButton) {
    const buttonId = selectedButton.id;
    const ok = flowboxButtonMap.hasOwnProperty(buttonId)
    if (ok) {
      const selection = textareaIframeDocument.getSelection();
      const range = selection.getRangeAt(0);
      const node = range.startContainer.parentNode;
      const offset = range.startOffset;
      if (node.textContent[range.startOffset - 1] === '/') {
        node.textContent = node.textContent.slice(0, offset - 1) + node.textContent.slice(offset);
        if (node.firstChild) {
          range.setStart(node.firstChild, offset - 1);
          range.setEnd(node.firstChild, offset - 1);
        }
      }
      b = flowboxButtonMap[buttonId]
      e = getToolbarElement(buttonId)
      if (e && b.toolbarType === toolbarElementTypeButton){
        e.click();
      }else if (e && b.toolbarType === toolbarElementTypeHtml){
          if (node.tagName.toLowerCase() === 'td') {
            node.appendChild(e);
          } else {
            node.parentNode.insertBefore(e, node.nextSibling);
          }
      }
      const selection1 = textareaIframeDocument.getSelection();
      const range1 = selection1.getRangeAt(0);
      try {
        range1.setStart(range1.startContainer.firstChild, offset - 1);
        range1.setEnd(range1.endContainer.firstChild, offset - 1);
      } catch (error) {
        console.log(error);
      }
    }
  }
  hiddenFlowbox();
}

function getToolbarElement(flowboxID) {
  const ok = flowboxButtonMap.hasOwnProperty(flowboxID)
  if (!ok) {
    return null;
  }
  b = flowboxButtonMap[flowboxID]
  if (b.toolbarType === toolbarElementTypeButton) {
    if (b.toolbarID !== "") {
      return document.getElementById(b.toolbarID);
    } else if (b.toolbarClassName !== "") {
      const toolbarButtons = document.getElementsByClassName(b.toolbarClassName);
      if (toolbarButtons.length > 0) {
        return toolbarButtons[0]
      }
    }
  } else if (b.toolbarType === toolbarElementTypeHtml) {
    if(b.toolbarHtml != ""){
      var e = document.createElement("div");
      e.innerHTML = b.toolbarHtml; // 设置按钮文本
      return e.firstChild
    }
  }
  return null;
}

function setFlowboxLocation(slashTop, slashLeft) {
  document.body.appendChild(flowbox);
  offsetHeight = flowbox.offsetHeight;
  offsetWidth = flowbox.offsetWidth;
  document.body.appendChild(flowbox);

  const iframeTop = textareaIframe.getClientRects()[0].top
  let top = slashTop + window.scrollY + 20 + iframeTop;
  let left = slashLeft + window.scrollX + 10;
  if (top + offsetHeight > window.innerHeight) {
    top = top - offsetHeight - 20
  }
  if (left + offsetWidth > window.innerWidth) {
    left = left - offsetWidth - 10
  }

  flowbox.style.left = left + 'px'
  flowbox.style.top = top + 'px'
}