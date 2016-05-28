<?php /* Template Name: Blog */ ?>

    <div id="blog">
    <?php get_header(); ?>

                        <?php
                        query_posts('cat=2&showposts=5&paged='.get_query_var('paged'));
                        while (have_posts()) : the_post();
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
                        <hr>
                        <?php
                        endwhile;
                        ?>

                        <?php if ($paged > 1) { ?>

                        <nav id="nav-posts">
                            <?php next_posts_link('Previous posts'); ?>&nbsp;&nbsp;&nbsp;&#8212;&nbsp;&nbsp;&nbsp;<?php previous_posts_link('Newer posts'); ?>
                        </nav>

                        <?php } else { ?>

                        <nav id="nav-posts">
                            <div class="prev"><?php next_posts_link('Previous posts'); ?></div>
                        </nav>

                        <?php } ?>


                    </div>
                </div>
            </div>
    </div>

</div>
<?php get_footer(); ?>