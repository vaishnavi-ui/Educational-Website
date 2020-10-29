function persons()
{
  // obtaining the no of couples inputted by user
  // it is the no of men or women
  var x=Number(document.getElementById("num").value);
  var valid=document.getElementById("num").validity.valid;
  //window.alert(valid);
  if(valid==true && x>1 && x<10){
  // parent created to add the new html elements to the page
  var parent=document.getElementById("people_entry");
  parent.innerHTML="";

  var i,j;
  var counter=0;
    for(i=0;i<x;i++)
    {
      // creating html elements like h4,label and input and append child to its parent
      var mid=document.createElement("h4");
      mid.innerHTML="Member ID : "+(counter++);
      parent.appendChild(mid);
      var man = document.createElement("label");
      man.innerHTML="Man "+(i+1)+" -> ";
      parent.appendChild(man);

      for(j=0;j<x;j++)
      {
        var m_pref = document.createElement("input");
        // storing the type, placeholder and id of this element
        m_pref.type = "number";
        m_pref.placeholder = "Man"+(i+1)+"'s choice "+(j+1);
        m_pref.id = "m_pref" +(i+1)+"-"+(j+1);
        //m_pref.required=true;
        parent.appendChild(m_pref);
        /*
        // to check if proper input is made
        var check=(document.getElementById("m_pref"+(i+1)+"-"+(j+1))).value;
        if((m_pref).value==check || (m_pref).value <x)
        {
          window.alert("Enter only woman's IDs");
        }
        */
      }

    }
  // br inserted to break the line on the page
  var br = document.createElement("br");
  parent.appendChild(br);
  for(i=0;i<x;i++)
  {
    // creating html elements like h4,label and input and append child to its parent
    var wid=document.createElement("h4");
    wid.innerHTML="Member ID : "+(counter++);
    parent.appendChild(wid);
    var woman = document.createElement("label");
    woman.innerHTML="Woman "+(i+1)+"->";
    parent.appendChild(woman);

    for(j=0;j<x;j++)
    {
      // storing the type, placeholder and id of this element
      var w_pref = document.createElement("input");
      w_pref.type = "number";
      w_pref.placeholder = "Woman "+(i+1)+"'s choice "+(j+1);
      w_pref.id = "w_pref" +(i+1)+"-"+(j+1);
      w_pref.required=true;
      parent.appendChild(w_pref);
      /*
      // to check if proper input is made
      var check=(document.getElementById("w_pref"+(i+1)+"-"+(j+1))).value;
      if((w_pref).value==check || (w_pref).value >=x)
      {
        window.alert("Enter only man's IDs");
      }
      */
    }

  }
// br inserted to break the line on the page
var br = document.createElement("br");
parent.appendChild(br);
// button to call the next function
var btn=document.createElement("INPUT");
// storing the type, value and id of this element and append to the page
btn.type="submit";
btn.id="match";
btn.value="Get Matching";
btn.setAttribute("onclick","preferences()");
parent.appendChild(btn);
// br inserted to break the line on the page
var hr = document.createElement("hr");
parent.appendChild(hr);
}
else{
  window.alert("Enter valid no. of couples!");
}
}

function preferences()
{
  var x=Number(document.getElementById("num").value);
  var prefer=new Array(2*x);
  var i,j;
  var val=-1;
  // initialising 0 value to the array
  for(i=0;i<2*x;i++)
  {
      // creating a double dimensional array to store all preferences
        prefer[i]=new Array(x);
  }
  var flag=false;
  // assigning the values to array for men's preferences
  for(i=0;i<x;i++)
  {
    if(flag==true){
      break;
    }
    else{
    for(j=0;j<x;j++)
    {
      var temp=(document.getElementById("m_pref"+(i+1)+"-"+(j+1))).value;
      if(temp>=x && temp<2*x){
      prefer[i][j]=(document.getElementById("m_pref"+(i+1)+"-"+(j+1))).value;
      }
    else{
      window.alert("Men should enter only woman's IDs!!");
      flag=true;
      break;
      }
    }
  }
  }
  // assigning the values to array for women's preferences
  for(i=x;i<2*x;i++)
  {
    if(flag==true){
      break;
    }
    else{
    for(j=0;j<x;j++)
    {
      var temp=(document.getElementById("w_pref"+((i-x)+1)+"-"+(j+1))).value;
      if(temp<x && temp>=0){
      prefer[i][j]=(document.getElementById("w_pref"+((i-x)+1)+"-"+(j+1))).value;
      }
      else{
        window.alert("Women Should enter only man's IDs!!");
        flag=true;
        break;
      }
    }
  }
}
/*
  for(i=0;i<2*x;i++)
  {
    for(j=0;j<x;j++)
    {
      document.write(prefer[i][j]+" ");
    }
    document.write("<br>");
  }
*/
if(flag==false){
marriage(prefer);
}
}

function marriage(prefer)
{
  var i,j;
  //window.alert("in marriage");
  var x=Number(document.getElementById("num").value);
  var parent = document.getElementById("matched");
  parent.innerHTML="";
  
  var wife=new Array(x);
  var freeman=new Array(x);
  // initialising all men and women as free people
  for(i=0;i<x;i++)
  {
    // stores the man whom the woman marries
    wife[i]=-1;
    //stores which men are free
    freeman[i]=false;
    //window.alert(free[i]);
  }
  //marking all people as free
  var free_people=x;
// while loop runs till atleast 1 person is free
  while(free_people>0)
  {
    var man,woman;
    // to find which man is free
    for(man=0;man<x;man++)
    {
      if(freeman[man]==false)
      {
        break;
      }
    }
    // to find which woman is free
    for(i=0;i<x && freeman[man]==false;i++)
    {
      woman=prefer[man][i];
      if (wife[woman-x]== -1)
        {
                wife[woman-x]=man;
                freeman[man] = true;
                free_people--;
        }
      else
        {
                var man1=wife[woman-x];
                if (wPrefersM1OverM(prefer,woman,man,man1)==false)
                {
                    wife[woman-x]=man;
                    freeman[man]=true;
                    freeman[man1]=false;
                }
        }

    }
  }
  var h2=document.createElement("h2");
  h2.innerHTML="Stable Marriage exists between";
  parent.appendChild(h2);
  var table = document.createElement("table");
  var tr=document.createElement("tr");
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  parent.appendChild(table);
  td1.innerHTML="Women";
  td2.innerHTML="Men";
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  // outside while loop, print the stable marriage
  //var result=document.createElement("h3");
  //result.innerHTML="Women and Men";
  //parent.appendChild(result);

  // br inserted to break the line on the page
  var br = document.createElement("br");
  parent.appendChild(br);
  for (i=0;i<x;i++)
{
  var tr1=document.createElement("tr");
  var td01 =document.createElement('td');
  var td02 = document.createElement('td');
  td01.innerHTML=i+x;
  td02.innerHTML=wife[i];
  tr1.appendChild(td01);
  tr1.appendChild(td02);
  table.appendChild(tr1);
  // to display the pairs
    //var display=document.createElement("h4");
    //display.innerHTML=i+x+"  "+wife[i];
    //parent.appendChild(display);
    // br inserted to break the line on the page
    //var br = document.createElement("br");
    //parent.appendChild(br);
}
var br = document.createElement("br");
parent.appendChild(br);
}

function wPrefersM1OverM(prefer, woman, man, man1)
{
  var i;
  var x=Number(document.getElementById("num").value);
      for (i=0;i<x;i++)
      {
          if (prefer[woman][i] == man1)
              return true;

          if (prefer[woman][i] == man)
          return false;
      }
      return false;
}
