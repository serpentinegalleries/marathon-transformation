    <script type="text/javascript" src="http://mbostock.github.com/d3/d3.js?1.27.2"></script>
    <style type="text/css">

        path {
          fill-rule: evenodd;
          fill: #969696;
          fill-opacity: .7;
          stroke: #666;
          stroke-width: 0;
        }

    </style>


<?php
    $bkg = '';
    if( is_admin() ){
        $bkg = 'background-image: url(' . get_header_image() . '); background-position: top center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat;';
    }
?>
<div class="mythemes-header mythemes-bkg-image overflow-wrapper" style="<?php echo $bkg; ?> height: <?php echo myThemes::get( 'header-height' ); ?>px;" data-bkg-color="<?php echo myThemes::get( 'mask-color' ); ?>" data-bkg-image="<?php echo get_header_image(); ?>">
    <div class="valign-cell-wrapper" style="background: rgba( <?php echo mythemes_hex2rgb( myThemes::get( 'mask-color' ) ); ?>, <?php echo (float)myThemes::get( 'mask-opacity' ) / 100; ?> ); height: <?php echo myThemes::get( 'header-height' ); ?>px;">
        <div class="valign-cell">
            
                <div class="row">
                    <div id="videoPlayer" class="col-lg-6">
                        Hello
                    </div>
                    <div id="radioPlayer" class="col-lg-6">
                    </div>




                        <!--<div style="text-align: center;">
                            <?php
                                /* HEADER TITLE */
                                if( myThemes::get( 'show-header-title' ) ){
                            ?>
                                    <h1 style="color: #<?php echo get_header_textcolor(); ?>"><?php echo myThemes::get( 'header-title' ); ?></h1>
                            <?php
                                }

                                /* HEADER DESCRIPTION */
                                if( myThemes::get( 'show-header-desc' ) ){
                            ?>
                                    <p class="description" style="color: rgba(<?php echo mythemes_hex2rgb( get_header_textcolor() ); ?> , 0.65 );"><?php echo myThemes::get( 'header-desc' ) ?></p>
                            <?php
                                }

                                /* HEADER BUTTONS */
                                if( myThemes::get( 'show-first-button' ) || myThemes::get( 'show-second-button' ) ){
                            ?>

                                    <p class="buttons">
                                        <?php
                                            /* FIRST BUTTON */
                                            if( myThemes::get( 'show-first-button' ) ){
                                        ?>
                                                <a href="<?php echo myThemes::get( 'first-button-url' ) ?>" class="btn first-button" title="<?php echo myThemes::get( 'first-button-desc' ) ?>"><?php echo myThemes::get( 'first-button-label' ) ?></a> 
                                        <?php
                                            }

                                            /* SECOND BUTTON */
                                            if( myThemes::get( 'show-second-button' ) ){
                                        ?>
                                                <a href="<?php echo myThemes::get( 'second-button-url' ) ?>" class="btn second-button" title="<?php echo myThemes::get( 'second-button-desc' ) ?>"><?php echo myThemes::get( 'second-button-label' ) ?></a> 
                                        <?php
                                            }
                                        ?>
                                    </p>
                            <?php
                                }
                            ?>
                        </div>
                    </div>-->
                </div>
            
        </div>
    </div>
</div>

    <script>

        var width = 300,
            height = 300,
            τ = 2 * Math.PI;

        var dateVar = new Date();
        var minVar = dateVar.getMinutes();
        var hourVar = (((dateVar.getUTCHours() + 1) * 60) + minVar) / 1440;
        var halfdayVar = (((dateVar.getUTCHours() + 1) * 60) + minVar - 720) / 1440;

        var arc = d3.svg.arc()
            .innerRadius(140)
            .outerRadius(130)
            .startAngle(0);

        // Video player
        var video = d3.select("#videoPlayer").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        // Add the background arc, from 0 to 100% (τ).
        var background = video.append("path")
            .datum({endAngle: τ})
            .style("fill", "#969696")
            .attr("d", arc);

        // Add the foreground arc
        var videoForeground = video.append("path")
            .datum({endAngle: hourVar * τ})
            .style("fill", "#4696ff")
            .attr("d", arc);

        // Use transition.call
        // (identical to selection.call) so that we can encapsulate the logic for
        // tweening the arc in a separate function below.
        setInterval(function() {
          videoForeground.transition()
              .duration(100)
              .call(arcTween, hourVar * τ);
        }, 1500);

        // Radio Player
        var radio = d3.select("#radioPlayer").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        var background = radio.append("path")
            .datum({endAngle: τ})
            .style("fill", "#969696")
            .attr("d", arc);

        var radioForeground = radio.append("path")
            .datum({endAngle: .127 * τ})
            .style("fill", "#4696ff") 
            .attr("d", arc);

        setInterval(function() {
          radioForeground.transition()
              .duration(d3.time.minute)
              .call(arcTween, halfdayVar * τ);
        }, 1500);


        function arcTween(transition, newAngle) {

          transition.attrTween("d", function(d) {

            var interpolate = d3.interpolate(d.endAngle, newAngle);

            return function(t) {

              d.endAngle = interpolate(t);

              return arc(d);
            };
          });
        }

    </script>