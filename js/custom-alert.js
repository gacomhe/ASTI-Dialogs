/**
 * custom-alert.js - https://github.com/gacomhe/ASTI-Dialogs
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 * Title: Custom Dialog
 * Description: This is used to innovate the usual alert/confirm message.
 * Author: Jhon Mher V. Gaco (DOST-ASTI Science Research Specialist I)
 * Reference: Animate.css(https://daneden.github.io/animate.css), Materialize v0.97.8 (http://materializecss.com)
 * Copyright (c) 2017 Jhon Mher V. Gaco
 */

(function( $ ){
	var overlay = "<div class='asti-overlay'></div>";
	var container = "<div class='asti-container' style='display:none'></div>";
	var header = "<div class='asti-overlay-header white-text'>ASTI custom alert messsage <i class='material-icons right'>close</i></div>";		
	var footer = "<div class='asti-overlay-footer center-align'></div>";
	var okButton = "<a class='asti-overlay-btnOk asti-overlay-button m-r-5'>Ok</a>";
	var cancelButton = "<a class='asti-overlay-btnCancel asti-overlay-button'>Cancel</a>";
	
	
   $.astiAlert = function(options, animation) {      		   		
   		if(typeof options == "string"){
   			if(options == "hide"){   				
   				if(animation != undefined) {
   					animate($(".asti-container"), animation, "hide");  
   				} else {
   					animate($(".asti-container"), "fadeOut", "hide");  
   				}   				 			
   			} else {
   				alert("You have type wrong function");
   			}   		
   		} else if(typeof options == "object"){
   			/** Remove Overlay */
   			$(".asti-overlay").remove();

   			/** Create the Overlay if not exisiting */
   			$("head").after($(overlay).append($(container).append($(header)).append($(footer))));  
   		
   			/** Set default option for ASTI Overlay */
	   		var settings = $.extend({
				title: "",
				content: [],
				type: "success",
				placement: "center",
				autoClose: false,
				autoCloseTimer: 1500,
				headerCloseButton: false,
				showCancelButton: false,
				showOkButton: false,
				okButtonAction: "",
				cancelButtonAction: "",
				headerButtonAction: "",
				animation: "fadeIn",
				closingAnimation: "fadeOut",
			}, options)	 


	   		/** Uncomment to have x button in right side of the title */
	     	var icon = "<i class='material-icons right'>close</i>";
	     	var allContent = [];

	     	/** Set the Overlay information (title, content) */	   
	     	if(settings.headerCloseButton == false){
	     		$(".asti-overlay-header").html(settings.title);
	     	} else {
	     		$(".asti-overlay-header").html(settings.title + icon);
	     	}	     		     		     	
	     		     	   
	     	var counter = 1;
	     	$.each(settings.content, function(key, data){
	     		if(counter == 1){
	     			if(settings.headerCloseButton == false){
	     				allContent.push("<div class='asti-overlay-content center-align'><div class='asti-overlay-content-icon'>" + settings.title + "</div><div class='asti-overlay-content-body'>" + data +" </div></div>");
	     			} else {
	     				allContent.push("<div class='asti-overlay-content center-align'><div class='asti-overlay-content-icon'>" + settings.title + icon + "</div><div class='asti-overlay-content-body'>" + data +" </div></div>");
	     			}	     				     				     			
	     		} else {
	     			allContent.push("<div class='asti-overlay-content center-align'><div class='asti-overlay-content-whole'>" + data + "</div></div>");
	     		}
	     		counter += 1;
	     	});	     	

	     	/** Adding all the content inputed by the user*/
	     	$(".asti-overlay-header").after(allContent);

	     	/** Check the positioning of the dialog */
	     	if(settings.placement == "center"){
	     		$(".asti-overlay").css("display", "flex");
	     		$(".asti-container").css("margin", "auto");
	     	} else if(settings.placement == "topLeft"){
	     		$(".asti-container").addClass("topLeft");
	     	} else if(settings.placement == "topRight"){
	     		$(".asti-container").css("position","absolute");
	     		$(".asti-container").css("top",0);
	     		$(".asti-container").css("right",0);
	     		$(".asti-container").addClass("topRight");
	     	} else if(settings.placement == "topCenter"){	     		
	     		$(".asti-overlay").css("top",0);
	     		$(".asti-overlay").css("left",0);	     		
	     		$(".asti-container").css("margin","0 auto");
	     		$(".asti-overlay").addClass("topCenter");
	     	} else if(settings.placement == "bottomLeft"){
	     		$(".asti-container").css("position","absolute");
	     		$(".asti-container").css("bottom",0);	     		
	     		$(".asti-container").addClass("bottomLeft");
	     	} else if(settings.placement == "bottomRight"){
	     		$(".asti-container").css("position","absolute");
	     		$(".asti-container").css("bottom",0);
	     		$(".asti-container").css("right",0);
	     		$(".asti-container").addClass("bottomRight");
	     	} else if(settings.placement == "bottomCenter"){	     	
	     		$(".asti-container").before("<div class='asti-overlay-bottomCenterHolder'></div>");
	     		$(".asti-overlay-bottomCenterHolder").append($(".asti-container"));	     		
	     		$(".asti-container").css("margin", "auto");
	     		// $(".asti-container").css("margin-left", "auto");
	     	}

	     	/** Hide Footer if buttons are not showed */
	     	if(settings.showOkButton == false && settings.showCancelButton == false){
	     		$(".asti-overlay-footer").remove();
	     		if(settings.headerCloseButton == false){
	     			setTimeout(function(){
		     			animate($(".asti-container"), settings.closingAnimation, "hide");
		     		}, 1500);
	     		}	     		
	     	}

	     	/** Hide Title if there is no value inputed */
	     	if(settings.title == ""){
	     		$(".asti-overlay-header").remove();
	     	}

	     	/** Add Close function to Close icon */
	     	// $(".asti-overlay-header").on("click", 'i', function(){
	     	// 	animate($(".asti-container"), settings.closingAnimation, "hide");		
	     	// });

	     	/** Adding Button Ok */
	     	if(settings.showOkButton == true){
	     		$(".asti-overlay-footer").append(okButton);
	     	}

	     	/** Adding Button Cancel */
	     	if(settings.showCancelButton == true){
	     		$(".asti-overlay-footer").append(cancelButton);
	     	}

	     	/** Adding Header Button Action*/
	     	if(settings.headerButtonAction == ""){
	     		$(".asti-overlay-header").on('click', 'i', function(){
	     			animate($(".asti-container"), settings.closingAnimation, "hide"); 			 			
	     		});
	     	} else {
	     		$(".asti-overlay-header").on('click', 'i', $.proxy(settings.headerButtonAction, settings));
	     	}

	     	/** Adding Button Ok Action*/
	     	if(settings.okButtonAction == ""){
	     		$(".asti-overlay-btnOk").on('click', function(){
	     			animate($(".asti-container"), settings.closingAnimation, "hide"); 			 			
	     		});
	     	} else {
	     		$(".asti-overlay-btnOk").on('click', $.proxy(settings.okButtonAction, settings));
	     	}

	     	/** Adding Button Cancel Action */
	     	if(settings.cancelButtonAction == ""){	     			     		
	     		$(".asti-overlay-btnCancel").on('click', function(){
	     			animate($(".asti-container"), settings.closingAnimation, "hide");   	     				     				   	  	     		     			
	     		});
	     	} else {
	     		$(".asti-overlay-btnCancel").on('click', $.proxy(settings.cancelButtonAction, settings));
	     	}

	     	/** Set the type of alert to be presented */
	     	if(settings.type == "success"){
	     		$(".asti-overlay-header").addClass("green");
	     		$(".asti-overlay-btnOk").addClass("green");
	     		$(".asti-overlay-btnCancel").addClass("green");
	     		$(".asti-overlay-content-icon").html("<i class='material-icons green-text'>check_circle</i>");
	     	} else if(settings.type == "warning"){
	     		$(".asti-overlay-header").addClass("orange");
	     		$(".asti-overlay-btnOk").addClass("orange");
	     		$(".asti-overlay-btnCancel").addClass("orange");
	     		$(".asti-overlay-content-icon").html("<i class='material-icons orange-text'>warning</i>");
	     	} else if(settings.type == "error"){
	     		$(".asti-overlay-header").addClass("red");
	     		$(".asti-overlay-btnOk").addClass("red");
	     		$(".asti-overlay-btnCancel").addClass("red");
	     		$(".asti-overlay-content-icon").html("<i class='material-icons red-text'>close</i>");
	     	} else if(settings.type == "cancel"){
	     		$(".asti-overlay-header").addClass("green");
	     		$(".asti-overlay-btnOk").addClass("green");
	     		$(".asti-overlay-btnCancel").addClass("green");
	     		$(".asti-overlay-content-icon").html("<i class='material-icons green-text'>warning</i>");
	     	} else if(settings.type == "cancel-lighter"){
	     		$(".asti-overlay-header").addClass("green");
	     		$(".asti-overlay-btnOk").addClass("green");
	     		$(".asti-overlay-btnCancel").addClass("green");

	     		$(".asti-overlay-header").addClass("lighten-1");
	     		$(".asti-overlay-btnOk").addClass("lighten-1");
	     		$(".asti-overlay-btnCancel").addClass("lighten-1");
	     		$(".asti-overlay-content-icon").html("<i class='material-icons green-text'>warning</i>");
	     	}

	     	animate($(".asti-container"), settings.animation, "show");

	     	if(settings.autoClose == true){
	   			setTimeout(function(){
	   				animate($(".asti-container"), settings.closingAnimation, "hide"); 				
	   			}, settings.autoCloseTimer);
	   		}
   		}   		   	   		
   	
   };     

   	/**
   	 * Animation used in this alert dialogs is animate.css
   	 * https://daneden.github.io/animate.css/
   	 */
	function animate(object, animation, display) {		
		if(display == "show"){
			$(object).show();
		}
		$(object).removeClass(animation + " animated").addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){			
			$(this).removeClass(animation + " animated");
			if(display == "hide"){
				$(object).hide();
				$(".asti-overlay").remove();
			}
		});
	};
})( jQuery );