(function () {
  // used to get a random quote. Should be pulled in from some internal module library
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var data = [
    {
      author: "Neil Armstrong",
      quote: "That's one small step for a man, one giant leap for mankind",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter07_centered.jpg/800px-Mercury_in_color_-_Prockter07_centered.jpg",
    },
    {
      author: "Joseph Joubert",
      quote: "Space is to place as eternity is to time",
      image:
        "https://th.bing.com/th/id/R.63c2a242fdff6895f283fbe2a5edf2b0?rik=rXUegHEHaC8A%2bQ&riu=http%3a%2f%2fwww.centraldatacore.com%2fwp-content%2fuploads%2fPT2-Venus-3DP-Key.jpg&ehk=SkmYGxggKBi7nEIOjPzz9IAod%2bw2goNIeOfZoyxRwZQ%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      author: "Neil deGrasse Tyson",
      quote: "The Universe is under no obligation to make sense to you",
      image:
        "https://cofredpalabras.files.wordpress.com/2015/04/el-planeta-tierra.jpg",
    },
    {
      author: "Elon Musk",
      quote: "I would like to die on Mars. Just not on impact",
      image:
        "https://services.meteored.com/img/article/marte-en-oposicion-en-el-perihelio-a-disfrutar-284601-1_1024.jpg",
    },
    {
      author: "Peter Diamandis",
      quote: "Space is an inspirational concept that allows you to dream big",
      image:
        "https://th.bing.com/th/id/R.fef74e45ec48e66de117322f8d27b02b?rik=%2b8JwXfAhBoAmCA&riu=http%3a%2f%2f4.bp.blogspot.com%2f--EVDpB2lSnY%2fUzXhTP3v4DI%2fAAAAAAAAE3c%2fqWKPpuXoIRg%2fs3200%2fJupiter%2bplanet.jpg&ehk=mms%2fqtmJGgrSvuqAAAhle46wRVltSNHuh9s3zdYEWc4%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      author: "Valentina Tereshkova",
      quote: "Hey sky, take off your hat, I'm on my way!",
      image:
        "https://mi.astrocentro.com/vss/astrocenter/pictures/29642756-adobestock-250121615.jpeg",
    },
    {
      author: "Jim Lovell",
      quote: "Houston, we've had a problem",
      image:
        "https://www.greenme.it/wp-content/uploads/2020/11/planeta-urano.jpg",
    },
    {
      author: "Alan Shepard",
      quote: "They say any landing you can walk away from is a good one",
      image:
        "https://external-preview.redd.it/5CzriqTNA97BuyiyByn0ZgjZcYVg8MzVmswrjBXXfyM.jpg?auto=webp&s=e6ea8e4ddeb99e49b1cde92ca8fe7667d7fe774d",
    },
  ];

  var options = {
    imgDomElement: "quote-image",
    quoteDomElement: "quote-body",
    authorDomElement: "quote-author",
  };

  var quoteBrowser = function (data, elements) {
    this.domElements = elements;
    this.quotes = data;
    this.currentQuoteIndex = 0;
    this.bindedElements = {};

    this.bindedElements.img = document.getElementById(
      this.domElements.imgDomElement
    );
    this.bindedElements.quote = document.getElementById(
      this.domElements.quoteDomElement
    );
    this.bindedElements.author = document.getElementById(
      this.domElements.authorDomElement
    );
    this.bindedElements.likes = document.getElementById(
      this.domElements.likeDomElement
    );
  };

  quoteBrowser.prototype.incrementCurrentQuoteLikes = function () {
    var currentQuote = this.quotes[this.currentQuoteIndex];

    if (!currentQuote.has_liked) {
      currentQuote.likes++;
      currentQuote.has_liked = 1;
    } else {
      currentQuote.likes--;
      currentQuote.has_liked = 0;
    }

    this.setQuote(currentQuote);
  };

  quoteBrowser.prototype.scrollQuote = function (direction) {
    var currentIndex = this.currentQuoteIndex;

    if (direction === "prev") currentIndex--;
    else currentIndex++;

    // Check the limits. If goes below 0, wrap around to last element.
    if (currentIndex >= this.quotes.length) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = this.quotes.length - 1;

    // update current index on class
    this.currentQuoteIndex = currentIndex;

    // set current quote to the prev or next
    this.setQuote(this.quotes[currentIndex]);
  };

  quoteBrowser.prototype.init = function () {
    var prevArrow = document.getElementById("move-left");
    var nextArrow = document.getElementById("move-right");

    // cannot use 'this' inside onclick handlers since they have a different context
    var browser = this;

    if (prevArrow.addEventListener) {
      prevArrow.addEventListener(
        "click",
        function () {
          browser.scrollQuote("prev");
        },
        false
      );

      nextArrow.addEventListener(
        "click",
        function () {
          browser.scrollQuote("next");
        },
        false
      );
    } else if (prevArrow.attachEvent) {
      prevArrow.attachEvent("onclick", function () {
        browser.scrollQuote("prev");
      });

      nextArrow.attachEvent("onclick", function () {
        browser.scrollQuote("next");
      });
    }
  };

  // getRandomQuote returns a quote from random index
  quoteBrowser.prototype.getRandomQuote = function () {
    var random = getRandomInt(0, this.quotes.length - 1);
    this.currentQuoteIndex = random;

    return this.quotes[random];
  };

  // setQuote sets the data for this quote
  quoteBrowser.prototype.setQuote = async function (quoteObj) {
    // set each of the dom elements to the data
    // use stored elements for each part of quote instead of looking them up each time
    this.bindedElements.img.src = quoteObj.image;
    this.bindedElements.quote.innerHTML = '"' + quoteObj.quote + '"';
    this.bindedElements.author.innerHTML = quoteObj.author;
  };

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      // Content has loaded
      var qb = new quoteBrowser(data, options);
      var randomQuote = qb.getRandomQuote();

      qb.setQuote(randomQuote);
      qb.init();
    },
    false
  );
})();
