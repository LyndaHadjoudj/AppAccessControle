/*btn = document.querySelector('.read-more-btn');
show = document.getElementById('show');

console.log(btn, show)

btn.onclick = function () {

    show.classList.toggle('add');
    if (btn.innerHTML == 'show more') {
        btn.innerHTML = 'show less';
    } else {
        btn.innerHTML = 'show more';
    }

};
*/
function creer() {
    document.getElementById("ajout").hidden = false;
    document.getElementById("suivre").hidden = true;
}
function suivre() {
    document.getElementById("suivre").hidden = false;
    document.getElementById("ajout").hidden = true;
}

function client() {
    document.getElementById("cl").hidden = false;
    document.getElementById("adv").hidden = true;

}
function adversaire() {
    document.getElementById("cl").hidden = true;
    document.getElementById("adv").hidden = false;
}