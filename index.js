var nameInput = document.getElementById('siteName');
var urlInput = document.getElementById('siteUrl');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn')

var tableBody = document.getElementById('tableBody');

var bookMarks = [];
// ------------------local storage--------------------
if (localStorage.getItem("bookMarks"!=null))
{
    bookMarks = JSON.parse( localStorage.getItem("bookMarks"));
    displayBookMarks(bookMarks);
}
// -------------------for submiting---------------------
function addMark(){

    var bookM = {
        name:nameInput.value ,
        url:urlInput.value ,

    }
    bookMarks.push(bookM); 
    localStorage.setItem("bookMarks" , JSON.stringify(bookMarks))
    displayBookMarks(bookMarks);
    clearForm();
}
// --------------------for clear form--------------------
function clearForm() {
    nameInput.value="";
    urlInput.value="";
}
// --------------------for display------------------------
function displayBookMarks (arr)
{ 
    var box =``;
    for(var i=0 ; i < bookMarks.length ; i++)
    {
        box += `<tr>
        <td>${arr[i].name}</td>
        <td><a href="${arr[i].url}"><button onClick="setFormForUpdate(${i})" class="btn btn-primary btn-sm">Visit</button></a></td>
        <td><button onClick="setFormForUpdate(${i})" class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteMark(${i});" class="btn btn-danger btn-sm">Delete</button></button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML=box;
}
// --------------------for delete----------------------------
function deleteMark(Index){
    bookMarks.splice(Index,1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks) )
    displayBookMarks(bookMarks);
}
// ----------------for search------------------------
function searchMarks(term) 
{ 
    var matchedMarks = [] ;
    for (var i = 0; i < bookMarks.length; i++) 
    {
        if (bookMarks[i].name.toLowerCase().includes(term.toLowerCase()))
            {
                matchedMarks.push(bookMarks[i]);
            }
    }
    displayBookMarks(matchedMarks);
}
// ---------------------for update------------------------------
function setFormForUpdate (i)
{
    addBtn.classList.replace('d-block' , 'd-none');
    updateBtn.classList.replace('d-none' , 'd-block');
    for (var i = 0; i < bookMarks.length; i++)
    {
    nameInput.value = bookMarks[i].name;
    urlInput.value = bookMarks[i].price;
    }
    var updateForm = localStorage.setItem( 'product' , JSON.stringify(productContainer)) ;
    bookMarks.push(updateForm);
}
function updateSubmit(){
    bookMarks = JSON.parse( localStorage.getItem('product'));
    displayProducts(bookMarks);
    clearForm();
    setFormForUpdate ();
    updateBtn.classList.replace('d-block' , 'd-none');
    addBtn.classList.replace('d-none' , 'd-block');
}