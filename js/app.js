$(document).ready(function() {
  TweenMax.to('.preloader', 1, {opacity: '0', display: 'none'});
});

function worksAnimationComplete(direction, page) {
  TweenMax.to('.works-grey, .works-white', 0, {display: 'none', left: '-100%'});
}

function aboutAnimationComplete() {
  TweenMax.to('.about-grey, .about-white', 0, {display: 'none', right: '-100%'});
}

function labAnimationComplete() {
  TweenMax.to('.lab-grey, .lab-white', 0, {display: 'none', top: '-100%'});
}

function nextProjectAnimationComplete() {
  TweenMax.to('.bottom-grey, .bottom-white', 0, {display: 'none', bottom: '-100vh'});
}

function worksAnimation() {
  TweenMax.to('.works-white', 2, {display: 'inherit', left: '100%'});
  TweenMax.to('.works-grey', 2, {display: 'inherit', left: '100%', delay: .5, onComplete: worksAnimationComplete, onCompleteParams:['left', 'works']});
}

function aboutAnimation() {
  TweenMax.to('.about-white', 2, {display: 'inherit', right: '100%'});
  TweenMax.to('.about-grey', 2, {display: 'inherit', right: '100%', delay: .5, onComplete: aboutAnimationComplete});
}

function labAnimation() {
  TweenMax.to('.lab-white', 2, {display: 'inherit', top: '100%'});
  TweenMax.to('.lab-grey', 2, {display: 'inherit', top: '100%', delay: .5, onComplete: labAnimationComplete});
}

function nextProjectAnimation() {
  TweenMax.to('.bottom-white', 2, {display: 'inherit', bottom: '100vh'});
  TweenMax.to('.bottom-grey', 2, {display: 'inherit', bottom: '100vh', delay: .5, onComplete: nextProjectAnimationComplete});
}

function loadWorksPage() {
  worksAnimation();
  setTimeout(() => {
    $('#bacterium').hide();
    $('.home-text').hide();
    $('.about-page').hide();
    $('.home-line-1, .home-line-2').hide();
    $('.works-page').css({'display': 'initial'});
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'vertical',
      loop: true,
      speed: 1500,
      spaceBetween: 0,
      preloadImages: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">- 0' + (index + 1) + '</span>';
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, 1000);
}

function loadAboutPage() {
  aboutAnimation();
  setTimeout(() => {
    $('.home-text').hide();
    $('.works-page').hide();
    $('#bacterium').show();
    $('.about-page').css('display', 'flex');
  }, 1000);
}

function loadHomePage() {
  worksAnimation();
  setTimeout(() => {
    $('.page-loader').hide();
    $('.works-page').hide();
    $('.about-page').hide();
    $('.home-line-1, .home-line-2').show();
    $('.home-text').show();
    $('#bacterium').show();
  }, 1000);
}

let projects = ['sam', 'casa', 'point'];

function projectLoad(name, animation) {
  let projects = ['sam', 'casa', 'point'];
  let nextPage;
  for(var i = 0; i < projects.length; i++){
    let counter = i;
    if(name === projects[projects.length - 1]) {
      nextPage = projects[0];
      break;
    } else if(name === projects[i]){
      counter += 1
      nextPage = projects[counter];
      console.log(nextPage);
      break;
    }
  }
  if(animation === 'top') {
    $('html, body').css('overflow', 'hidden');
    $('.works-page').hide();
    $('.loader-2').fadeIn();
    $('.page-loader').load(`projects/${name}.html`, function() {
      document.location.hash = name;
      labAnimation();
      // Customizing a reveal set
      $('.loader-2').hide();
      setTimeout(() => {
        $('.page-loader').css({'display': 'initial', 'height': '100vh', 'width': '100%'});
        $(`.${nextPage}-next`).click(function() {
          setTimeout(() => {
            projectLoad(nextPage, 'bottom');
          }, 1000);
        });
        setTimeout(() => {
          $('body').css('overflow-y', 'initial');
        }, 1500);
      }, 1000);
    });
  } else if (animation === 'bottom') {
    $('html, body').animate({scrollTop : 0},500);
    $('html, body').css('overflow', 'hidden');
    setTimeout(() => {
      $('.page-loader').hide();
      $('.loader-2').fadeIn();
      setTimeout(() => {
        $('.page-loader').load(`projects/${name}.html`, function() {
          document.location.hash = name;
          labAnimation();
          $('.loader-2').hide();
          setTimeout(() => {
            $('.page-loader').css('display', 'initial');
          }, 600);
          setTimeout(() => {
            $(`.${nextPage}-next`).click(function() {
              setTimeout(() => {
                projectLoad(nextPage, 'bottom');
              }, 1000);
            });
            setTimeout(() => {
              $('body').css('overflow-y', 'initial');
            }, 2500);
          }, 100);
        });
      }, 1000);
    }, 520);
  }
}

$('#work').click(() => {
  document.location.hash = 'work';
  $('.page-loader').hide();
  loadWorksPage();
});

$('#about').click(() => {
  document.location.hash = 'about';
  $('.page-loader').hide();
  loadAboutPage();
});

$('#logo').click(() => {
  document.location.hash = '';
  loadHomePage();
});

$('.slide-1').click(() => {
  projectLoad(projects[0], 'top');
});

$('.slide-2').click(() => {
  projectLoad(projects[1], 'top');
});

$('.slide-3').click(() => {
  projectLoad(projects[2], 'top');
});

// PAPERJS

(function($){

	"use strict";

	var mypaper;

	$(document).ready(function() {

		// initialize the paper animation
		mypaper = new PaperWrap( $('#bacterium')[0] );

		// the footer
		$(".footer .toggle").mouseenter(function() {
			$(".footer").addClass("info-is-visible");
		});
		$(".footer").mouseleave(function() {
			$(".footer").removeClass("info-is-visible");
		});

	});

	function fitPaperWraps() {
		mypaper.fit();
	}

	$(window).resize(function() {

		waitForFinalEvent(function(){

			fitPaperWraps();

		}, 50, "resizing-papers");

	});

	var waitForFinalEvent = (function () {
		var timers = {};
			return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	function PaperWrap( canvasElement ) {

		var mypaper = new paper.PaperScope();
		mypaper.setup( canvasElement );

		var view = mypaper.view,
			Point = mypaper.Point,
			Path = mypaper.Path,
			Group = mypaper.Group;

		// adjustable variables
		var mouseForce = 0.1;
		// other variables
		var mousePoint = new Point(-1000, -1000);

		function Bacterium(center, size, color) {
			this.build(center, size, color);
		}

		Bacterium.prototype = {
			build: function(center, radius, color) {
				var padding = Math.min(view.size.width, view.size.height) * 0.2;


				var timeScale = 1;
				var maxWidth = view.size.width - padding * 2;
				var maxHeight = view.size.height - padding * 2;
				var w = maxWidth * timeScale;
				var h = maxHeight * timeScale;

				this.fitRect = new Path.Rectangle({
					point: [view.size.width / 2 - w / 2, view.size.height / 2 - h / 2],
					size: [w, h]
				});

				this.circlePath = new Path.Circle(center, radius);

				this.group = new Group([this.circlePath]);
				//this.group.strokeColor = "black";
				this.group.position = view.center;

				this.circlePath.fillColor = color;
				this.circlePath.fullySelected = false;
				this.threshold = radius * 1.4;
				this.center = center;
				this.circlePath.flatten(radius * 1.5);
				this.circlePath.smooth();
				this.circlePath.fitBounds( this.fitRect.bounds );

				// control circle erstellen, auf den die einzelnen Punkte später zurückgreifen können
				this.controlCircle = this.circlePath.clone();
				this.controlCircle.fullySelected = false;
				this.controlCircle.visible = false;

				var rotationMultiplicator = radius / 200;

				// Settings pro segment
				this.settings = [];
				for( var i = 0; i < this.circlePath.segments.length; i++ ) {
					var segment = this.circlePath.segments[i];
					this.settings[i] = {
						relativeX: segment.point.x - this.center.x,
						relativeY: segment.point.y - this.center.y,
						offsetX: rotationMultiplicator,
						offsetY: rotationMultiplicator,
						momentum: new Point(0,0)
					};
				}
			},
			clear: function() {
				this.circlePath.remove();
				this.fitRect.remove();
			},
			animate: function(event) {

				this.group.rotate(-0.2, view.center);

				for( var i = 0; i < this.circlePath.segments.length; i++ ) {
					var segment = this.circlePath.segments[i];

					var settings = this.settings[i];
					var controlPoint = new Point(
						//settings.relativeX + this.center.x,
						//settings.relativeY + this.center.y
					);
					controlPoint = this.controlCircle.segments[i].point;

					// Avoid the mouse
					var mouseOffset = mousePoint.subtract(controlPoint);
					var mouseDistance = mousePoint.getDistance( controlPoint );
					var newDistance = 0;

					if( mouseDistance < this.threshold ) {
						newDistance = (mouseDistance - this.threshold) * mouseForce;
					}

					var newOffset = new Point(0, 0);
					if(mouseDistance !== 0){
						newOffset = new Point(mouseOffset.x / mouseDistance * newDistance, mouseOffset.y / mouseDistance * newDistance);
					}
					var newPosition = controlPoint.add( newOffset );

					var distanceToNewPosition = segment.point.subtract( newPosition );

					settings.momentum = settings.momentum.subtract( distanceToNewPosition.divide( 6 ) );
					settings.momentum = settings.momentum.multiply( 0.6 );

					// Add automatic rotation

					var amountX = settings.offsetX;
					var amountY = settings.offsetY;
					var sinus = Math.sin(event.time + i*2);
					var cos =  Math.cos(event.time + i*2);
					settings.momentum = settings.momentum.add( new Point(cos * -amountX, sinus * -amountY) );

					// go to the point, now!
					segment.point = segment.point.add( settings.momentum );

				}
			}
		};

		var radius = Math.min( view.size.width, view.size.height) / 2 * 0.7;
		var bacterium = new Bacterium( view.bounds.center, radius, "#222" );

		view.onFrame = function(event) {
			bacterium.animate(event);
		};

		$.support.touch = 'ontouchstart' in window;
		if( !$.support.touch ) {
			// this should only run if on a non-touch device, but it keeps running everywhere
		}
		var tool = new mypaper.Tool();
		tool.onMouseMove = function(event) {
			mousePoint = event.lastPoint;
		};


		var fit = this.fit = function() {

			var $canvas = $( view.element );

			var canvasWidth = $canvas.width();
			var canvasHeight = $canvas.height();

			$canvas
				.attr("width", canvasWidth)
				.attr("height", canvasHeight);

			mypaper.view.viewSize = new mypaper.Size( canvasWidth, canvasHeight);

		};



		function redrawBacterium() {

			// overwrite the global paper object with the local one
			paper = mypaper;

			radius = Math.min( view.size.width, view.size.height ) / 2;
			radius = Math.floor( radius * 0.7 );

			bacterium.clear();
			bacterium = null;
			bacterium = new Bacterium( view.bounds.center, radius, "#222");
		}

		view.onResize = function(event) {
			redrawBacterium();
		};
	}
})(jQuery);
