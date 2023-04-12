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
        $this->startblock_tablename = $wpdb->prefix . "pz_startblock";
        $this->answers_tablename = $wpdb->prefix . "pz_answers";
    
        add_action('activate_startblock/index.php', array($this, 'onActivate'));
    
        add_action('admin_post_do-segment', array($this, 'do_segment'));
        add_action('admin_post_nopriv_do-segment', array($this, 'do_segment'));
        add_action('admin_post_do-startblock', array($this, 'do_startblock'));
        add_action('admin_post_nopriv_do-startblock', array($this, 'do_startblock'));
        
 
    }    
    
    function onActivate() {
        global $wpdb;

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php');
    
        dbDelta("CREATE TABLE $this->question_tablename (
            personID bigint(20) unsigned NOT NULL DEFAULT 1,
            qslug varchar(30) NOT NULL DEFAULT '',
            qchoice varchar(60) NOT NULL DEFAULT '',
            PRIMARY KEY  (personID)
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

    

    function do_segment () {
        global $wpdb;
        
       
            
        $item = [];
        $item['personID'] = 1;
        $item['qslug'] = sanitize_text_field($_POST['qslug']);
        $item['qchoice'] = 'A';
        
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
        
        wp_redirect('/');
        exit;

    }
}
 
    $pzQuestions = new PZQuestions();