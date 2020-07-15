<?php

/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
    require_once $composer_autoload;
    $timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if (!class_exists('Timber')) {

    add_action(
        'admin_notices',
        function () {
            echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
        }
    );

    add_filter(
        'template_include',
        function ($template) {
            return get_stylesheet_directory() . '/static/no-timber.html';
        }
    );
    return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

/**
 * 2020.06.13
 * Deregister jQuery
 */
if (!is_admin()) {
    add_action("wp_enqueue_scripts", function () {
        wp_deregister_script('jquery');
    }, 11);
}

/**
 * Include ACF code to configure custom fields for this theme
 */
include_once get_template_directory() . '/functions-acf.php';

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'theme_supports'));
        add_filter('timber/context', array($this, 'add_to_context'));
        add_filter('timber/twig', array($this, 'add_to_twig'));
        parent::__construct();

        /**
         * Register block type to manage input of ACF
         */
        add_action(
            'enqueue_block_editor_assets',
            function () {
                $asset_file = include (get_template_directory() . '/build/card.asset.php');
                wp_enqueue_script(
                    'wp-theme-kuworking-landing-one',
                    get_template_directory_uri() . '/build/card.js',
                    $asset_file['dependencies'],
                    $asset_file['version']
                );
            }
        );

        /**
         * Add a category for gutenberg blocks
         */
        add_filter('block_categories', function ($categories, $post) {
            echo 'holsa';
            var_dump(array_merge(
                $categories,
                array(
                    array(
                        'slug' => 'kuworking',
                        'title' => 'kuworking',
                        'icon' => '',
                    ),
                )
            ));
            return array_merge(
                $categories,
                array(
                    array(
                        'slug' => 'kuworking',
                        'title' => __( 'kuworking', 'kuworking' ),
                        'icon' => '',
                    ),
                )
            );
        }, 10, 2);

        /**
         * Add page to be the landing page
         */
        add_action(
            'init',
            function () {
                if (isset($_GET['activated']) && is_admin()) {
                    var_dump(isset($page_check->ID));

                    $new_page_title = 'Home';
                    $new_page_content = '<!-- wp:wp-theme-kuworking-landing-one/header {"placeholder":"Add Description"} -->

                    <!-- /wp:wp-theme-kuworking-landing-one/header -->';
                    $new_page_template = '';

                    $page_check = get_page_by_title($new_page_title);
                    $new_page = [
                        'post_type' => 'page',
                        'post_title' => $new_page_title,
                        'post_content' => $new_page_content,
                        'post_status' => 'publish',
                        'post_author' => 1,
                    ];
                    if (isset($page_check->ID)) {
                        $new_page_id = wp_insert_post($new_page);
                        if (!empty($new_page_template)) {
                            update_post_meta($new_page_id, '_wp_page_template', $new_page_template);
                        }
                    }

                }
            }
        );

    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context($context)
    {
        $context['menu'] = new Timber\Menu();
        $context['site'] = $this;

        return $context;
    }

    public function theme_supports()
    {
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );

        /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
        add_theme_support(
            'post-formats',
            array(
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            )
        );

        add_theme_support('menus');
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function add_to_twig($twig)
    {
        $twig->addFunction(new Timber\Twig_Function('add_react', function () {
            wp_register_script(
                'kw-react',
                get_template_directory_uri() . '/build/index.js',
                ['wp-element'],
                '0.01'
            );
            wp_enqueue_script('kw-react');
        }));

        /**
         * Expose the pertinent custom fields
         */
        $twig->addFunction(new Timber\Twig_Function('expose_acf', function () {
            $page_check = get_page_by_title('Home');
            return [
                'header_title' => get_field('header_title', $page_check->ID),
            ];
        }));
        return $twig;
    }
}

new StarterSite();
