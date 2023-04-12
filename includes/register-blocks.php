<?php

function pz_register() {

    $blocks = [
        [ 'name' => 'subscribe' ],
        [ 'name' => 'search-form'],
        [ 'name' => 'question' ]
    ];

    foreach($blocks as $block) {
        register_block_type(
            PZ_PLUGIN_DIR . 'build/blocks/' . $block['name']
            // array( 'render_callback' => 'theHTML')
            
        );
    }

   
    
}




function theHTML($attributes) {
     // if there are existing questions and an existing question has been changed, warn about invalidating prior data

    // write attributes to pz_questions table 

    // if cookie set for existing user, load user data, else load blank user data

    // for each question 
    //      if we already have an answer for this question, do nothing
    //      else write this question on the front end

    // for now, just write the first question in a form
  
    ob_start(); ?>

    <form action="<?php echo esc_url(admin_url('admin-post.php')) ?>"  method="POST">
        <input type="hidden" name="action" value="do-segment" required>
        
        <p><?php  echo $attributes['question']; ?></p>
        <?php
        foreach( $attributes['answers'] as $answer ) {
            ?>
            <input type="radio" id="<?php echo $answer   ?>" name="question" value="<?php echo $answer   ?>">
            <label for="<?php echo $answer   ?>"><?php echo $answer   ?></label><br>
            <?php

        }
        ?>

        <br>
        <input type="text" name="something" placeholder="My Dog Bravo...">
    
    
        <br><br>
        <button>Submit!</button>
    </form>

    <?php return ob_get_clean();

}

