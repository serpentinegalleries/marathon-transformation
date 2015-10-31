<div id="blog">
<?php get_header(); ?>


                <!-- CONTENT -->

                <?php

                    if( have_posts() ){
                        while( have_posts() ){
                            the_post();    
                ?>
                        <div class="textwidget blogwidget">
                            <article>
                                <div class="header">
                                    <h5>Transformation live blog</h5>
                                    <h1><a href="<?php the_permalink(); ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>

                                    <!-- Display the date (November 16th, 2009 format) and a link to other posts by this posts author. -->

                                    <h3 class="author">by <?php the_author_firstname(); ?> <?php the_author_lastname(); ?> &#8212; <?php the_time('j F Y'); ?></h3>
                                </div>

                                <!-- Display the Post's content in a div box. -->

                                <div class="entry">
                                    <?php the_content(); ?>
                                </div>

                            </article>
                        </div>

                <?php
                        } /* END ARTICLE */
                    }
                ?>


</div>

<?php get_footer(); ?>