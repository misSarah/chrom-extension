chrome.browserAction.setBadgeText({ text: '-' });
chrome.browserAction.setBadgeBackgroundColor({color : 'green'});
chrome.storage.sync.set({active: '-'})

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        chrome.tabs.get(sender.tab.id, function(tab) {
            if (chrome.runtime.lastError) {
                return; 
            }
            //// si tab est visible
            if (tab.index >= 0) { 
               
               chrome.storage.sync.get(['active'], function(object) {
                if(object.active == '.') {
                    chrome.browserAction.setBadgeText({ text: '.' });
                    chrome.browserAction.setBadgeBackgroundColor({color : 'red'});
                    $("expression").prop('disabled', true);
                   
                }
               });
            } else { 
                var tabId = sender.tab.id, text = message.badgeText;
                chrome.webNavigation.onCommitted.addListener(function update(details) {
                    if (details.tabId == tabId) {
                        chrome.browserAction.setBadgeText({ text: '-' });
                        chrome.browserAction.setBadgeBackgroundColor({color : 'green'});
                        $("expression").prop('enabled', true);
                        chrome.webNavigation.onCommitted.removeListener(update);
                    }
                });
            }
        });

        if (message.type == "notification"){
          chrome.browserAction.getBadgeText({}, function(result) {
                chrome.browserAction.setBadgeText({ text: ""+message.nombre });
                sendResponse()
            });
          
        }


        
});
  // to run the script 
    var script = document.createElement('script');
    script.src = 'jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);  
