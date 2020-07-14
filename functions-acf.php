<?php

/**
 * ACF custom fields exported php to configure fields here and not in the dashboard
 */

add_action('acf/init', function () {
    acf_add_local_field_group(array(
        'key' => 'group_acf_theme',
        'title' => 'HomePage Use It Through Gutenberg',
        'fields' => [
            [
                'key' => 'field_kw_theme_grid_code',
                'label' => 'Title',
                'name' => 'header_title',
                'type' => 'text',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
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
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'active' => true,
    ));

});
