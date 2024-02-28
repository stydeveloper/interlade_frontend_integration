import Link from "next/link";
import "../styles/footer.css";
import Image from "next/image";
function Footer() {
  return (
    <div className="interlade-footer-container">
      <div className="interlade-footer-top-part">
        <div className="interlade-footer-logo">
          <Image
            src="/images/interlade.png"
            alt="Interlade"
            width={40}
            height={40}
          />
          <h1 className="text-white font-semibold text-xl ml-2">Interlade</h1>
        </div>

        <div className="footer-links-sections">
          <div className="interlade-footer-links-sec">
            <h4>Information</h4>
            <Link href="">Home</Link>
            <Link href="">Features</Link>
            <Link href="">FAQs</Link>
            <Link href="">Join The Waitlist</Link>
          </div>
          <div className="interlade-footer-links-sec">
            <h4>Company</h4>
            <Link href="">Contact us</Link>
            <Link href="">Book a demo</Link>
          </div>
        </div>
      </div>
      <div className="interlade-footer-bottom-part">
        <p>© 2023 Interlade</p>
      </div>
    </div>
  );
}

export default Footer;
