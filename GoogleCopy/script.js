function searchQuery(event){
    event.preventDefault();
    let allWords = document.getElementById("allWords").value.split(' ').join('+');
    let exactPhrase = '"' + document.getElementById("exactPhrase").value + '"';
    let anyWords = document.getElementById("anyWords").value.split(' ').join('+OR+');
    let noneWords = '-' + document.getElementById("noneWords").value.split(' ').join('-');
    
    if(document.getElementById("allWords").value ==="")   
        allWords = "";
    if(document.getElementById("exactPhrase").value ==="")   
        exactPhrase = "";
    if(document.getElementById("anyWords").value ==="")   
        anyWords = "";
    if(document.getElementById("noneWords").value ==="")   
        noneWords = "";

    let query = allWords + '+' + exactPhrase + '+' + anyWords + '+' + noneWords;
    if(allWords === "" && exactPhrase === "" && anyWords ==="" && noneWords==="")
        query = ""
    
    window.location.href = 'https://www.google.com/search?q=' + query;
}

function luckyRedirection(event){
    event.preventDefault();
    let searchValue = document.getElementById("query").value;
    window.location.href = 'https://www.google.com/search?btnI&q=' + searchValue;
}