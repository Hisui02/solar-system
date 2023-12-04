(function () {
  // wrap in an IIFE
  // -- keeps from clashing with other applications/libraries
  // -- prevents polluting the global scope

  // used to get a random quote. Should be pulled in from some internal module library
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // data for the quote browser. Would ideally come from an api, but I wanted control over my images
  var data = [
    {
      author: "Hodor",
      quote: "Hold the door.",
      image:
        "http://vignette3.wikia.nocookie.net/gameofthrones/images/1/18/Season_6_hodor_main.jpg/revision/latest?cb=20160617020835",
      likes: "1032",
      has_liked: 0,
    },
    {
      author: "Abraham Lincoln",
      quote: "No man has a good enough memory to be a successful liar.",
      image: "https://media1.britannica.com/eb-media/34/78134-004-8587374E.jpg",
      likes: "422",
      has_liked: 0,
    },
    {
      author: "Tyrion Lannister",
      quote:
        "Once youâ€™ve accepted your flaws, no one can use them against you.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/50/Tyrion_Lannister-Peter_Dinklage.jpg",
      likes: "2042",
      has_liked: 0,
    },
    {
      author: "Elon Musk",
      quote: "Dichotomy between sense of wonder and what is wrong.",
      image:
        "http://esq.h-cdn.co/assets/cm/15/11/550344283c14e_-_esq-elon-musk-1212-de.jpg",
      likes: "315",
      has_liked: 0,
    },
    {
      author: "Victor Hugo",
      quote:
        "When a woman is talking to you, listen to what she says with her eyes.",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSb0VH1V4SYsuo_LOiznZZbMqKP5AKG1yT0b4Y5kIQIQ1eUKQrp",
      likes: "432",
      has_liked: 0,
    },
    {
      author: "Elon Musk",
      quote: "There's skepticism about anything new. That's normal.",
      image:
        "http://esq.h-cdn.co/assets/cm/15/11/550344283c14e_-_esq-elon-musk-1212-de.jpg",
      likes: "175",
      has_liked: 0,
    },
    {
      author: "Ralph Waldo Emerson",
      quote: "Nothing great was ever achieved without enthusiasm.",
      image:
        "https://s-media-cache-ak0.pinimg.com/236x/a2/f3/91/a2f391f3943a5626a3f4641755c4a9e8.jpg",
      likes: "121",
      has_liked: 0,
    },
    {
      author: "Victor Hugo",
      quote: "Initiative is doing the right thing without being told.",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSb0VH1V4SYsuo_LOiznZZbMqKP5AKG1yT0b4Y5kIQIQ1eUKQrp",
      likes: "43",
      has_liked: 0,
    },
    {
      author: "Seth Godin",
      quote: "Defenseless is the best choice for those seeking to grow.",
      image:
        "http://www.therisetothetop.com/wp-content/uploads/2011/11/SethGodin.jpg",
      likes: "222",
      has_liked: 0,
    },
    {
      author: "Victor Hugo",
      quote: "There is nothing more powerful than an idea whose time has come.",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSb0VH1V4SYsuo_LOiznZZbMqKP5AKG1yT0b4Y5kIQIQ1eUKQrp",
      likes: "111",
      has_liked: 0,
    },
    {
      author: "Seth Godin",
      quote: "Ship often. Ship lousy stuff, but ship. Ship constantly.",
      image:
        "http://www.therisetothetop.com/wp-content/uploads/2011/11/SethGodin.jpg",
      likes: "111",
      has_liked: 0,
    },
    {
      author: "Oscar Wilde",
      quote: "Experience is simply the name we give our mistakes.",
      image: "http://www.wilde-online.info/images/oscar-wilde-p1.jpg",
      likes: "22",
      has_liked: 0,
    },
    {
      author: "Oscar Wilde",
      quote: "Work is the curse of the drinking classes.",
      image: "http://www.wilde-online.info/images/oscar-wilde-p1.jpg",
      likes: "67",
      has_liked: 0,
    },
    {
      author: "Victor Hugo",
      quote: "He who opens a school door, closes a prison.",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSb0VH1V4SYsuo_LOiznZZbMqKP5AKG1yT0b4Y5kIQIQ1eUKQrp",
      likes: "335",
      has_liked: 0,
    },
    {
      author: "Alan Watts",
      quote: "A person who never made a mistake never tried anything new.",
      image: "https://probaway.files.wordpress.com/2013/06/watts_alan_2.jpg",
      likes: "344",
      has_liked: 0,
    },
  ];

  var options = {
    imgDomElement: "quote-image",
    quoteDomElement: "quote-body",
    authorDomElement: "quote-author",
    likeDomElement: "quote-likes",
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
    var likeButton = document.getElementsByClassName("like-wrapper")[0];

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

      likeButton.addEventListener(
        "click",
        function () {
          browser.incrementCurrentQuoteLikes();
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

      likeButton.attachEvent("onclick", function () {
        browser.incrementCurrentQuoteLikes();
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
  quoteBrowser.prototype.setQuote = function (quoteObj) {
    // set each of the dom elements to the data
    // use stored elements for each part of quote instead of looking them up each time
    this.bindedElements.img.src = quoteObj.image;
    this.bindedElements.quote.innerHTML = quoteObj.quote;
    this.bindedElements.author.innerHTML = quoteObj.author;
    this.bindedElements.likes.innerHTML = quoteObj.likes;

    var heartDiv = document.getElementsByClassName("heart")[0];

    // start by removing the liked for this quote
    heartDiv.classList.remove("liked");

    // color the heart if they have already liked
    if (quoteObj.has_liked) heartDiv.classList.add("liked");
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
