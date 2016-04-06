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
        it('allFeeds var is defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('All feeds have URL and they are not empty', function() {
             allFeeds.forEach(function(feedItem) {
                 expect(feedItem.url).toBeDefined();
                 expect(feedItem.url).not.toBe("");
             });
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('All feeds have Names and they are not empty', function() {
             allFeeds.forEach(function(feedItem) {
                 expect(feedItem.name).toBeDefined();
                 expect(feedItem.name).not.toBe("");
             });
         });
    });


    describe('The menu', function() {
        /* A test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        var $menuIcon = $('.menu-icon-link');

        it('Menu is hidden by default', function() {
            // menuIsHidden = $menu.outerWidth() + $menu.position().left;
            // expect(menuIsHidden).toBe(0);
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });


        /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('Menu displays when icon clicked', function() {
            $menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
        });

        it('Menu hides when icon clicked second time', function() {
            $menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });


  describe('Initial Entries', function() {

    /* A test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    */
    var i = 0;

      beforeEach(function(done) {
        $('.feed .entry').remove(); // cleans up container before testing
        loadFeed(i,function(){
          done();
        });
      });

      afterEach(function(){
        i++; // another feed will be loaded by loadFeed() next time
      });

      /* To perform mutiple test for all our feeds we wrap template spec
      * inside a function and call it in forEach loop.
      * Credits for looping technique in jasming: http://tosbourn.com/using-loops-in-jasmine/
      */
      function test() {
        it('loadFeed() adds elements to .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
      }

      allFeeds.forEach(test);

  });

  describe('New Feed selection', function() {

    /* A test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    */
    var i = 0,
        $content;

      beforeEach(function(done) {
        $content = $('.feed').html(); // saves up the current content for future comparison.
        loadFeed(i,function(){
          done();
        });
      });

      afterEach(function(){
        i++;
      });

      // Credits for looping technique in jasming: http://tosbourn.com/using-loops-in-jasmine/
      function test() {
        it('loadFeed() changes content', function(done) {
          expect($content !== $('.feed').html()).toBeTruthy();
          done();
        });
      }

      allFeeds.forEach(test);

    });

}());
