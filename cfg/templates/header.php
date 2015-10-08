
<?php
   $bkg = '';
   if( is_admin() ){
	  $bkg = 'background-image: url(' . get_header_image() . '); background-position: top center; background-size: cover; background-repeat: no-repeat;';
   }
?>

<div id="player" class="mythemes-header mythemes-bkg-image overflow-wrapper" style="<?php echo $bkg; ?> height: <?php echo myThemes::get( 'header-height' ); ?>px;" data-bkg-color="<?php echo myThemes::get( 'mask-color' ); ?>" data-bkg-image="<?php echo get_header_image(); ?>">
   <div class="container">
	  <div class="row">
		 <div class="col-lg-6">
		 	<div id="videoPlayer">
		 		<div id="videoText">from 10AM to 10PM</div>
			</div>
			<h3>Saturday October 17</h3>
		 	<h6>Live feed from<br>Serpentine Sackler Gallery</h6>
		 </div>
		 <div class="col-lg-6">
		 	<div id="radioPlayer">
	 			<div id="videoText">from 12PM to 12AM
	 			</div>
	 		</div>
			<h3>Saturday October 18</h3>
		 	<h6>Live streaming on<br>Serpentine Radio</h6>
		 </div>
	  </div>
   </div>
</div>