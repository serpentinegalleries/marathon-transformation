<div id="blog-page">
<?php get_header(); ?>
<div id="blog">
    <?php global $wp_query; ?>

        <div class="container">
            <div class="row">

                <h1><?php echo get_the_author_meta( 'display_name' , $post-> post_author ); ?></h1>

                </div>

            </div>
        </div>

    </div>

    <div class="content">
        <div class="container">
            <div class="row">
        
                <?php get_template_part( 'cfg/templates/loop' ); ?>

            </div>
        </div>
    </div>
</div>
</div>

<?php get_footer(); ?>