actionMenu = document.getElementById('action-menu-primary')

let scaleSize = 1.5;

if(actionMenu){
    var persentation = document.createElement('li')
    var presentationModeName = "Presentation Mode"
    var presentationModeType = "all"
    if(navigator.language === 'zh' || navigator.language === 'zh-CN'){
        presentationModeName = "演示模式"
    }
    persentation.innerHTML = '<a id="view-persentation-link" href="" rel="nofollow" class="" title="演示模式(Power by Flowiki)" tabindex="-1"><span>'+presentationModeName+'</span></a>'
    actionMenu.appendChild(persentation)
    persentation.addEventListener('click', function (event) {
        event.preventDefault();

        var bodyRaw = document.getElementById("com-atlassian-confluence")
        var bodyRawCopy = bodyRaw.cloneNode(true)

        var bodyAllPresentation = getAllPresentationBody()

        var barElement = document.createElement('div');
        var button1 = document.createElement('button');
        button1.textContent = '连续';
        button1.style.margin = "10px 5px"
        button1.style.padding = "5px 10px"
        barElement.appendChild(button1);

        var button2 = document.createElement('button');
        button2.textContent = '分页';
        button2.style.margin = "10px 5px"
        button2.style.padding = "5px 10px"
        barElement.appendChild(button2);

        // 退出按钮
        var button3 = document.createElement('button');
        button3.textContent = '退出全屏';
        button3.style.margin = "5px"
        button3.style.padding = "5px 10px"
        barElement.appendChild(button3);

        barElement.style.position = "fixed";
        barElement.style.top = "0";
        barElement.style.right = "0";
        barElement.style.zIndex = "998"
        barElement.style.margin = "20px"
        barElement.style.padding = "10px"
        barElement.style.backgroundColor = "rgba(128, 128, 128, 0.2)";
        barElement.style.borderRadius = "10px";

        setTimeout(function() {
            barElement.style.opacity = '0';
        }, 1000);

        // 添加鼠标悬停事件处理程序
        barElement.addEventListener('mouseover', function() {
            barElement.style.opacity = '1';
        });

        // 添加鼠标离开事件处理程序
        barElement.addEventListener('mouseout', function() {
            barElement.style.opacity = '0';
        });

        bodyAllPresentation.insertBefore(barElement, bodyAllPresentation.firstChild);

        var mainAllPresentation = document.getElementById("main")
        let mainAllPresentationCopy = mainAllPresentation.cloneNode(true)
        button1.addEventListener('click', function() {
            if(presentationModeType === "all"){
                return
            }
            let mainAllPresentationCopy2 = mainAllPresentationCopy.cloneNode(true)
            mainAllPresentation.parentNode.replaceChild(mainAllPresentationCopy2, mainAllPresentation);
            mainAllPresentation = document.getElementById("main")
            presentationModeType = "all"
        });

        button2.addEventListener('click', function() {
            if(presentationModeType === "page"){
                return
            }
            setPagePresentationBody()
            presentationModeType = "page"
        });

        button3.addEventListener('click', function (){
            presentationModeType = "all"
            document.exitFullscreen()
        })

        // 监听退出全屏事件
        document.addEventListener('fullscreenchange', function(event) {
            if(!document.fullscreenElement){
                location.reload();
            }
        });

        var body = document.getElementById("com-atlassian-confluence");
        body.requestFullscreen()
    });
}


function getAllPresentationBody() {
    var body = document.getElementById("com-atlassian-confluence");
    body.style.overflow = "auto"; // Enable scrolling
    body.style.height = "100%"; // Set a height to the container
    let header = document.getElementById("header")
    header.parentNode.removeChild(header);

    let mainHeader = document.getElementById("main-header")
    mainHeader.style.position = "";

    let sidebars = document.getElementsByClassName('ia-splitter-left')
    for (let i = 0; i < sidebars.length; i++) {
        sidebars[i].parentNode.removeChild(sidebars[i]);
    }
    var main = document.getElementById("main");
    main.style.marginLeft = "0px";
    main.style.minHeight = "100%"

    let footer = document.getElementById("footer")
    footer.parentNode.removeChild(footer);

    let breadcrumbSection = document.getElementById('breadcrumb-section')
    breadcrumbSection.parentNode.removeChild(breadcrumbSection)

    let navigation = document.getElementById('navigation')
    navigation.parentNode.removeChild(navigation)

    let pageMetadataBanner = document.getElementById('page-metadata-banner')
    pageMetadataBanner.parentNode.removeChild(pageMetadataBanner)

    // let pageMetadatas = document.getElementsByClassName('page-metadata')
    // for (let i = 0; i < pageMetadatas.length; i++) {
    //     pageMetadatas[i].parentNode.removeChild(pageMetadatas[i]);
    // }

    titleHeading = document.getElementById('title-heading')
    titleHeading.style.margin = "15px 0px"

    let likesAndLabelsContainer = document.getElementById('likes-and-labels-container')
    likesAndLabelsContainer.parentNode.removeChild(likesAndLabelsContainer)

    let commentsSection = document.getElementById('comments-section')
    commentsSection.parentNode.removeChild(commentsSection)

    let spaceToolsWebItems = document.getElementById('space-tools-web-items')
    spaceToolsWebItems.parentNode.removeChild(spaceToolsWebItems)

    let customContentFooter = document.getElementById('custom-content-footer')
    customContentFooter.parentNode.removeChild(customContentFooter)

    iaSplitter = document.getElementsByClassName('ia-splitter')
    for (let i = 0; i < iaSplitter.length; i++) {
        iaSplitter[i].style.height = "100%"
    }

    // 创建一个空数组来存储 font-size
    const fontSizes = new Map();
    const lineheightMap = new Map();
    const marginMap = new Map();
    var elements =  document.querySelectorAll('body *:not(.geDiagramContainer *)');
    elements.forEach(function(element, index) {
        const computedStyle = getComputedStyle(element);
        if (computedStyle.getPropertyValue('font-size') &&
            computedStyle.fontSize !== 'inherit' &&
            computedStyle.fontSize != '0px') {
            const currentFontSize = parseFloat(computedStyle.fontSize);
            fontSizes[index] = currentFontSize;
        }
        if (computedStyle.getPropertyValue('line-height') &&
            computedStyle.lineHeight !== 'inherit' &&
            computedStyle.lineHeight != '0px') {
            const currentLineHeight = parseFloat(computedStyle.lineHeight);
            lineheightMap[index] = currentLineHeight;
        }
        if (computedStyle.getPropertyValue('margin') && computedStyle.margin != '0px') {
            const marginTop = parseFloat(computedStyle.marginTop);
            const marginRight = parseFloat(computedStyle.marginRight);
            const marginBottom = parseFloat(computedStyle.marginBottom);
            const marginLeft = parseFloat(computedStyle.marginLeft);
            marginMap[index] = [marginTop, marginRight, marginBottom, marginLeft];
        }
    });

    // 遍历存储的 font-size，再次修改元素的字体大小
    elements.forEach(function(element, index) {
        if (fontSizes.hasOwnProperty(index)) {
            const newFontSize = fontSizes[index] * scaleSize;
            element.style.fontSize = newFontSize + 'px';
        }
        if (lineheightMap.hasOwnProperty(index)) {
            const newLineHeight = lineheightMap[index] * scaleSize;
            element.style.lineHeight = newLineHeight + 'px';
        }
        if (marginMap.hasOwnProperty(index)) {
            const marginTop = marginMap[index][0] * scaleSize;
            const marginRight = marginMap[index][1] * scaleSize;
            const marginBottom = marginMap[index][2] * scaleSize;
            const marginLeft = marginMap[index][3] * scaleSize;
            element.style.margin = marginTop + 'px ' + marginRight + 'px ' + marginBottom + 'px ' + marginLeft + 'px';
        }
    });

    let diagramElements =  document.getElementsByClassName('geDiagramContainer');
    for (let i = 0; i < diagramElements.length; i++) {
        element = diagramElements[i];
        const newWidth = parseFloat(element.style.width) * scaleSize
        element.style.width = newWidth + 'px'
        const newHeight = parseFloat(element.style.height) * scaleSize
        element.style.height = newHeight + 'px'
        const svgElement = element.querySelector('svg')
        const svgGElement = svgElement.querySelector('g')

        // 获取当前的 transform 属性值
        const currentTransform = svgGElement.getAttribute('transform');

        // 解析当前的 scale 值
        const match = /scale\(([^,]+),([^)]+)\)/.exec(currentTransform);
        const currentScaleX = match ? parseFloat(match[1]) : 1;
        const currentScaleY = match ? parseFloat(match[2]) : 1;

        // 设置新的 scale 值
        const newScaleX = currentScaleX * scaleSize;
        const newScaleY = currentScaleY * scaleSize;

        // 修改 transform 属性
        const newTransform = currentTransform.replace(/scale\([^,]+,[^)]+\)/, 'scale(' + newScaleX + ',' + newScaleY + ')');
        svgGElement.setAttribute('transform', newTransform);
    };
    return body
}

function setPagePresentationBody(){
    var elementsSplitByHR = []

    var parentElement = document.getElementById('title-heading');
    if(parentElement){
        var headerTitle = parentElement.querySelector('#title-text');
        headerTitle.style.textAlign = "center"
        elementsSplitByHR.push([headerTitle])
    }

    var mainContentSections = document.querySelectorAll('#main-content > *');
    var mainContentElements = []
    for (var i = 0; i < mainContentSections.length; i++) {
        if (mainContentSections[i].tagName === 'HR') {
            elementsSplitByHR.push(mainContentElements)
            mainContentElements = []
        }else{
            mainContentElements.push(mainContentSections[i])
        }
    }
    if (mainContentElements.length !== 0) {
        elementsSplitByHR.push(mainContentElements)
    }

    // 使用div包装元素
    for (var i = 0; i < elementsSplitByHR.length; i++) {
        var wrapperDiv = document.createElement('div');
        wrapperDiv.className = "wiki-content"
        for (var j = 0; j < elementsSplitByHR[i].length; j++) {
            wrapperDiv.appendChild(elementsSplitByHR[i][j]);
        }
        elementsSplitByHR[i] = [wrapperDiv];
    }
    var mainElement = document.getElementById('main');
    mainElement.style.display = "flex"
    mainElement.style.flexDirection = "column"
    mainElement.style.justifyContent = "center";
    mainElement.style.padding = "80px";

    // 清空 contentDiv 中的现有内容
    while (mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
    }

    for (var i = 0; i < elementsSplitByHR.length; i++) {
        var sectionElements = elementsSplitByHR[i];
        for (var j = 0; j < sectionElements.length; j++) {
            mainElement.appendChild(sectionElements[j]);
        }
    }

    var currentIndex = 0;
    var elements = elementsSplitByHR[currentIndex];

    // 监听键盘事件
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') { // 上箭头键
            showPreviousElement();
        } else if (event.key === 'ArrowDown') { // 下箭头键
            showNextElement();
        }
    });

    function showElements() {
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].tagName !== "HR") {
                elements[i].style.display = 'block';
            }
        }
    }

    // 隐藏所有元素
    function hideElements() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }

    // 切换到上一个元素
    function showPreviousElement() {
        if (currentIndex <= 0) {
            return
        }
        hideElements();
        currentIndex--;
        elements = elementsSplitByHR[currentIndex];
        showElements();
    }

    // 切换到下一个元素
    function showNextElement() {
        if (currentIndex >= elementsSplitByHR.length - 1) {
            return
        }
        hideElements();
        currentIndex++;
        elements = elementsSplitByHR[currentIndex];
        showElements();
    }

    // 切换到下一个元素
    function showCurrentElement() {
        for (var i = 0; i < elementsSplitByHR.length; i++) {
            for (var j = 0; j < elementsSplitByHR[i].length; j++) {
                elementsSplitByHR[i][j].style.display = 'none';
            }
        }
        showElements()
    }

    // 初始化展示第一个元素
    showCurrentElement();
}
