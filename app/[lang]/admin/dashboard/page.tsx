"use client";

import Link from "next/link";
import {
  Mail,
  FileText,
  LogOut,
  LayoutDashboard,
  Briefcase,
  Layers,
} from "lucide-react";

export default function AdminDashboardPage() {
  const handleLogout = () => {
    document.cookie =
      "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/en/admin/login";
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <nav className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <LayoutDashboard className="text-blue-600" />
          Admin Dashboard
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto mt-12 px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Mail size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Contact Inbox
            </h2>
            <p className="text-gray-500 mb-8 grow">
              View, read, and delete messages sent by clients from the contact
              form.
            </p>
            <Link
              href="/en/admin/contacts"
              className="inline-flex items-center justify-center w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors mt-auto"
            >
              Go to Inbox
            </Link>
          </div>

          {/* Articles */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <FileText size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Manage Articles
            </h2>
            <p className="text-gray-500 mb-8 grow">
              View all Case Studies and News. Create new articles, edit existing
              ones, or delete them.
            </p>
            <Link
              href="/en/admin/articles"
              className="inline-flex items-center justify-center w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors mt-auto"
            >
              Manage Articles
            </Link>
          </div>

          {/* Brands / Logos (New) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Manage Brands & Logos
            </h2>
            <p className="text-gray-500 mb-8 grow">
              Add new partner logos to the homepage slider and write a custom
              3-language portfolio for each brand.
            </p>
            <Link
              href="/en/admin/brands"
              className="inline-flex items-center justify-center w-full py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors mt-auto"
            >
              Manage Brands
            </Link>
          </div>

          {/* Dynamic Pages Builder (New) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Layers size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Dynamic Pages
            </h2>
            <p className="text-gray-500 mb-8 grow">
              Create completely new pages (e.g. Services, Policies) with custom
              SEO URLs without a developer.
            </p>
            <Link
              href="/en/admin/pages"
              className="inline-flex items-center justify-center w-full py-3 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors mt-auto"
            >
              Manage Pages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
