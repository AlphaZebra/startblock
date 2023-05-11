<?php

/**
 * Plugin Name: StartBlock
 * Description: A set of PeakZebra blocks that helps you incrementally start a relationship with new subscribers or customers. 
 * Version: 1.0
 * Author: PeakZebra
 */

 if( !defined ( 'ABSPATH' )) exit; 

 // Setup

define('PZ_PLUGIN_DIR', plugin_dir_path(__FILE__));

 // Includes

 include( PZ_PLUGIN_DIR . 'includes/register-blocks.php');


 // Hooks

 add_action('init', 'pz_register');
 add_action('init', 'pz_setcookie');
//  add_action('wp_enqueue_scripts', 'pz_setstyle');

 // If already set, read cookie 
 // set global variable for personID
 $pz_personID = 7;

 function pz_setstyle() {
    wp_enqueue_style( 'pz_style', PZ_PLUGIN_DIR . 'build/blocks/subscribe/index.css');
 }

 class PZQuestions {
    function __construct() {
        global $wpdb;

        $this->charset = $wpdb->get_charset_collate(); 
        $this->question_tablename = $wpdb->prefix . "pz_question";
        $this->startblock_tablename = $wpdb->prefix . "pz_startblock";
        $this->answers_tablename = $wpdb->prefix . "pz_answers";
    
        add_action('activate_startblock/index.php', array($this, 'onActivate'));
    
        // add_action('admin_post_do-segment', array($this, 'do_segment'));
        // add_action('admin_post_nopriv_do-segment', array($this, 'do_segment'));
        add_action('admin_post_do-startblock', array($this, 'do_startblock'));
        add_action('admin_post_nopriv_do-startblock', array($this, 'do_startblock'));
        add_action('admin_post_do-question-block', array($this, 'do_question_block'));
        add_action('admin_post_nopriv_do-question-block', array($this, 'do_question_block'));

        add_shortcode( 'pz_startdata', array($this, 'do_pz_shortcode') );
        
 
    }    
    
    function onActivate() {
        global $wpdb;

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php');
    
        dbDelta("CREATE TABLE $this->question_tablename (
            responseID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            personID bigint(20) unsigned NOT NULL DEFAULT 1,
            qslug varchar(30) NOT NULL DEFAULT '',
            qchoice varchar(60) NOT NULL DEFAULT '',
            created varchar(12) NOT NULL DEFAULT '',
            PRIMARY KEY  (responseID)
        ) $this->charset;");
        
        dbDelta("CREATE TABLE $this->startblock_tablename (
            personID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            fname varchar(60) NOT NULL DEFAULT '',
            lname varchar(60) NOT NULL DEFAULT '',
            email varchar(100) NOT NULL DEFAULT '',
            created varchar(12) NOT NULL DEFAULT '',
            PRIMARY KEY  (personID)
        ) $this->charset;");
        
       
    } 

    
    

    function do_pz_shortcode ($atts) {
        global $wpdb;
        global $pz_personID;

        // if looking for name or email, read record from startblock table
        if( $atts['slug'] == 'fname' ) {
            $entries = $wpdb->get_results("SELECT * FROM $this->startblock_tablename WHERE personID = $pz_personID");
            
            return $entries[0]->fname;
        }
        if( $atts['slug'] == 'lname' ) {
            $entries = $wpdb->get_results("SELECT * FROM $this->startblock_tablename WHERE personID = $pz_personID");
            
            return $entries[0]->lname;
        }
        if( $atts['slug'] == 'email' ) {
            $entries = $wpdb->get_results("SELECT * FROM $this->startblock_tablename WHERE personID = $pz_personID");
            
            return $entries[0]->email;
        }

        // else, read any answer settings we have for the current user
        $entries = $wpdb->get_results("SELECT * FROM $this->question_tablename WHERE personID = $pz_personID");

        ob_start();

        foreach($entries as $entry) {
            if( $atts['slug'] == $entry->qslug) {
                echo $entry->qchoice;
            }
        }
        
        return ob_get_clean();
       
    }

   
   
    function do_question_block () {
        global $wpdb;
        $created = date("m/j/Y");
        $personID = 1;

        // Check if cookie is already set
        if(isset($_COOKIE['pz_num'])) {
            $personID = $_COOKIE['pz_num'];

        }
 

           
        $item = [];
        $item['personID'] = $personID; // already sanitized above
        $item['qslug'] = sanitize_text_field($_POST['qslug']);
        $item['qchoice'] = sanitize_text_field($_POST['qchoice']);
        $item['created']= $created;
        
        if( $wpdb->insert($this->question_tablename, $item ) <= 0 ) {  
            var_dump( $wpdb );
            exit;

        }
        
        wp_redirect('/');
        exit;
    }
    
    function do_startblock () {
        global $wpdb;
        $created = date("m/j/Y");

        $item = [];
        $item['personID'] = null;
        $item['fname'] = sanitize_text_field($_POST['fname']);
        $item['lname'] = sanitize_text_field($_POST['lname']);
        $item['email'] = sanitize_text_field($_POST['email']);
        $item['created']= $created;
    
        if( $wpdb->insert($this->startblock_tablename, $item ) <= 0 ) {  
            var_dump( $wpdb );
            exit;
        }

        $pz_id = $wpdb->insert_id;  // this is the id number of the record we just inserted
       
        // setcookie('pz_num', $pz_id, time()+31556926);
        
        wp_redirect('/?pznum=' . $pz_id);
        exit;

    }
}

function pz_setcookie () {
    if(isset($_GET['pznum'])) {
        setcookie('pz_num', sanitize_text_field($_GET['pznum']), time()+31556926);
    }
}

function basement() {

    if(isset($_COOKIE['pz_num'])) {
        $personID = $_COOKIE['pz_num'];
        // read in the record associated with this id
        $item = $wpdb->get_results("SELECT * FROM $this->startblock_tablename WHERE personID = $personID");
    }
}

add_action("init", "download_csv");

function download_csv() {

    // XXX add admin only

  if (isset($_POST['download_csv'])) {
  
    global $wpdb;

    $sql = "SELECT * FROM {$wpdb->prefix}pz_startblock";

    $rows = $wpdb->get_results($sql, 'ARRAY_A');
    
    if ($rows) {

        $csv_fields = array();
        $csv_fields[] = "First";
        $csv_fields[] = 'Last';
        $csv_fields[] = 'Email';

        $output_filename = 'file_name' .'.csv';
        $output_handle = @fopen('php://output', 'w');

        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Description: File Transfer');
        header('Content-type: text/csv');
        header('Content-Disposition: attachment; filename=' . 
        $output_filename);
        header('Expires: 0');
        header('Pragma: public');

        $first = true;
       // Parse results to csv format
        foreach ($rows as $row) {

       // Add table headers
            if ($first) {

               $titles = array();

                foreach ($row as $key => $val) {

                    $titles[] = $key;

                }

                fputcsv($output_handle, $titles);

                $first = false;
            }

            $leadArray = (array) $row; // Cast the Object to an array
            // Add row to file
            fputcsv($output_handle, $leadArray);
        }

        //echo '<a href="'.$output_handle.'">test</a>';

        // Close output file stream
        fclose($output_handle);

        die();
    }
  }
}

add_action("init", "drop_start_table");

function drop_start_table() {

    // XXX add admin only

  if (isset($_POST['unload'])) {
  
    global $wpdb;
    $table_name = $wpdb->prefix . "pz_startblock";
    $sql = "TRUNCATE TABLE $table_name";
    $wpdb->query($sql);

  }
}


    $pzQuestions = new PZQuestions();
