'use strict';

const port = chrome.runtime.connect({name: 'hacker'});

const frag = s => document.createRange().createContextualFragment(s);

port.onMessage.addListener(msg => {
    if (msg.type === 'sendLog') {
        console.log(msg.data);
        data.filter
        // msg.data.forEach(e => {
        //     document.body.appendChild(frag(`<p>${e.url}</p>`));
        // });
    }
});

port.postMessage('acknowledge');

const btn = document.createElement('button'); /* document.createRange().createContextualFragment(`
    <button onclick="console.log('click');">Request Log</button>
`) */;
btn.addEventListener('click', () => {
    console.log('clicked');
    port.postMessage('getLog');
});
btn.innerText = 'Request Log';

document.body.appendChild(btn);

// document.addEventListener('load', () => {
//     port.postMessage('document loaded');
// });
// port.postMessage(document.documentElement.innerHTML);

// document.head.prepend(script);