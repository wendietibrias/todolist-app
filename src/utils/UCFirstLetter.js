
const UCFirstLetter = (text) => {
    let result = [];

    for(let i = 0; i < text.length; i++) {
        if(i === 0) result.push(text[i].toUpperCase());
        else { 
          result.push(text[i]);
        }
    }

    return result.join("");
}

export default UCFirstLetter;