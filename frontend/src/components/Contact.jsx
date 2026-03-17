import { useState } from "react";
import toast from "react-hot-toast";
import { LuMessageSquareReply } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsBugFill } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";
import emailjs from "@emailjs/browser";

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const public_key = import.meta.env.VITE_PUBLIC_KEY;

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

    emailjs.send(
    service_id,
    template_id,
    {
      name: form.name,
      email: form.email,
      message: form.message,
      subject: form.subject,
    },
    public_key
  )
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center mt-35 pt-20 ">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">

        {/* Left Section */}
        <div className="px-6">
          <h1 className="text-4xl text-white/90 font-bold mb-10">
            Contact Us
          </h1>

          <p className="text-gray-300 mb-8">
            If you have any questions, suggestions, bug reports, or partnership
            inquiries regarding the Categorizer platform, feel free to reach
            out. Our team will respond as soon as possible.
          </p>

          <div className="space-y-4 text-gray-400">

            <p>
               <MdOutlineAlternateEmail className="inline mx-2" /> <strong>Email: </strong>categorizerx@gmail.com
            </p>

            <p>
              <LuMessageSquareReply className="inline mx-2" /> <strong>Support:</strong> Available 24–48 hours response time
            </p>

            <p>
              <BsBugFill className="inline mx-2" /><strong>Report Issues:</strong> Send bug reports with screenshots
            </p>

            <p>
              <MdConnectWithoutContact className="inline mx-2" /><strong>Business / API access:</strong> contact our team
            </p>

          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-transparent backdrop-blur-2xl p-8 rounded-xl shadow-lg  text-white">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                maxLength={50}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                maxLength={50}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                maxLength={150}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>

              <textarea
                name="message"
                rows="4"
                value={form.message}
                maxLength={1000}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;
