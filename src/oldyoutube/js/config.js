/*
 * Contains information on options that can be set
 * as well as IDs, classes, and other strings used by the
 * other scripts when manipulating the DOM.
 */
config = {
    /*
     * Miscellaneous default settings.
     * (these can be safely changed)
     * Most if not all of these settings can be set on the options
     * page. If so, they will be stored in cookies and these values
     * will be overridden.
     */
    settings: {
        // Amounts to rewind and fast-forward, in seconds
        rewindAmt: 10,
        fforwardAmt: 10,
        // Whether or not certain player controls are allowed
        ctrlenabled_fastfwd: true,
        ctrlenabled_rewind: true,
        ctrlenabled_restart: true,
        ctrlenabled_watch_related: true,
        disable_browsing: false
    },
    cookie: 'AccessibleYoutube-settings',
    /*
     * Settings for the player
     * (these can be safely changed)
     */
    player: {
        // Dimensions
        width: 400,
        height: 300,
        // Background color
        bgcolor: '#cccccc',
        // Initial player volume (as a percentage)
        initialVolume: 50
    },
    /*
     * Information affecting YouTube.com data requests
     * (don't change these unless you know what you're doing)
     */
    youtube: {
        // The YouTube API player URL.
        api: 'http://www.youtube.com/apiplayer',
        // Intended Flash version
        flashversion: '8',
        // Meanings of the possible player states
        // (as defined in the YouTube Player API)
        states: {
            unstarted: -1,
            ended: 0,
            playing: 1,
            paused: 2,
            buffering: 3,
            cued: 5
        },
        // The YouTube Developer key.
        devkey: 'AI39si61JkTRRLScpnvH9VvPq4iTVsg0O15u5brhMLiDw6T_OES9rgaJ43fU9rBXQyU3OdVXXdqNU3Yn249xey7ygHFKYTdSOQ'
    },
    /*
     * IDs of DOM nodes.
     * (if you change these, you must change them in the HTML files too)
     */
    IDs: {
        entire_page: 'entirepage',
        movielist: {
            tobegenerated: {
                l_arrow: 'future_l_arrow',
                r_arrow: 'future_r_arrow',
                back_button: 'future_back_button'
            },
            div:'moviechoices',
            actual_list: 'actualmovielist',
            l_arrow: 'l_scroll_arrow',
            r_arrow: 'r_scroll_arrow',
            back_button: 'back_button'
        },
        player: {
            player_and_ctrl_div: 'player_and_controls',
            ctrl_div: 'sway-playercontrols',
            status_bar: 'playerstatusbar',
            player: 'ytp-generated',
            future_player: 'future_generated_player'
        },
        movie: {
            title: 'movie-title',
            description: 'movie-description'
        },
        controls: {
            pause: 'swayctrl_pause',
            rewind: 'swayctrl_rewind',
            fastfwd: 'swayctrl_fastforward',
            restart: 'swayctrl_restart',
            choose_new: 'swayctrl_choose_new',
            get_related: 'swayctrl_get_related'
        }
    },
    /*
     * Classes for DOM nodes.
     * (if you change these, you must change them in the HTML files too)
     */
    classes: {
        menu: 'choicelist',
        tts_info: 'ttsinfo',
        choice: 'choice',
        selected: 'selected',
        scrollable: 'scrollable',
        movie: 'movie',
        nowplaying: 'nowplaying',
        always_clickable: 'alwaysclickable',
        shown: 'shown',
        not_shown: 'notshown',
        inactive: 'inactive',
        movie_url: 'movieurl',
        movie_title: 'movietitle',
        movie_description: 'moviedescription',
        option_form: 'optionlist'
    },
    /* 
     * Special-purpose attributes for DOM nodes.
     * (if you change these, you must change them in the HTML files too)
     */
    attrs: {
        onselect_func: 'onhighlight',
        onchoose_func: 'onchoose',
        onactivate_func: 'onactivate',
        oninactivate_func: 'oninactivate',
        movie_url: 'movieurl',
        ctrl_func: 'playerctrlname',
        ctrl_reset_to_default: 'resettodefaultplayerctrl'
    },
    /*
     * Parameters to be used for passing information in the URL
     * (don't change these unless you know what you're doing)
     */
    urlparams: {
        feedsource: 'feedsource',
        playlist: {
            src: 'playlist',
            id: 'p'
        },
        stdfeed: {
            src: 'stdfeed',
            id: 'f'
        },
        search: {
            src: 'search',
            id: 'q'
        },
        related: {
            src: 'related',
            id: 'v'
        },
        disable_browsing: 'disablebrowsing'
    },
    /*
     * Filenames (currently just for image files)
     * (if you change these, you must rename the files in question)
     */
    files: {
        movielist: {
            l_arrow: 'LArrow.png',
            r_arrow: 'RArrow.png',
            back_button: 'LArrow.png'
        }
    },
    /* Codes for the keys used as switches.
     * Each "Switch_N" is a list of keys that can be used
     * as that switch; each "key" is the keyCode and the
     * charCode for that key (in that order).
     * (these can be safely changed)
     */
    keys: {
        Switch_1: [
            [dojo.keys.RIGHT_ARROW, 0], // Right arrow
            [dojo.keys.DOWN_ARROW, 0], // Down arrow
            [dojo.keys.SPACE, 0], // Space
            [221, 0]  // Right square bracket
        ],
        Switch_2: [
            [dojo.keys.LEFT_ARROW, 0], // Left arrow
            [dojo.keys.UP_ARROW, 0], // Up arrow
            [dojo.keys.ENTER, 0], // Enter
            [219, 0]  // Left square bracket
        ]
    }
/*
 * Warning: supposedly Internet Explorer cannot handle a comma after
 * the last entry in a list; therefore don't put in extra commas.
 */
};

