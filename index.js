const add = document.getElementById("submit");
add.addEventListener("click",async(e)=>{
    e.preventDefault();
    const product = document.getElementById("product").value;
    const price = document.getElementById("price").value;
    const expense = document.getElementById("type").value;
    //console.log(product,price,expense);
    await axios.post('http://localhost:8080/product',{expense:expense,product:product,price:price});
    display();
    //console.log(product,price);
})

async function display(){
    let result = await axios.get('http://localhost:8080/product');
    //console.log(result.data);
    result = result.data;
    const list = document.getElementById('list');
    list.innerHTML = '';
    for(let i=0;i<result.length;i++){
        const type=result[i]["type"];
        const name = result[i]["name"];
        const price = result[i]["price"];
        const data = type+' . '+ name+" . "+price;
        const id=result[i]["id"];
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(data));
        const button = document.createElement('button');
        button.appendChild(document.createTextNode("delete"));

        const edit = document.createElement('button');
        edit.appendChild(document.createTextNode("edit"));
        button.style.backgroundColor = "red";
        edit.style.backgroundColor = "green";
        button.style.margin = "10px";
        button.style.padding = "5px";
        edit.style.padding = "5px";
        li.append(button);
        li.append(edit);
        list.appendChild(li);
        button.addEventListener("click",async (e)=>{
            await axios.post('http://localhost:8080/delete',{id:id});
            display();
        })
        edit.addEventListener("click",async(e)=>{
            const expense = document.getElementById("type");
            expense.value = type;
            const product=document.getElementById("product");
            product.value = name;
            const cost = document.getElementById("price");
            cost.value = price;
            const submit = document.getElementById("submit");
            submit.innerText = '';
            const save = document.createElement('button');
            save.appendChild(document.createTextNode("save"));
            const form = document.getElementById("form");
            form.appendChild(save);
            save.addEventListener("click",async (e)=>{
                e.preventDefault();
                const product = document.getElementById("product").value;
                const price = document.getElementById("price").value;
                const expense = document.getElementById("type").value;
    //console.log(product,price,expense);
               await axios.post('http://localhost:8080/update',{expense:expense,product:product,price:price,id:id});
              // const submit = document.getElementById("submit");
               submit.innerText = "submit";
               save.innerHTML = '';
               form.removeLastChild();
               display();
              // list.innerHTML = '';
            })
        })
    }
}
display();
