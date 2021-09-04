<?php
/**
 * @license http://www.gnu.org/licenses/gpl-3.0.html  GNU GPL v3
 */

/**
 * @author François Gannaz <francois.gannaz@silecs.info>
 */
class SearchPlugin extends MantisPlugin
{
    /**
     * @var string
     */
    public $nonce;

    /**
     * Init the plugin attributes.
     */
    function register()
    {
        $this->name = 'Ticket Search';
        $this->description = "Plugin that searches tickets *without changing the session*.";
        $this->page = 'search';

        $this->version = '1.0';
        $this->requires = [
            'MantisCore' => '2.0.0',
        ];

        $this->author = 'François Gannaz / Silecs';
        $this->contact = 'francois.gannaz@silecs.info';
        $this->url = '';

        $this->nonce = crypto_generate_uri_safe_nonce(16);
    }

    /**
     * Declare hooks on Mantis events.
     *
     * @return array
     */
    public function hooks()
    {
        return [
            'EVENT_CORE_HEADERS' => 'addHttpHeaders',
            'EVENT_MENU_MAIN' => 'onMenu',
            'EVENT_LAYOUT_RESOURCES' => 'addHtmlHeadContent',
        ];
    }

    /**
     * Add Content Security Policy headers for our script.
     */
    function addHttpHeaders(): void
    {
        http_csp_add('script-src', "'nonce-{$this->nonce}'"); // prod
        // http_csp_add('script-src', "'unsafe-eval'"); // dev
    }

    /**
     * Add entries to the menu on the page "Summary".
     */
    public function onMenu(): array
    {
        return [
            [
                'title' => "Chercher des tickets",
                'url' => plugin_page('search'),
                'access_level' => ANYBODY,
                'icon' => 'fa-search'
            ],
        ];
    }

    function addHtmlHeadContent(): string
    {
        $page = $_GET['page'] ?? '';
        if ($page !== 'Search/search') {
            return '';
        }
        return sprintf('
<link rel="stylesheet" type="text/css" href="%s" />
<script src="%s" nonce="%s" defer></script>
',
			plugin_file('search.css'),
			plugin_file('main.js'),
            $this->nonce
		);
    }
}
