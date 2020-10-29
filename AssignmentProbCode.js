function safe(n,costs,row,col)
{
	for(var i=0;i<col;i++)
	{
		if(costs[row][i]==-1)
		{
			return false
		}
	}
	if (costs[row][col]==0)
	{
		return true
	}
	return false
	
}
function solveBackTrack(n,costs,col)
{
	if (col>=n)
	{
		return true;
	}
	for(var i=0;i<n;i++)
	{
		if (safe(n,costs,i,col))
		{
			costs[i][col]=-1
			if (solveBackTrack(n,costs,col+1)==true)
			{
				return true;
			}
			costs[i][col]=0;
		}
	}
	return false
}
//Function to dynamically take input of the costs 
function inputCosts(n)
{
	parent=document.getElementById("parent")

	//Removing the children, if any
	while(parent.hasChildNodes())
	{
		parent.removeChild(parent.lastChild)
	}

	//Creating a table to take the input
	var x = document.createElement("TABLE");
	parent.appendChild(x);
	var  p= document.createElement("TR")
	x.appendChild(p)
	var q = document.createElement("TH")
	c=document.createTextNode("Agents")
  	q.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  	q.appendChild(c)
  	p.appendChild(q)
	//Creating labels for job numbers
	for (var i=1;i<=n;i++)
	{
		var q = document.createElement("TH")
		c=document.createTextNode("Job "+i)
  		q.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  		q.appendChild(c)
  		p.appendChild(q)
	}
	parent.appendChild(document.createElement("br"))
	var counter=0
	//Creating the children and appending them to the parent where no of children=no of subjects
	for(var i=1;i<=n;i++)
	{
		var y = document.createElement("TR")
  		x.appendChild(y)
  		var a = document.createElement("TD")  		
  		b=document.createTextNode("Agent "+i)
  		a.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  		a.appendChild(b)
  		y.appendChild(a)  		
  		x.appendChild(y)
		for (var j=1;j<=n;j++)
		{
			var z = document.createElement("TD") 
			cost=document.createElement("input")
			cost.type="number"
			cost.id=counter
			cost.setAttribute('style','border-style:none')
			z.appendChild(cost);
  			z.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  			y.appendChild(z)
			counter++				
		}	
	}	
			
}
function display(n,costs,text){
	parent1=document.getElementById("parent1")
	document.body.appendChild(document.createTextNode(text))
	var x = document.createElement("TABLE");
	document.body.appendChild(x);
	var  p= document.createElement("TR")
	x.appendChild(p)
	var q = document.createElement("TH")
	c=document.createTextNode("Agents")
  	q.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  	q.appendChild(c)
  	p.appendChild(q)
	for(var i=0;i<n;i++)
	{
		var q = document.createElement("TH")
		c=document.createTextNode("Job "+(i+1))
  		q.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  		q.appendChild(c)
  		p.appendChild(q)
	}
	for(var i=0;i<n;i++)
	{
		var y = document.createElement("TR")
  		x.appendChild(y)
  		var a = document.createElement("TD")  		
  		b=document.createTextNode("Agent "+(i+1))
  		a.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  		a.appendChild(b)
  		y.appendChild(a)  		
  		x.appendChild(y);
		for (var j=0;j<n;j++)
		{
			var z = document.createElement("TD");
  			var t = document.createTextNode(costs[i][j]);
  			z.appendChild(t);
  			z.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
  			y.appendChild(z)					
		}	
	}		
	document.body.appendChild(document.createElement("br"))
}
function calculate(n)
{
	//Initializing the array and storing the values
	var costs=new Array(n)
	var originalCosts=new Array(n)
	var count=0
	for (var i=0;i<n;i++)
	{
		costs[i]=new Array(n)
		originalCosts[i]=new Array(n)
		for(var j=0;j<n;j++)
		{
			if (document.getElementById(count).value!="")
			{
			costs[i][j]=parseInt(document.getElementById(count).value)
			originalCosts[i][j]=costs[i][j]
			count++;
			}
			else{
				alert("Missing Value! Ensure that you have mentioned all the costs!")
				return 0;
			}				
		}			
	}	

	//Step 1: Finding the minimum from the row and substracting it from the other elements of the row
	for (var i=0;i<n;i++)
	{
		var MinR=Math.min(...costs[i])
		for (var j=0;j<n;j++)
		{
			costs[i][j]=costs[i][j]-MinR
		}
	}
	display(n,costs,"After Step 1:")

	//Step 2: Finding the minimum from the column and substracting it from the other elements of the column
	for (var i=0;i<n;i++)
	{
		var Min=1000
		for (var j=0;j<n;j++)
		{
			if (costs[j][i]<Min)
			{
				Min=costs[j][i]
			}
		}
		for(var j=0;j<n;j++)
		{
			costs[j][i]=costs[j][i]-Min
		}
	}
	display(n,costs,"After Step 2:")
	//Step 3: Finding the value of m
	var countRow=new Array(n)
	var countCol=new Array(n)
	var positions=new Array()

	//Calculating the number of zeroes in each row and column
	for(var i=0;i<n;i++)
	{
		countR=0
		countC=0
		
		for(var j=0;j<n;j++)
		{
			//alert(a[i][j])
			if(costs[i][j]==0)
			{
				countR+=1;
			}
			if(costs[j][i]==0)
			{
				countC+=1		
			}
		}
		count1=0
		count2=0
		countRow[i]=countR
		countCol[i]=countC
	}

	//Storing the matrix values(positions) of these zeroes
	for(var i=0;i<n;i++)
	{
		for(var j=0;j<n;j++)
		{
			if (costs[i][j]==0)
			{
				var pos=new Array(2)
				pos[0]=i
				pos[1]=j
				positions.push(pos)
			}
		}
	}

	row=new Array()
	column=new Array()

	//Calculating the maximum number of zeroes any row/column has
	MaxR=Math.max(...countRow)
	MaxC=Math.max(...countCol)
	Max=MaxR>MaxC?MaxR:MaxC

	//Drawing lines till all zeroes are covered 
	while(Max!=0)
	{		
		for (var i=0;i<n;i++)
		{
			//Checking if any row has the maximum number of zeroes 
			if (countRow[i]==Max)
			{
				//Add to the row matrix
				row.push(i)
				countRow[i]=0

				//Remove all instances of the zeroes from other columns which are present in the row 
				for(var j=0;j<positions.length;j++)
				{
					if(positions[j][0]==i&&countCol[positions[j][1]]!=0)
					{
						countCol[positions[j][1]]-=1
						positions[j][0]=10000
						positions[j][1]=10000
					}
				}
			}

			//Checking if any column has the maximum number of zeroes 
			if (countCol[i]==Max)
			{
				column.push(i)
				countCol[i]=0

				//Remove all instances of the zeroes from other rows which are present in the current column 
				for(var j=0;j<positions.length;j++)
				{
					if(positions[j][1]==i&&countRow[positions[j][0]]!=0)
					{
						countRow[positions[j][0]]-=1
						positions[j][0]=10000
						positions[j][1]=10000
					}
				}
			}
		}

		//Calculate the max again
		MaxR=Math.max(...countRow)
		MaxC=Math.max(...countCol)
		Max=MaxR>MaxC?MaxR:MaxC
	}

	//Calculate the value of m
	var lenR=row.length
	var lenC=column.length
	var m=lenR+lenC

	//Do the calulations will the value of m is == n
	while(m<n)
	{
		//Finding the minimum from the uncovered elements
		var Min=100000
		for(var i=0;i<n;i++)
		{
			//Not considering the covered rows
			counterForRow=0
			for(var a=0;a<row.length;a++)
			{
				if (i==row[a])
				{
					counterForRow+=1
				}
			}
			if (counterForRow>0)
			{
				continue
			}
			for (var j=0;j<n;j++)
			{
				//Not considering the covered columns
				counterForCol=0
				for(var b=0;b<column.length;b++)
				{
					if(j==column[b])
					{
						counterForCol+=1
					}
				}
				if(counterForCol>0)
				{
					continue
				}

				//Finding minimum
				if (costs[i][j]<Min)
				{
					Min=costs[i][j]
				}
			}
		}

		//Substracting the minimum from the uncovered elements
		for(var i=0;i<n;i++)
		{

			//Not considering the covered rows 
			counterForRow2=0
			for(var a=0;a<row.length;a++)
			{
				if (i==row[a])
				{
					counterForRow2+=1
				}
			}
			if (counterForRow2>0)
			{
				continue
			}
			for (var j=0;j<n;j++)
			{

				//Not considering the covered columns
				counterForCol2=0
				for(var b=0;b<column.length;b++)
				{
					if(j==column[b])
					{
						counterForCol2+=1
					}
				}
				if (counterForCol2>0)
				{
					continue
				}

				//Substracting the minimum
				costs[i][j]=costs[i][j]-Min
			}
		}

		//Adding the minimum to the elements which are at the intersection of the covered rows and columns 
		for (var a=0;a<row.length;a++)
		{
			for(var b=0;b<column.length;b++)
			{
				costs[row[a]][column[b]]+=Min
			}
		}
		//Finding the new value of m
		var countRow=new Array(n)
		var countCol=new Array(n)
		var positions=new Array()
		var zeroesRow=new Array(n)
		var zeroesCol=new Array(n)

		for(var i=0;i<n;i++)
		{
			countR=0
			countC=0
			
			for(var j=0;j<n;j++)
			{
				if(costs[i][j]==0)
				{
					countR+=1;
				}
				if(costs[j][i]==0)
				{
					countC+=1		
				}
			}
			//count1=0
			//count2=0
			countRow[i]=countR
			countCol[i]=countC
			zeroesRow[i]=countR
			zeroesCol[i]=countC
		}
		for(var i=0;i<n;i++)
		{
			for(var j=0;j<n;j++)
			{
				if (costs[i][j]==0)
				{
					var pos=new Array(2)
					pos[0]=i
					pos[1]=j
					positions.push(pos)
				}
			}
		}

		row=new Array()
		column=new Array()
		MaxR=Math.max(...countRow)
		MaxC=Math.max(...countCol)
		Max=MaxR>MaxC?MaxR:MaxC

		while(Max!=0)
		{	
			for (var i=0;i<n;i++)
			{
				if (countRow[i]==Max)
				{
					row.push(i)
					countRow[i]=0
					for(var j=0;j<positions.length;j++)
					{
						if(positions[j][0]==i&&countCol[positions[j][1]]!=0)
						{
							countCol[positions[j][1]]-=1
							positions[j][0]=10000
							positions[j][1]=10000

						}
					}

				}
				if (countCol[i]==Max)
				{
					column.push(i)
					countCol[i]=0

					for(var j=0;j<positions.length;j++)
					{
						if(positions[j][1]==i&&countRow[positions[j][0]]!=0)
						{
							countRow[positions[j][0]]-=1
							positions[j][0]=10000
							positions[j][1]=10000

						}
					}
				}
			}

			MaxR=Math.max(...countRow)
			MaxC=Math.max(...countCol)
			Max=MaxR>MaxC?MaxR:MaxC
		}
		var lenR=row.length
		var lenC=column.length
		var m=lenR+lenC
		//Doing further calculations
		display(n,costs,"Step 3: m!=n...Doing Further calculations")
	}
	//Displaying
	display(n,costs,"Possible Outcomes: ")
	solveBackTrack(n,costs,0)
	totalCost=0
	document.body.appendChild(document.createTextNode("One Possible Solution: "))
	var x = document.createElement("TABLE");
	document.body.appendChild(x);
	var  p= document.createElement("TR")
	x.appendChild(p)
	var q = document.createElement("TH")
	c=document.createTextNode("Agent")
  	q.setAttribute('style','width:100px;border:solid 2px #0275d8;text-align:center')
  	q.appendChild(c)
  	var r = document.createElement("TH")
	d=document.createTextNode("Job")
  	r.setAttribute('style','width:100px;border:solid 2px #0275d8;text-align:center')
  	r.appendChild(d)
  	var s = document.createElement("TH")
	e=document.createTextNode("Cost")
  	s.setAttribute('style','width:100px;border:solid 2px #0275d8;text-align:center')
  	s.appendChild(e)
  	p.appendChild(q)
  	p.appendChild(r)
  	p.appendChild(s)
	for(var i=0;i<n;i++)
	{

		for(var j=0;j<n;j++)
		{
			if (costs[i][j]==-1)
			{
				var y = document.createElement("TR")
  				x.appendChild(y)
				totalCost+=originalCosts[i][j]
				var z1 = document.createElement("TD");
  				var t1 = document.createTextNode(i+1);
	  			z1.appendChild(t1);
	  			z1.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
	  			y.appendChild(z1)		
	  			var z2 = document.createElement("TD");
	  			var t2 = document.createTextNode(j+1);
	  			z2.appendChild(t2);
	  			z2.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
	  			y.appendChild(z2)	
	  			var z3 = document.createElement("TD");
	  			var t3 = document.createTextNode(originalCosts[i][j]);
	  			z3.appendChild(t3);
	  			z3.setAttribute('style','width:100px;border:solid 2px #7579e7;text-align:center')
	  			y.appendChild(z3)			
			}
		}
	}
	document.body.appendChild(document.createTextNode("TOTAL COST: "+totalCost))
}


	