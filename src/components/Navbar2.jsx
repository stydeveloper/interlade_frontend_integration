import React from "react";
import Image from "next/image";
import "../styles/navbar.css"; // Import the CSS file with modified class names

// function Navbar() {
//   const toggleDropdown = () => {
//     const dropdown = document.querySelector(".interlade-dropdown-content");
//     dropdown.classList.toggle("show-interlade-nav");
//   };

//   return (
//     <nav className="interlade-navbar">
//       <div className="interlade-navbar-left">
//         <div className="interlade-logo">
//           <Image
//             src="/images/interlade.png"
//             alt="Interlade"
//             width={40}
//             height={40}
//           />
//           <h1 className="text-white font-semibold text-xl ml-2">Interlade</h1>
//         </div>
//         <ul className="interlade-nav-links">
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">About</a>
//           </li>
//           <li>
//             <a href="#">Services</a>
//           </li>
//           <li>
//             <a href="#">Contact</a>
//           </li>
//         </ul>
//       </div>
//       <div className="interlade-navbar-right">
//         <button className="interlade-btn">Button</button>
//       </div>
//       <input
//         type="checkbox"
//         id="interlade-toggle"
//         className="interlade-toggle-checkbox"
//       />
//       <label
//         htmlFor="interlade-toggle"
//         className="interlade-hamburger-menu"
//         onClick={toggleDropdown}
//       >
//         <div className="interlade-line"></div>
//         <div className="interlade-line"></div>
//         <div className="interlade-line"></div>
//       </label>
//       <div className="interlade-dropdown-content">
//         <a href="#">Home</a>
//         <a href="#">About</a>
//         <a href="#">Services</a>
//         <a href="#">Contact</a>
//         <button className="interlade-btn">Button</button>
//       </div>
//     </nav>
//   );
// }

function Navbar() {
  return (
    <div className="interlade-nav-container">
      <nav className="interlade-navbar">
        <div className="interlade-nav-sub-container">
          <div className="interlade-nav-left">
            <div className="interlade-logo">
              <Image
                src="/images/interlade.png"
                alt="Interlade"
                width={40}
                height={40}
              />
              <h1 className="text-white font-semibold text-xl ml-2">
                Interlade
              </h1>
            </div>

            <div className="interlade-nav-links">
              <Link href="">Home</Link>
              <Link href="">Features</Link>
              <Link href="">FAQs</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>

          <div className="interlade-nav-right">
            <button>Join The Waitlist</button>

            <label
              htmlFor="interlade-toggle"
              className="interlade-hamburger-menu"
            >
              <div className="menu-icon-line-top"></div>
              <div className="menu-icon-line-middle"></div>
              <div className="menu-icon-line-bottom"></div>
            </label>
          </div>
        </div>
      </nav>
      <input
        type="checkbox"
        name=""
        id="interlade-toggle"
        className="interlade-toggle"
      />
      <div className="interlade-mobile-nav-links">
        <Link href="">Home</Link>
        <Link href="">Features</Link>
        <Link href="">FAQs</Link>
        <Link href="">Contact Us</Link>
        <button>Join The Waitlist</button>
      </div>
    </div>
  );
}

export default Navbar;
