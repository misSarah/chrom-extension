


function inputReg() {
  var checkbox=document.getElementById("active");
  
   if (checkbox.checked==true){

        var regex=document.getElementById('expression').value 
        chrome.storage.sync.set({regex: regex});
        document.getElementById('expression').innerHTML = regex

    

        //Envoi pour traitement
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, 
                                {action: "search",
                                 regex:regex},
                                 function(response) {
                                    //Nombre de resultat
                                    chrome.browserAction.setBadgeText({"text": ""+response.number});                   
                                 });  
        });
  }
}

//entree
var input = document.getElementById("expression");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        inputReg();
    }
});  




window.onload = function(){
    var checkbox=document.getElementById("active");

    //Activer ou desactiver
    chrome.storage.sync.get(['active'], function(object) {
        if(object.active == '-')  checkbox.checked = true
            else checkbox.checked = false
   });

   checkbox.onchange =function (){
         if (checkbox.checked==true)
         {  
            
            chrome.storage.sync.set({active: '-'});
            chrome.browserAction.setBadgeBackgroundColor({color : 'green'});
            chrome.storage.sync.set({active: '-'});
            $("expression").prop('disabled', false);
         }
         if (checkbox.checked==false)
         {
            
            chrome.browserAction.setBadgeText({ text: '.' });
            chrome.browserAction.setBadgeBackgroundColor({color : 'red'});
            chrome.storage.sync.set({active: '.'});
            $("expression").prop('disabled', true);
            
           
         }
    }
};


