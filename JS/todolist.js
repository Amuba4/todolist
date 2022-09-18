 //add data
 function update() {
    //populate table
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    let tbody = document.getElementById('tbody');
    let str = "";

    itemJsonArray.forEach((element, index) => {
            str += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-primary" onclick="deletetodo(${index})">Delete</button></td>
          </tr>`;
          tbody.innerHTML = str;
    });            
}


function myFunction() {
    title = document.getElementById('title');
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    

    // validation 
    if (title != null) {
        tit = title.value;
    } else{
        console.error("title is missing");
        tit = null;
    }

    description = document.getElementById('description');
    if (description != null) {
        desc = description.value;
    } else{
        console.error("Description is missing");
        desc = null;
    }

    // die();
    if (localStorage.getItem('itemsJson') == null) {
        console.log("16515");
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        console.log("32423");
        
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        result = itemJsonArray.reduce(reducer , []);
        localStorage.setItem('itemsJson', JSON.stringify(result));
        console.log(itemJsonArrayStr);
    }
    update();
}

update();//fetch data on load 
//delete function
function deletetodo(itemIndex) {
    console.log("delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //Delete item index from aray
    itemJsonArray.splice(itemIndex);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}


function reducer(res, item) {
    if (!item) return res;
    if (Array.isArray(item)) {
        var obj = item.reduce(reducer, [])
        if (obj.length > 0) {
        res.push(obj)
        }
        return res;
    }
    res.push(item);
    return res;
    }

    var res = itemJsonArray.reduce(reducer , [])
    console.log(res);

    function clearStorage(){
        if(confirm("Do You really want to clear?")){
            console.log("clear the storage");
            localStorage.clear();
            update();
        }
 
    }