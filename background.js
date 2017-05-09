var openNewTab = false;

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    // get current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];

        // extract url and return if doesn't match
        url = tab.url;
        if( !url.startsWith('https://arxiv.org/') ) {
            return;
        }

        // get arxiv iv
        re = /(\d+\.\d+v?\d)/i
        found = url.match(re)[0]

        // construct new url
        sanityUrl = "http://www.arxiv-sanity.com/" + found

        // open in tab
        if(openNewTab) {
            chrome.tabs.create({ 
                url: sanityUrl,
                index: tab.index + 1,
                active: true,
            });
        } else {
            chrome.tabs.update(
                tab.id, { url: sanityUrl }
            );
        }
    });
});
