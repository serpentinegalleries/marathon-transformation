<?php /* Template Name: Blog */ ?>

    <div id="blog-page">
    <?php get_header(); ?>

        <div id="blog">
                <div class="container">
                    <div class="row">

                        <?php
                        query_posts('cat=7');
                        while (have_posts()) : the_post();
                        ?>
                            <article>
                                <div class="header-block">
                                    <div class="status">Transformation live blog</div>
                                    <h1><a href="<?php the_permalink(); ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>

                                    <!-- Display the date (November 16th, 2009 format) and a link to other posts by this posts author. -->

                                    <h5>by <?php the_author_firstname(); ?> <?php the_author_lastname(); ?> &#8212; <?php the_time('j F Y'); ?></h5>
                                </div>

                                <!-- Display the Post's content in a div box. -->

                                <div class="entry">
                                    <?php the_content(); ?>
                                </div>

                                <hr>
                            </article>

                        <?php
                        endwhile;
                        ?>

                    </div>
                </div>
            </div>
    </div>

</div>
<?php get_footer(); ?>