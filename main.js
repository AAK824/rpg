
'https://github.com/'

var rooms = [
    [
        'коридор',
        'Перед тобой дверь в столовую, в аудиторию и в художественную аудиторию. Куда пойдешь?',
        ['встоловую', 'ваудиторию', 'художка', 'столовая', 'аудитория', 'художественнаяаудитория'],
        [1, 2, 3, 1, 2, 3],
        null,
        'https://avatars.mds.yandex.net/get-zen_doc/1362552/pub_5d53c49f46f4ff00ad95d29f_5d552f0e06cc4600ae5120f4/scale_1200'

    ], [
        'столовая',
        'Ты поел, хочешь ещё?(стоимость еды 50 рублей)',
        ['да', 'нет', 'нехочу', 'хочу'],
        [1, 0, 0, 1],
        1,
        'https://salo-sila.ru/wp-content/uploads/2016/10/shkolnaya_stolovaya.jpg'
    ], 
    [
        'аудитория',
        'Ты находишься в аудитории. Будешь учиться(знания + 10) или уйдёшь?',
        ['да', 'нет', 'уйти'],
        [2, 0, 0],
        1,
        'https://vignette.wikia.nocookie.net/stalker/images/1/11/Ss_admin_12-14-19_09-51-32_%28jupiter%29.jpg/revision/latest/top-crop/width/300/height/300?cb=20191214120344&path-prefix=ru'
    ],
    [
        'Художественная аудитория',
        'Ты поработал натурщиком. Хочешь поработать ещё?(з/п 100 рублей)',
        ['нет', 'да'],
        [0, 3],
        1,
        'https://ic.pics.livejournal.com/skosolapoff/21786214/349617/349617_600.jpg'
    ]
];//локации
var step = 0;
document.getElementById('Location').innerHTML = rooms[0][0];
document.getElementById('Result').innerHTML = rooms[0][1];
var HP = 100;
var Money = 500;
var KnowLedge = 10;
var Stress = 10;
document.getElementById('ChooseFemale').addEventListener('click', ChooseFemale);
document.getElementById('ChooseMale').addEventListener('click', ChooseMale);
document.getElementById('ChoosePokemon').addEventListener('click', ChoosePokemon);
var TotalSteps = 0;
function stepTo(){
    
    if (step === null) {
        return;
    }
    var room = rooms[step];
    if (!room) {
        return;
    }
    
    var answer = document.getElementById('inp').value;
    document.getElementById('inp').value = '';
    if (!answer) {
        return;
    }
    answer = answer.toLowerCase().replace(' ', '');
    var isWayNotFound = true;
    for (var i = 0; i < room[2].length; i++) {
        if (answer === room[2][i]) {
            step = room[3][i];
            isWayNotFound = false;
            break;
        }
    }
    if (isWayNotFound) {
        step = room[4];
    }
    CalculateStats();
    document.getElementById('Result').innerHTML = rooms[step][1];
    printRoomInfo();
}//сама игра, где вызываются ф-и рассчёта и печати информации
function printRoomInfo(){
    if(step != null && rooms[step]){
        document.getElementById('Location').innerHTML = rooms[step][0];
    }
    var b = '';
    var room = rooms[step];
    var exits = [];
    var isNameUniq = true;
    document.getElementById('image').src = rooms[step][5];
    for(var i = 0; i < room[3].length; i++){
        var num = room[3][i];
        for(var j = 0; j < exits.length; j++){
            if(rooms[num][0] == exits[j]){
                isNameUniq = false;
            }
        }
        if(isNameUniq){
            exits.push(rooms[num][0]); 
        }        
    }
    document.getElementById('Ways').innerHTML = exits.join(', ');
}//печать информации о команате
function CalculateStats(){
    //проверка ХП и местоположениеы
    if(HP <= 0 && Stress >= 100){
        var death = document.getElementById('death');
        death.style.display = 'flex';
    } else {
        if(step != 1){
            HP -= Math.round(5 - (KnowLedge * 0.01));
            document.getElementById('HP').innerHTML = 'Здоровье студента: ' + HP + '%';
        } else if(HP < 100 && step == 1 && Money >= 50){
            HP += Math.round(5 + (KnowLedge * 0.01));
            Money -= 50;
            document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';
            document.getElementById('HP').innerHTML = 'Здоровье студента: ' + HP + '%';
        }
        if(step == 2){
            KnowLedge += 10;
            Stress += 15;
            document.getElementById('KnowLedge').innerHTML = 'Знания студента: ' + KnowLedge;
            document.getElementById('Stress').innerHTML = 'Стресс: ' + Stress + '%';
        } else {
            if(Stress >= 10){
                Stress -= 10;
            }
            document.getElementById('Stress').innerHTML = 'Стресс: ' + Stress + '%';
        }
        if(step == 3){
            Money += Math.round(100 + (KnowLedge * 0.1));
            document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';
        }
        //вызов сессии и рассчёт шагов
        if(TotalSteps / 40 == 0 && TotalSteps > 0){
            if(KnowLedge >= 200){
                document.getElementById('SMS').style.display = 'flex';
                document.getElementById('SMS-TEXT').innerHTML = 'Вы сдали сессию(знания больше 200). Это победа Пацаны';
                Money += 1000;
                document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';

            } else {
                document.getElementById('SMS').style.display = 'flex';
                document.getElementById('SMS-TEXT').innerHTML = 'Вы не сдали сессию(знания меньше 200). Это поражение, начни заново';
                Money -= 200;
                document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';
                HP -= 50;
                document.getElementById('HP').innerHTML = 'Здоровье студента: ' + HP + '%';

            }
        } else {
            TotalSteps += 1;
            document.getElementById('TotalSteps').innerHTML = 'Кол-во ходов: ' + TotalSteps;
        }
        
    }   
}//рассчёт статов
function ChooseFemale(){
    document.getElementById('choose').style.display = 'none';
    HP = 80;
    Money = 800;
    KnowLedge = 15;
    Stress = 15;
    document.getElementById('HP').innerHTML = 'Здоровье студента: ' + HP + '%';
    document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';
    document.getElementById('KnowLedge').innerHTML = 'Знания студента: ' + KnowLedge;
    document.getElementById('Stress').innerHTML = 'Стресс: ' + Stress + '%';
}
function ChooseMale(){
    document.getElementById('choose').style.display = 'none';
    HP = 100;
    Money = 500;
    KnowLedge = 10;
    Stress = 10;
    document.getElementById('HP').innerHTML = 'Здоровье студента: ' + HP + '%';
    document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';
    document.getElementById('KnowLedge').innerHTML = 'Знания студента: ' + KnowLedge;
    document.getElementById('Stress').innerHTML = 'Стресс: ' + Stress + '%';
}
function ChoosePokemon(){
    document.getElementById('choose').style.display = 'none';
    HP = 450;
    Money = 12800;
    KnowLedge = 3;
    Stress = -1000;
    document.getElementById('HP').innerHTML = 'Здоровье студента: ' + HP + '%';
    document.getElementById('Money').innerHTML = 'Деньги студента: ' + Money + ' рублей';
    document.getElementById('KnowLedge').innerHTML = 'Знания студента: ' + KnowLedge;
    document.getElementById('Stress').innerHTML = 'Стресс: ' + Stress + '%';
}
var btn = document.getElementById('Step');
btn.addEventListener('click', stepTo);
