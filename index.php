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


 class PZQuestions {
    function __construct() {
        global $wpdb;

        $this->charset = $wpdb->get_charset_collate(); 
        $this->question_tablename = $wpdb->prefix . "pz_question";
    
        add_action('activate_startblock/index.php', array($this, 'onActivate'));
    
        add_action('admin_post_do-segment', array($this, 'do_segment'));
        add_action('admin_post_nopriv_do-segment', array($this, 'do_segment'));
        
 
    }    
    
    function onActivate() {
        global $wpdb;

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php');
    
        dbDelta("CREATE TABLE $this->question_tablename (
            qnum int(3) unsigned NOT NULL DEFAULT 1,
            qtext varchar(250) NOT NULL DEFAULT '',
            qtype varchar(2) NOT NULL DEFAULT '',
            PRIMARY KEY  (qnum)
        ) $this->charset;");
        
        } 

    function do_segment () {
        global $wpdb;
        // var_dump($_POST['question']);
        // exit;

        // if called from admin side, then we need to save or update values from the block
        if( is_admin()) {
            // for each question in the question array
            //    write record for the question text
            //    for each answer in the question's answer array
            //      write answer record
            // $item = [];
            // $item['qnum'] = 1;
            // $item['qtext'] = sanitize_text_field($_POST['question']);
            // $item['qtype'] = 'A';
        
            // if( $wpdb->insert($this->question_tablename, $item ) <= 0 ) {  
            //     var_dump( $wpdb );
            //     exit;

            // }
        }
        wp_redirect('/');
        exit;
    }

    }
 
    $pzQuestions = new PZQuestions();
