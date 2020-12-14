var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";		//Строка алфавита


function Vizhener(m, k, mode) {
    //m - сообщение или шифротекст
    //k - ключ
    //mode - режим:
    //	Шифрование: 	"encrypt" (по умолчанию),
    //	Дешифрование: 	"decrypt" (mode === 'decrypt'),

    var maxlength = Math.max(m.length, k.length);
    var r = '';
    for (i = 0; i < maxlength; i++) {
        var mi = a.indexOf(m[((i >= m.length) ? i % m.length : i)]);
        var ki_s = k[((i >= k.length) ? i % k.length : i)];
        var ki = (typeof mode !== 'undefined' && mode.indexOf('gronsfeld') !== -1) ? parseInt(ki_s) : a.indexOf(ki_s);
        ki = ((typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1) ? (-ki) : ki);
        c = a[(((a.length + (mi + ki)) % a.length))];
        c = (mode === 'shifted_atbash') ? a[a.length - 1 - a.indexOf(c)] : c;
        r += c;
    }
    return r;
}


var turn = $("input[type='radio']:checked").val();

function selectMode() {
    if (turn !== "e")
        return "decrypt";
}

func = () => {
	$("#result").text (Vizhener($("#text").val().toUpperCase(), $("#key").val().toUpperCase(), selectMode()));
}

$("input[type='radio']").on("change", function () {
    turn = $("input[type='radio']:checked").val();
    func();
});

$("#key, #text").keyup(function (event) {
    func();
}).keydown(function (event) {
    if (event.which === 13) {
        event.preventDefault();
    }
}).on("change", function () {
    func();
});