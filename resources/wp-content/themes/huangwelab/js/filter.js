jQuery(document).ready((function ($) {
  'use strict'

  new Filter()

  new Sticky()

}))

class Sticky {
  constructor () {
    this.phantom = $('.phantom')
    this.stickyElement = $('.filters--desktop')
    this.phantom.outerHeight(this.stickyElement.outerHeight())
    this.threshold = this.stickyElement.css('top').replace(/[^-\d\.]/g, '')

    $(window).on('scroll',() => this.sticky_relocate(this.stickyElement))
    this.sticky_relocate(this.stickyElement)
  }

  sticky_relocate (element) {
    let window_top = $(window).scrollTop() + parseInt(this.threshold)
    let div_top = $('#content-anchor').offset().top

    if (window_top > div_top) {
      element.addClass('js-is-sticky')
      this.phantom.show()
    } else {
      element.removeClass('js-is-sticky')
      this.phantom.hide()
    }
  }

}

class Filter {
  constructor () {
    this.url = new URL(window.location)

    this.$parentBox = $('.articles')
    this.$topBar = $('.top-bar')

    this.$burgerDesktop = $('.burger--desktop')
    this.$burgerHide = this.$burgerDesktop.find('.burger__hide')
    this.$burgerShow = this.$burgerDesktop.find('.burger__show')

    this.$filters = $('.filters--desktop')
    this.$filtersHeadings = this.$filters.find('.filters__heading')
    this.$filtersCheckboxes = this.$filters.find('.check__input')
    this.$reset = this.$filters.find('.filters__clear--desktop')

    this.$loadMore = $('.js-load-more')

    this.sortDropdown = $('.js-select')

    // -----mobile-----
    this.$burgerMobile = $('.burger--mobile-js')

    this.$filtersMobile = $('.filters--mobile')
    this.$close = this.$filtersMobile.find('.close')
    this.$filtersHeadingsMobile = this.$filtersMobile.find('.filters__heading')
    this.$filtersCheckboxesMobile = this.$filtersMobile.find('.check__input')
    this.$filtersRadiosMobile = this.$filtersMobile.find('input[name="radio"]')

    this.$resetMobile = this.$filtersMobile.find('.filters__clear--mobile')
    this.$resetMobileCounter = this.$resetMobile.find('span')
    this.$applyBtn = this.$filtersMobile.find('.filters__apply')

    this.$siteMain = $('.site-main')

    this.$sorting = $('.sorting')
    this.$results = $('.results')

    this.burgerHandler()
    this.filterCollapseHandler()

    this.filterHandler()
    this.loadMoreHandler()

    this.sortHandler()

    this.clearFilterHandler()

    this.mobileApplyHandler()

    this.promise = new Promise(resolve => {
      resolve(this.macy = Macy({
        container: '.articles',
        trueOrder: true,
        waitForImages: true,
        columns: 3,
        breakAt: {
          1200: 2,
          992: 2,
          767: 1,
        },
        margin: {
          x: 16,
          y: 24
        }
      }))
    });

    this.promise.then((result) => {
      this.$parentBox.removeClass('blur')
      this.recalculate_masonry_layout()
    })

  }

  burgerHandler () {
    this.$burgerDesktop.on('click', (e) => {
      e.preventDefault()
      this.$burgerHide.toggleClass('active')
      this.$burgerShow.toggleClass('active')
      this.$parentBox.toggleClass('active')
      this.$filters.toggleClass('active')
      this.recalculate_masonry_layout()

    })

    this.$burgerMobile.on('click', (e) => {
      e.preventDefault()

      this.openDrawer()
    })

    this.$close.on('click', (e) => {
      e.preventDefault()

      this.closeDrawer()

    })
  }

  filterCollapseHandler () {
    this.$filtersHeadings.on('click', (e) => {
      this.filterCollapse(e)
    })

    this.$filtersHeadingsMobile.on('click', (e) => {
      this.filterCollapse(e)
    })
  }

  filterHandler () {
    this.$filtersCheckboxes.on('click', (e) => {
      const $self = $(e.currentTarget)

      args.paged = 1;

      if ($self.prop('checked')) {
        this.addFilter(e)
      } else {
        this.removeFilter(e)
      }
    })

    this.$filtersCheckboxesMobile.on('click', (e) => {
      const $self = $(e.currentTarget)

      args.paged = 1;

      if ($self.prop('checked')) {
        this.addFilterMobile()
      } else {
        this.removeFilterMobile()
      }
    })
  }

  sortHandler () {
    this.sortDropdown.on('customSelect', (e) => {
      const $self = $(e.currentTarget)
      args['sort'] = $self.find('.option-current').data('sort')
      args.paged = 1

      this.getNews(args, true, this.$parentBox, this.$loadMore)
      // this.scrollToTarget(this.$topBar)
    })
  }

  loadMoreHandler () {
    let controller = new ScrollMagic.Controller()

    let scene = new ScrollMagic.Scene({ triggerElement: '.js-load-more', triggerHook: 'onEnter' })
      .addTo(controller)
      .on('enter', (e) => {
        if (this.$loadMore.is(':visible')) {
          args.paged++
          this.getNews(args, false, this.$parentBox, this.$loadMore)

        }
      })
  }

  clearFilterHandler () {
    this.$reset.on('click', (e) => {
      e.preventDefault()

      this.$filtersCheckboxes.each(function () {
        $(this).prop('checked', false)
      })

      args.filter_post_type = []
      args.project = []
      args.topic = []
      args.sort = 'featured'
      args.paged = 1

      this.getNews(args, true, this.$parentBox, this.$loadMore)
      // this.scrollToTarget(this.$topBar)

      // update sort select to default state
      this.updateSortSelect()
    })

    this.$resetMobile.on('click', (e) => {
      e.preventDefault()

      this.clearMobileCounter(e.currentTarget)

      this.$filtersCheckboxesMobile.each(function () {
        $(this).prop('checked', false)
      })

      this.$filtersRadiosMobile.each(function (index) {
        if (index === 0) {
          $(this).prop('checked', true)
        } else {
          $(this).prop('checked', false)
        }
      })

      args.filter_post_type = []
      args.project = []
      args.topic = []
      args.sort = 'featured'
      args.paged = 1

      this.closeDrawer()

      this.getNews(args, true, this.$parentBox, this.$loadMore, true)
      this.scrollToTarget(this.$topBar)

    })
  }

  mobileApplyHandler () {
    this.$applyBtn.on('click', () => {
      this.$filtersCheckboxesMobile.each(function () {
        const $self = $(this)
        const $type = $self.data('type')
        let $id = ''

        if ($self.prop('checked')) {
          $id = $self.data('id')
          args[$type].push($id)
        }
      })

      this.$filtersRadiosMobile.each(function () {
        const $self = $(this)

        const $type = $self.data('type')
        let $id = ''

        if ($self.prop('checked')) {
          $id = $self.data('id')
          args[$type] = ($id)
        }
      })

      this.closeDrawer()

      this.scrollToTarget(this.$topBar)
      this.getNews(args, true, this.$parentBox, this.$loadMore)
    })
  }

  filterVisibilityHandler(response) {
    this.$filtersCheckboxes.each(

    )
    this.$filtersCheckboxesMobile.each(

    )
  }

  hideEmptyFilters(response) {
    this.$filtersCheckboxes.each(function () {
      const $self = $(this)
      const $type = $self.data('type')
      const $id = $self.data('id')

      if($type === 'project' && !Object.values(response.project).includes($id) ) {
        $self.prop('disabled', true)
      }

      if($type === 'topic' && !Object.values(response.topics).includes($id) ) {
        $self.prop('disabled', true)
      }

      if($type === 'filter_post_type' && !Object.values(response.filter_post_type).includes($id) ) {
        $self.prop('disabled', true)
      }
    })

    this.$filtersCheckboxesMobile.each(function () {
      const $self = $(this)
      const $type = $self.data('type')
      const $id = $self.data('id')

      if($type === 'project' && !Object.values(response.project).includes($id) ) {
        $self.prop('disabled', true)
      }

      if($type === 'topic' && !Object.values(response.topics).includes($id) ) {
        $self.prop('disabled', true)
      }

      if($type === 'filter_post_type' && !Object.values(response.filter_post_type).includes($id) ) {
        $self.prop('disabled', true)
      }
    })
  }

  showFilters() {
    this.$filtersCheckboxes.each(function () {
      const $self = $(this)
        $self.prop('disabled', false)
    })

    this.$filtersCheckboxesMobile.each(function () {
      const $self = $(this)
      $self.prop('disabled', false)
    })
  }

  /**
   *
   * @param args object
   * @param isFilter boolean
   * @param $mainBox
   * @param $loadMore
   */
  getNews (args, isFilter = false, $mainBox, $loadMore) {
    $.ajax({

      url: `${this.url.protocol}//${this.url.hostname}/wp-json/filter/v1/posts/?data=${JSON.stringify(args)}`,
      method: 'GET',
      dataType: 'JSON',
      beforeSend: () => {
        $loadMore.show()
       $mainBox.animate({ opacity: 0.5 }, 300)
      },
      success: (response) => {



        if (response && response.posts) {
          if (isFilter) {
            $mainBox.html(response.posts).animate({ opacity: 1 }, 300)
            if (response.found < args.posts_per_page) {
              $loadMore.hide()
            }

            args.max_page = response.max_page

            this.showFilters()
            this.add_results_count(response)
            this.hideEmptyFilters(response)

          } else {
            $mainBox.append(response.posts).animate({ opacity: 1 }, 300)
          }

          if (args.paged == args.max_page) {

            $loadMore.hide()
          }

          this.recalculate_masonry_layout()

        } else {
          $mainBox.html('<div class=""><h3>No Posts found.</h3></div>')
          $loadMore.hide()
        }
      },
      error: function (error) {
        $mainBox.html(`<div class=""><h3>${error.message}</h3></div>`)
        $loadMore.hide()
      },
      // complete: (response) => {
      // }
    })
  }

  scrollToTarget (spot) {
    $('html, body').animate({
      scrollTop: spot.offset().top + spot.height() - 110
    }, 400)
  }

  addFilter (e) {
    const $self = $(e.currentTarget)
    const $type = $self.data('type')
    let $id = $self.data('id')

    args[$type].push($id)

    console.log('add filter', args)

    this.getNews(args, true, this.$parentBox, this.$loadMore)
     // this.scrollToTarget(this.$topBar)
  }

  removeFilter (e) {
    const $self = $(e.currentTarget)
    const $type = $self.data('type')
    let $id = $self.data('id')

    args[$type] = args[$type].filter(function (value) {
      return value !== $id
    })

    console.log('remove', args)

    this.getNews(args, true, this.$parentBox, this.$loadMore)
     // this.scrollToTarget(this.$topBar)
  }

  filterCollapse (e) {
    e.preventDefault()
    const $self = $(e.currentTarget)
    const $filtersContent = $self.closest('.filters__item').find('.filters__content')
    const $filtersList = $filtersContent.find('.filters__list')
    const $icon = $self.find('.icon').toggleClass('open')

    $filtersContent.height($filtersList.outerHeight(true))

    if ($filtersContent.hasClass('open')) {
      $filtersContent.removeClass('open')
      $filtersContent.height(0)
    } else {
      $filtersContent.addClass('open')
      $filtersContent.height($filtersList.outerHeight(true))
    }
  }

  updateSortSelect () {
    document.querySelector('.combo-input').textContent = ('Featured')
    document.querySelectorAll('.combo-option').forEach(option => {
      option.classList.add('option-current')
      option.setAttribute('aria-selected', 'false')
    })
    document.querySelector('#combo1-0').classList.add('option-current')
    document.querySelector('#combo1-0').setAttribute('aria-selected', 'true')
  }

  openDrawer () {
    this.$siteMain.addClass('drawer-open')
    this.$filtersMobile.addClass('active')

    $('html, body').css({
      overflow: 'hidden',
      height: '100%'
    })
  }

  closeDrawer () {
    this.$siteMain.removeClass('drawer-open')
    this.$filtersMobile.removeClass('active')

    $('html, body').css({
      overflow: 'auto',
      height: 'auto'
    })
  }

  addFilterMobile () {
    if (this.$resetMobileCounter.text().length === 0) {
      this.$resetMobileCounter.text('(1)')
    } else {
      let prev = parseInt(this.$resetMobileCounter.text().replace(/[\(\)']+/g, ''))
      prev++
      this.$resetMobileCounter.text('(' + prev + ')')
    }
  }

  removeFilterMobile () {
    if (this.$resetMobileCounter.text().length > 0) {
      let prev = parseInt(this.$resetMobileCounter.text().replace(/[\(\)']+/g, ''))
      prev--
      this.$resetMobileCounter.text('(' + prev + ')')
    }
  }

  clearMobileCounter (that) {
    const $self = $(that)
    $self.find('span').text('')
  }

  add_results_count(response) {
    // if (this.$sorting.is(':hidden')) {
      let suffix = ''
      response.found > 1 ? suffix = ' Results' : suffix = ' Result'
      this.$results.html(`${response.found}${suffix}`)
    // }
  }

  recalculate_masonry_layout () {
    this.macy.runOnImageLoad(() => {
      this.macy.recalculate(true)
    }, true)
  }

}



// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});






