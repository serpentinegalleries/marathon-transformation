
<?php
   $bkg = '';
   if( is_admin() ){
	  $bkg = 'background-image: url(' . get_header_image() . '); background-position: top center; background-size: cover; background-repeat: no-repeat;';
   }
?>

<div id="player" class="mythemes-header mythemes-bkg-image overflow-wrapper" style="<?php echo $bkg; ?> height: <?php echo myThemes::get( 'header-height' ); ?>px;" data-bkg-color="<?php echo myThemes::get( 'mask-color' ); ?>" data-bkg-image="<?php echo get_header_image(); ?>">
   <div class="container">
	  <div class="row">
		 <div id="video" class="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-12">
		 		<div id="videoText">from 10AM to 10PM</div>
				 		<svg id="video-viz"
						  viewBox="0 0 410 600"
						  preserveAspectRatio="xMidYMid">
						</svg>
		 </div>
		 <div id="radio" class="col-lg-4 col-md-4 col-sm-12">
		 	<div id="radioPlayer">
	 			<div id="videoText">from 12AM to 12PM
	 			</div>

				<svg id="radio-viz"
			  		viewBox="0 0 410 600"
			  		preserveAspectRatio="xMidYMid">
		 </div>
	  </div>
   </div>
</div>