<?php

DEPRECATED

/**
 * ACF custom fields exported php to configure fields here and not in the dashboard
 */

add_action('acf/init', function () {
    acf_add_local_field_group([
        'key' => 'group_acf_theme',
        'title' => 'HomePage Use It Through Gutenberg',
        'fields' => [
            [
                'key' => 'field_header_title', // JS API getField needs the key
                'label' => 'Title',
                'name' => 'header_title',
                'type' => 'text',
            ],
        ],
        'location' => [
            // each array added at this lever has a relation of 'OR'
            // in this case the location rules are
            // post_type == Post OR post_type == entrada
            [
                // each array at this nesting level has a relation of 'AND'
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ],
                // if this rule had an 'AND' it would appear here
            ],
            // OR
        ],
    ]);

});
