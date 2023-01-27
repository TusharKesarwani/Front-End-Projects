var myArray = [
    {
        'productName' :'Lexus',
        'productNumber' :'2003',
        'paymentStatus' :'Dollar',
        'shipping' :'SC',
    },
    {
        'productName' :'Chevrolet',
        'productNumber' :'2003',
        'paymentStatus' :'Yuan Renminbi',
        'shipping' :'Silverado',
    },
    {
        'productName' :'Oldsmobile',
        'productNumber' :'1998',
        'paymentStatus' :'Rial',
        'shipping' :'LSS',
    },
    {
        'productName' :'Buick',
        'productNumber' :'2010',
        'paymentStatus' :'Ringgit',
        'shipping' :'LaCrosse',
    },
    {
        'productName' :'Land Rover',
        'productNumber' :'2004',
        'paymentStatus' :'Dinar',
        'shipping' :'Discovery',
    },
    {
        'productName' :'Lincoln',
        'productNumber' :'2001',
        'paymentStatus' :'Tenge',
        'shipping' :'Navigator',
    },
    {
        'productName' :'Mercedes-Benz',
        'productNumber' :'2008',
        'paymentStatus' :'Euro',
        'shipping' :'SLK-Class',
    },
    {
        'productName' :'BMW',
        'productNumber' :'2001',
        'paymentStatus' :'Franc',
        'shipping' :'5 Series',
    },
    {
        'productName' :'Dodge',
        'productNumber' :'1996',
        'paymentStatus' :'Euro',
        'shipping' :'Neon',
    },
    {
        'productName' :'Ford',
        'productNumber' :'1993',
        'paymentStatus' :'Rupiah',
        'shipping' :'Econoline E350',
    },
    {
        'productName' :'Ford',
        'productNumber' :'1991',
        'paymentStatus' :'Euro',
        'shipping' :'Taurus',
    },
    {
        'productName' :'Mercedes-Benz',
        'productNumber' :'2012',
        'paymentStatus' :'Rupiah',
        'shipping' :'C-Class',
    },
    {
        'productName' :'Chevrolet',
        'productNumber' :'2006',
        'paymentStatus' :'Yuan Renminbi',
        'shipping' :'Suburban',
    },
    {
        'productName' :'Audi',
        'productNumber' :'1993',
        'paymentStatus' :'Dinar',
        'shipping' :'S4',
    },
    {
        'productName' :'Cadillac',
        'productNumber' :'2006',
        'paymentStatus' :'Peso',
        'shipping' :'STS',
    },
    {
        'productName' :'Mitsubishi',
        'productNumber' :'1994',
        'paymentStatus' :'Ruble',
        'shipping' :'Mighty Max Macro',
    },
    {
        'productName' :'Pontiac',
        'productNumber' :'1978',
        'paymentStatus' :'Rand',
        'shipping' :'Grand Prix',
    },
    {
        'productName' :'Volvo',
        'productNumber' :'2013',
        'paymentStatus' :'Rupiah',
        'shipping' :'S60',
    },
    {
        'productName' :'Acura',
        'productNumber' :'2002',
        'paymentStatus' :'Yuan Renminbi',
        'shipping' :'MDX',
    },
    {
        'productName' :'Porsche',
        'productNumber' :'2007',
        'paymentStatus' :'Rupiah',
        'shipping' :'Cayman',
    },
	]
	
    buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].productName}</td>
							<td>${data[i].productNumber}</td>
							<td>${data[i].paymentStatus}</td>
							<td>${data[i].shipping}</td>
					  </tr>`
			table.innerHTML += row


		}
	}