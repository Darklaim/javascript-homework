var num = parseInt (prompt ('Введите число от 1 до 999: '));
function numToObj( num ) {
    var obj;
    if ( num < 1 || num > 999 || isNaN( num )) {
        Alert ( 'Неверно введены данные! Введите число от 1 до 999' );
        return obj;
    }
    else {
        
        obj(unit) = num % 10;
        obj(ten) = ( num - obj(unit)) % 100 / 10;
        obj(hund) = ( num - obj(unit) - obj(ten) * 10 ) % 1000 / 100;
        Alert  ('Единицы: ' + obj(unit));
        Alert  ('Десятки: ' + obj(ten));
        Alert  ('Сотни: ' +  obj(hund));
      
    }
}
           