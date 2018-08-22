var data = [
	    {
	        "originator": "FB",
	        "balance": 80,

	    },
	];


	function type (d) {
				d.balance = +d.balance;
				return d;
	}

	function swapRealData (data) {

				for (i = 0; i < data.length; i++) {
					data[i].fake = data[i].balance;
				}

				return data;
	}


	data = data.slice(0, 9);


	var width = 450,
		height = 300,
		radius = Math.min(width, height) / 2,
		that = this,
		w = 200,
		h = 50,
		colorObj = [];

	var color = d3.scale.category20();


	var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius - 70);

	var pie = d3.layout.pie().sort(d3.descending).value(function (d) {
		return d.fake;
	});


	var svg = d3.select("body").select(".viz-portfolio-total-value").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + 150 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

	g.append("path").attr("d", arc).style("fill", function (d) {
		return color(d.data.originator);
	}).each(function (d) {
		this._current = d;
	}); // store the initial values;
	var legend = svg.append("g").attr("class", "legend").attr("height", 100).attr("width", 180).attr('transform', 'translate(25,-100)');

	var legendRect = legend.selectAll('rect').data(data);


	legendRect.enter().append("rect").attr("x", w - 65).attr("width", 10).attr("height", 10);

	legendRect.attr("y", function (d, i) {
		return i * 20;
	}).style("fill", function (d) {
		return color(d.originator);
	});

	var legendText = legend.selectAll('text').data(data);

	legendText.enter().append("text").attr("x", w - 52);

	legendText.attr("y", function (d, i) {

		return i * 20 + 9;

	}).text(function (d) {

		var formatted_name;

		formatted_name = d.originator;

		return formatted_name + '.  ' + ' - $' + d.balance;
	});

	window.setTimeout(redrawChart, 500);

	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function (t) {
			return arc(i(t));
		};
	}


	function redrawChart() {

		//Convert "fake" value to real value then animate updated chart 
		that.swapRealData(data);
		svg.selectAll("path").data(pie(data)).transition().duration(2000).attrTween("d", arcTween);

		svg.selectAll(".arc").data(pie(data));

		//Delay 
		window.setTimeout(function () {
			g.append("text").attr("transform", function (d) {
				return "translate(" + arc.centroid(d) + ")";
			});

		}, 1800);
	}