console.log("JS start");

const myForm = document.querySelector('.my-form');
const amount = document.querySelector('#amount');
const nameInput = document.querySelector('#name');
var itemList = document.querySelector('.items')
var tot = document.querySelector('.totalamount');

myForm.addEventListener('submit', onSubmit);

var total = Number("0");

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/2a3e0df20bbc4069b7201733fa7d1a43/productsData')
        .then((ele) => {
            console.log(ele);

            for (var i = 0; i < ele.data.length; i++) {
                showOnScreen(ele.data[i]);
            }
        })
        .catch((err) => { console.log(err); })

})

async function onSubmit(e) {
    e.preventDefault();
    console.log(nameInput.value);


    let myObj = {
        name: nameInput.value,
        amount: amount.value
    }
    
        await axios.post('https://crudcrud.com/api/2a3e0df20bbc4069b7201733fa7d1a43/productsData', myObj)
            .then((ele) => {
                console.log(ele.data);
                showOnScreen(ele.data)
            })
            .catch((err) => { console.log(err); })

    resetForm();
}

async function showOnScreen(userObj) {
    this.total = this.total + Number(userObj.amount);
    console.log(this.total);

    const childli = `<li class="item" id=${userObj.name}>${userObj.name}-${userObj.amount}<button onclick=deleteExp('${userObj.name}','${userObj._id}','${userObj.amount}') class="btn btndel btn-danger btn-sm float-right delete">X</button></li>`
    itemList.innerHTML = itemList.innerHTML + childli;

    const childtotal = `<h3>Total Value worth of Products : ${this.total}</h3>`;
    tot.innerHTML = childtotal;

}

async function deleteExp(name, id ,amount) {
    const cc = document.getElementById(name);
    //var li = cc.parentElement;
    itemList.removeChild(cc);
    
    this.total = this.total - Number(amount);
    const childtotal = `<h3>Total Value worth of Products : ${this.total}</h3>`;
    tot.innerHTML = childtotal;

    await axios.delete(`https://crudcrud.com/api/2a3e0df20bbc4069b7201733fa7d1a43/productsData/${id}`)
        .then((ele) => { console.log(ele) })
        .catch((err) => { console.log(err); });
}

// reset the form
function resetForm() {
    nameInput.value = '';
    amount.value = '';
}