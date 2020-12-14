var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";		//Строка алфавита


function Vizhener(m, k, mode) {//(encrypt/decrypt) for "Gronsfeld" + "Vizhener" + "Beaufort" + "Shifted Atbash"
    //m - сообщение или шифротекст (может быть и ключ, если шифр Бофора),
    //k - ключ (или сообщение/шифротекст, если шифр Бофора),
    //mode - режим:
    //	Шифрование: 	"encrypt" (по умолчанию),
    //	Дешифрование: 	"decrypt" (mode === 'decrypt'),
    //	Шифрование-дешифрование по таблице сдвинутого атбаша: (mode==='shifted_atbash')
    //	Извлечение цифр из ключа шифра Гронсфельда: "gronsfeld" или "gronsfeld_encrypt", "gronsfeld decrypt".

    var maxlength = Math.max(m.length, k.length);
    var r = '';	//Пустой результат
    for (i = 0; i < maxlength; i++) { 			//encrypt/decrypt
        //Vizhener - encrypt/decrypt one forumula (encrypt - by default; decrypt - when (mode === 'decrypt') )
        var mi = a.indexOf(m[((i >= m.length) ? i % m.length : i)]);	//подгон сообщения/шифротекста - к ключу (если меньше)
        var ki_s = k[((i >= k.length) ? i % k.length : i)];
        //подгон ключа к сообщению/шифротексту (если короткий)
        var ki = (typeof mode !== 'undefined' && mode.indexOf('gronsfeld') !== -1) ? parseInt(ki_s) : a.indexOf(ki_s);
        //вычитание при дешифровании, либо сложение.
        ki = ((typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1) ? (-ki) : ki);
        c = a[(((a.length + (mi + ki)) % a.length))];				//символ по таблице Виженера.
        c = (mode === 'shifted_atbash') ? a[a.length - 1 - a.indexOf(c)] : c;	//Атбаш символа или символ.
        r += c;																//Добавить символ к результату.
    }
    return r; //вернуть строку результата
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

$("#book").keyup(function (event) {
    func();
})


$("#text").keyup(function (event) {
    func();
}).keydown(function (event) {
    if (event.which === 13) {
        event.preventDefault();
    }
});
$("#key").keyup(function (event) {
    func();
}).keydown(function (event) {
    if (event.which === 13) {
        event.preventDefault();
    }
}).on("change", function () {
    func();
});