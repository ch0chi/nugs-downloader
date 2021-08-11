let serverUrl = "";
document.addEventListener('DOMContentLoaded',() => {
    (async() => {
        serverUrl = document.getElementById('server-url').value;
        await fetchBookmarklet('nugs');
        await fetchBookmarklet('livephish');
    })();
});
const fetchBookmarklet = async (type) => {
    await fetch(`${serverUrl}/api/${type}/bookmarklet`, {
        headers: {
            'Content-Type':'application/json'
        }
    })
        .then(res => res.json())
        .then(data => document.getElementById(`${type}-bookmarklet`).href = data.data)
        .catch(err => console.log(err));
}
