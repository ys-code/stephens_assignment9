// CREATE AN ARRAY OF EMPLOYEES
let employees=[];
let count;
let storage;
let empTable;




// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
window.addEventListener('load',()=>{
    if(employees.length === 0){
        storage =JSON.parse( localStorage.getItem('storageEmployees'));
        if (storage!==null){
            if(storage.length>0){console.log('storage');employees=storage;}
            else{alert('The Key: Employees exists but all of recorders were deleted.');}
        }else{
            employees=[
                    [12345678,'Oliver Huffman',1111, 'huffman@abc.com', 'Engineering'],
                    [23456789,'Emma Smith'    ,2222, 'smith@abc.com',   'Administrative'],
                    [34567890,'Ava Speir'     ,3333, 'speir@abc.com',   'Sale'],
                    [45678901,'Brian Hersh'   ,4444, 'hersh@abc.com',   'Marketing'],
                    [56789012,'James Winslow' ,5555, 'winslow@abc.com', 'Marketing']  
                  ];

        }}
    
/*

        console.log('employees.length === 0')
        storage =JSON.parse( localStorage.getItem('storageEmployees'));
        console.log('storage is:'+storage);
        console.log(typeof(storage));
        
        if(storage.length>0 || storage!==null){
            console.log('check storage');
           // for (let x=0 ;x < storage.length; x++){employees.push(x);}
           employees=storage;
        }
        if(storage===null){console.log('check array');
        employees=[
                    [12345678,'Oliver Huffman',1111, 'huffman@abc.com', 'Engineering'],
                    [23456789,'Emma Smith'    ,2222, 'smith@abc.com',   'Administrative'],
                    [34567890,'Ava Speir'     ,3333, 'speir@abc.com',   'Sale'],
                    [45678901,'Brian Hersh'   ,4444, 'hersh@abc.com',   'Marketing'],
                    [56789012,'James Winslow' ,5555, 'winslow@abc.com', 'Marketing']  
                  ];
        }  
     }*/
    buildGrid();

})














// GET DOM ELEMENTS
function $(itemId){
    item = document.getElementById(itemId);
    return item;
}

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS


// ADD EMPLOYEE
form=$('addForm');
form.addEventListener('submit', (e) => {
    let emp=[];
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let id=$('id').value;
    emp.push(id);
    let name=$('name').value;
    emp.push(name);
    let extension=$('extension').value;
    emp.push(extension);
    let mail=$('email').value;
    emp.push(mail);
    let department=$('department').value;
    emp.push(department);
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(emp);
    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    window.document.getElementById('id').focus();
});

// DELETE EMPLOYEE
empTable=$('employees')
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this employee?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let index=e.target.parentElement.parentElement.rowIndex
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
            empTable.deleteRow(index);
        // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(index-1,1);
        // BUILD THE GRID
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    empTable=$('employees');
    tableBody=document.getElementsByTagName('tbody')[0];
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    // **did a search on how to do this, need to use getElementsByTagName('tbody')[0]
    //**also see tableBody.innerHTML='';
    tableBody.remove();
    // REBUILD THE TBODY FROM SCRATCH
    tableBody2=window.document.createElement('tbody');
    empTable.appendChild(tableBody2);

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    let employeesLength=employees.length;
    for (let a=0 ;a < employeesLength; a++){
        let newRow=tableBody2.insertRow();
        let idCell=newRow.insertCell(0);
        let idValue=window.document.createTextNode(employees[a][0]);
        idCell.appendChild(idValue);

        let nameCell=newRow.insertCell(1);
        let nameValue=window.document.createTextNode(employees[a][1]);
        nameCell.appendChild(nameValue);

        let extensionCell=newRow.insertCell(2);
        let extensionValue=window.document.createTextNode(employees[a][2]);
        extensionCell.appendChild(extensionValue);
        
        let mailCell=newRow.insertCell(3);
        let mailValue=window.document.createTextNode(employees[a][3]);
        mailCell.appendChild(mailValue);

        let departmentCell=newRow.insertCell(4);
        let departmentValue=window.document.createTextNode(employees[a][4]);
        departmentCell.appendChild(departmentValue);

        let iconCell=newRow.insertCell(5);
        let deleteBnt=window.document.createElement('button');
        let deleteBntValue=window.document.createTextNode('X');
        deleteBnt.className = 'btn btn-sm btn-danger delete';
        deleteBnt.appendChild(deleteBntValue);
        iconCell.appendChild(deleteBnt);
    }

    // UPDATE EMPLOYEE COUNT
    count=employeesLength;
    window.document.getElementById('empCount').value=count;
    // STORE THE ARRAY IN STORAGE
     
    localStorage.setItem('storageEmployees', JSON.stringify(employees));
    //localStorage.clear('storageEmployees');
    
};