const convertCamelToSnake = function(field){
    let fieldArray = field.split('');
    for(let i = 0; i<fieldArray.length; i++){
        let lowerCaseLetter = fieldArray[i].toLowerCase();
        if(fieldArray[i] == fieldArray[i].toUpperCase()){
            fieldArray[i] = `_${lowerCaseLetter}`
        }
    }
    return fieldArray.join('')
}

module.exports = convertCamelToSnake;