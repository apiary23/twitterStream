//HLS: "https://cdn.jsdelivr.net/npm/hls.js@latest"
//Saver: "https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"
const combine = (ctor, arys) => {
    return arys.reduce((p, c) => {
        const buf = new ctor(p.length + c.length);
        buf.set(p, 0);
        buf.set(c, p.length);
        return buf;
    }, new ctor(0));
};
const combineu8 = arys => combine(Uint8Array, arys);

const segments = [];
const v = document.createElement('video');
const hls = new Hls();
hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
hls.on(Hls.Events.MANIFEST_PARSED, function(...args) {
    console.log(args);
});
hls.on(Hls.Events.BUFFER_APPENDING, ((evt, data) => segments.push(data.data)));
hls.attachMedia(v);

setTimeout(() => {
    hls.stopLoad();
    const lump = combineu8(segments);
    const b = new Blob([lump]);

}, 2000);
