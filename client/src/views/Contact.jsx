import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Name, email and message are required");
      return;
    }

    setSending(true);
    try {
      // backend endpoint (create /contact on server) or adjust to your API
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res?.data?.success) {
        toast.success("Message sent — thank you!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(res?.data?.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Contact error:", err?.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Get in touch</h2>
          <p className="text-gray-600">
            Have feedback, questions or want to collaborate? Send a message and we will get back to you.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
              type="email"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              placeholder="Subject (optional)"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Your message"
              rows={6}
              className="w-full border rounded px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={submit}
              disabled={sending}
              className="bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send message"}
            </button>
            <button
              onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}
              className="text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              type="button"
            >
              Reset
            </button>
          </div>
        </div>

        <aside className="bg-gradient-to-b from-orange-50 to-white p-8">
          <h3 className="text-xl font-semibold mb-3">Contact info</h3>
          <p className="text-gray-700 mb-4">Email: <a className="text-orange-600" href="mailto:hello@tinyblog.example">hello@tinyblog.example</a></p>
          <p className="text-gray-700 mb-6">Location: Pune, India</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Support</h4>
              <p className="text-sm text-gray-600">For product issues and help.</p>
            </div>
            <div>
              <h4 className="font-medium">Contribute</h4>
              <p className="text-sm text-gray-600">Report bugs or open-source contributions on GitHub.</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-2">Follow</h4>
            <div className="flex gap-3">
              <a className="text-orange-600 hover:underline" href="#" aria-label="github">GitHub</a>
              <a className="text-orange-600 hover:underline" href="#" aria-label="twitter">Twitter</a>
              <a className="text-orange-600 hover:underline" href="#" aria-label="linkedin">LinkedIn</a>
            </div>
          </div>
        </aside>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}