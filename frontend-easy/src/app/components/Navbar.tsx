"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.removeItem("auth-store");
    localStorage.removeItem("card-categories-store");
    localStorage.removeItem("card-store");
    localStorage.removeItem("submission-store");
    localStorage.removeItem("all-transactions-store");
    localStorage.removeItem("card-categories-store");
    localStorage.removeItem("cashflow-store");
    localStorage.removeItem("expense-history-store");
    localStorage.removeItem("submission-store");
    localStorage.removeItem("transaction-history-store");
    localStorage.removeItem("transaction-type-store");
    localStorage.removeItem("user-store");

    router.push("/");
  };

  // mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    setMenuOpen(false);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-teal-500 relative">
      <Link href="/" className="flex items-center z-20">
        <Image
          src="/image/Logo_EH.svg"
          alt="Easy Hasanah Logo"
          width={200}
          height={40}
          priority
          className="h-auto "
        />
      </Link>

      <div className="md:hidden h-[10vh] z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="hidden md:flex items-center justify-center space-x-8"></div>

      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/dashboard"
          className={`text-lg ${
            pathname === "/"
              ? "text-teal-500 font-medium"
              : "text-gray-500 hover:text-teal-500"
          } transition-colors`}
        >
          Beranda
        </Link>
        <Link
          href="#"
          className={`text-lg ${
            pathname === "/formulir"
              ? "text-teal-500 font-medium"
              : "text-gray-500 hover:text-teal-500"
          } transition-colors`}
        >
          Formulir
        </Link>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src="/image/Avatar.png"
            alt="User Avatar"
            width={40}
            height={40}
          />
        </div>
        <div className="h-8 w-px bg-[#1EA39D]"></div>

        <Button
          className="bg-transparant hover:bg-transparant"
          onClick={handleLogout}
        >
          <Image
            src="/image/logout_icon.svg"
            alt="Logout"
            width={20}
            height={20}
          />
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed h-[35vh] inset-0 z-10 bg-white pt-20 px-6">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              className={`text-base px-4 py-2 ${
                pathname === "/"
                  ? "text-teal-500 font-medium"
                  : "text-gray-700 hover:text-teal-500"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href="/formulir"
              className={`text-base px-4 py-2 ${
                pathname === "/formulir"
                  ? "text-teal-500 font-medium"
                  : "text-gray-700 hover:text-teal-500"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Formulir
            </Link>

            <hr className="border-t border-gray-200 my-1" />

            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <Image
                    src="/image/Avatar.png"
                    alt="User Avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-sm text-gray-700">User Profile</span>
              </div>

              <Button
                className="bg-transparant hover:bg-transparant"
                onClick={handleLogout}
              >
                <Image
                  src="/image/logout_icon.svg"
                  alt="Logout"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
