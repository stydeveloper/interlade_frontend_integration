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
            <a href="">Home</a>
            <a href="">Features</a>
            <a href="">FAQs</a>
            <a href="">Join The Waitlist</a>
          </div>
          <div className="interlade-footer-links-sec">
            <h4>Company</h4>
            <a href="">Contact us</a>
            <a href="">Book a demo</a>
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
