export const useCommonFun = () => {
    function convertToSlug(str) {
        return String(str)
            .normalize('NFKD') // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
    }


    let parseText = function(text, limit){
        if (text.length > limit)
            for (let i = limit; i > 0; i--){
                if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
                    return text.substring(0, i) + '...';
                }
            }
        else
            return text;
    };
  
    return { convertToSlug, parseText }
  }

  