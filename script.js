/**
 * Modern Resume - Interactive Features
 * Dynamic experience calculator integrated naturally into the sentence
 * Includes mobile-friendly tooltips and interactive UI elements
 */

(function() {
  'use strict';

  // ============================================
  // SECTION 1: DYNAMIC EXPERIENCE CALCULATOR
  // ============================================
  
  // Function to calculate experience from start date to today
  function calculateTotalExperience(startDate) {
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Adjust for day of month (if today's date is before start date's day)
    if (today.getDate() < startDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return { years, months };
  }

  // Function to format experience naturally (e.g., "8 years and 3 months" or "8.5 years")
  function formatExperienceNatural(years, months) {
    if (years === 0 && months === 0) return "just started";

    // If months are 6 or more, round to .5
    if (months >= 6) {
      const halfYear = years + 0.5;
      if (Number.isInteger(halfYear)) {
        return `${halfYear} years`;
      }
      return `${halfYear} years`;
    }

    // If months are less than 6, show as exact years and months
    if (months === 0) {
      return `${years} years`;
    }

    if (months === 1) {
      return `${years} years and ${months} month`;
    }

    return `${years} years and ${months} months`;
  }

  // Function to update the hero subtitle with natural experience text
  function updateExperienceInHero() {
    // Start date: February 26, 2018
    const startDate = new Date(2018, 1, 26); // Month is 0-indexed, so 1 = February

    // Calculate experience
    const { years, months } = calculateTotalExperience(startDate);
    const experienceText = formatExperienceNatural(years, months);

    // Find the hero subtitle element
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroSubtitle) {
      // Get the current HTML
      let currentHTML = heroSubtitle.innerHTML;

      // Replace the hardcoded "7+ years" or any existing experience text with dynamic one
      const experiencePattern = /\d+(?:\+)?\s*years(?:\s+and\s+\d+\s+months?)?/i;

      if (experiencePattern.test(currentHTML)) {
        // Replace existing experience text with dynamic one
        currentHTML = currentHTML.replace(experiencePattern, experienceText);
        heroSubtitle.innerHTML = currentHTML;
        console.log(`✅ Experience updated: ${experienceText}`);
      } else {
        // If pattern not found, try to insert after the quote icon
        const quoteIcon = '<i class="fas fa-quote-left" style="margin-right: 6px; opacity: 0.6;"></i>';
        if (currentHTML.includes(quoteIcon)) {
          // Insert experience text after the quote icon
          const newHTML = currentHTML.replace(quoteIcon, `${quoteIcon} ${experienceText} `);
          heroSubtitle.innerHTML = newHTML;
          console.log(`✅ Experience inserted: ${experienceText}`);
        } else {
          console.warn('⚠️ Could not find place to insert experience text');
        }
      }
    } else {
      console.warn('⚠️ Hero subtitle element not found');
    }
  }

  // ============================================
  // SECTION 2: SMART TOOLTIP (Mobile + Desktop)
  // ============================================

  // Position tooltip to prevent cropping
  function positionTooltip(tooltip) {
    const tooltipText = tooltip.querySelector('.tooltip-text');
    if (!tooltipText) return;
    
    // Get positions
    const rect = tooltip.getBoundingClientRect();
    const tooltipRect = tooltipText.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Default position (above)
    let top = rect.top - tooltipRect.height - 10;
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    
    // Check if tooltip goes above viewport
    if (top < 10) {
      top = rect.bottom + 10; // Place below instead
    }
    
    // Check if tooltip goes beyond left edge
    if (left < 10) {
      left = 10;
    }
    
    // Check if tooltip goes beyond right edge
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }
    
    tooltipText.style.top = top + 'px';
    tooltipText.style.left = left + 'px';
  }

  // Handle tooltip click (for mobile) and hover (for desktop)
  function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
      // Remove existing listeners to avoid duplicates
      tooltip.removeEventListener('click', handleTooltipClick);
      tooltip.removeEventListener('mouseenter', handleTooltipHover);
      tooltip.removeEventListener('mouseleave', handleTooltipLeave);
      
      // Add click listener for mobile (works on desktop too)
      tooltip.addEventListener('click', handleTooltipClick);
      
      // Add hover listeners for desktop experience
      tooltip.addEventListener('mouseenter', handleTooltipHover);
      tooltip.addEventListener('mouseleave', handleTooltipLeave);
    });
  }

  function handleTooltipClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const tooltip = this;
    const isActive = tooltip.classList.contains('active');
    
    // Close all other tooltips
    document.querySelectorAll('.tooltip.active').forEach(tt => {
      if (tt !== tooltip) {
        tt.classList.remove('active');
      }
    });
    
    // Toggle current tooltip
    if (!isActive) {
      tooltip.classList.add('active');
      // Position the tooltip after a tiny delay to ensure it's visible
      setTimeout(() => positionTooltip(tooltip), 10);
    } else {
      tooltip.classList.remove('active');
    }
  }

  function handleTooltipHover(e) {
    // On desktop, show tooltip on hover
    if (window.innerWidth > 768) {
      this.classList.add('active');
      setTimeout(() => positionTooltip(this), 10);
    }
  }

  function handleTooltipLeave(e) {
    // On desktop, hide tooltip on leave
    if (window.innerWidth > 768) {
      this.classList.remove('active');
    }
  }

  // Close tooltip when clicking elsewhere
  function closeTooltipOnOutsideClick() {
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.tooltip')) {
        document.querySelectorAll('.tooltip.active').forEach(tooltip => {
          tooltip.classList.remove('active');
        });
      }
    });
  }

  // Reposition tooltips on scroll or resize
  function repositionTooltipsOnScroll() {
    window.addEventListener('scroll', function() {
      document.querySelectorAll('.tooltip.active').forEach(tooltip => {
        positionTooltip(tooltip);
      });
    });
  }
  
  function repositionTooltipsOnResize() {
    window.addEventListener('resize', function() {
      document.querySelectorAll('.tooltip.active').forEach(tooltip => {
        setTimeout(() => positionTooltip(tooltip), 50);
      });
    });
  }

  // ============================================
  // SECTION 3: SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================
  
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // ============================================
  // SECTION 4: SKILL BADGE ANIMATIONS
  // ============================================
  
  function initSkillBadgeAnimations() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
      badge.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }

  // ============================================
  // SECTION 5: FADE-IN ANIMATIONS FOR JOB ITEMS
  // ============================================
  
  function initFadeInAnimations() {
    const jobItems = document.querySelectorAll('.job-item, .edu-item');
    jobItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // ============================================
  // SECTION 6: CONTACT ITEMS HOVER EFFECTS
  // ============================================
  
  function initContactHoverEffects() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.2s ease';
      });
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });
  }

  // ============================================
  // SECTION 7: LINKEDIN LINK HANDLER
  // ============================================
  
  function initLinkedInLink() {
    const linkedinLink = document.querySelector('.contact-item a[href="#"]');
    if (linkedinLink && linkedinLink.getAttribute('href') === '#') {
      linkedinLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('LinkedIn profile link - update with actual URL when available');
      });
    }
  }

  // ============================================
  // SECTION 8: LAZY LOADING & VIEWPORT FIXES
  // ============================================
  
  function initLazyLoading() {
    const profileImage = document.querySelector('.profile-frame img');
    if (profileImage) {
      profileImage.loading = 'lazy';
    }
  }

  function initViewportFix() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVH);
    setVH();
  }

  // ============================================
  // SECTION 9: INITIALIZE EVERYTHING
  // ============================================
  
  function init() {
    console.log('🚀 Suraj Deshmukh Resume - Initializing...');
    
    // Initialize experience calculator
    updateExperienceInHero();
    
    // Initialize tooltips (mobile + desktop)
    initTooltips();
    closeTooltipOnOutsideClick();
    repositionTooltipsOnScroll();
    repositionTooltipsOnResize();
    
    // Initialize interactive features
    initSmoothScrolling();
    initSkillBadgeAnimations();
    initFadeInAnimations();
    initContactHoverEffects();
    initLinkedInLink();
    initLazyLoading();
    initViewportFix();
    
    console.log('✅ All features initialized successfully!');
  }

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();