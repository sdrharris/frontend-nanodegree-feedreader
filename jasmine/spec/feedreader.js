/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed item and ensures
         * that its "URL" property is defined
         * and that the "URL" property is not empty.
         */
        //URL defined and not empty
         it('has URL defined and not empty', function() { // Test statement
             for(let feed of allFeeds) { // Expectations for test
                 expect(feed.url).toBeDefined(); // Item being tested is the "URL" property
                 expect(feed.url.length).not.toBe(0); //Checking for length property of allFeeds "URL"
             }
         });

        /* Test that loops through each feed item
         * in the allFeeds object and ensures it has a "name" defined
         * and that the "name" is not empty.
         */
         //Name defined and not empty
         it('has name defined and not empty', function() { // Test statement
             allFeeds.forEach(function(feed) { // Expectations for the test
                 expect(feed.name).toBeDefined(); // Item being tested is the "Name" property
                 expect(feed.name.length).not.toBe(0); // Checking the length property of allFeeds "name"
             });
         });
    });


    /* A set of tests for "The menu" */
    describe('The menu', function() {

        /* Menu test 1 that ensures  that the toggle-able menu is
         * in an initial state of hidden 
         */
        //Test to check for the hidden class on the toggle-able menu
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true); // ref: https://api.jquery.com/hasclass/
        });

         /* Menu test 2 to ensure that the menu toggles on and off when clicked.
          */
         //Test to check visibility when the menu is clicked
         it('toggles visibility on', function() {
             $('a.menu-icon-link').trigger('click'); // menu visible
             expect($('body').hasClass('menu-hidden')).toBe(false);
             $('a.menu-icon-link').trigger('click'); // menu hidden
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    /* Test named "Initial Entries" to call the loadFeed function */
    describe('Initial Entries', function() {

        /* This test will call the loadFeed function asychronously, 
         * within the .feed container, and there is at least
         * a single entry element. 
         */
        beforeEach(function(done) { // Runs before "expect" test statement
            loadFeed(0, done);
        });

        it('is present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test named "New Feed Selection"  to load 2 different feeds and check that feed content changes*/
    describe('New Feed Selection', function() { 
        var firstFeed; // first feed content empty array variable

        /* Loading the 2 different feeds. Asynchronous funtion         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html(); // store firstFeed
                loadFeed(1, done); // Fetch new feed
            });
        });
        // Calling done in the final async function
        it('is different from first feed', function() {
           expect($('.feed').html()).not.toBe(firstFeed);
        });
    });
}());