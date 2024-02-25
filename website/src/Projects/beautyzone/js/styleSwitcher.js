function addSwitcher()
{
	
	var demoPanel = '<div class="dz-demo-panel"><div class="bg-close"></div> <a class="dz-demo-trigger" data-toggle="tooltip" data-placement="right" data-original-title="Check out more demos" href="javascript:void(0)">View Demo</a><div class="dz-demo-inner"><div class="dz-demo-header"><h4 class="text-white m-b0">Select Preset Demo</h4> <a class="dz-demo-close" href="javascript:void(0)"><span><i class="fa fa-close"></i></span></a></div><div class="dz-demo-content"><div class="dz-wrapper row"><div class="column-5 col-lg-4 col-md-6"><div class="overlay-bx rounded-lg dz-demo-bx"><div class="overlay-wrapper rounded-lg"> <img src="images/demo/index.png" alt="" class="w-100"></div><div class="overlay-layer"> <a href="index.html" class="btn btn-success btn-sm mr-2">Multi Page</a> <a href="index-6.html" class="btn btn-info btn-sm">One Page</a></div></div><h5 class="text-white">Demo 1</h5></div><div class="column-5 col-lg-4 col-md-6"><div class="overlay-bx rounded-lg dz-demo-bx"><div class="overlay-wrapper rounded-lg"> <img src="images/demo/index-2.png" alt="" class="w-100"></div><div class="overlay-layer"> <a href="index-2.html" class="btn btn-success btn-sm mr-2">Multi Page</a> <a href="index-7.html" class="btn btn-info btn-sm">One Page</a></div></div><h5 class="text-white">Demo 2</h5></div><div class="column-5 col-lg-4 col-md-6"><div class="overlay-bx rounded-lg dz-demo-bx"><div class="overlay-wrapper rounded-lg"> <img src="images/demo/index-3.png" alt="" class="w-100"></div><div class="overlay-layer"> <a href="index-3.html" class="btn btn-success btn-sm mr-2">Multi Page</a> <a href="index-8.html" class="btn btn-info btn-sm">One Page</a></div></div><h5 class="text-white">Demo 3</h5></div><div class="column-5 col-lg-4 col-md-6"><div class="overlay-bx rounded-lg dz-demo-bx"><div class="overlay-wrapper rounded-lg"> <img src="images/demo/index-4.png" alt="" class="w-100"></div><div class="overlay-layer"> <a href="index-4.html" class="btn btn-success btn-sm mr-2">Multi Page</a> <a href="index-9.html" class="btn btn-info btn-sm">One Page</a></div></div><h5 class="text-white">Demo 4</h5></div><div class="column-5 col-lg-4 col-md-6"><div class="overlay-bx rounded-lg dz-demo-bx"><div class="overlay-wrapper rounded-lg"> <img src="images/demo/index-5.png" alt="" class="w-100"></div><div class="overlay-layer"> <a href="index-5.html" class="btn btn-success btn-sm mr-2">Multi Page</a> <a href="index-10.html" class="btn btn-info btn-sm">One Page</a></div></div><h5 class="text-white">Demo 5</h5></div></div></div><div class="fs-14 bottom-text"> <span class="text-danger">*Note :</span> This theme switcher is not part of product. It is only for demo. you will get all guideline in documentation. please check <a href="https://beautyzone.dexignzone.com/doc/" target="_blank" class="text-primary">documentation.</a></div></div></div>';
	
	if($("#dzSwitcher").length == 0) {
		jQuery('body').append(demoPanel);
		
			
		 //const ps = new PerfectScrollbar('.sidebar-right-inner');
		 //console.log(ps.reach.x);	
			//ps.isRtl = false;
				
		  $('.sidebar-right-trigger').on('click', function() {
				$('.sidebar-right').toggleClass('show');
		  });
		  $('.sidebar-close-trigger,.bg-overlay').on('click', function() {
				$('.sidebar-right').removeClass('show');
		  });
	}
}

(function($) {
    "use strict"
	addSwitcher();
	
})(jQuery);


