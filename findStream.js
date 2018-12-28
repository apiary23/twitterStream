'use strict';

let getLog;

const inject = `
<script>
window.XHR_LOG = [];
const origOpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(...args) {
    window.XHR_LOG.push(args);
    return origOpen.apply(this, args);
};
const origFetch = window.fetch;
window.fetch = function(...args) {
    window.XHR_LOG.push(args);
    return origFetch.apply(window, args);
};
</script>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
`;

const code = `
window.stop();
const doc = fetch(window.location.href)
    .then(res => res.text())
    .then(doc => {
        doc = doc.replace(new RegExp('(<head.*>)'), \`$&${inject}\`);
        document.write(doc);
    });
`;

const requestLog = [];

chrome.webRequest.onBeforeRequest.addListener((details) => {
    requestLog.push(details);
}, {urls: ['*://developer.mozilla.org/**', "*://developer.jwplayer.com/**"]});

chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'hacker') {
        console.log('port connected');
        port.onMessage.addListener(msg => {
            if (msg === 'getLog') {
                port.postMessage({type: 'sendLog', data: requestLog});
            }
        });
    }
});

// chrome.runtime.onInstalled.addListener(function() {
//     chrome.webNavigation.onCommitted.addListener(() => {
//         chrome.tabs.executeScript({
//             runAt: 'document_start',
//             code,
//         });
//     }, {url: [
//         {hostEquals: 'developer.mozilla.org'}
//     ]});
// });