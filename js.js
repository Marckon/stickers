var stickers_num = [];
window.onload = function () {
    initial();
    var button = document.getElementById('button');
    var text_bar = document.getElementById('text');
    button.onclick = stickThis;
    text_bar.onkeyup = function (e) {
        if (e.keyCode == 13) {
            button.onclick();
        }
    }
};

function initial() {
    previous_stickers = JSON.parse(localStorage.getItem('stickers'));
    if(localStorage['stickers']){
        stickers_num=JSON.parse(localStorage.getItem('stickers'));
    }
    for (var i in previous_stickers) {
        var key = '"' + previous_stickers[i] + '"';
        stickThis(null, localStorage.getItem(key), key);
    }
}

function stickThis(e, text, previous_key) {
    if (!text) {
        var text = document.getElementById('text').value;
        if (text == null || text == "") {
            alert('oops! You should say something!');
            return;
        }
        var key = saveSticker(text);
        var new_sticker = createLiElement(text, key);
        prettySticker(new_sticker);
    }

    else if (text) {
        var new_sticker = createLiElement(text, previous_key);
        prettySticker(new_sticker);
    }
}

function createLiElement(text, key) {
    var delete_button = document.createElement('span');
    delete_button.className = 'delete-button';
    delete_button.onclick=deleteThis;
    var new_sticker = document.createElement('li');
    var sticker_board = document.getElementById('sticker-board');
    new_sticker.innerHTML = text;
    new_sticker.setAttribute('id', key);
    new_sticker.appendChild(delete_button);
    sticker_board.appendChild(new_sticker);
    return new_sticker;
}

function saveSticker(text) {
    var date = new Date();
    stickers_num.push(date);
    localStorage.setItem('stickers', JSON.stringify(stickers_num));
    localStorage.setItem(JSON.stringify(date), text);
    return JSON.stringify(date);
}

function prettySticker(sticker) {
    var angle = Math.floor(Math.random() * 30 - 15);
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    sticker.style.cssText = 'transform:rotate(' + angle + 'deg)';
    sticker.style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function deleteThis(e) {
    var id = e.target.parentNode.id;
    localStorage.removeItem(id);
    var stickers_num = JSON.parse(localStorage.getItem('stickers'));
    for (var i = 0; i < stickers_num.length; i++) {
        if ('"'+stickers_num[i]+ '"'== id) {
            stickers_num.splice(i, 1);
        }
    }
    localStorage.setItem('stickers', JSON.stringify(stickers_num));
    document.getElementById(id).style.display='none';
}