// Site Themes
const SITE_THEMES = {
  minimal: {
    name: 'Modern / Minimal',
    vars: {
      '--soil': '#2C1A0E',
      '--earth': '#5C3D1E',
      '--moss': '#3D6B35',
      '--sage': '#7AAB6B',
      '--cream': '#F5F0E8',
      '--sand': '#E8DCC8',
      '--white': '#FDFCFA',
      '--text': '#1A1208',
      '--text2': '#6B5540',
      '--accent': '#3D6B35',
      '--nav-bg': 'rgba(253,252,250,0.92)',
      '--hero-bg': 'var(--white)',
      '--section-bg': 'var(--cream)',
      '--card-bg': 'var(--white)',
      '--card-radius': '20px',
      '--btn-radius': '100px',
      '--font-display': "'DM Serif Display', serif",
      '--font-body': "'DM Sans', sans-serif",
      '--shadow': '0 20px 60px rgba(44,26,14,0.1)',
    },
    bodyClass: 'theme-minimal',
    heroPattern: '',
    cardStyle: '',
  },
  organic: {
    name: 'Doğal / Organik',
    vars: {
      '--soil': '#1C3A1C',
      '--earth': '#4A7C4A',
      '--moss': '#5C9B5C',
      '--sage': '#8FBC8F',
      '--cream': '#F0F7EE',
      '--sand': '#DCF0D8',
      '--white': '#F8FCF7',
      '--text': '#0F2010',
      '--text2': '#3D6040',
      '--accent': '#4A7C4A',
      '--nav-bg': 'rgba(248,252,247,0.95)',
      '--hero-bg': 'var(--white)',
      '--section-bg': '#EAF4E6',
      '--card-bg': 'var(--white)',
      '--card-radius': '28px',
      '--btn-radius': '16px',
      '--font-display': "'Playfair Display', serif",
      '--font-body': "'Lato', sans-serif",
      '--shadow': '0 16px 48px rgba(28,58,28,0.12)',
    },
    bodyClass: 'theme-organic',
    heroPattern: `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 10 Q60 20 50 40 Q40 60 20 50 Q0 40 10 20 Q20 0 40 10Z' fill='none' stroke='rgba(74,124,74,0.06)' stroke-width='1'/%3E%3C/svg%3E"); background-size: 80px 80px;`,
    cardStyle: 'border: 1.5px solid var(--sand);',
  },
  corporate: {
    name: 'Kurumsal / Profesyonel',
    vars: {
      '--soil': '#0A0A0A',
      '--earth': '#1A1A2E',
      '--moss': '#C9A84C',
      '--sage': '#E2C97E',
      '--cream': '#F4F4F0',
      '--sand': '#E0E0D8',
      '--white': '#FFFFFF',
      '--text': '#0A0A0A',
      '--text2': '#444444',
      '--accent': '#C9A84C',
      '--nav-bg': 'rgba(10,10,10,0.97)',
      '--hero-bg': '#0A0A0A',
      '--section-bg': '#F4F4F0',
      '--card-bg': 'var(--white)',
      '--card-radius': '8px',
      '--btn-radius': '4px',
      '--font-display': "'Cormorant Garamond', serif",
      '--font-body': "'Source Sans 3', sans-serif",
      '--shadow': '0 4px 24px rgba(0,0,0,0.12)',
    },
    bodyClass: 'theme-corporate',
    heroPattern: '',
    cardStyle: 'border-left: 3px solid var(--moss);',
  },
  vibrant: {
    name: 'Canlı / Renkli',
    vars: {
      '--soil': '#1A3A1A',
      '--earth': '#2D7A2D',
      '--moss': '#22C55E',
      '--sage': '#86EFAC',
      '--cream': '#F0FDF4',
      '--sand': '#DCFCE7',
      '--white': '#FFFFFF',
      '--text': '#14532D',
      '--text2': '#166534',
      '--accent': '#16A34A',
      '--nav-bg': 'rgba(255,255,255,0.95)',
      '--hero-bg': 'linear-gradient(135deg, #14532D 0%, #166534 50%, #15803D 100%)',
      '--section-bg': '#F0FDF4',
      '--card-bg': 'var(--white)',
      '--card-radius': '24px',
      '--btn-radius': '100px',
      '--font-display': "'Outfit', sans-serif",
      '--font-body': "'Outfit', sans-serif",
      '--shadow': '0 20px 60px rgba(22,163,74,0.15)',
    },
    bodyClass: 'theme-vibrant',
    heroPattern: '',
    cardStyle: 'border: none; box-shadow: 0 4px 20px rgba(22,163,74,0.1);',
  }
};

function applyPageTheme(themeName) {
  const theme = SITE_THEMES[themeName] || SITE_THEMES.minimal;
  const root = document.documentElement;
  
  // Apply CSS variables
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  
  // Remove all theme classes and add new one
  document.body.classList.remove(...Object.values(SITE_THEMES).map(t => t.bodyClass));
  document.body.classList.add(theme.bodyClass);
  
  // Apply hero pattern
  const hero = document.querySelector('.hero, .page-hero');
  if (hero && theme.heroPattern) {
    hero.style.cssText += theme.heroPattern;
  }
  
  // Apply card styles
  if (theme.cardStyle) {
    const styleEl = document.getElementById('theme-card-style') || document.createElement('style');
    styleEl.id = 'theme-card-style';
    styleEl.textContent = `.feature-card, .prod-card, .testimonial-card { ${theme.cardStyle} }`;
    document.head.appendChild(styleEl);
  }
  
  // Load theme-specific fonts
  const fonts = {
    organic: 'Playfair+Display:ital@0;1&family=Lato:wght@300;400;700',
    corporate: 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600',
    vibrant: 'Outfit:wght@300;400;500;600;700',
    minimal: 'DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600'
  };
  
  const fontKey = fonts[themeName] || fonts.minimal;
  const existingLink = document.getElementById('theme-font');
  if (existingLink) existingLink.remove();
  const link = document.createElement('link');
  link.id = 'theme-font';
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontKey}&display=swap`;
  document.head.appendChild(link);
  
  // Update font families
  document.body.style.fontFamily = theme.vars['--font-body'];
  document.querySelectorAll('h1,h2,h3,.nav-logo,.page-title,.section-title,.hero h1,.prod-name,.feature-card h3,.footer-brand,.stat-num').forEach(el => {
    el.style.fontFamily = theme.vars['--font-display'];
  });
  
  // Special adjustments per theme
  if (themeName === 'corporate') {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.style.background = '#0A0A0A';
      heroSection.style.color = '#fff';
      heroSection.querySelectorAll('.hero-content *').forEach(el => {
        if (!el.closest('.btn-primary') && !el.closest('.btn-secondary')) {
          el.style.color = el.tagName === 'P' ? 'rgba(255,255,255,0.7)' : '';
        }
      });
    }
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.style.background = '#C9A84C';
      btn.style.color = '#0A0A0A';
    });
  }
  
  if (themeName === 'vibrant') {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.style.background = 'linear-gradient(135deg, #14532D, #166534)';
      heroSection.querySelectorAll('h1, .hero-badge, .stat-num').forEach(el => {
        el.style.color = '#fff';
      });
      heroSection.querySelectorAll('p, .stat-lbl').forEach(el => {
        el.style.color = 'rgba(255,255,255,0.85)';
      });
    }
  }
}

// Auto-apply theme from site_settings
(async () => {
  try {
    const SB_URL = 'https://mnmjfzjfuvlvkhhfauzg.supabase.co';
    const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubWpmempmdXZsdmtoaGZhdXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDI2NjIsImV4cCI6MjA4ODY3ODY2Mn0.1qQGm-FQk8tnCbBhdmJX-cXqTaEHPqITAsdphfkwg8I';
    const r = await fetch(`${SB_URL}/rest/v1/site_settings?key=eq.site_theme&select=value`, {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
    });
    const data = await r.json();
    const themeName = data?.[0]?.value || 'minimal';
    applyPageTheme(themeName);
  } catch(e) {
    applyPageTheme('minimal');
  }
})();
