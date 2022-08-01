const api_url = 
      "https://57skm7y5o3.execute-api.us-east-1.amazonaws.com/Prod/hello";
  
function submitdata(){
	var cusId=document.getElementById("customerId").value;
	var month=document.getElementById("month").value;
	var apiurl=api_url+"?customerId="+cusId+"&month="+month;
	getapi(apiurl);
}
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>Customer ID</th>
          <th>Account ID</th>
          <th>Total Amount For Given Month</th>
         </tr>`;
    
    // Loop to access all rows 
        tab += `<tr> 
    <td>${data.customerId} </td>
    <td>${data.accountId}</td>
    <td>${data.amount_sum}</td>          
</tr>`;
    // Setting innerHTML as tab variable
    document.getElementById("amountdata").innerHTML = tab;
}