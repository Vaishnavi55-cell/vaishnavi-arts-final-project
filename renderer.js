const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://qcorzfzprfdnhovmojrz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjb3J6ZnpwcmZkbmhvdm1vanJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMjgyMjQsImV4cCI6MjEwNTkwNDIyNH0.bBV4yJjM-gh9Uu4jcEFe2T7AHgqqJLSxcz1hK4427JU');
async function addSale(){
  const item_name=document.getElementById('item').value;
  const customer_name=document.getElementById('customer').value;
  const price=parseInt(document.getElementById('price').value);
  const category=document.getElementById('category').value;
  if(!item_name||!price)return alert('Item and Price bhara');
  const {error}=await supabase.from('sales').insert([{item_name,customer_name,price,category}]);
  if(error)alert(error.message);else{alert('Sale Added!');loadSales(); document.getElementById('item').value=''; document.getElementById('price').value='';}
}
async function loadSales(){
  const {data}=await supabase.from('sales').select('*').order('created_at',{ascending:false}).limit(50);
  let total=0,html='';
  (data||[]).forEach(r=>{total+=r.price;html+=`<tr><td>${r.item_name}</td><td>${r.customer_name}</td><td>₹${r.price}</td><td>${new Date(r.created_at).toLocaleString()}</td></tr>`});
  document.getElementById('list').innerHTML=html;
  document.getElementById('total').innerText='Total: ₹'+total;
}
loadSales();