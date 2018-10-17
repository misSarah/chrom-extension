window.onload=function(){
  
    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
      if (msg.action == 'search') { 
         $("body").removeHighlight() //supprimer la selection précedente
  
         numbr=$("body").highlight(msg.regex,true) 
          sendResponse({
            number:numbr // envoyer le nombre d'occurence a popup.js
          })
      }
      return true
    });
  
    window.addEventListener("message", function(e) { 
       
        if (e.source != window)
          return;
        if (e.data.type && (e.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT")) {        
            chrome.runtime.sendMessage(e.data); 
        } 
    }, false);   
  
  
  
    //Recherche automatique
    chrome.storage.sync.get(['regex'], function(object) {
      if(object.regex != undefined && object.regex != ""){
         nombr=$("body").highlight(object.regex,true)
         console.log('numbre',nombr)
  
         chrome.runtime.sendMessage({type: "notification", nombre:nombr}, function(response) {
            console.log("response");
          });
      }
    });
  }
  