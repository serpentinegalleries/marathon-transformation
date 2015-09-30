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
                    <div id="player" class="col-lg-6">
                        Hello
                    </div>
                    <div class="col-lg-6">
                        Hello
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

    <script type="text/javascript">

        var w = 960,
            h = 500,
            x = d3.scale.ordinal().domain(d3.range(3)).rangePoints([0, w], 2);

        var fields = [
          {name: "hours", value: 0, size: 24},
          {name: "minutes", value: 0, size: 60},
          {name: "seconds", value: 0, size: 60}
        ];

        var arc = d3.svg.arc()
            .innerRadius(130)
            .outerRadius(140)
            .startAngle(0)
            .endAngle(function(d) { return (d.value / d.size) * 2 * Math.PI; });

        var svg = d3.select("#player").append("svg:svg")
            .attr("width", w)
            .attr("height", h)
          .append("svg:g")
            .attr("transform", "translate(0," + (h / 2) + ")");

        setInterval(function() {
          var now = new Date();

          fields[0].previous = fields[0].value; fields[0].value = now.getHours();
          fields[1].previous = fields[1].value; fields[1].value = now.getMinutes();
          fields[2].previous = fields[2].value; fields[2].value = now.getSeconds();

          var path = svg.selectAll("path")
              .data(fields.filter(function(d) { return d.value; }), function(d) { return d.name; });

          path.enter().append("svg:path")
              .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; })
            .transition()
              .ease("elastic")
              .duration(750)
              .attrTween("d", arcTween);

          path.transition()
              .ease("elastic")
              .duration(750)
              .attrTween("d", arcTween);

          path.exit().transition()
              .ease("bounce")
              .duration(750)
              .attrTween("d", arcTween)
              .remove();

        }, 1000);

        function arcTween(b) {
          var i = d3.interpolate({value: b.previous}, b);
          return function(t) {
            return arc(i(t));
          };
        }

    </script>