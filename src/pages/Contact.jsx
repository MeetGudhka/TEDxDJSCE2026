import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PinContainer } from '../components/ui/3d-pin';
import { AuroraBackground } from '../components/ui/aurora-background';
import { Send, Phone, MapPin, Check } from 'lucide-react';

const Contact = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // 🔥 REPLACE THESE WITH YOUR EMAILJS VALUES
  const SERVICE_ID = "service_ixm3vk3";
  const TEMPLATE_ID = "template_6dar38c";
  const PUBLIC_KEY = "LW70UWaNXzBfEckAb";

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send Email Function
  const sendEmail = async () => {

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          quick_reply: isChecked ? "Yes" : "No"
        },
        PUBLIC_KEY
      );

      alert("✅ Message Sent Successfully!");

      // Reset Form
      setFormData({
        name: "",
        email: "",
        message: ""
      });

      setIsChecked(false);

    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message");
    }

    setLoading(false);
  };

  return (
    <AuroraBackground
      showRadialGradient={false}
      className="min-h-screen h-auto items-start justify-start bg-black text-white w-full overflow-y-auto flex flex-col lg:flex-row relative pt-24 lg:pt-28"
    >

      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 z-10 relative lg:border-r border-white/5 order-1 h-full">

        <div className="flex-shrink-0 mb-4 lg:mb-0">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-wide lg:-mt-2">
            Get In <span className="text-red-600">Touch</span>.
          </h1>

          <div className="grid gap-5 text-zinc-400">

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <MapPin className="w-5 h-5 text-red-500" />
              </div>
              <div className="leading-relaxed text-sm">
                <p className="font-semibold text-white mb-1">Visit Us</p>
                <p className="text-xs md:text-sm">
                  D.J Sanghvi College of Engineering,<br />
                  JVPD Scheme, Vile Parle West, Mumbai-400056
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <Phone className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white mb-1">Call Us</p>
                <p className="text-xs md:text-sm">Shubh Selugar: 96534 64305</p>
                <p className="text-xs md:text-sm">Eric Kurissery: 82914 44579</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <Send className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white mb-1">Email Us</p>
                <a
                  href="mailto:tedxdjsce2324@gmail.com"
                  className="text-xs md:text-sm hover:text-red-400 transition-colors cursor-pointer"
                >
                  tedxdjsce2324@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Map */}
        <div className="flex-1 flex items-end justify-center lg:pb-8">
          <div className="scale-[0.85] origin-bottom transform translate-y-2">
            <PinContainer
              title="Open in Maps"
              href="https://www.google.com/maps?q=Dwarkadas+J.+Sanghvi+College+of+Engineering,+Mumbai"
              containerClassName="h-[16rem] w-[24rem]"
            >
              <div className="p-4 w-[22rem] h-[16rem]">
                <iframe
                  src="https://www.google.com/maps?q=Dwarkadas+J.+Sanghvi+College+Mumbai&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </PinContainer>
          </div>
        </div>

      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 z-10 relative order-2 h-full">

        <div className="w-full max-w-[32rem] flex flex-col gap-5 bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/10 shadow-lg">

          <h2 className="text-3xl font-bold text-white mb-2">
            Send Us a Message
          </h2>

          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white rounded-xl"
          />

          {/* Email */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white rounded-xl"
          />

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white rounded-xl"
          />

          {/* Checkbox */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsChecked(!isChecked)}
          >
            <div className={`w-4 h-4 border rounded flex items-center justify-center ${isChecked ? 'bg-red-600 border-red-600' : 'border-zinc-500'}`}>
              {isChecked && <Check size={12} />}
            </div>
            <span className="text-sm text-zinc-400">
              I need a quick reply
            </span>
          </div>

          {/* Send Button */}
          <button
            onClick={sendEmail}
            disabled={loading}
            className="group flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02]"
          >
            <span className="uppercase tracking-widest text-xs">
              {loading ? "Sending..." : "Send Message"}
            </span>
            <Send className="w-4 h-4" />
          </button>

        </div>

      </div>

    </AuroraBackground>
  );
};

export default Contact;
