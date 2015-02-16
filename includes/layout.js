 	$(document).ready(function () {
  var innerWidth = window.innerWidth;
        var areaChartHeight = 0.09266667 * window.innerHeight;
        var gap = innerWidth / 9;
        var left = -1 * gap;
        var years = "2002";
        var i = 0,
            a = 0;

        var main, health,clothing,food,housing,education,transport, currentFifth, currentYear, category,
         lineData, currentCategory,miscellaneous, linegraph, x, y, lineFunction,
          area,lastYear,lastFifth,level; //global
        var div = d3.select("#viz");
        $.getJSON("includes/Data Sets/2003-2011.json", function(data) {

            var year, root;
            var yearsArr = [data.y2003, data.y2004, data.y2005, data.y2006, data.y2007, data.y2008, data.y2009, data.y2010, data.y2011];
            var treemap = d3.layout.treemap()
                .size([window.innerWidth, window.innerHeight - areaChartHeight])
                .sticky(true)
                .mode("squarify")
                .ratio(1.2)
                .value(function(d) {                
                    return d.value;
                });
			$(".x_botton")
							.click(function(){
										changeLayout(lastYear,lastFifth,"main");
										changeArea();
										$(this).attr("id","main_x")
												.attr("class","x_botton");
									});
			var linksOff=1;
			var links2Off=1;	
			function openShareNav(){$("#fb_share").attr("class","animated fadeInDown");
											setTimeout(function(){
												$("#twit_share").attr("class","animated fadeInDown");
												setTimeout(function(){
													$("#link_share").attr("class","animated fadeInDown");	
												}, 50);	
											}, 50);
											linksOff=0;}
			function closeShareNav(){$("#fb_share").attr("class","animated fadeOutUpBig");
											setTimeout(function(){
												$("#twit_share").attr("class","animated fadeOutUpBig");
												setTimeout(function(){
													$("#link_share").attr("class","animated fadeOutUpBig");	
												}, 50);	
											}, 50);
											linksOff=1;}
			function openPersonsNav(){$("#one_person").attr("class","animated fadeInDown");
											setTimeout(function(){
												$("#two_persons").attr("class","animated fadeInDown");
												setTimeout(function(){
													$("#three_persons").attr("class","animated fadeInDown");
													setTimeout(function(){	
														$("#four_persons").attr("class","animated fadeInDown");
														setTimeout(function(){	
															$("#five_persons").attr("class","animated fadeInDown");
															setTimeout(function(){	
																$("#six_persons").attr("class","animated fadeInDown");
																	setTimeout(function(){	
																		$("#average").attr("class","animated fadeInDown");
																}, 50);	
															}, 50);	
														}, 50);	
													}, 50);	
												}, 50);	
											}, 50);
											links2Off=0;}
			function closePersonsNav(){$("#one_person").attr("class","animated fadeOutUpBig");
											setTimeout(function(){
												$("#two_persons").attr("class","animated fadeOutUpBig");
												setTimeout(function(){
													$("#three_persons").attr("class","animated fadeOutUpBig");
													setTimeout(function(){	
														$("#four_persons").attr("class","animated fadeOutUpBig");
														setTimeout(function(){	
															$("#five_persons").attr("class","animated fadeOutUpBig");
															setTimeout(function(){	
																$("#six_persons").attr("class","animated fadeOutUpBig");
																setTimeout(function(){	
																		$("#average").attr("class","animated fadeOutUpBig");
																}, 50);
															}, 50);	
														}, 50);	
													}, 50);	
												}, 50);	
											}, 50);
											links2Off=1;}	
								
			$("#share").click(function(){
											if(linksOff){
												openShareNav();
												if(links2Off==0)closePersonsNav();
											}
											else closeShareNav();
								});
								
			$(".personSelected").click(function(){
										if(links2Off){
											openPersonsNav();
											if(linksOff==0)closeShareNav();
										}
										else closePersonsNav();
								});															
            createTreemap("2011",Math.abs(window.location.search.match(/\d+/)-6),"main");
            
            $(".personSelected").attr("id","personSelected"+window.location.search.match(/\d+/));
            $("#average").click(function(){currentFifth=6;changeLayout(currentYear,currentFifth,currentCategory);changeArea();$(".personSelected").attr("id","selectedAverage");});
            $("#one_person").click(function(){currentFifth=5;changeLayout(currentYear,currentFifth,currentCategory);$(".personSelected").attr("id","personSelected1");});
            $("#two_persons").click(function(){currentFifth=4;changeLayout(currentYear,currentFifth,currentCategory);changeArea();$(".personSelected").attr("id","personSelected2");});
            $("#three_persons").click(function(){currentFifth=3;changeLayout(currentYear,currentFifth,currentCategory);changeArea();$(".personSelected").attr("id","personSelected3");});
            $("#four_persons").click(function(){currentFifth=2;changeLayout(currentYear,currentFifth,currentCategory);changeArea();$(".personSelected").attr("id","personSelected4");});
            $("#five_persons").click(function(){currentFifth=1;changeLayout(currentYear,currentFifth,currentCategory);changeArea();$(".personSelected").attr("id","personSelected5");});
            $("#six_persons").click(function(){currentFifth=0;changeLayout(currentYear,currentFifth,currentCategory);changeArea();$(".personSelected").attr("id","personSelected6");});
			$("ul>li").click(function(){closeShareNav();closePersonsNav();});
		

            var node = div.datum(root).selectAll(".node");
            node.data(treemap.nodes)
                .enter()
                .append("div")
                .attr("class", "node")
                .on("click", onClick)
                .call(appendImage)
                .append("div")
                .attr("class", "text")
                .call(appendText_percent)
                .call(appendText_name);
            d3.selectAll(".node").call(position);
			
			
           var svg = d3.select("body").append("svg")
                .attr("width", innerWidth)
                .attr("height", areaChartHeight)
                .style("top", innerHeight - areaChartHeight);

            area = d3.svg.area()
                .interpolate("monotone")
                .x(function(d) {
                    return x(d.x);
                })
                .y0(areaChartHeight)
                .y1(function(d) {
                    return y(d.y);
                });
            lineFunction = d3.svg.line()
                .x(function(d) {
                    return d.x;
                })
                .y(function(d) {
                    return d.y;
                });

            x = d3.scale.linear().range([0, innerWidth]);
            y = d3.scale.linear().range([areaChartHeight * 3, 0]);
			changeArea();
			 svg.append("path")
			 	.attr("class", "area")
			 	.attr("d", area(lineData));
			linegraph = svg
						.attr("class", "lineData")
						.append("path")
						.attr("d", lineFunction(lineData));
            

            for (var i = 0; i < 9; ++i) {
                $("body").append("<section class='year' id=" + (++years) + "><p>"+years+"</p></section>");
                $(".year").eq(i).css({
                    "width": gap,
                    "height": areaChartHeight,
                    "left": left += gap,
                    "top": innerHeight - areaChartHeight
                });
            }
            $("#"+currentYear).addClass("yearSelected");

            function onClick(d) {
				if(level!=1)
					return;
				lastYear=currentYear;
				lastFifth=currentFifth;
				$(".x_botton").attr("class","animated fadeInDown x_botton").attr("id",d.nameEn.replace(/ /g,'').replace(/,/g,'')+"_x");
				$(".x_botton").hover(function(){$(this).attr("class","x_botton x_botton_hover");},function(){$(this).attr("class","x_botton");});	
				changeLayout(currentYear, currentFifth, d.nameEn);
				changeArea();
				$(".info").remove();
			
            }
            
			
            function appendText_percent() {
                this.append("text")
                    .attr("class", "percent");
            }

            function appendText_name() {
                this.append("text")
                    .attr("class", "name");

            }

            function appendImage() {
                this.append("img");

            }

            function getYearVal(_year) {
                var result;
                switch (currentCategory) {
                    case "main":
                        result = _year.fifths[currentFifth];
                        break;
                    case "Health":
                        result = _year.categories.health.fifths[currentFifth];
                        break;
                    case "Clothing and footwear":
                        result = _year.categories.clothing_and_footwear.fifths[currentFifth];
                        break;
                    case "Food":
                    	result = _year.categories.food.fifths[currentFifth];
                        break;
                    case "Miscellaneous goods and services":
                    	result = _year.categories.miscellaneous_goods_and_services.fifths[currentFifth];
                        break;
                    case "Education, culture and entertainment":
                    	result = _year.categories.education_culture_and_entertainment.fifths[currentFifth];
                        break;
                    case "Transport and communications":
                    	result = _year.categories.transport_and_communications.fifths[currentFifth];
                        break;
                     case "Housing, Dwelling and household maintenance":
                    	result = _year.categories.housing_dwelling_and_household_maintenance.fifths[currentFifth];
                        break;    
                   
                }
                return result;
            }
			
            function changeArea() {
            	 a = 0;
                lineData = [{
                    "x": a += gap,
                    "y": getYearVal(yearsArr[0])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[1])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[2])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[3])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[4])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[5])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[6])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[7])
                }, {
                    "x": a += gap,
                    "y": getYearVal(yearsArr[8])
                }];
               
                x.domain(d3.extent(lineData, function(d) {
                    return d.x;
                }));
                y.domain([0, d3.max(lineData, function(d) {
                    return d.y;
                })]);

                 	 svg.select(".area")
                 		.transition()
                 		.duration(1500)
						.attr("d",function(){return area(lineData);});
					svg.select(".lineData")
						.attr("d",function(){return lineFunction(lineData);});
               
            }
         	
            function position(d) {
            	var test=this;
				if(level==1){
					this.append("div").attr("class","info")
										.on('mouseover', function(d){d3.select("#text_box")
										.style("display","block");});
										test.select("h4")
										.html(function(d){
											return ((Math.round((d.value / category.fifths[currentFifth]) * 100)) + "%");
										});
				}	
                    this
                        .style("background", function(d) {
                            return d.color;
                        })
                        .style("right", function(d) {
                            return d.x + "px";
                        })
                        .style("bottom", function(d) {
                            return d.y+areaChartHeight + "px";
                        })
                        .style("width", function(d) {
                            return Math.max(0, d.dx) + "px";
                        })

                    	.style("height", function(d) {
                        return Math.max(0, d.dy) + "px";
                    })         
				
                    .select("img")
                        .attr("height", function(d) { 
                        	if(d.nameEn=="Miscellaneous goods and services")
                        		return 90;
                        	
                        	//new height= Square root(div area /(old height^2 * ratio)) * old height
                            return Math.sqrt((d.dy * d.dx * 0.35) / (d.height_ * d.height_ * d.ratio)) * d.height_;
                        })

                    .attr("width", function(d) {
                            return (Math.sqrt((d.dy * d.dx * 0.35) / (d.height_ * d.height_ * d.ratio)) * d.height_) * d.ratio;
                        })
                        .style("top", function(d) {
                        		
                             if ((window.innerHeight-areaChartHeight) / d.dy > 2.65)
                                return "7px";
                            return ((d.dy - (Math.sqrt((d.dy * d.dx * 0.35) / (d.height_ * d.height_ * d.ratio)) * d.height_)) / 2) + "px";
                        })

                    .style("right", function(d) {
                    	if(d.nameEn=="Clothing and footwear"){
                        			return "3px";
                        			}	
                        return ((d.dx - (Math.sqrt((d.dy * d.dx * 0.35) / (d.height_ * d.height_ * d.ratio)) * d.height_) * d.ratio) / 2) + "px";
                    })
                    
                    
                    .attr("src", function(d) {
                            return d.pic;
                       });
                       
                    this.select(".percent")
                   		 .style("color",function(d){
                    			if(d.nameEn=="Clothing and footwear"){
                    				return "#b29c80";
                    			}
                    			else if(d.nameEn=="Education, culture and entertainment"){
                    				return "#b7913d";
                    			}	
                    		})
                    	.style("font-size",function(d){if(d.dy<window.innerHeight/5.5)return "39px";})
                    	.transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 11 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 10 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 9 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 8 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 7 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 6 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 5 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 4 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 3 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) - 2 + "%";
                        })
                        .transition()
                        .duration(50)
                        .text(function(d) {
                            return (Math.round((d.value / category.fifths[currentFifth]) * 100)) + "%";
                        });




                    this.select(".name")
                    .style("color",function(d){
                    			if(d.nameEn=="Clothing and footwear"){
                    				return "#b29c80";
                    			}
                    			else if(d.nameEn=="Education, culture and entertainment"){
                    				return "#b7913d";
                    			}	
                    		})
                    .style("font-size",function(d){
                    	if(d.dy<window.innerHeight/6)
                    		return "15px";
                    })				
                    .text(function(d) {
                        return d.name;
                    });

                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



            function changeLayout(year_, fif, select) {
                createTreemap(year_, fif, select);
                treemap.sticky(true);
                div
                    .datum(root).selectAll(".node")
                    .data(treemap.nodes)
                    .transition()
                    .duration(1500)
                    .call(position);
            };


            $(".year").click(function() {
                $(".yearSelected").removeClass("yearSelected");
                $(this).addClass("yearSelected");
                changeLayout($(this).attr("id"), currentFifth, currentCategory);
            });

          	   
            function createTreemap(yearSelacted, fifths, selected) {
                currentYear=yearSelacted;
                currentFifth=fifths;
                currentCategory=selected;
                year=yearsArr[yearSelacted - 2003];
                level=2;
				$(".yearSelected").removeClass("yearSelected");
                $("#"+yearSelacted).addClass("yearSelected");

                main = [{
                    "value": year.categories.food.fifths[fifths],
                    "name": year.categories.food.name_he,
                    "nameEn": year.categories.food.name_en,
                    "color": "#cc72e1",
                    "pic": "images/chicken_icon.svg",
                    "height_": 324,
                    "ratio": 0.987654321,
                    "info":"ההוצאה על מזון היא השלישית בגודל מבין ההוצאות של המשפחות בישראל. ככל שהמשפחה ענייה יותר, ועם יותר ילדים, כך החלק היחסי שהיא מוציאה על מזון מכלל ההוצאות שלה - גדול יותר. לכן, התייקרות מחירי המזון בשנים האחרונות פגעה בכולם, אבל באופן יחסי פגעה בעניים יותר"
                }, {
                    "value": year.categories.education_culture_and_entertainment.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.name_en,
                    "color": "#f9dc62",
                    "pic": "images/culture_and_education_icon.svg",
                    "height_": 240,
                    "ratio": 0.85833333,
                    "info":"ההוצאה הרביעית בגודלה מקרב כלל ההוצאות. בעיקרון, הגודל היחסי של ההוצאה הזו פוחת עם השנים. אבל אם מסתכלים על הנתונים מקרוב, רואים שהחלק היחסי של ההוצאות על חינוך עולה. ככה זה כשההורים מרגישים שהמדינה לא נותנת מספיק, וקונים לילדים שלהם שיעורים פרטיים"
                }, {
                    "value": year.categories.housing_dwelling_and_household_maintenance.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.name_en,
                    "color": "#42e8ce",
                    "pic": "images/diur_icon.svg",
                    "height_": 493,
                    "ratio": 0.878296146,
                    "info":"זו ההוצאה הגדולה ביותר של המשפחות בישראל, שמהווה בממוצע רבע מכל ההוצאות שלהן. ככל שמחירי הדיור עולים, גם החלק של ההוצאה על דיור עולה"
                }, {
                    "value": year.categories.miscellaneous_goods_and_services.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.name_en,
                    "color": "#45b9f5",
                    "pic": "images/cosmetics_icon.svg",
                    "height_": 324,
                    "ratio": 0.987654321
                }, {
                    "value": year.categories.clothing_and_footwear.fifths[fifths],
                    "name": year.categories.clothing_and_footwear.name_he,
                    "nameEn": year.categories.clothing_and_footwear.name_en,
                    "color": "#fdebcc",
                    "pic": "images/clothing_icon.svg",
                    "height_": 185,
                    "ratio": 1.72972973,
                    "info":"החלק היחסי של ההוצאה הזו יורד עם השנים, בעיקר בגלל ירידות מחירי הטקסטיל בישראל ובעולם. ככל שיותר בגדים מיוצרים במזרח, וככל שנכנסים לישראל יותר מותגים מחו״ל, כך המחירים יורדים"
                }, {
                    "value": year.categories.health.fifths[fifths],
                    "name": year.categories.health.name_he,
                    "nameEn": year.categories.health.name_en,
                    "color": "#f39463",
                    "pic": "images/health_icon.svg",
                    "height_": 60,
                    "ratio": 3.333333333,
                    "info":"ההוצאות על בריאות גדלות בהתמדה עם השנים, בעיקר בגלל שהישראלים קונים יותר ויותר ביטוחי בריאות, מה שמגדיל עוד יותר את ההוצאה על בריאות (כי אם כבר יש ביטוח, בואו נשתמש בו). עיקר ההוצאה הזו מתגלגל בסוף לכיס הרופאים"
                }, {
                    "value": year.categories.transport_and_communications.fifths[fifths],
                    "name": year.categories.transport_and_communications.name_he,
                    "nameEn": year.categories.transport_and_communications.name_en,
                    "color": "#f37264",
                    "pic": "images/communication_transportation_icon.svg",
                    "height_": 395,
                    "ratio": 0.8101265823,
                    "info":"ככל שמשפחה עשירה יותר, כך היא מוציאה יותר כסף על תחבורה ותקשורת. בגלל התגברות התחרות בענף הסלולר בשנתיים האחרונות, המחירים בקטגוריה זו הוזלו קצת, אבל עדיין מדובר בהוצאה השניה בגודלה אחרי ההוצאות על דיור"
                },{
                	"value":0
                  },{
                	"value":0
                },{
                	"value":0
                },{
                	"value":0
                }];
                health = [{
                    "value": year.categories.health.categories.expenditures_on_health_services.fifths[fifths],
                    "name": year.categories.health.categories.expenditures_on_health_services.name_he,
                    "nameEn": year.categories.health.categories.expenditures_on_health_services.name_en,
                    "color": "#f4d6c7",
                    "pic": "images/ambulance.svg",
                    "height_": 307,
                    "ratio": 2.01628664
                }, {
                    "value": year.categories.health.categories.dental_treatment.fifths[fifths],
                    "name": year.categories.health.categories.dental_treatment.name_he,
                    "nameEn": year.categories.health.categories.dental_treatment.name_en,
                    "color": "#f3ba9c",
                    "pic": "images/thooth_icon.svg",
                    "height_": 162,
                    "ratio": 0.87654321
                }, {
                    "value": year.categories.health.categories.health_insurance.fifths[fifths],
                    "name": year.categories.health.categories.health_insurance.name_he,
                    "nameEn": year.categories.health.categories.health_insurance.name_en,
                    "color": "#f4e9e4",
                    "pic": "images/mada_icon.svg",
                    "height_": 162,
                    "ratio": 1.74691358
                }, {
                    "value": year.categories.health.categories.other_expenditures_on_health.fifths[fifths],
                    "name": year.categories.health.categories.other_expenditures_on_health.name_he,
                    "nameEn": year.categories.health.categories.other_expenditures_on_health.name_en,
                    "color": "#f39463",
                    "pic": "images/pills_icon.svg",
                    "height_": 352,
                    "ratio": 0.84375
                }, {
                    "value": 0
                }, {
                    "value": 0
                }, {
                    "value": 0
                }];
                clothing = [{
                    "value": year.categories.clothing_and_footwear.categories.women_s_outerwear.fifths[fifths],
                    "name": year.categories.clothing_and_footwear.categories.women_s_outerwear.name_he,
                    "nameEn": year.categories.clothing_and_footwear.categories.women_s_outerwear.name_en,
                    "color": "#fdebcc",
                    "pic": "images/dress_icon.svg",
                    "height_": 267,
                    "ratio": 0.65543071
                }, {
                    "value": year.categories.clothing_and_footwear.categories.men_s_outerwear.fifths[fifths],
                    "name": year.categories.clothing_and_footwear.categories.men_s_outerwear.name_he,
                    "nameEn": year.categories.clothing_and_footwear.categories.men_s_outerwear.name_en,
                    "color": "#fbd9a3",
                    "pic": "images/Tshirt_icon.svg",
                    "height_": 363,
                    "ratio": 0.91184573
                }, {
                    "value": year.categories.clothing_and_footwear.categories.miscellaneous_clothing_articles.fifths[fifths],
                    "name": year.categories.clothing_and_footwear.categories.miscellaneous_clothing_articles.name_he,
                    "nameEn": year.categories.clothing_and_footwear.categories.miscellaneous_clothing_articles.name_en,
                    "color": "#ed973a",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                   "value": year.categories.clothing_and_footwear.categories.footwear.fifths[fifths],
                    "name": year.categories.clothing_and_footwear.categories.footwear.name_he,
                    "nameEn": year.categories.clothing_and_footwear.categories.footwear.name_en,
                    "color": "#facc88",
                    "pic": "images/shoes_icon.svg",
                    "height_": 253,
                    "ratio": 0.87747036
                }, {
                   "value": year.categories.clothing_and_footwear.categories.children_s_and_babies_outerwear.fifths[fifths],
                    "name": year.categories.clothing_and_footwear.categories.children_s_and_babies_outerwear.name_he,
                    "nameEn": year.categories.clothing_and_footwear.categories.children_s_and_babies_outerwear.name_en,
                    "color": "#f8c06d",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                },{
                	"value":0
                },
                {
                	"value":0
                }];
                food = [{
                    "value": year.categories.food.categories.miscellaneous_food_products.fifths[fifths],
                    "name": year.categories.food.categories.miscellaneous_food_products.name_he,
                    "nameEn": year.categories.food.categories.miscellaneous_food_products.name_en,
                    "color": "#e4b2ef",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.food.categories.bread_cereals_and_pastry_products.fifths[fifths],
                    "name": year.categories.food.categories.bread_cereals_and_pastry_products.name_he,
                    "nameEn": year.categories.food.categories.bread_cereals_and_pastry_products.name_en,
                    "color": "#db9cea",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.food.categories.fish.fifths[fifths],
                    "name": year.categories.food.categories.fish.name_he,
                    "nameEn": year.categories.food.categories.fish.name_en,
                    "color": "#edcff5",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.food.categories.vegetables_and_fruit.fifths[fifths],
                    "name": year.categories.food.categories.vegetables_and_fruit.name_he,
                    "nameEn": year.categories.food.categories.vegetables_and_fruit.name_en,
                    "color": "#cc72e1",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                   "value": year.categories.food.categories.meals_away_from_home.fifths[fifths],
                    "name": year.categories.food.categories.meals_away_from_home.name_he,
                    "nameEn": year.categories.food.categories.meals_away_from_home.name_en,
                    "color": "#e1aaed",
                    "pic": "",
                    "height_":0,
                    "ratio": 0
                }, {
                   "value": year.categories.food.categories.milk_milk_products_and_eggs.fifths[fifths],
                    "name": year.categories.food.categories.milk_milk_products_and_eggs.name_he,
                    "nameEn": year.categories.food.categories.milk_milk_products_and_eggs.name_en,
                    "color": "#d78fe7",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                   "value": year.categories.food.categories.meat_and_poultry.fifths[fifths],
                    "name": year.categories.food.categories.meat_and_poultry.name_he,
                    "nameEn": year.categories.food.categories.meat_and_poultry.name_en,
                    "color": "#d181e4",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                },{
                   "value": year.categories.food.categories.vegetable_oils_and_products.fifths[fifths],
                    "name": year.categories.food.categories.vegetable_oils_and_products.name_he,
                    "nameEn": year.categories.food.categories.vegetable_oils_and_products.name_en,
                    "color": "#f3dcf8",
                    "pic": "",
                    "height_":0,
                    "ratio": 0 
                },{
                   "value": year.categories.food.categories.soft_drinks.fifths[fifths],
                    "name": year.categories.food.categories.soft_drinks.name_he,
                    "nameEn": year.categories.food.categories.soft_drinks.name_en,
                    "color": "#e8bff1",
                    "pic": "",
                    "height_": 0,
                    "ratio":0 
                },{
                   "value": year.categories.food.categories.sugar_and_sugar_products.fifths[fifths],
                    "name": year.categories.food.categories.sugar_and_sugar_products.name_he,
                    "nameEn": year.categories.food.categories.sugar_and_sugar_products.name_en,
                    "color": "#f0d5f6",
                    "pic": "",
                    "height_":0 ,
                    "ratio": 0
                },{
                   "value": year.categories.food.categories.alcoholic_beverages.fifths[fifths],
                    "name": year.categories.food.categories.alcoholic_beverages.name_he,
                    "nameEn": year.categories.food.categories.alcoholic_beverages.name_en,
                    "color": "#f7ebfb",
                    "pic": "",
                    "height_":0,
                    "ratio":0 
                }];
                miscellaneous = [{
                    "value": year.categories.miscellaneous_goods_and_services.categories.cigarettes_tobacco_and_accessories.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.cigarettes_tobacco_and_accessories.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.cigarettes_tobacco_and_accessories.name_en,
                    "color": "#79ccf6",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.miscellaneous_goods_and_services.categories.personal_articles_and_cosmetics.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.personal_articles_and_cosmetics.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.personal_articles_and_cosmetics.name_en,
                    "color": "#45b9f5",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.miscellaneous_goods_and_services.categories.personal_services_and_cosmetics.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.personal_services_and_cosmetics.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.personal_services_and_cosmetics.name_en,
                    "color": "#e8f3f7",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.miscellaneous_goods_and_services.categories.legal_and_other_services.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.legal_and_other_services.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.legal_and_other_services.name_en,
                    "color": "#68c6f6",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                   "value": year.categories.miscellaneous_goods_and_services.categories.jewellery_and_watches.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.jewellery_and_watches.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.jewellery_and_watches.name_en,
                    "color": "#d0ecf9",
                    "pic": "",
                    "height_":0,
                    "ratio": 0
                }, {
                   "value": year.categories.miscellaneous_goods_and_services.categories.wallets_bags_suitcases_etc.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.wallets_bags_suitcases_etc.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.wallets_bags_suitcases_etc.name_en,
                    "color": "#bee5f8",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                  	"value": year.categories.miscellaneous_goods_and_services.categories.organization_dues_and_donations.fifths[fifths],
                    "name": year.categories.miscellaneous_goods_and_services.categories.organization_dues_and_donations.name_he,
                    "nameEn": year.categories.miscellaneous_goods_and_services.categories.organization_dues_and_donations.name_en,
                    "color": "#9cd9f7",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                },{
                   "value":0
                },{
                   "value":0
                },{
                   "value":0
                },{
                   "value":0
                }];
                education = [{
                    "value": year.categories.education_culture_and_entertainment.categories.computer_internet_etc.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.computer_internet_etc.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.computer_internet_etc.name_en,
                    "color": "#f4f2ed",
                    "pic": "images/mahshev_internet.svg",
                    "height_": 128,
                    "ratio": 1.109375
                }, {
                    "value": year.categories.education_culture_and_entertainment.categories.hobbies_sports_and_camping_equipment.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.hobbies_sports_and_camping_equipment.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.hobbies_sports_and_camping_equipment.name_en,
                    "color": "#f8e69c",
                    "pic": "images/tahvivim_ziud_sport.svg",
                    "height_": 145,
                    "ratio": 1.6
                }, {
                    "value": year.categories.education_culture_and_entertainment.categories.culture_sports_and_entertainment.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.culture_sports_and_entertainment.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.culture_sports_and_entertainment.name_en,
                    "color": "#f9e17f",
                    "pic": "images/mofaei_tarbut.svg",
                    "height_":223 ,
                    "ratio": 0.7892376682
                }, {
                    "value": year.categories.education_culture_and_entertainment.categories.entertainment_durable_goods.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.entertainment_durable_goods.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.entertainment_durable_goods.name_en,
                    "color": "#f7d546",
                    "pic": "images/muzrei_tarbut_vebidur.svg",
                    "height_": 236,
                    "ratio": 1.525423729
                }, {
                   "value": year.categories.education_culture_and_entertainment.categories.recreation_and_excursions.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.recreation_and_excursions.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.recreation_and_excursions.name_en,
                    "color": "#f8ebb9",
                    "pic": "images/havraa_nofesh.svg",
                    "height_":167,
                    "ratio": 1.089820359
                }, {
                   "value": year.categories.education_culture_and_entertainment.categories.newspapers_books_and_stationery.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.newspapers_books_and_stationery.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.newspapers_books_and_stationery.name_en,
                    "color": "#f7f0d6",
                    "pic": "images/itonim_sfarim.svg",
                    "height_": 104,
                    "ratio": 2.125
                }, {
                  	"value": year.categories.education_culture_and_entertainment.categories.education_services.fifths[fifths],
                    "name": year.categories.education_culture_and_entertainment.categories.education_services.name_he,
                    "nameEn": year.categories.education_culture_and_entertainment.categories.education_services.name_en,
                    "color": "#ead478",
                    "pic": "images/sherotei_hinuh.svg",
                    "height_": 243,
                    "ratio": 1.481481481
                },{
                   "value":0
                },{
                   "value":0
                },{
                   "value":0
                },{
                   "value":0
                }];
              transport = [{
                    "value": year.categories.transport_and_communications.categories.travel_abroad.fifths[fifths],
                    "name": year.categories.transport_and_communications.categories.travel_abroad.name_he,
                    "nameEn": year.categories.transport_and_communications.categories.travel_abroad.name_en,
                    "color": "#f28a7f",
                    "pic": "images/nesia_lehuz_laarez.svg",
                    "height_": 168,
                    "ratio": 1.154761905
                }, {
                    "value": year.categories.transport_and_communications.categories.post_telephone_and_communications.fifths[fifths],
                    "name": year.categories.transport_and_communications.categories.post_telephone_and_communications.name_he,
                    "nameEn": year.categories.transport_and_communications.categories.post_telephone_and_communications.name_en,
                    "color": "#f0a29a",
                    "pic": "images/shirotei_doar_telephone_vetikshoret.svg",
                    "height_": 315,
                    "ratio": 0.5587301587
                }, {
                    "value": year.categories.transport_and_communications.categories.public_transport.fifths[fifths],
                    "name": year.categories.transport_and_communications.categories.public_transport.name_he,
                    "nameEn": year.categories.transport_and_communications.categories.public_transport.name_en,
                    "color": "#eec6c2",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.transport_and_communications.categories.expenditures_on_vehicles.fifths[fifths],
                    "name": year.categories.transport_and_communications.categories.expenditures_on_vehicles.name_he,
                    "nameEn": year.categories.transport_and_communications.categories.expenditures_on_vehicles.name_en,
                    "color": "#f37264",
                    "pic": "images/hozaot_lekley_rehev.svg",
                    "height_": 328,
                    "ratio": 1.289634146
                }, {
                   "value": year.categories.transport_and_communications.categories.other_expenditures.fifths[fifths],
                    "name": year.categories.transport_and_communications.categories.other_expenditures.name_he,
                    "nameEn": year.categories.transport_and_communications.categories.other_expenditures.name_en,
                    "color": "#eddedd",
                    "pic": "",
                    "height_":0,
                    "ratio": 0
                }, {
                   "value":0
                }, {
                  	"value":0
                },{
                   "value":0
                },{
                   "value":0
                },{
                   "value":0
                },{
                   "value":0
                }];
             housing = [{
                    "value": year.categories.housing_dwelling_and_household_maintenance.categories.furniture_and_household_equipment.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.furniture_and_household_equipment.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.furniture_and_household_equipment.name_en,
                    "color": "#58d8bf",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.housing_dwelling_and_household_maintenance.categories.other_housing_expenditures.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.other_housing_expenditures.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.other_housing_expenditures.name_en,
                    "color": "#d4f6ee",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.housing_dwelling_and_household_maintenance.categories.monthly_rent.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.monthly_rent.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.monthly_rent.name_en,
                    "color": "#44d3b7",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                    "value": year.categories.housing_dwelling_and_household_maintenance.categories.consumption_of_housing_services.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.consumption_of_housing_services.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.consumption_of_housing_services.name_en,
                    "color": "#2eceaf",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                   "value": year.categories.housing_dwelling_and_household_maintenance.categories.maintenance_and_renovation.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.maintenance_and_renovation.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.maintenance_and_renovation.name_en,
                    "color": "#aaeadf",
                    "pic": "",
                    "height_":0,
                    "ratio": 0
                }, {
                   "value": year.categories.housing_dwelling_and_household_maintenance.categories.water.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.water.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.water.name_en,
                    "color": "#c1f0e7",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                }, {
                   "value": year.categories.housing_dwelling_and_household_maintenance.categories.miscellaneous_household_articles.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.miscellaneous_household_articles.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.miscellaneous_household_articles.name_en,
                    "color": "#ebfaf7",
                    "pic": "",
                    "height_": 0,
                    "ratio": 0
                },{
                   "value": year.categories.housing_dwelling_and_household_maintenance.categories.domestic_help.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.domestic_help.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.domestic_help.name_en,
                    "color": "#96e6d7",
                    "pic": "",
                    "height_":0,
                    "ratio":0 
                },{
                   "value": year.categories.housing_dwelling_and_household_maintenance.categories.electricity_gas_and_fuel_for_dwelling.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.electricity_gas_and_fuel_for_dwelling.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.electricity_gas_and_fuel_for_dwelling.name_en,
                    "color": "#6dddc7",
                    "pic": "",
                    "height_": 0,
                    "ratio":0 
                },{
                   "value": year.categories.housing_dwelling_and_household_maintenance.categories.municipal_property_taxes_arnona.fifths[fifths],
                    "name": year.categories.housing_dwelling_and_household_maintenance.categories.municipal_property_taxes_arnona.name_he,
                    "nameEn": year.categories.housing_dwelling_and_household_maintenance.categories.municipal_property_taxes_arnona.name_en,
                    "color": "#8aecdd",
                    "pic": "",
                    "height_":0 ,
                    "ratio": 0
                },{
                   "value":0
                }];
                switch (selected) {
                	
                    case "main":
                        selected = main;
                        category = year;
                        level=1;
                        break;
                    case "Health":
                        selected = health;
                        category = year.categories.health;
                        break;
                    case "Clothing and footwear": 
                    	selected = clothing;
                    	category = year.categories.clothing_and_footwear;
                    	break;
                    case "Food":
                    	selected = food;
                    	category = year.categories.food;
                    	break;
                    case "Miscellaneous goods and services":	
                    	selected = miscellaneous;
                    	category = year.categories.miscellaneous_goods_and_services;
                    	break;
                    case "Education, culture and entertainment":	
                    	selected = education;
                    	category = year.categories.education_culture_and_entertainment;
                    	break;
                    case "Transport and communications":	
                    	selected = transport;
                    	category = year.categories.transport_and_communications;
                    	break;
                    case "Housing, Dwelling and household maintenance":	
                    	selected = housing;
                    	category = year.categories.housing_dwelling_and_household_maintenance;
                    	break;		
                    		
                    	
                    default:	alert(selected);	
                }

                root = {
                    'children': selected
                };
			
            }

            /////////////////////////////////////////////////////   
        });
       }); 