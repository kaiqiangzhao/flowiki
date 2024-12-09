chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
    if (changeInfo.status == 'complete' && tab.url.startsWith("https://info.bilibili.co")) {   
       chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabId, { action: "changeURL" });
    });
    }
 });