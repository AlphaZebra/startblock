<?php

function pz_register() {

    $blocks = [
        [ 'name' => 'subscribe' ],
        [ 'name' => 'shortblock'],
        [ 'name' => 'question' ],
        [ 'name' => 'startlist' ]
    ];

    foreach($blocks as $block) {
        if( $block['name'] == 'shortblock') {
            $render_prop = array( 'render_callback' => 'theBlockContent');
        } else if ($block['name'] == 'startlist') {
            $render_prop = array( 'render_callback' => 'theListContent');
        }
        else {
            $render_prop = array([]);
        }
        register_block_type(
            PZ_PLUGIN_DIR . 'build/blocks/' . $block['name'],
            $render_prop
        );
    }

   
    
}


function theBlockContent($attributes) {
    global $pz_personID;
    if( isset($pz_personID)) {
        $my_content = '<p>' . $attributes['content'] . '</p>';
        // $my_content = $attributes['content'];
        $my_content = do_shortcode( $my_content );
        return $my_content;
    }
    else {
        $my_content = '<p>' . $attributes['altContent'] . '</p>';
        return $my_content;
    }
    
}

function theListContent($attributes) {  // Callback render function for startlist block
    global $wpdb;
    $the_tablename = $wpdb->prefix . "pz_startblock";

    $entries = $wpdb->get_results("SELECT * FROM $the_tablename");
    
    ob_start(); ?>

    <table style="text-align: left" >
        <tr>
            <th >First</th>
            <th>Last</th>
            <th >Email</th>
            <th>Questions</th>
        </tr>
       
        <?php
            // select all of the peoples
           

            // for each peoples as people
            foreach( $entries as $entry ) {
                echo( "<tr><td>" . $entry->fname . "</td>");
                echo( "<td>" . $entry->lname . "</td>");
                echo( "<td>" . $entry->email . "</td>");
                echo( "<td>dummy data</td></tr>");
            }
                // write a row up to the questions column
                // write the opening <td> tag
                // select questions for current person
                    // for each response
                    // write response and return
                // write closing </td></tr>

        ?>
        
        <tr>
            <td>Donny</td>
            <td>Brooke</td>
            <td>donny@brooke.com</td>
            <td>q1 = steak<br>q2=horses</td>
        </tr>
    </table>
    <!-- <form action="<?php echo esc_url(admin_url('admin-post.php')) ?>"  method="POST">
        <input type="hidden" name="action" value="do-download-csv" required>
        
        <br><br>
        <button>Download this data as a CSV file</button>
    </form> -->
    <form method="post" id="download_form" action="">
        <input type="submit" name="download_csv" class="button-primary" value="Download" />
    </form>
    <form method="post" id="unload_form" action="">
        <input type="submit" name="unload" class="button-primary" value="Delete all" />
    </form>
    <!-- <form action="<?php echo esc_url(admin_url('admin-post.php')) ?>"  method="POST">
        <input type="hidden" name="action" value="do-tabledrop" required>
        
        <br><br>
        <button>Clear this data</button>
    </form> -->

<?php 
    return ob_get_clean();

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

