import { Mail, MapPin, Instagram, Linkedin, Twitter, Youtube, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About TEDx", href: "https://www.tedxdjsce.in/about" },
    { name: "Events", href: "https://www.tedxdjsce.in/events" },
    { name: "Speakers", href: "https://www.tedxdjsce.in/speakers" },
    { name: "Teams", href: "https://www.tedxdjsce.in/team" },
  ];

  const legalLinks = [
    { name: "TED" , href: "https://www.ted.com/"},
    { name: "Privacy Policy", href: "https://www.ted.com/about/our-organization/our-policies-terms/privacy-policy" },
    { name: "Terms of Service", href: "https://www.ted.com/about/our-organization/our-policies-terms/ted-com-terms-of-use" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/tedxdjsce/" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/tedx-djsce/" },
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@TEDx/featured" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Top glow effect */}
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="animate-fade-in-up">
            <a href="https://www.ted.com/tedx" target="_blank" rel="noopener noreferrer" className="inline-block">
              <div className="text-3xl font-black tracking-tight mb-4 text-white">
                <span className="tedx-gradient-text text-red-600">TEDx</span>
                <span className="text-white">DJSCE</span>
              </div>
            </a>
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-xs">
              Igniting ideas and inspiring change through powerful talks and
              transformative experiences at Dwarkadas J. Sanghvi College of
              Engineering.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:tedxdjsce@gmail.com"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-red-500 transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 animate-icon-bounce text-red-500" />
                <span className="animate-slide-in-underline">tedxdjsce2324@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up pl-8 lg:pl-12" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-red-500 transition-colors duration-200 animate-slide-in-underline inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-red-500 transition-colors duration-200 animate-slide-in-underline inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to get updates about upcoming events and speaker announcements.
            </p>

            {/* Email Subscription Form */}
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
              />
              <button
                type="submit"
                className="group w-full px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-[1.02]"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Button Content */}
                <span className="relative flex items-center justify-center gap-2">
                  Subscribe
                  <Send className="w-4 h-4 animate-arrow-slide" />
                </span>
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-white mb-3">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-red-500 hover:border-red-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 animate-icon-bounce"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50 text-center md:text-left">
              © {currentYear} TEDxDJSCE. This TEDx event is independently organized.
            </p>
            <p className="text-xs text-white/50 flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by TEDxDJSCE Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
