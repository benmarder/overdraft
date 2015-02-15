	var count;
	
	$(document).ready(function () {
	
 	var count=1;
 	$("#val").val(count);
 	$("#plus").click(function(){
 					
			$(".number>img").attr("class","animated pulse");	
 											setTimeout(function(){
												$(".number>img").removeClass("animated pulse"); 											
 											},300); 							if(count <= 5){
 								++count;
 								$(".number>p").text(function(){
 																if(count==6)
 																	return "6+";
 																return count;
 														});					
 							}
 							$("#val").val(count);	
 					})
 						
 					.hover(function(){
 							$(".number>img").attr("src","images/Counting icon_plus_hover.svg");
 						},
 						function(){
 							$(".number>img").attr("src","images/Counting icon.svg");
 						});	
 	$("#minus").click(function(){
 			$(".number>img").attr("class","animated pulse");	
 											setTimeout(function(){
												$(".number>img").removeClass("animated pulse"); 											
 											},300);
 							if(count >1){
 								--count;
 								$(".number>p").text(count);
 							}
 			$("#val").val(count);						
 					})
 				.hover(function(){
 							$(".number>img").attr("src","images/Counting icon_minus_hover.svg");
 						},
 						function(){
 							$(".number>img").attr("src","images/Counting icon.svg");
 						});
 				
 		
}); 
	
															