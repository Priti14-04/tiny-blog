import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-orange-600">TinyBlog</Link>
          <nav className="space-x-4">
            <Link to="/blogs" className="hover:text-orange-600">Blogs</Link>
            <Link to="/new" className="hover:text-orange-600">Write</Link>
            <Link to="/about" className="font-medium text-orange-600">About</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Small blog. Big ideas.</h1>
            <p className="text-lg text-gray-600 mb-6">
              TinyBlog is a minimal blogging platform focused on clean reading and fast publishing.
              Write in Markdown, manage drafts, and share your stories with the world.
            </p>
            <div className="flex gap-4">
              <Link to="/new" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700">
                Start Writing
              </Link>
              <Link to="/blogs" className="inline-block border border-gray-200 px-6 py-3 rounded-lg hover:bg-gray-100">
                Browse Blogs
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-8 shadow-lg">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">01</div>
                <div>
                  <h3 className="font-semibold">Write with Markdown</h3>
                  <p className="text-sm text-gray-600">Focus on content — formatting is handled automatically.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">02</div>
                <div>
                  <h3 className="font-semibold">Drafts & Publishing</h3>
                  <p className="text-sm text-gray-600">Save drafts and publish when ready with a single click.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">03</div>
                <div>
                  <h3 className="font-semibold">Lightweight & Fast</h3>
                  <p className="text-sm text-gray-600">Optimized for quick loading and distraction-free reading.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <h4 className="text-3xl font-extrabold text-orange-600">500+</h4>
            <p className="text-gray-600 mt-2">Published posts</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <h4 className="text-3xl font-extrabold text-orange-600">1K+</h4>
            <p className="text-gray-600 mt-2">Readers monthly</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <h4 className="text-3xl font-extrabold text-orange-600">100%</h4>
            <p className="text-gray-600 mt-2">Open-source spirit</p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Our mission</h2>
          <p className="text-gray-600 max-w-3xl">
            We want to make publishing simple: no heavy admin panels, no cluttered interfaces. TinyBlog aims to
            give creators a calm, fast place to share ideas — whether a short note or a long-form tutorial.
          </p>
        </section>


      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} TinyBlog — Built with ❤️</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a className="text-gray-500 hover:text-gray-800" href="#">Privacy</a>
            <a className="text-gray-500 hover:text-gray-800" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}