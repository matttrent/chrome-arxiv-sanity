chrome.browserAction.onClicked.addListener(function(activeTab)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];

        url = tab.url;
        if( !url.startsWith('https://arxiv.org/') ) {
            return;
        }

        re = /(\d+\.\d+v?\d)/i
        found = url.match(re)[0]

        sanity_url = "http://www.arxiv-sanity.com/" + found

        chrome.tabs.create({ 
            url: sanity_url,
            index: tab.index + 1,
            active: true,
        });
    });
});
