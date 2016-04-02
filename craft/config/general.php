<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*'     => array(
      'omitScriptNameInUrls'  => true
    ),

    '.dev'  => array(
      'devMode' => true,
      'environmentVariables' => array(
        'basePath'  => '/Users/noSlouch/Code/websites/caregiver/public/',
        'baseUrl'   => 'http://craft.dev/'
      )
    ),

    '.org'  => array(
      'environmentVariables' => array(
        'basePath'  => '/home/brianwhitton/thereluctantcaregiver.org/public/',
        'baseUrl'   => 'http://http://thereluctantcaregiver.org/'
      )
    )
);
